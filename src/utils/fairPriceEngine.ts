import { FairPriceEstimate } from '../types';

export function calculateClientFairPrice(
  productName: string,
  productionCost: number,
  demandLevel: 'Low' | 'Medium' | 'High' = 'High',
  supplyLevel: 'Low' | 'Medium' | 'High' = 'Medium',
  daysSinceHarvest: number = 0,
  shelfLifeDays: number = 5,
  quantityKg: number = 50,
  transportDistanceKm: number = 15
): FairPriceEstimate {
  const safeCost = Math.max(productionCost, 5);

  const demandMultipliers = { Low: 0.85, Medium: 1.05, High: 1.30 };
  const supplyMultipliers = { Low: 0.80, Medium: 1.00, High: 1.25 };

  const dCoeff = demandMultipliers[demandLevel] || 1.05;
  const sCoeff = supplyMultipliers[supplyLevel] || 1.00;

  // Exponential decay for perishables
  const decayRate = 0.5 / Math.max(shelfLifeDays, 1);
  const freshnessFactor = Math.max(0.55, Math.exp(-decayRate * Math.max(0, daysSinceHarvest)));

  // Logistics cost estimate
  const logisticsCost = Math.round(Math.min(transportDistanceKm * 0.22, safeCost * 0.18) * 100) / 100;

  // Symbolic equilibrium simulation:
  // Consumer willingness curve: W(P) = D * F * (1.45*C + L) - 0.35*P
  // Farmer reservation curve: R(P) = C + L + 0.15*C*S
  // At equilibrium W(P) = R(P) => P = [D*F*(1.45*C + L) - (C + L + 0.15*C*S)] / 0.35
  const rawP = (dCoeff * freshnessFactor * (1.45 * safeCost + logisticsCost) - (safeCost + logisticsCost + 0.15 * safeCost * sCoeff)) / 0.35;

  // Lower bound protects farmer with 18% living margin
  const minFarmerProtectionPrice = (safeCost + logisticsCost) * 1.18;
  const centralPrice = Math.max(rawP, minFarmerProtectionPrice);

  const volatility = 0.08 + (demandLevel === 'High' ? 0.05 : 0.02);
  let minPrice = Math.floor(centralPrice * (1.0 - volatility));
  let maxPrice = Math.ceil(centralPrice * (1.0 + volatility));

  if (minPrice < minFarmerProtectionPrice) {
    minPrice = Math.floor(minFarmerProtectionPrice);
    maxPrice = Math.max(maxPrice, minPrice + 6);
  }

  return {
    productName,
    productionCost: safeCost,
    demandLevel,
    supplyLevel,
    daysSinceHarvest,
    freshnessPercentage: Math.round(freshnessFactor * 1000) / 10,
    recommendedMinPrice: minPrice,
    recommendedMaxPrice: maxPrice,
    estimatedFairPrice: Math.round(centralPrice * 100) / 100,
    currency: '₹',
    unit: 'kg',
    factorExplanations: [
      {
        factor: 'Production Cost Floor',
        value: `₹${safeCost.toFixed(2)} / unit`,
        impact: 'Establishes sustainable minimum return covering seed, fertilizer, irrigation, and labor.'
      },
      {
        factor: 'Demand-Supply Elasticity',
        value: `Demand: ${demandLevel} (×${dCoeff}) | Supply: ${supplyLevel} (×${sCoeff})`,
        impact: 'SymPy symbolic equation balances buyer willingness against farmer inventory volume.'
      },
      {
        factor: 'Freshness Factor',
        value: `${(freshnessFactor * 100).toFixed(1)}% (${daysSinceHarvest} days since harvest)`,
        impact: 'Fresh harvest captures premium nutritional value; aging batches scale down to prevent waste.'
      },
      {
        factor: 'Local Transport Factor',
        value: `₹${logisticsCost.toFixed(2)} (${transportDistanceKm} km estimated transit)`,
        impact: 'Factored transparently to ensure fair consumer pricing without middleman markups.'
      }
    ],
    sympyFormula: 'P_eq = solve(Eq(D * F * (1.45*C + L) - 0.35*P, C + L + 0.15*C*S), P)',
    disclaimer: 'IMPORTANT: This is an estimated recommended price range derived via mathematical modeling to promote fair trade. It is not an exact or guaranteed market price.'
  };
}
