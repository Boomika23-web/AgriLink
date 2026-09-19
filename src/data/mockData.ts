import { Product, Order, UnsoldProductAlert, FarmerGroupBatch } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Country Tomatoes (நாட்டு தக்காளி)',
    name_ta: 'நாட்டு தக்காளி',
    category: 'Vegetables',
    pricePerUnit: 40,
    availableQuantity: 65,
    unit: 'kg',
    farmerId: 1,
    farmerName: 'Farmer Ramesh Kumar',
    farmerLocation: 'Maduranthakam, Chengalpattu',
    farmerRating: 4.8,
    distanceKm: 2.5,
    harvestDate: 'Today (06:00 AM)',
    daysSinceHarvest: 0,
    shelfLifeDays: 5,
    description: 'Naturally sun-ripened, pesticide-free country tomatoes harvested early morning. Rich in lycopene with natural tangy flavor for fresh curries.',
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
    status: 'active',
    productionCost: 28,
    benchmarkFairPrice: 42
  },
  {
    id: 2,
    name: 'Fresh Spinach (பசலைக் கீரை)',
    name_ta: 'பசலைக் கீரை',
    category: 'Vegetables',
    pricePerUnit: 25,
    availableQuantity: 40,
    unit: 'bunch',
    farmerId: 1,
    farmerName: 'Farmer Ramesh Kumar',
    farmerLocation: 'Maduranthakam, Chengalpattu',
    farmerRating: 4.8,
    distanceKm: 2.5,
    harvestDate: 'Today (05:30 AM)',
    daysSinceHarvest: 0,
    shelfLifeDays: 2,
    description: 'Tender, organic green spinach leaves freshly cut and washed in clean spring water. Rich in natural dietary iron and vitamins.',
    imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&auto=format&fit=crop&q=80',
    status: 'active',
    productionCost: 15,
    benchmarkFairPrice: 26
  },
  {
    id: 3,
    name: 'Alphonso Mangoes',
    name_ta: 'அல்போன்சா மாம்பழம்',
    category: 'Fruits',
    pricePerUnit: 120,
    availableQuantity: 80,
    unit: 'kg',
    farmerId: 2,
    farmerName: 'Farmer Anitha Selvam',
    farmerLocation: 'Cauvery Orchards, Tiruchirappalli',
    farmerRating: 4.9,
    distanceKm: 4.0,
    harvestDate: 'Yesterday',
    daysSinceHarvest: 1,
    shelfLifeDays: 7,
    description: 'Sweet, fragrant, pesticide-free Alphonso mangoes ripened naturally under straw beds without carbide or toxic chemicals.',
    imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&auto=format&fit=crop&q=80',
    status: 'active',
    productionCost: 85,
    benchmarkFairPrice: 125
  },
  {
    id: 4,
    name: 'Pure Cow A2 Milk',
    name_ta: 'தூய நாட்டுப்பசு A2 பால்',
    category: 'Dairy',
    pricePerUnit: 58,
    availableQuantity: 50,
    unit: 'liter',
    farmerId: 3,
    farmerName: 'Farmer Muthu Velan',
    farmerLocation: 'Pollachi Green Meadows',
    farmerRating: 4.7,
    distanceKm: 3.2,
    harvestDate: 'Today (05:00 AM)',
    daysSinceHarvest: 0,
    shelfLifeDays: 2,
    description: 'Fresh, chilled raw unadulterated milk from indigenous grazing cows. Delivered in sanitized reusable glass bottles within hours of milking.',
    imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80',
    status: 'active',
    productionCost: 42,
    benchmarkFairPrice: 60
  },
  {
    id: 5,
    name: 'Country Free-Range Eggs',
    name_ta: 'நாட்டுக்கோழி முட்டை',
    category: 'Eggs',
    pricePerUnit: 12,
    availableQuantity: 120,
    unit: 'piece',
    farmerId: 3,
    farmerName: 'Farmer Muthu Velan',
    farmerLocation: 'Pollachi Green Meadows',
    farmerRating: 4.7,
    distanceKm: 3.2,
    harvestDate: 'Today (06:30 AM)',
    daysSinceHarvest: 0,
    shelfLifeDays: 14,
    description: 'High-protein brown country eggs from naturally roaming village poultry. Free of hormone injections and antibiotic supplements.',
    imageUrl: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&auto=format&fit=crop&q=80',
    status: 'active',
    productionCost: 8.5,
    benchmarkFairPrice: 12
  },
  {
    id: 6,
    name: 'Tender Green Okra (வெண்டைக்காய்)',
    name_ta: 'பச்சை வெண்டைக்காய்',
    category: 'Vegetables',
    pricePerUnit: 36,
    availableQuantity: 30,
    unit: 'kg',
    farmerId: 1,
    farmerName: 'Farmer Ramesh Kumar',
    farmerLocation: 'Maduranthakam, Chengalpattu',
    farmerRating: 4.8,
    distanceKm: 2.5,
    harvestDate: 'Today (06:15 AM)',
    daysSinceHarvest: 0,
    shelfLifeDays: 4,
    description: 'Tender, snap-fresh green okra pods with soft seeds. Harvested in the early morning mist to maintain optimal moisture.',
    imageUrl: 'https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?w=600&auto=format&fit=crop&q=80',
    status: 'active',
    productionCost: 24,
    benchmarkFairPrice: 38
  },
  {
    id: 7,
    name: 'Organic Red Pomegranate',
    name_ta: 'செவ்வாதுளை',
    category: 'Fruits',
    pricePerUnit: 140,
    availableQuantity: 45,
    unit: 'kg',
    farmerId: 2,
    farmerName: 'Farmer Anitha Selvam',
    farmerLocation: 'Cauvery Orchards, Tiruchirappalli',
    farmerRating: 4.9,
    distanceKm: 4.0,
    harvestDate: '2 days ago',
    daysSinceHarvest: 2,
    shelfLifeDays: 12,
    description: 'Plump, ruby-red pomegranates with juicy antioxidant-rich arils. Grown using drip irrigation and organic compost.',
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80',
    status: 'active',
    productionCost: 95,
    benchmarkFairPrice: 145
  },
  {
    id: 8,
    name: 'Traditional Cultured Farm Butter',
    name_ta: 'பண்ணை வெண்ணெய்',
    category: 'Dairy',
    pricePerUnit: 95,
    availableQuantity: 25,
    unit: '250g pack',
    farmerId: 3,
    farmerName: 'Farmer Muthu Velan',
    farmerLocation: 'Pollachi Green Meadows',
    farmerRating: 4.7,
    distanceKm: 3.2,
    harvestDate: 'Yesterday',
    daysSinceHarvest: 1,
    shelfLifeDays: 10,
    description: 'Golden-yellow cultured butter hand-churned from curd using traditional bilona techniques. Pure aromatic village flavor.',
    imageUrl: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&auto=format&fit=crop&q=80',
    status: 'active',
    productionCost: 65,
    benchmarkFairPrice: 98
  },
  {
    id: 9,
    name: 'Cold Pressed Groundnut Oil',
    name_ta: 'மரச்செக்கு கடலை எண்ணெய்',
    category: 'Other',
    pricePerUnit: 240,
    availableQuantity: 35,
    unit: 'liter',
    farmerId: 1,
    farmerName: 'Farmer Ramesh Kumar',
    farmerLocation: 'Maduranthakam, Chengalpattu',
    farmerRating: 4.8,
    distanceKm: 2.5,
    harvestDate: '3 days ago',
    daysSinceHarvest: 3,
    shelfLifeDays: 90,
    description: 'Unrefined, wood-pressed pure peanut oil extracted at low temperature to preserve essential fatty acids and natural aroma.',
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=80',
    status: 'active',
    productionCost: 175,
    benchmarkFairPrice: 245
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1',
    orderNumber: 'AGRI-8492',
    consumerName: 'Priya Sundaram',
    farmerName: 'Farmer Ramesh Kumar',
    farmerId: 1,
    items: [
      {
        productId: 1,
        productName: 'Country Tomatoes (நாட்டு தக்காளி)',
        quantity: 5,
        unit: 'kg',
        unitPrice: 40,
        subtotal: 200
      },
      {
        productId: 2,
        productName: 'Fresh Spinach (பசலைக் கீரை)',
        quantity: 2,
        unit: 'bunch',
        unitPrice: 25,
        subtotal: 50
      }
    ],
    totalAmount: 250,
    deliveryFee: 20,
    grandTotal: 270,
    status: 'Confirmed',
    deliveryAddress: 'Flat 4B, Shanti Nilayam, 3rd Cross, Anna Nagar, Chennai',
    paymentMethod: 'Cash on Delivery',
    placedAt: 'Today, 09:30 AM',
    estimatedDelivery: 'Today, 04:00 PM'
  },
  {
    id: 'ord-2',
    orderNumber: 'AGRI-8491',
    consumerName: 'Karthik Raja',
    farmerName: 'Farmer Ramesh Kumar',
    farmerId: 1,
    items: [
      {
        productId: 1,
        productName: 'Country Tomatoes (நாட்டு தக்காளி)',
        quantity: 3,
        unit: 'kg',
        unitPrice: 40,
        subtotal: 120
      }
    ],
    totalAmount: 120,
    deliveryFee: 20,
    grandTotal: 140,
    status: 'Preparing',
    deliveryAddress: 'No. 18, Gandhi Street, Tambaram, Chennai',
    paymentMethod: 'UPI / Online Transfer',
    placedAt: 'Today, 08:45 AM',
    estimatedDelivery: 'Today, 03:30 PM'
  },
  {
    id: 'ord-3',
    orderNumber: 'AGRI-8488',
    consumerName: 'Lakshmi Narayanan',
    farmerName: 'Farmer Muthu Velan',
    farmerId: 3,
    items: [
      {
        productId: 4,
        productName: 'Pure Cow A2 Milk',
        quantity: 2,
        unit: 'liter',
        unitPrice: 58,
        subtotal: 116
      },
      {
        productId: 5,
        productName: 'Country Free-Range Eggs',
        quantity: 12,
        unit: 'piece',
        unitPrice: 12,
        subtotal: 144
      }
    ],
    totalAmount: 260,
    deliveryFee: 20,
    grandTotal: 280,
    status: 'Delivered',
    deliveryAddress: 'Villa 12, Lakeview Enclave, Velachery, Chennai',
    paymentMethod: 'Cash on Delivery',
    placedAt: 'Yesterday, 07:15 AM',
    estimatedDelivery: 'Delivered yesterday'
  }
];

