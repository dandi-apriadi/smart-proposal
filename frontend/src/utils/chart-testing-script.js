// Chart Testing Script
// This script helps test all chart components with sample data

// Sample data generators for different chart types
const generateSampleData = {
    lineChart: () => ({
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
            label: "Monthly Users",
            data: [120, 190, 300, 500, 200, 300, 450, 230, 180, 220, 300, 410],
            borderColor: "#4318FF",
            tension: 0.4,
            fill: false,
            backgroundColor: 'rgba(67, 24, 255, 0.2)'
        }]
    }),

    areaChart: () => ({
        labels: ["Q1", "Q2", "Q3", "Q4"],
        datasets: [{
            label: "Revenue Growth",
            data: [25000, 32000, 28000, 45000],
            borderColor: "#10B981",
            tension: 0.4,
            fill: true,
            backgroundColor: 'rgba(16, 185, 129, 0.2)'
        }]
    }),

    horizontalBarChart: () => ({
        labels: ["Approved", "Rejected", "Pending", "Under Review", "Draft", "Submitted"],
        datasets: [{
            data: [45, 12, 23, 8, 15, 30],
            backgroundColor: ["#05CD99", "#EE5D50", "#FFB547", "#4318FF", "#868CFF", "#01B574"],
            borderWidth: 0
        }]
    }),

    donutChart: () => ({
        labels: ["Desktop", "Mobile", "Tablet", "Other"],
        datasets: [{
            data: [65, 25, 8, 2],
            backgroundColor: ["#4318FF", "#05CD99", "#FFB547", "#EE5D50"],
            borderWidth: 0
        }]
    }),

    radialChart: () => ({
        labels: ["Performance", "Reliability", "Security", "Usability"],
        datasets: [{
            data: [88, 92, 76, 84]
        }]
    }),

    stackedBarChart: () => ({
        labels: ["Engineering", "Marketing", "Sales", "Support", "HR"],
        datasets: [
            {
                label: "Approved",
                data: [12, 8, 15, 6, 4]
            },
            {
                label: "Pending",
                data: [5, 3, 8, 2, 1]
            },
            {
                label: "Rejected",
                data: [2, 1, 3, 1, 0]
            }
        ]
    }),

    gaugeChart: () => ({
        value: 78,
        maxValue: 100,
        title: "System Performance",
        color: "#10B981"
    })
};

// Test data validation
const validateChartData = (chartType, data) => {
    const validations = {
        lineChart: (data) => {
            if (!data.labels || !Array.isArray(data.labels)) return false;
            if (!data.datasets || !Array.isArray(data.datasets)) return false;
            if (data.datasets.length === 0) return false;
            return data.datasets.every(dataset =>
                Array.isArray(dataset.data) &&
                dataset.data.length === data.labels.length
            );
        },

        horizontalBarChart: (data) => {
            if (!data.labels || !Array.isArray(data.labels)) return false;
            if (!data.datasets || !Array.isArray(data.datasets)) return false;
            return data.datasets[0] &&
                Array.isArray(data.datasets[0].data) &&
                data.datasets[0].data.length === data.labels.length;
        },

        donutChart: (data) => {
            if (!data.labels || !Array.isArray(data.labels)) return false;
            if (!data.datasets || !Array.isArray(data.datasets)) return false;
            return data.datasets[0] &&
                Array.isArray(data.datasets[0].data) &&
                data.datasets[0].data.length === data.labels.length;
        },

        radialChart: (data) => {
            if (!data.labels || !Array.isArray(data.labels)) return false;
            if (!data.datasets || !Array.isArray(data.datasets)) return false;
            return data.datasets[0] &&
                Array.isArray(data.datasets[0].data) &&
                data.datasets[0].data.length === data.labels.length;
        },

        areaChart: (data) => {
            if (!data.labels || !Array.isArray(data.labels)) return false;
            if (!data.datasets || !Array.isArray(data.datasets)) return false;
            return data.datasets.every(dataset =>
                Array.isArray(dataset.data) &&
                dataset.data.length === data.labels.length
            );
        },

        stackedBarChart: (data) => {
            if (!data.labels || !Array.isArray(data.labels)) return false;
            if (!data.datasets || !Array.isArray(data.datasets)) return false;
            return data.datasets.every(dataset =>
                Array.isArray(dataset.data) &&
                dataset.data.length === data.labels.length
            );
        },

        gaugeChart: (data) => {
            return typeof data.value === 'number' &&
                typeof data.maxValue === 'number' &&
                typeof data.title === 'string' &&
                data.value <= data.maxValue;
        }
    };

    const validator = validations[chartType];
    if (!validator) {
        console.error(`No validator found for chart type: ${chartType}`);
        return false;
    }

    return validator(data);
};

