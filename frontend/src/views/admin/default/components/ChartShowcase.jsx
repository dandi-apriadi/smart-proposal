import React, { useState } from "react";
import { MdOutlineBarChart, MdTrendingUp, MdOutlineSettings, MdOutlineShowChart } from "react-icons/md";
import Card from "components/card";

// Import all the chart components from SystemOverview
const FallbackLineChart = ({ chartData }) => {
    const [hoveredBar, setHoveredBar] = useState(null);
    const [isAnimated, setIsAnimated] = useState(false);
    const maxValue = Math.max(...chartData.datasets[0].data);
    const avgValue = Math.round(chartData.datasets[0].data.reduce((a, b) => a + b, 0) / chartData.datasets[0].data.length);

    // Animate bars on initial render
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimated(true);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    // Calculate min and max for highlights
    const maxIndex = chartData.datasets[0].data.indexOf(maxValue);
    const minValue = Math.min(...chartData.datasets[0].data);
    const minIndex = chartData.datasets[0].data.indexOf(minValue);

    // Format value with commas for better readability
    const formatValue = (val) => {
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // Improved y-axis with more readable labels
    const yAxisLabels = [
        0,
        Math.round(maxValue / 4),
        Math.round(maxValue / 2),
        Math.round(maxValue * 3 / 4),
        maxValue
    ];

    return (
        <div className="h-64 flex flex-col items-center justify-center bg-white rounded-xl p-5 dark:bg-navy-800 overflow-hidden shadow-sm">
            <div className="flex items-center justify-between w-full mb-3">
                <div className="flex items-center">
                    <div className="p-1.5 rounded-full bg-brand-50 text-brand-500 mr-2">
                        <MdOutlineBarChart size={20} />
                    </div>
                    <p className="text-gray-800 font-medium dark:text-white text-base">Line Chart</p>
                </div>

                {/* Enhanced average metric display */}
                <div className="flex items-center text-xs font-medium px-2.5 py-1.5 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <span>Average: {formatValue(avgValue)}</span>
                </div>
            </div>

            {/* Chart container with improved y-axis */}
            <div className="relative w-full h-44 mt-1 flex">
                {/* Better spaced Y-axis labels */}
                <div className="flex flex-col justify-between h-full pr-3 text-xs font-medium text-gray-500 dark:text-gray-400 min-w-[30px]">
                    {yAxisLabels.reverse().map((label, idx) => (
                        <span key={idx} className="text-right">{formatValue(label)}</span>
                    ))}
                </div>

                {/* Chart area with more readable grid */}
                <div className="relative flex-1 h-full">
                    {/* Enhanced grid lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                        {yAxisLabels.map((_, i) => (
                            <div key={i} className="w-full h-px bg-gray-100 dark:bg-navy-600" />
                        ))}
                    </div>

                    {/* More visible average line */}
                    <div className="absolute w-full h-[2px] bg-blue-400 dark:bg-blue-500 z-10 border-t border-b border-blue-300 dark:border-blue-600"
                        style={{ top: `${100 - (avgValue / maxValue * 100)}%` }}>
                        <div className="absolute right-0 -top-4 text-xs font-medium px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full dark:bg-blue-900/50 dark:text-blue-400">
                            Avg: {formatValue(avgValue)}
                        </div>
                    </div>

                    {/* Bars with enhanced spacing and readability */}
                    <div className="absolute inset-0 flex items-end justify-between px-1">
                        {chartData.datasets[0].data.map((value, index) => {
                            const height = (value / maxValue) * 100;
                            const isActive = hoveredBar === index;
                            const isMax = index === maxIndex;
                            const isMin = index === minIndex;

                            // More accessible color scheme
                            let barColor = 'bg-gradient-to-t from-indigo-400 to-indigo-500';
                            if (isActive) barColor = 'bg-gradient-to-t from-blue-500 to-blue-400';
                            if (isMax) barColor = 'bg-gradient-to-t from-green-500 to-green-400';
                            if (isMin) barColor = 'bg-gradient-to-t from-amber-500 to-amber-400';

                            return (
                                <div
                                    key={index}
                                    className="group relative flex-1 flex items-end justify-center mx-1"
                                    onMouseEnter={() => setHoveredBar(index)}
                                    onMouseLeave={() => setHoveredBar(null)}
                                >
                                    {/* More visible bar with clearer rounding */}
                                    <div
                                        className={`w-full transition-all duration-500 ease-out rounded-t-md ${barColor} border-t border-l border-r ${isActive ? 'border-blue-300' :
                                            isMax ? 'border-green-300' :
                                                isMin ? 'border-amber-300' : 'border-indigo-300'
                                            }`}
                                        style={{
                                            height: isAnimated ? `${height}%` : '0%',
                                            transform: isActive ? 'scaleY(1.05)' : 'scaleY(1)',
                                            transformOrigin: 'bottom',
                                            boxShadow: isActive ? '0 0 10px rgba(59, 130, 246, 0.5)' : 'none'
                                        }}
                                    />

                                    {/* Improved bar labels for max/min */}
                                    {(isMax || isMin) && !isActive && (
                                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-white shadow-sm">
                                            <span className={`${isMax ? 'text-green-600' : 'text-amber-600'}`}>
                                                {isMax ? 'Highest' : 'Lowest'}
                                            </span>
                                        </div>
                                    )}

                                    {/* More readable tooltip */}
                                    {isActive && (
                                        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-white dark:bg-navy-900 text-xs rounded-lg shadow-lg z-10 p-3 min-w-[100px] border border-gray-100 dark:border-navy-700">
                                            <div className="font-semibold text-center text-gray-800 dark:text-white text-sm">{formatValue(value)}</div>
                                            <div className="text-xs text-center text-gray-500 font-medium mt-0.5">{chartData.labels[index]}</div>
                                            <div className="text-xs text-center mt-2 font-medium">
                                                {value > avgValue ? (
                                                    <span className="text-green-600 px-1.5 py-0.5 bg-green-50 rounded-full dark:bg-green-900/30 dark:text-green-400">
                                                        {Math.round((value - avgValue) / avgValue * 100)}% above avg
                                                    </span>
                                                ) : (
                                                    <span className="text-amber-600 px-1.5 py-0.5 bg-amber-50 rounded-full dark:bg-amber-900/30 dark:text-amber-400">
                                                        {Math.round((avgValue - value) / avgValue * 100)}% below avg
                                                    </span>
                                                )}
                                            </div>
                                            <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white dark:bg-navy-900 rotate-45 border-r border-b border-gray-100 dark:border-navy-700"></div>
                                        </div>
                                    )}

                                    {/* Month label under each bar */}
                                    <div className={`absolute -bottom-5 text-[9px] font-medium transform -translate-x-1/2 left-1/2 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                                        {chartData.labels[index].substring(0, 3)}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Enhanced X-axis with better readability */}
            <div className="flex justify-between w-full mt-6 px-1 pt-1 border-t border-gray-100 dark:border-navy-700 text-xs text-gray-400">
                <span>Jan</span>
                <span className="text-gray-500 font-medium">2025</span>
                <span>Dec</span>
            </div>
        </div>
    );
};

const ChartShowcase = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Sample data for demonstration
    const sampleLineData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "User Activity",
                data: [12, 19, 15, 25, 22, 30],
                borderColor: "#4318FF",
                tension: 0.4,
                fill: false,
                backgroundColor: 'rgba(67, 24, 255, 0.2)'
            },
        ],
    };

    const samplePieData = {
        labels: ["Approved", "Rejected", "Pending", "Under Review"],
        datasets: [
            {
                data: [15, 8, 12, 5],
                backgroundColor: ["#05CD99", "#EE5D50", "#FFB547", "#4318FF"],
                borderWidth: 0,
            },
        ],
    };

    const sampleStackedData = {
        labels: ["Q1", "Q2", "Q3", "Q4"],
        datasets: [
            {
                label: "Sales",
                data: [20, 25, 30, 28]
            },
            {
                label: "Marketing",
                data: [15, 18, 22, 20]
            },
            {
                label: "Development",
                data: [25, 30, 35, 32]
            }
        ]
    };

    const chartCategories = [
        { id: 'all', name: 'All Charts', icon: <MdOutlineShowChart /> },
        { id: 'trend', name: 'Trend Analysis', icon: <MdTrendingUp /> },
        { id: 'comparison', name: 'Comparisons', icon: <MdOutlineBarChart /> },
        { id: 'progress', name: 'Progress & KPIs', icon: <MdOutlineSettings /> }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold text-navy-700 dark:text-white">
                        Chart Showcase
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Explore all available chart types and visualizations
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex bg-gray-100 dark:bg-navy-700 rounded-lg p-1">
                    {chartCategories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded transition-colors ${selectedCategory === category.id
                                    ? 'bg-brand-500 text-white shadow-sm'
                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-navy-600'
                                }`}
                        >
                            {category.icon}
                            <span className="hidden sm:inline">{category.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Chart Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Line Chart Demo */}
                <Card extra={"p-6"}>
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-navy-700 dark:text-white mb-2">
                            Interactive Line Chart
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Perfect for showing trends over time with hover interactions
                        </p>
                    </div>
                    <FallbackLineChart chartData={sampleLineData} />
                    <div className="mt-4 text-xs text-gray-500">
                        <strong>Use cases:</strong> User activity, sales trends, performance metrics
                    </div>
                </Card>

                {/* Additional chart demos would go here */}
                <Card extra={"p-6"}>
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-navy-700 dark:text-white mb-2">
                            Coming Soon: Area Chart
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Filled line charts for cumulative data visualization
                        </p>
                    </div>
                    <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-navy-700/30 rounded-lg">
                        <div className="text-center">
                            <MdTrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-500 dark:text-gray-400">Area Chart Preview</p>
                        </div>
                    </div>
                </Card>

                <Card extra={"p-6"}>
                    <div className="mb-4">
                        <h3 className="text-lg font-bold text-navy-700 dark:text-white mb-2">
                            Coming Soon: Gauge Charts
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Perfect for KPIs and single metric visualization
                        </p>
                    </div>
                    <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-navy-700/30 rounded-lg">
                        <div className="text-center">
                            <MdOutlineSettings className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-500 dark:text-gray-400">Gauge Chart Preview</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Chart Features */}
            <Card extra={"p-6"}>
                <h3 className="text-xl font-bold text-navy-700 dark:text-white mb-4">
                    Chart Features & Capabilities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-white font-bold">📱</span>
                        </div>
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Responsive</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            All charts automatically adapt to different screen sizes
                        </p>
                    </div>

                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-white font-bold">🎨</span>
                        </div>
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Customizable</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Colors, themes, and styling can be easily customized
                        </p>
                    </div>

                    <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-white font-bold">⚡</span>
                        </div>
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Interactive</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Hover effects, tooltips, and click interactions
                        </p>
                    </div>

                    <div className="text-center p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                        <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-3">
                            <span className="text-white font-bold">🚀</span>
                        </div>
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Performance</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Optimized rendering with smooth animations
                        </p>
                    </div>
                </div>
            </Card>

            {/* Implementation Guide */}
            <Card extra={"p-6"}>
                <h3 className="text-xl font-bold text-navy-700 dark:text-white mb-4">
                    How to Use These Charts
                </h3>
                <div className="space-y-4">
                    <div className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-navy-700/30 rounded-lg">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                            1
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-1">
                                Import Chart Component
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Import the desired chart component from the SystemOverview file
                            </p>
                            <code className="text-xs bg-gray-200 dark:bg-navy-600 px-2 py-1 rounded mt-2 inline-block">
                                import &#123; FallbackLineChart &#125; from './SystemOverview'
                            </code>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-navy-700/30 rounded-lg">
                        <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                            2
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-1">
                                Prepare Your Data
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Format your data according to the chart's expected structure
                            </p>
                            <code className="text-xs bg-gray-200 dark:bg-navy-600 px-2 py-1 rounded mt-2 inline-block">
                                chartData = &#123; labels: [...], datasets: [...] &#125;
                            </code>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-navy-700/30 rounded-lg">
                        <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                            3
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800 dark:text-white mb-1">
                                Render the Chart
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Use the component in your JSX with the prepared data
                            </p>
                            <code className="text-xs bg-gray-200 dark:bg-navy-600 px-2 py-1 rounded mt-2 inline-block">
                                &lt;FallbackLineChart chartData=&#123;myData&#125; /&gt;
                            </code>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ChartShowcase;
