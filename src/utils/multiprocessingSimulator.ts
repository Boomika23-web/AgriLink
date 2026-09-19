export interface MultiprocessingTaskResult {
  taskName: string;
  workerPid: number;
  executionTimeSec: number;
  summary: string;
  details: Record<string, any>;
}

export interface MultiprocessingRunOutput {
  status: string;
  coresUtilized: number;
  totalBatchDurationSec: number;
  results: MultiprocessingTaskResult[];
}

export async function runMultiprocessingSimulation(): Promise<MultiprocessingRunOutput> {
  const startTime = Date.now();
  // Simulate asynchronous multi-core dispatch
  await new Promise((res) => setTimeout(res, 600));

  const basePid = 8120 + Math.floor(Math.random() * 200);

  const results: MultiprocessingTaskResult[] = [
    {
      taskName: 'Demand Trend Analysis',
      workerPid: basePid,
      executionTimeSec: 0.142,
      summary: 'Surging demand (+18% week-on-week) for organic vegetables & A2 milk.',
      details: {
        'Cores Assigned': 'Core #0 (Affinity: CPU_0)',
        'Top Searching Produce': 'Country Tomatoes, A2 Cow Milk, Spinach',
        'Forecast Recommendation': 'Expand morning tomato harvest allocations by 15% for upcoming festival weekend.'
      }
    },
    {
      taskName: 'Sales Report Generation',
      workerPid: basePid + 1,
      executionTimeSec: 0.188,
      summary: 'Aggregated ₹1,44,600 in total sales across 128 orders with 95% paid directly to farmers.',
      details: {
        'Cores Assigned': 'Core #1 (Affinity: CPU_1)',
        'Total Revenue': '₹1,44,600.00',
        'Direct Farmer Payout': '₹1,37,370.00 (95.0%)',
        'Logistics & Packaging Reserve': '₹7,230.00 (5.0%)',
        'Status': 'Ledgers balanced and reconciled for instant UPI bank settlement.'
      }
    },
    {
      taskName: 'Product Velocity Analytics',
      workerPid: basePid + 2,
      executionTimeSec: 0.115,
      summary: 'Average transit time: 6.8 hours from harvest to doorstep. Spoilage reduced by 38%.',
      details: {
        'Cores Assigned': 'Core #2 (Affinity: CPU_2)',
        'Top Category by Conversion': 'Vegetables (58% of cart checks)',
        'Repeat Buyer Ratio': '74.2% within 14 days',
        'Shelf Life Conservation': 'Eliminated 2 middlemen storage hubs.'
      }
    },
    {
      taskName: 'Unsold-Product Risk Scanner',
      workerPid: basePid + 3,
      executionTimeSec: 0.154,
      summary: 'Scanned 64 active farm batches. Identified 2 batches at risk of spoilage.',
      details: {
        'Cores Assigned': 'Core #3 (Affinity: CPU_3)',
        'High Risk Batches': '20 kg Country Tomatoes (Farmer Ramesh), 30 bunches Spinach',
        'Automated Interventions': 'Price adjustment triggers, group sale pooling, and priority local buyer notifications pushed.'
      }
    }
  ];

  const totalTime = Math.round((Date.now() - startTime) / 10) / 100;

  return {
    status: 'COMPLETED',
    coresUtilized: 4,
    totalBatchDurationSec: totalTime,
    results
  };
}
