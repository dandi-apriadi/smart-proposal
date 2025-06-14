import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    MdInsights,
    MdAutoGraph,
    MdQueryStats,
    MdTimeline,
    MdShowChart,
    MdPieChart,
    MdBarChart,
    MdInfoOutline,
    MdFilterAlt,
    MdCalendarToday,
    MdRefresh
} from "react-icons/md";
import Card from "components/card";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import Select from 'react-select';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const PredictionAnalitics = () => {
    const { baseURL } = useSelector((state) => state.auth);
    const [timeRange, setTimeRange] = useState("30days");
    const [isLoading, setIsLoading] = useState(false);
    const [modelVersion, setModelVersion] = useState({ value: 'latest', label: 'Latest Model' });

    const modelOptions = [
        { value: 'latest', label: 'Latest Model (v2.3)' },
        { value: 'v2.2', label: 'v2.2' },
        { value: 'v2.1', label: 'v2.1' },
        { value: 'v2.0', label: 'v2.0' }
    ];

    // Mock metrics data - would come from API in production
    const metricsData = {
        accuracy: 94.8,
        precision: 93.2,
        recall: 91.5,
        f1Score: 92.3,
        totalPredictions: 1254,
        correctPredictions: 1189,
        falsePositives: 42,
        falseNegatives: 23
    };

    // Mock time series data for accuracy over time
    const accuracyTimeData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [
            {
                label: 'Accuracy',
                data: [88.2, 89.1, 89.8, 91.2, 92.0, 92.8, 93.5, 94.2, 94.8],
                borderColor: 'rgba(59, 130, 246, 0.8)',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true,
            },
        ],
    };

    // Confusion matrix data
    const confusionMatrixData = {
        labels: ['True Negative', 'False Positive', 'False Negative', 'True Positive'],
        datasets: [
            {
                data: [590, 42, 23, 599],
                backgroundColor: [
                    'rgba(22, 163, 74, 0.8)',  // Green - True Negative
                    'rgba(245, 158, 11, 0.8)',  // Amber - False Positive
                    'rgba(220, 38, 38, 0.8)',   // Red - False Negative
                    'rgba(37, 99, 235, 0.8)',   // Blue - True Positive
                ],
                borderWidth: 1,
            },
        ],
    };

    // Feature importance data
    const featureImportanceData = {
        labels: ['Format Compliance', 'Document Completeness', 'Budget Validation', 'Timeline Structure', 'Objective Clarity', 'Resource Allocation'],
        datasets: [
            {
                label: 'Feature Importance',
                data: [0.28, 0.21, 0.18, 0.15, 0.12, 0.06],
                backgroundColor: [
                    'rgba(37, 99, 235, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(96, 165, 250, 0.8)',
                    'rgba(147, 197, 253, 0.8)',
                    'rgba(191, 219, 254, 0.8)',
                    'rgba(219, 234, 254, 0.8)',
                ],
                borderWidth: 1,
            },
        ],
    };

    // Prediction volume by proposal type
    const predictionVolumeData = {
        labels: ['Research', 'Development', 'Training', 'Conference', 'Workshop', 'Other'],
        datasets: [
            {
                label: 'Number of Predictions',
                data: [423, 345, 198, 126, 95, 67],
                backgroundColor: 'rgba(59, 130, 246, 0.8)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Mock function to refresh data
    const refreshData = () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
        }, 1200);
    };

    // Mock function for timerange change
    const handleTimeRangeChange = (range) => {
        setTimeRange(range);
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
        }, 800);
    };

    // Chart options
    const lineChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Model Accuracy Trend',
            },
        },
        scales: {
            y: {
                min: 80,
                max: 100,
            },
        },
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Confusion Matrix',
            },
        },
    };

    const barChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Prediction Volume by Proposal Type',
            },
        },
    };

    const horizontalBarOptions = {
        indexAxis: 'y',
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Feature Importance',
            },
        },
    };

    // AOS data attributes for animations
    useEffect(() => {
        // In a real app, we would fetch data here
        if (window.AOS) {
            window.AOS.refresh();
        }
    }, [timeRange, modelVersion]);

    return (
        <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
            {/* Header and Controls */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3 2xl:col-span-3 3xl:col-span-6">
                <div className="flex flex-wrap justify-between items-center mb-4">
                    <div className="flex items-center">
                        <MdInsights className="mr-2 text-2xl text-blue-500" />
                        <h2 className="text-xl font-bold text-navy-700 dark:text-white">
                            Prediction Analytics Dashboard
                        </h2>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-2 sm:mt-0">
                        <div className="w-48">
                            <Select
                                value={modelVersion}
                                onChange={setModelVersion}
                                options={modelOptions}
                                className="react-select"
                                classNamePrefix="select"
                                isSearchable={false}
                            />
                        </div>
                        <div className="flex bg-white dark:bg-navy-700 rounded-full p-1 shadow-sm">
                            <button
                                onClick={() => handleTimeRangeChange("7days")}
                                className={`px-3 py-1 text-sm rounded-full ${timeRange === "7days"
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-600 dark:text-gray-300"
                                    }`}
                            >
                                7D
                            </button>
                            <button
                                onClick={() => handleTimeRangeChange("30days")}
                                className={`px-3 py-1 text-sm rounded-full ${timeRange === "30days"
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-600 dark:text-gray-300"
                                    }`}
                            >
                                30D
                            </button>
                            <button
                                onClick={() => handleTimeRangeChange("90days")}
                                className={`px-3 py-1 text-sm rounded-full ${timeRange === "90days"
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-600 dark:text-gray-300"
                                    }`}
                            >
                                90D
                            </button>
                            <button
                                onClick={() => handleTimeRangeChange("year")}
                                className={`px-3 py-1 text-sm rounded-full ${timeRange === "year"
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-600 dark:text-gray-300"
                                    }`}
                            >
                                1Y
                            </button>
                        </div>
                        <button
                            onClick={refreshData}
                            className="flex items-center gap-2 bg-white dark:bg-navy-700 p-2 rounded-full shadow-sm hover:bg-gray-50 dark:hover:bg-navy-800 transition-colors"
                        >
                            <MdRefresh className={`text-blue-500 ${isLoading ? "animate-spin" : ""}`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Key Metrics */}
            <div data-aos="fade-up" data-aos-delay="0" className="col-span-1 md:col-span-1 lg:col-span-1">
                <Card extra="!p-5 h-full">
                    <div className="flex items-center gap-2">
                        <MdQueryStats className="text-blue-500 text-xl" />
                        <h5 className="font-semibold text-navy-700 dark:text-white">
                            Model Accuracy
                        </h5>
                    </div>
                    <div className="h-44 flex flex-col items-center justify-center">
                        <div className="relative w-36 h-36">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h2 className="text-4xl font-bold text-blue-500">{metricsData.accuracy}%</h2>
                            </div>
                            <Doughnut
                                data={{
                                    datasets: [{
                                        data: [metricsData.accuracy, 100 - metricsData.accuracy],
                                        backgroundColor: [
                                            'rgba(59, 130, 246, 0.8)',
                                            'rgba(229, 231, 235, 0.6)',
                                        ],
                                        borderWidth: 0,
                                        cutout: '80%'
                                    }]
                                }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: true,
                                    plugins: {
                                        legend: {
                                            display: false
                                        },
                                        tooltip: {
                                            enabled: false
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="mt-2 flex justify-between text-sm">
                        <div className="text-center">
                            <p className="font-medium text-gray-600 dark:text-gray-400">Predictions</p>
                            <p className="text-lg font-bold text-navy-700 dark:text-white">{metricsData.totalPredictions}</p>
                        </div>
                        <div className="text-center">
                            <p className="font-medium text-gray-600 dark:text-gray-400">Correct</p>
                            <p className="text-lg font-bold text-green-600">{metricsData.correctPredictions}</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Additional Metrics */}
            <div data-aos="fade-up" data-aos-delay="100" className="col-span-1 md:col-span-1 lg:col-span-1">
                <Card extra="!p-5 h-full">
                    <div className="flex items-center gap-2">
                        <MdShowChart className="text-blue-500 text-xl" />
                        <h5 className="font-semibold text-navy-700 dark:text-white">
                            Performance Metrics
                        </h5>
                    </div>
                    <div className="mt-4 flex flex-col gap-2">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Precision</span>
                                <span className="text-sm font-semibold text-navy-700 dark:text-white">{metricsData.precision}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-navy-700">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${metricsData.precision}%` }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Recall</span>
                                <span className="text-sm font-semibold text-navy-700 dark:text-white">{metricsData.recall}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-navy-700">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${metricsData.recall}%` }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">F1 Score</span>
                                <span className="text-sm font-semibold text-navy-700 dark:text-white">{metricsData.f1Score}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-navy-700">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${metricsData.f1Score}%` }}></div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="bg-blue-50 dark:bg-navy-800 p-3 rounded-lg">
                            <div className="flex gap-2 items-start">
                                <MdInfoOutline className="text-blue-500 text-xl flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Model performance has improved by <span className="font-semibold text-blue-600 dark:text-blue-400">2.3%</span> compared to previous version.
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Error Analysis */}
            <div data-aos="fade-up" data-aos-delay="200" className="col-span-1 md:col-span-1 lg:col-span-1">
                <Card extra="!p-5 h-full">
                    <div className="flex items-center gap-2">
                        <MdPieChart className="text-blue-500 text-xl" />
                        <h5 className="font-semibold text-navy-700 dark:text-white">
                            Error Analysis
                        </h5>
                    </div>
                    <div className="mt-1 h-48">
                        <Doughnut
                            data={confusionMatrixData}
                            options={doughnutOptions}
                        />
                    </div>
                    <div className="mt-2">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-red-600 mr-2"></div>
                                <span className="text-gray-700 dark:text-gray-300">False Negative: {metricsData.falseNegatives}</span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                                <span className="text-gray-700 dark:text-gray-300">False Positive: {metricsData.falsePositives}</span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Accuracy Trend */}
            <div data-aos="fade-up" data-aos-delay="300" className="col-span-1 md:col-span-2 lg:col-span-3">
                <Card extra="!p-5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <MdTimeline className="text-blue-500 text-xl" />
                            <h5 className="font-semibold text-navy-700 dark:text-white">
                                Model Accuracy Trend
                            </h5>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Latest: </span>
                            <span className="text-sm font-bold text-blue-500">{metricsData.accuracy}%</span>
                        </div>
                    </div>
                    <div className="h-80 mt-4">
                        <Line data={accuracyTimeData} options={lineChartOptions} />
                    </div>
                </Card>
            </div>

            {/* Feature Importance */}
            <div data-aos="fade-up" data-aos-delay="400" className="col-span-1 md:col-span-1 lg:col-span-2">
                <Card extra="!p-5">
                    <div className="flex items-center gap-2">
                        <MdBarChart className="text-blue-500 text-xl" />
                        <h5 className="font-semibold text-navy-700 dark:text-white">
                            Feature Importance
                        </h5>
                    </div>
                    <div className="h-80 mt-2">
                        <Bar
                            data={featureImportanceData}
                            options={horizontalBarOptions}
                        />
                    </div>
                </Card>
            </div>

            {/* Prediction Volume */}
            <div data-aos="fade-up" data-aos-delay="500" className="col-span-1 md:col-span-1 lg:col-span-1">
                <Card extra="!p-5">
                    <div className="flex items-center gap-2">
                        <MdAutoGraph className="text-blue-500 text-xl" />
                        <h5 className="font-semibold text-navy-700 dark:text-white">
                            Prediction Distribution
                        </h5>
                    </div>
                    <div className="h-80 mt-2">
                        <Pie
                            data={{
                                labels: ['Approved', 'Rejected', 'Needs Revision'],
                                datasets: [
                                    {
                                        data: [755, 356, 143],
                                        backgroundColor: [
                                            'rgba(22, 163, 74, 0.7)',
                                            'rgba(220, 38, 38, 0.7)',
                                            'rgba(245, 158, 11, 0.7)',
                                        ],
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        position: 'bottom',
                                    },
                                },
                            }}
                        />
                    </div>
                </Card>
            </div>

            {/* Recent Predictions Table */}
            <div data-aos="fade-up" data-aos-delay="600" className="col-span-1 md:col-span-2 lg:col-span-3 2xl:col-span-3 3xl:col-span-6">
                <Card extra="!p-5">
                    <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-2">
                            <MdQueryStats className="text-blue-500 text-xl" />
                            <h5 className="font-semibold text-navy-700 dark:text-white">
                                Recent Prediction Results
                            </h5>
                        </div>
                        <button className="text-sm font-medium text-blue-500 hover:text-blue-700 dark:hover:text-blue-300">
                            View All
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px] text-sm text-left">
                            <thead className="text-xs uppercase bg-gray-50 dark:bg-navy-800 text-gray-700 dark:text-gray-300">
                                <tr>
                                    <th className="px-4 py-3">Proposal ID</th>
                                    <th className="px-4 py-3">Title</th>
                                    <th className="px-4 py-3">Submitter</th>
                                    <th className="px-4 py-3">Prediction</th>
                                    <th className="px-4 py-3">Confidence</th>
                                    <th className="px-4 py-3">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { id: 'PRO-2025-0189', title: 'AI Research Framework Development', submitter: 'Dr. Anita Wijaya', prediction: 'Approved', confidence: 98.2, date: '2025-04-12' },
                                    { id: 'PRO-2025-0188', title: 'Renewable Energy Workshop Series', submitter: 'Prof. Budi Santoso', prediction: 'Needs Revision', confidence: 76.4, date: '2025-04-12' },
                                    { id: 'PRO-2025-0187', title: 'Student Innovation Conference', submitter: 'Dr. Cindy Gunawan', prediction: 'Approved', confidence: 94.7, date: '2025-04-11' },
                                    { id: 'PRO-2025-0186', title: 'Digital Transformation Training', submitter: 'Dr. David Tanaka', prediction: 'Rejected', confidence: 89.3, date: '2025-04-11' },
                                    { id: 'PRO-2025-0185', title: 'Sustainable Campus Initiative', submitter: 'Prof. Elsa Wijaya', prediction: 'Approved', confidence: 97.1, date: '2025-04-10' },
                                ].map((item, index) => (
                                    <tr key={index} className="border-b dark:border-navy-700">
                                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                                            {item.id}
                                        </td>
                                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300 max-w-[200px] truncate">
                                            {item.title}
                                        </td>
                                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                                            {item.submitter}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium 
                        ${item.prediction === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                                                    item.prediction === 'Rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                                                        'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'}`}>
                                                {item.prediction}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                                            {item.confidence}%
                                        </td>
                                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                                            {item.date}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default PredictionAnalitics;
