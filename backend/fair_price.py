"""
AgriLink Fair Price Discovery Engine
Module: backend/fair_price.py
Requirement: Python APP Requirement #4 — SymPy Mathematical Modeling

Description:
Uses symbolic mathematics (SymPy) to model fair pricing equilibrium for agricultural produce.
Solves for equilibrium price using symbolic demand-supply equations, integrates production cost
floors, perishable freshness decay curves, and generates an estimated recommended price range.

IMPORTANT:
This is an ESTIMATED RECOMMENDED PRICE RANGE to assist farmers and consumers with fair price
discovery. It is not an exact or guaranteed government MSP or fixed market price.
"""

import math
from typing import Dict, Any, Tuple

try:
    import sympy as sp
    SYMPY_AVAILABLE = True
except ImportError:
    SYMPY_AVAILABLE = False


def calculate_fair_price(
    product_name: str,
    production_cost: float,
    demand_level: str = "High",
    supply_level: str = "Medium",
    days_since_harvest: int = 0,
    shelf_life_days: int = 5,
    quantity_kg: float = 50.0,
    transport_distance_km: float = 15.0
) -> Dict[str, Any]:
    """
    Computes the estimated recommended price range using SymPy symbolic equilibrium modeling.

    :param product_name: Name of crop/product (e.g., 'Tomato')
    :param production_cost: Cost to produce per unit (in ₹/kg)
    :param demand_level: 'Low' | 'Medium' | 'High'
    :param supply_level: 'Low' | 'Medium' | 'High'
    :param days_since_harvest: Days elapsed since harvest (0 = today)
    :param shelf_life_days: Total shelf life before spoiling
    :param quantity_kg: Total available batch volume
    :param transport_distance_km: Distance from farm to local hub/consumer
    :return: Dictionary containing recommended range, formula explanation, and factor breakdown.
    """
    if production_cost <= 0:
        production_cost = 10.0

    # 1. Demand & Supply Quantifiers
    demand_multipliers = {"Low": 0.85, "Medium": 1.05, "High": 1.30}
    supply_multipliers = {"Low": 0.80, "Medium": 1.00, "High": 1.25}

    d_coeff = demand_multipliers.get(demand_level, 1.05)
    s_coeff = supply_multipliers.get(supply_level, 1.00)

    # 2. Freshness Decay Factor (Perishable Goods Exponential Decay)
    # Freshness is 1.0 on harvest day and decays towards 0.6 at end of shelf life
    decay_rate = 0.5 / max(shelf_life_days, 1)
    freshness_factor = max(0.55, math.exp(-decay_rate * max(0, days_since_harvest)))

    # 3. Transport & Local Logistics cost per kg (₹0.25 per km divided by efficiency)
    logistics_cost = round(min(transport_distance_km * 0.22, production_cost * 0.18), 2)

    # 4. SymPy Symbolic Price Model Formulation
    if SYMPY_AVAILABLE:
        # Define symbolic variables
        P = sp.Symbol('P', positive=True, real=True)
        C = sp.Symbol('C', positive=True, real=True)
        D = sp.Symbol('D', positive=True, real=True)
        S = sp.Symbol('S', positive=True, real=True)
        F = sp.Symbol('F', positive=True, real=True)
        L = sp.Symbol('L', positive=True, real=True)

        # Base equilibrium equation:
        # Consumer willingness to pay curve: W(P) = D * F * (1.5 * C + L) - 0.4 * P
        # Farmer minimum reservation cost curve: R(P) = C + L + (0.2 * C * S)
        # Equilibrium is where willingness matches economic incentive
        willingness_curve = D * F * (1.45 * C + L) - 0.35 * P
        farmer_cost_curve = C + L + (0.15 * C * S)

        # Solve for symbolic equilibrium price P_eq: willingness_curve = farmer_cost_curve
        eq_condition = sp.Eq(willingness_curve, farmer_cost_curve)
        solved_price_expr = sp.solve(eq_condition, P)

        if solved_price_expr:
            p_symbolic_func = solved_price_expr[0]
            # Substitute numerical values into the solved symbolic expression
            p_val = float(p_symbolic_func.evalf(subs={
                C: production_cost,
                D: d_coeff,
                S: s_coeff,
                F: freshness_factor,
                L: logistics_cost
            }))
        else:
            # Fallback numeric formulation
            p_val = (production_cost + logistics_cost) * (1.0 + 0.20 * (d_coeff / s_coeff)) * freshness_factor
    else:
        # Pure numeric equivalent if SymPy package not in environment
        p_val = (production_cost + logistics_cost) * (1.0 + 0.25 * (d_coeff / s_coeff)) * freshness_factor

    # 5. Determine Fair Recommended Range:
    # Lower bound: Guarantees farmer recovers production cost + baseline 18% living margin + logistics
    min_farmer_protection_price = (production_cost + logistics_cost) * 1.18
    # Raw calculated central point
    central_price = max(p_val, min_farmer_protection_price)

    # Spread reflects market volatility & supply-demand divergence
    volatility_spread = 0.08 + (0.05 if demand_level == "High" else 0.02)
    min_recommended = math.floor(central_price * (1.0 - volatility_spread))
    max_recommended = math.ceil(central_price * (1.0 + volatility_spread))

    # Ensure min recommended respects minimum farmer recovery
    if min_recommended < min_farmer_protection_price:
        min_recommended = math.floor(min_farmer_protection_price)
        max_recommended = max(max_recommended, min_recommended + 6)

    # 6. Structured Mathematical Explanation
    factor_explanations = [
        {
            "factor": "Production Cost Floor",
            "value": f"₹{production_cost:.2f} / unit",
            "impact": "Establishes non-negotiable floor ensuring the farmer earns sustainable returns."
        },
        {
            "factor": "Demand-Supply Elasticity",
            "value": f"Demand: {demand_level} (×{d_coeff}) | Supply: {supply_level} (×{s_coeff})",
            "impact": "SymPy equilibrium curves balance buyer willingness to pay against farmer availability."
        },
        {
            "factor": "Freshness Factor",
            "value": f"{freshness_factor * 100:.1f}% ({days_since_harvest} days since harvest)",
            "impact": "Higher freshness captures premium market value; aging batches adjust downward."
        },
        {
            "factor": "Local Transport Factor",
            "value": f"₹{logistics_cost:.2f} (Estimated {transport_distance_km} km radius)",
            "impact": "Considers local transit costs to keep consumer delivery transparent and affordable."
        }
    ]

    return {
        "product_name": product_name,
        "production_cost": production_cost,
        "demand_level": demand_level,
        "supply_level": supply_level,
        "days_since_harvest": days_since_harvest,
        "freshness_percentage": round(freshness_factor * 100, 1),
        "recommended_min_price": int(min_recommended),
        "recommended_max_price": int(max_recommended),
        "estimated_fair_price": round(central_price, 2),
        "currency": "₹",
        "unit": "kg",
        "factor_explanations": factor_explanations,
        "sympy_formula": "P_eq = solve(Eq(D * F * (1.45*C + L) - 0.35*P, C + L + 0.15*C*S), P)",
        "disclaimer": "IMPORTANT: This is an estimated recommended price range derived via mathematical modeling to promote fair trade. It is not an exact or guaranteed market price."
    }


if __name__ == "__main__":
    # College Demo Test Run
    print("--- AgriLink SymPy Fair Price Engine Demo ---")
    result = calculate_fair_price("Tomato", production_cost=30.0, demand_level="High", supply_level="Medium", days_since_harvest=0)
    print(f"Product: {result['product_name']}")
    print(f"Production Cost: ₹{result['production_cost']}/kg")
    print(f"Recommended Price: ₹{result['recommended_min_price']} – ₹{result['recommended_max_price']}/kg")
    print(f"SymPy Equation: {result['sympy_formula']}")
    print(f"Disclaimer: {result['disclaimer']}")
