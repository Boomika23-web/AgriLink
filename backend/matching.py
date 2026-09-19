"""
AgriLink Smart Farmer Matching Engine
Module: backend/matching.py
Requirement: Python APP Requirement #1 — Functional Programming

Description:
Uses purely functional programming principles (higher-order functions, map, filter,
sorted, lambdas, immutability, and function composition) to rank farmers and products
for a consumer based on multi-dimensional criteria:
- Distance (proximity)
- Product Price (affordability)
- Freshness (days since harvest)
- Available Quantity (fulfillment reliability)
- Farmer Rating (trust and quality)
"""

from typing import List, Dict, Any, Callable
from functools import reduce


# 1. Pure Helper Functions
def compute_distance_score(max_distance: float = 50.0) -> Callable[[float], float]:
    """Higher-order function (closure) returning a pure scoring lambda for distance."""
    return lambda dist: max(0.0, 1.0 - (dist / max(max_distance, 1.0)))


def compute_freshness_score(days_harvested: int, shelf_life: int = 7) -> float:
    """Pure function calculating freshness score in [0.0, 1.0]."""
    return max(0.1, 1.0 - (days_harvested / max(shelf_life, 1)))


def compute_rating_score(rating: float) -> float:
    """Pure function normalizing a 1.0 - 5.0 rating into [0.0, 1.0]."""
    return min(1.0, max(0.0, (rating - 1.0) / 4.0))


def compute_price_competitiveness(price: float, fair_benchmark: float) -> float:
    """Pure function calculating score based on distance from fair benchmark."""
    if fair_benchmark <= 0:
        return 0.8
    ratio = price / fair_benchmark
    # Score peaks around 1.0 (fair), drops if gouging (> 1.2) or abnormally low
    if ratio <= 1.0:
        return 1.0
    return max(0.2, 1.0 - (ratio - 1.0) * 2.0)


# 2. Functional Pipeline Component
def smart_match_farmers(
    products: List[Dict[str, Any]],
    consumer_lat: float,
    consumer_lon: float,
    target_category: str = "All",
    max_price: float = 1000.0,
    max_distance_km: float = 50.0,
    min_rating: float = 3.5,
    min_quantity: float = 1.0,
    custom_weights: Dict[str, float] = None
) -> List[Dict[str, Any]]:
    """
    Executes a purely functional filtering and ranking pipeline using:
    - filter()
    - map()
    - sorted()
    - lambda
    - reduce() / functional composition
    """
    weights = custom_weights or {
        "distance": 0.30,
        "freshness": 0.25,
        "price": 0.20,
        "rating": 0.15,
        "quantity": 0.10
    }

    # Normalize weights using functional reduce & map
    weight_sum = reduce(lambda acc, val: acc + val, weights.values(), 0.0) or 1.0
    norm_weights = {k: v / weight_sum for k, v in weights.items()}

    # --- Step 1: Functional Filtering using filter() and lambda expressions ---
    category_predicate = lambda p: target_category == "All" or p.get("category") == target_category
    price_predicate = lambda p: p.get("price_per_unit", 0) <= max_price
    distance_predicate = lambda p: p.get("distance_km", 0) <= max_distance_km
    rating_predicate = lambda p: p.get("farmer_rating", 5.0) >= min_rating
    quantity_predicate = lambda p: p.get("available_quantity", 0) >= min_quantity

    # Compose predicates into a single pure filter pipeline
    combined_predicate = lambda p: (
        category_predicate(p) and
        price_predicate(p) and
        distance_predicate(p) and
        rating_predicate(p) and
        quantity_predicate(p)
    )

    filtered_products = list(filter(combined_predicate, products))

    # --- Step 2: Functional Mapping using map() to compute multi-factor scores ---
    dist_scorer = compute_distance_score(max_distance_km)

    def evaluate_match(product: Dict[str, Any]) -> Dict[str, Any]:
        """Pure mapping function that attaches scoring breakdowns without mutating original dict."""
        dist = product.get("distance_km", 5.0)
        days = product.get("days_since_harvest", 0)
        shelf = product.get("shelf_life_days", 7)
        price = product.get("price_per_unit", 40.0)
        benchmark = product.get("benchmark_fair_price", price)
        rating = product.get("farmer_rating", 4.5)
        qty = product.get("available_quantity", 10.0)

        s_dist = dist_scorer(dist)
        s_fresh = compute_freshness_score(days, shelf)
        s_price = compute_price_competitiveness(price, benchmark)
        s_rate = compute_rating_score(rating)
        s_qty = min(1.0, qty / 50.0)

        composite_score = (
            s_dist * norm_weights["distance"] +
            s_fresh * norm_weights["freshness"] +
            s_price * norm_weights["price"] +
            s_rate * norm_weights["rating"] +
            s_qty * norm_weights["quantity"]
        )

        freshness_label = "Fresh today" if days == 0 else (f"Harvested {days}d ago" if days > 1 else "Harvested yesterday")

        # Return new dictionary maintaining functional immutability
        return {
            **product,
            "match_score": round(composite_score * 100, 1),
            "freshness_label": freshness_label,
            "score_breakdown": {
                "distance_score": round(s_dist * 100, 1),
                "freshness_score": round(s_fresh * 100, 1),
                "price_score": round(s_price * 100, 1),
                "rating_score": round(s_rate * 100, 1),
                "quantity_score": round(s_qty * 100, 1)
            }
        }

    scored_products = list(map(evaluate_match, filtered_products))

    # --- Step 3: Functional Sorting using sorted() with a lambda key ---
    ranked_results = sorted(
        scored_products,
        key=lambda item: item["match_score"],
        reverse=True
    )

    return ranked_results


if __name__ == "__main__":
    # Test functional pipeline with demo catalog
    sample_catalog = [
        {
            "product_id": 1,
            "name": "Country Tomatoes",
            "category": "Vegetables",
            "farmer_name": "Farmer Ramesh",
            "price_per_unit": 40.0,
            "distance_km": 2.5,
            "days_since_harvest": 0,
            "shelf_life_days": 5,
            "farmer_rating": 4.8,
            "available_quantity": 65.0,
            "benchmark_fair_price": 42.0
        },
        {
            "product_id": 2,
            "name": "Country Tomatoes",
            "category": "Vegetables",
            "farmer_name": "Farmer Balan",
            "price_per_unit": 42.0,
            "distance_km": 4.0,
            "days_since_harvest": 1,
            "shelf_life_days": 5,
            "farmer_rating": 4.7,
            "available_quantity": 40.0,
            "benchmark_fair_price": 42.0
        },
        {
            "product_id": 3,
            "name": "Country Tomatoes",
            "category": "Vegetables",
            "farmer_name": "Farmer Charles",
            "price_per_unit": 52.0,
            "distance_km": 18.0,
            "days_since_harvest": 3,
            "shelf_life_days": 5,
            "farmer_rating": 4.2,
            "available_quantity": 8.0,
            "benchmark_fair_price": 42.0
        }
    ]

    print("--- AgriLink Functional Programming Smart Matching Demo ---")
    matches = smart_match_farmers(sample_catalog, consumer_lat=13.08, consumer_lon=80.27)
    for idx, m in enumerate(matches, 1):
        print(f"Rank {idx}: {m['farmer_name']} | {m['name']} | ₹{m['price_per_unit']}/kg | {m['distance_km']} km | {m['freshness_label']} | ⭐ {m['farmer_rating']} => Match Score: {m['match_score']}%")