export const INITIAL_UNSOLD_ALERTS: UnsoldProductAlert[] = [
  {
    id: 'alert-1',
    productId: 1,
    productName: 'Country Tomatoes',
    farmerName: 'Farmer Ramesh Kumar',
    currentQuantity: '45 kg',
    urgencyLevel: 'High',
    alertMessage: '20 kg tomatoes may remain unsold within 48 hours. Consider adjusting the price or promoting the product.',
    actionableSuggestions: [
      {
        action: 'Adjust Price',
        description: 'SymPy pricing model suggests adjusting price to ₹34/kg (production cost: ₹28) to stimulate immediate demand.'
      },
      {
        action: 'Promote Product',
        description: 'Broadcast a flash highlight notification to 18 nearby consumers who bought vegetables this week.'
      },
      {
        action: 'Offer Group Sale',
        description: 'Combine remaining 20 kg into the Chengalpattu Bulk Tomato Collective order.'
      }
    ]
  },
  {
    id: 'alert-2',
    productId: 2,
    productName: 'Fresh Spinach',
    farmerName: 'Farmer Ramesh Kumar',
    currentQuantity: '30 bunches',
    urgencyLevel: 'High',
    alertMessage: 'Perishable spinach harvest will pass optimal freshness in 24 hours. Recommend same-day evening discount.',
    actionableSuggestions: [
      {
        action: 'Adjust Price',
        description: 'Offer an evening bundle at ₹20/bunch (Cost ₹15) to ensure zero farm waste.'
      },
      {
        action: 'Promote Product',
        description: 'Alert consumers within 3 km for instant afternoon harvest pickup.'
      }
    ]
  }
];

