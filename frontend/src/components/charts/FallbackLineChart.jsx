import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const FallbackLineChart = ({ data: incomingData, options, title }) => {
    const defaultDatasetValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const defaultLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const baseDefaultDataset = {
        label: title || "Sample Data",
        data: [...defaultDatasetValues], // Ensure it's a new array instance
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
        tension: 0.1,
    };

    const defaultChartStruct = {
        labels: [...defaultLabels],
        datasets: [JSON.parse(JSON.stringify(baseDefaultDataset))], // Deep copy
    };

    let finalDataForChart;

    if (
        incomingData &&
        Array.isArray(incomingData.datasets) &&
        incomingData.datasets.length > 0
    ) {
        finalDataForChart = {
            labels: (Array.isArray(incomingData.labels) && incomingData.labels.length > 0)
                ? incomingData.labels
                : [...defaultLabels],
            datasets: incomingData.datasets.map((ds, index) => {
                const dsData = (ds && Array.isArray(ds.data)) ? ds.data : [...defaultDatasetValues];
                const baseDs = defaultChartStruct.datasets[0] || {};
                return {
                    label: (ds && ds.label !== undefined) ? ds.label : (baseDs.label || `Dataset ${index + 1}`),
                    borderColor: (ds && ds.borderColor !== undefined) ? ds.borderColor : baseDs.borderColor,
                    backgroundColor: (ds && ds.backgroundColor !== undefined) ? ds.backgroundColor : baseDs.backgroundColor,
                    fill: (ds && ds.fill !== undefined) ? ds.fill : baseDs.fill,
                    tension: (ds && ds.tension !== undefined) ? ds.tension : baseDs.tension,
                    // Spread other properties from ds, ensuring 'data' is the validated one
                    // and that ds itself is not null/undefined before spreading
                    ...(ds ? Object.fromEntries(Object.entries(ds).filter(([key]) => !['data', 'label', 'borderColor', 'backgroundColor', 'fill', 'tension'].includes(key))) : {}),
                    data: dsData,
                };
            }),
        };
    } else {
        finalDataForChart = defaultChartStruct;
    }

    if (!finalDataForChart.datasets || finalDataForChart.datasets.length === 0) {
        finalDataForChart.datasets = [JSON.parse(JSON.stringify(baseDefaultDataset))];
    }

    // Ensure every dataset in finalDataForChart has a .data array
    finalDataForChart.datasets = finalDataForChart.datasets.map(ds => {
        if (ds && Array.isArray(ds.data)) {
            return ds;
        }
        // If ds.data is missing or not an array, reconstruct this dataset safely
        const baseDs = defaultChartStruct.datasets[0] || {};
        return {
            label: (ds && ds.label !== undefined) ? ds.label : baseDs.label,
            borderColor: (ds && ds.borderColor !== undefined) ? ds.borderColor : baseDs.borderColor,
            backgroundColor: (ds && ds.backgroundColor !== undefined) ? ds.backgroundColor : baseDs.backgroundColor,
            fill: (ds && ds.fill !== undefined) ? ds.fill : baseDs.fill,
            tension: (ds && ds.tension !== undefined) ? ds.tension : baseDs.tension,
            data: [...defaultDatasetValues],
            ...(ds ? Object.fromEntries(Object.entries(ds).filter(([key]) => !['data', 'label', 'borderColor', 'backgroundColor', 'fill', 'tension'].includes(key))) : {}),
        };
    });


    const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: title || "Chart",
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            }
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Month'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Value'
                },
                beginAtZero: true
            }
        }
    };

    const chartOptions = options || defaultOptions;

    return (
        <div className="relative flex flex-col min-w-0 break-words w-full h-[300px] shadow-lg rounded bg-white">
            <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
                <div className="flex flex-wrap items-center">
                    <div className="relative w-full max-w-full flex-grow flex-1">
                        <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                            {title || 'Performance'}
                        </h6>
                        <h2 className="text-blueGray-700 text-xl font-semibold">
                            {title || 'Overview'}
                        </h2>
                    </div>
                </div>
            </div>
            <div className="p-4 flex-auto">
                {/* Chart */}
                <div className="relative h-full">
                    <Line data={finalDataForChart} options={chartOptions} />
                </div>
            </div>
        </div>
    );
};

export default FallbackLineChart;
