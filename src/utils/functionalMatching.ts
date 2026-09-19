import { Product, MatchingWeights, RankedMatch } from '../types';

export const createDistanceScorer = (maxDistance: number = 50) => {
  return (distance: number): number => Math.max(0, 1 - distance / Math.max(maxDistance, 1));
};

export const computeFreshnessScore = (daysHarvested: number, shelfLife: number = 7): number => {
  return Math.max(0.1, 1 - daysHarvested / Math.max(shelfLife, 1));
};

export const computeRatingScore = (rating: number): number => {
  return Math.min(1, Math.max(0, (rating - 1) / 4));
};

export const computePriceCompetitiveness = (price: number, fairBenchmark: number): number => {
  if (fairBenchmark <= 0) return 0.8;
  const ratio = price / fairBenchmark;
  if (ratio <= 1.0) return 1.0;
  return Math.max(0.2, 1.0 - (ratio - 1.0) * 2.0);
};

export function smartMatchProductsFunctional(
  products: Product[],
  targetCategory: string = 'All',
  maxPrice: number = 1000,
  maxDistanceKm: number = 50,
  minRating: number = 3.5,
  minQuantity: number = 1,
  customWeights?: Partial<MatchingWeights>
): RankedMatch[] {
  const weights: MatchingWeights = {
    distance: 0.30,
    freshness: 0.25,
    price: 0.20,
    rating: 0.15,
    quantity: 0.10,
    ...customWeights
  };

  const weightSum = Object.values(weights).reduce((acc, val) => acc + val, 0) || 1;
  const normWeights = {
    distance: weights.distance / weightSum,
    freshness: weights.freshness / weightSum,
    price: weights.price / weightSum,
    rating: weights.rating / weightSum,
    quantity: weights.quantity / weightSum
  };

  // 1. Functional Filtering using filter() and pure lambda predicates
  const categoryPredicate = (p: Product) => targetCategory === 'All' || p.category === targetCategory;
  const pricePredicate = (p: Product) => p.pricePerUnit <= maxPrice;
  const distancePredicate = (p: Product) => p.distanceKm <= maxDistanceKm;
  const ratingPredicate = (p: Product) => p.farmerRating >= minRating;
  const quantityPredicate = (p: Product) => p.availableQuantity >= minQuantity;

  const combinedPredicate = (p: Product) =>
    categoryPredicate(p) &&
    pricePredicate(p) &&
    distancePredicate(p) &&
    ratingPredicate(p) &&
    quantityPredicate(p);

  const filteredProducts = products.filter(combinedPredicate);

  // 2. Functional Mapping using map() to evaluate multi-factor scores
  const distScorer = createDistanceScorer(maxDistanceKm);

  const evaluateMatch = (product: Product): RankedMatch => {
    const sDist = distScorer(product.distanceKm);
    const sFresh = computeFreshnessScore(product.daysSinceHarvest, product.shelfLifeDays);
    const sPrice = computePriceCompetitiveness(product.pricePerUnit, product.benchmarkFairPrice || product.pricePerUnit);
    const sRate = computeRatingScore(product.farmerRating);
    const sQty = Math.min(1.0, product.availableQuantity / 50.0);

    const compositeScore =
      sDist * normWeights.distance +
      sFresh * normWeights.freshness +
      sPrice * normWeights.price +
      sRate * normWeights.rating +
      sQty * normWeights.quantity;

    const freshnessLabel =
      product.daysSinceHarvest === 0
        ? 'Fresh today'
        : product.daysSinceHarvest === 1
        ? 'Harvested yesterday'
        : `Harvested ${product.daysSinceHarvest}d ago`;

    return {
      product,
      matchScore: Math.round(compositeScore * 1000) / 10,
      freshnessLabel,
      scoreBreakdown: {
        distanceScore: Math.round(sDist * 100),
        freshnessScore: Math.round(sFresh * 100),
        priceScore: Math.round(sPrice * 100),
        ratingScore: Math.round(sRate * 100),
        quantityScore: Math.round(sQty * 100)
      }
    };
  };

  const scoredMatches = filteredProducts.map(evaluateMatch);

  // 3. Functional Sorting using sort() with lambda comparator
  return scoredMatches.sort((a, b) => b.matchScore - a.matchScore);
}