// Chart performance testing
const testChartPerformance = (chartType, iterations = 100) => {
    console.log(`Testing ${chartType} performance...`);

    const startTime = performance.now();

    for (let i = 0; i < iterations; i++) {
        const data = generateSampleData[chartType]();
        const isValid = validateChartData(chartType, data);

        if (!isValid) {
            console.error(`Validation failed for ${chartType} at iteration ${i}`);
            return;
        }
    }

    const endTime = performance.now();
    const duration = endTime - startTime;

    console.log(`${chartType} performance test completed:`);
    console.log(`- Iterations: ${iterations}`);
    console.log(`- Total time: ${duration.toFixed(2)}ms`);
    console.log(`- Average time per iteration: ${(duration / iterations).toFixed(2)}ms`);

    return duration;
};

// Run comprehensive tests
const runAllTests = () => {
    console.log('🧪 Starting Chart Component Tests...\n');

    const chartTypes = [
        'lineChart',
        'areaChart',
        'horizontalBarChart',
        'donutChart',
        'radialChart',
        'stackedBarChart',
        'gaugeChart'
    ];

    const results = {};

    chartTypes.forEach(chartType => {
        console.log(`\n📊 Testing ${chartType}:`);

        // Generate and validate sample data
        const sampleData = generateSampleData[chartType]();
        const isValid = validateChartData(chartType, sampleData);

        console.log(`✅ Data validation: ${isValid ? 'PASSED' : 'FAILED'}`);

        if (isValid) {
            console.log('📝 Sample data structure:');
            console.log(JSON.stringify(sampleData, null, 2));

            // Performance test
            const performanceTime = testChartPerformance(chartType, 50);

            results[chartType] = {
                validation: isValid,
                performanceTime,
                sampleData
            };
        } else {
            results[chartType] = {
                validation: false,
                error: 'Data validation failed'
            };
        }
    });

    // Summary report
    console.log('\n📋 TEST SUMMARY REPORT');
    console.log('='.repeat(50));

    Object.entries(results).forEach(([chartType, result]) => {
        console.log(`${chartType}:`);
        console.log(`  Validation: ${result.validation ? '✅ PASS' : '❌ FAIL'}`);
        if (result.performanceTime) {
            console.log(`  Performance: ${result.performanceTime.toFixed(2)}ms`);
        }
        if (result.error) {
            console.log(`  Error: ${result.error}`);
        }
        console.log('');
    });

    const passedTests = Object.values(results).filter(r => r.validation).length;
    const totalTests = Object.keys(results).length;

    console.log(`Overall Result: ${passedTests}/${totalTests} tests passed`);
    console.log(passedTests === totalTests ? '🎉 All tests passed!' : '⚠️  Some tests failed');

    return results;
};

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateSampleData,
        validateChartData,
        testChartPerformance,
        runAllTests
    };
}

// Auto-run tests if script is executed directly
if (typeof window !== 'undefined') {
    // Browser environment
    window.chartTestingUtils = {
        generateSampleData,
        validateChartData,
        testChartPerformance,
        runAllTests
    };

    console.log('🚀 Chart testing utilities loaded!');
    console.log('Run chartTestingUtils.runAllTests() to test all chart types');
} else if (typeof process !== 'undefined' && process.argv && process.argv[1] && process.argv[1].includes('chart-testing')) {
    // Node.js environment
    runAllTests();
}

// Example usage:
/*
// In your React component or testing file:

import { generateSampleData, validateChartData } from './chart-testing-script';

// Generate test data
const lineChartData = generateSampleData.lineChart();

// Validate before using
if (validateChartData('lineChart', lineChartData)) {
    // Render chart with validated data
    <FallbackLineChart chartData={lineChartData} />
}

// Run performance tests
testChartPerformance('lineChart', 100);
*/
