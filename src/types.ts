export type UserRole = 'farmer' | 'consumer' | 'admin' | 'guest';

export type ProductCategory = 'Vegetables' | 'Fruits' | 'Dairy' | 'Eggs' | 'Other';

export type ProductStatus = 'active' | 'out_of_stock' | 'low_stock' | 'archived';

export type OrderStatus = 'Placed' | 'Confirmed' | 'Preparing' | 'Ready' | 'Delivered';

export type Language = 'en' | 'ta';

export interface Product {
  id: string | number;
  name: string;
  name_ta?: string;
  category: ProductCategory;
  pricePerUnit: number;
  availableQuantity: number;
  unit: string;
  farmerId: number;
  farmerName: string;
  farmerLocation: string;
  location?: string;
  farmerRating: number;
  distanceKm: number;
  harvestDate: string;
  daysSinceHarvest: number;
  shelfLifeDays: number;
  description: string;
  imageUrl: string;
  status: ProductStatus;
  productionCost: number;
  benchmarkFairPrice?: number;
  isOrganic?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  productId: string | number;
  productName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  subtotal: number;
  pricePerUnit?: number;
  totalPrice?: number;
  farmerName?: string;
}

export interface OrderTimelineStep {
  status: OrderStatus;
  timestamp: string;
  note: string;
}

export interface Order {
  id: string | number;
  orderNumber: string;
  consumerName: string;
  consumerId?: number;
  farmerName: string;
  farmerId?: number;
  items: OrderItem[];
  totalAmount?: number;
  subtotal?: number;
  deliveryFee: number;
  grandTotal: number;
  status: OrderStatus;
  deliveryAddress: string;
  consumerAddress?: string;
  paymentMethod: string;
  placedAt?: string;
  orderDate?: string;
  estimatedDelivery?: string;
  timeline?: OrderTimelineStep[];
}

export interface FairPriceEstimate {
  productName: string;
  productionCost: number;
  demandLevel: 'Low' | 'Medium' | 'High';
  supplyLevel: 'Low' | 'Medium' | 'High';
  daysSinceHarvest: number;
  freshnessPercentage: number;
  recommendedMinPrice: number;
  recommendedMaxPrice: number;
  estimatedFairPrice: number;
  currency: string;
  unit: string;
  factorExplanations: {
    factor: string;
    value: string;
    impact: string;
  }[];
  sympyFormula: string;
  disclaimer: string;
}

export interface MatchingWeights {
  distance: number;
  freshness: number;
  price: number;
  rating: number;
  quantity: number;
}

export interface RankedMatch {
  product: Product;
  matchScore: number;
  freshnessLabel: string;
  scoreBreakdown: {
    distanceScore: number;
    freshnessScore: number;
    priceScore: number;
    ratingScore: number;
    quantityScore: number;
  };
}

export interface UnsoldProductAlert {
  id: string;
  productId: string | number;
  productName: string;
  farmerName: string;
  currentQuantity: string;
  urgencyLevel: 'High' | 'Moderate' | 'Low';
  alertMessage: string;
  actionableSuggestions: {
    action: string;
    description: string;
  }[];
}

export interface FarmerGroupBatch {
  id: string | number;
  groupName: string;
  targetCrop: string;
  targetQuantity: number;
  currentPooledQuantity: number;
  unit: string;
  status: 'open' | 'locked' | 'fulfilled' | 'pooling';
  members: {
    farmerId?: number;
    farmerName: string;
    contribution: number;
    location: string;
  }[];
}

export interface SocketNotification {
  id: string;
  timestamp: string;
  event: string;
  target: string;
  message: string;
  orderId?: string;
  unread?: boolean;
}