export const INITIAL_FARMER_GROUPS: FarmerGroupBatch[] = [
  {
    id: 1,
    groupName: 'Chengalpattu Bulk Tomato Collective',
    targetCrop: 'Country Tomatoes',
    targetQuantity: 60,
    currentPooledQuantity: 60,
    unit: 'kg',
    status: 'fulfilled',
    members: [
      { farmerName: 'Farmer Ramesh Kumar', contribution: 20, location: 'Maduranthakam' },
      { farmerName: 'Farmer Balan Selvam', contribution: 15, location: 'Acharapakkam' },
      { farmerName: 'Farmer Muthu Velan', contribution: 25, location: 'Pollachi Outskirts' }
    ]
  },
  {
    id: 2,
    groupName: 'Cauvery Organic Mango Consortium',
    targetCrop: 'Alphonso Mangoes',
    targetQuantity: 150,
    currentPooledQuantity: 110,
    unit: 'kg',
    status: 'open',
    members: [
      { farmerName: 'Farmer Anitha Selvam', contribution: 50, location: 'Tiruchirappalli' },
      { farmerName: 'Farmer Kannan G', contribution: 60, location: 'Srirangam Orchards' }
    ]
  }
];

// Aliases
export const initialMockProducts = INITIAL_PRODUCTS;
export const initialMockOrders = INITIAL_ORDERS;
export const initialUnsoldAlerts = INITIAL_UNSOLD_ALERTS;
export const initialFarmerGroups = INITIAL_FARMER_GROUPS;

