import React, { useState, useEffect, useRef } from "react";
import {
    MdSettings,
    MdSave,
    MdRefresh,
    MdPlayArrow,
    MdInfo,
    MdAutorenew,
    MdBuildCircle,
    MdSchool,
    MdWarning,
    MdInsights,
    MdOutlineRadar,
    MdOutlineMemory,
    MdTimeline,
    MdHelp,
    MdCheck,
    MdTune,
    MdArrowUpward,
    MdHistory,
    MdNotifications,
    MdCompareArrows,
    MdAccessTime,
    MdDateRange,
    MdPerson,
    MdCalendarToday,
    MdTrendingUp,
    MdOpenInNew
} from "react-icons/md";
import Card from "components/card";
import Switch from "components/switch";
import { useDispatch, useSelector } from "react-redux";

// Import chart libraries
import Chart from 'react-apexcharts';

const ModelConfiguration = () => {
    const dispatch = useDispatch();
    const { baseURL } = useSelector((state) => state.auth);

    // State for active tab in visualization section
    const [activeVisTab, setActiveVisTab] = useState('structure');

    // State for training history section
    const [showTrainingHistory, setShowTrainingHistory] = useState(false);
    const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);

    // Animation state
    const [isTraining, setIsTraining] = useState(false);

    // Feature importance data (dummy)
    const featureImportance = [
        { feature: "Document Structure", importance: 0.32 },
        { feature: "Format Compliance", importance: 0.27 },
        { feature: "Budget Details", importance: 0.18 },
        { feature: "Timeline Clarity", importance: 0.12 },
        { feature: "Word Count", importance: 0.07 },
        { feature: "Citation Format", importance: 0.04 }
    ];

    // Enhanced training history data (dummy)
    const trainingHistory = {
        iterations: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        accuracy: [0.78, 0.82, 0.85, 0.87, 0.89, 0.90, 0.91, 0.91, 0.92, 0.92],
        loss: [0.45, 0.39, 0.32, 0.27, 0.23, 0.21, 0.19, 0.18, 0.17, 0.17]
    };

    // Training history timeline (dummy)
    const trainingRecords = [
        {
            id: 1,
            date: "2025-04-15T14:30:00",
            model: "random_forest",
            parameters: {
                n_estimators: 100,
                max_depth: 10,
                criterion: "gini"
            },
            metrics: {
                accuracy: 0.89,
                precision: 0.87,
                recall: 0.91,
                f1_score: 0.89,
                trainingTime: "2m 12s"
            },
            trainedBy: "AI System Administrator",
            status: "active"
        },
        {
            id: 2,
            date: "2025-04-10T11:15:00",
            model: "random_forest",
            parameters: {
                n_estimators: 150,
                max_depth: 8,
                criterion: "entropy"
            },
            metrics: {
                accuracy: 0.88,
                precision: 0.86,
                recall: 0.90,
                f1_score: 0.88,
                trainingTime: "3m 24s"
            },
            trainedBy: "John Researcher",
            status: "archived"
        },
        {
            id: 3,
            date: "2025-04-05T09:45:00",
            model: "svm",
            parameters: {
                C: 1.0,
                kernel: "rbf",
                gamma: "scale"
            },
            metrics: {
                accuracy: 0.85,
                precision: 0.82,
                recall: 0.87,
                f1_score: 0.84,
                trainingTime: "1m 45s"
            },
            trainedBy: "Marie Data Scientist",
            status: "archived"
        },
        {
            id: 4,
            date: "2025-03-28T16:20:00",
            model: "random_forest",
            parameters: {
                n_estimators: 80,
                max_depth: 12,
                criterion: "gini"
            },
            metrics: {
                accuracy: 0.84,
                precision: 0.81,
                recall: 0.86,
                f1_score: 0.83,
                trainingTime: "1m 58s"
            },
            trainedBy: "System",
            status: "archived"
        },
        {
            id: 5,
            date: "2025-03-20T10:10:00",
            model: "svm",
            parameters: {
                C: 0.8,
                kernel: "linear",
                gamma: "auto"
            },
            metrics: {
                accuracy: 0.82,
                precision: 0.79,
                recall: 0.83,
                f1_score: 0.81,
                trainingTime: "1m 30s"
            },
            trainedBy: "System",
            status: "archived"
        }
    ];

    // Confusion matrix data (dummy)
    const confusionMatrix = {
        truePositive: 158,
        falsePositive: 12,
        trueNegative: 183,
        falseNegative: 20
    };

    // State for model configuration
    const [modelType, setModelType] = useState("random_forest");
    const [parameters, setParameters] = useState({
        n_estimators: 100,
        max_depth: 10,
        min_samples_split: 2,
        min_samples_leaf: 1,
        criterion: "gini",
        enableFeatureImportance: true,
        autoTune: false,
    });

    // Advanced settings toggle
    const [showAdvanced, setShowAdvanced] = useState(false);

    // Sample model performance data (dummy data)
    const modelPerformance = {
        accuracy: 0.92,
        precision: 0.89,
        recall: 0.94,
        f1_score: 0.91,
        latestTraining: "2025-04-15T10:30:00",
    };

    // Handle parameter change
    const handleParamChange = (param, value) => {
        setParameters(prev => ({
            ...prev,
            [param]: value
        }));
    };

    // Handle model type change
    const handleModelTypeChange = (type) => {
        setModelType(type);
        // Reset parameters based on model type
        if (type === "random_forest") {
            setParameters({
                n_estimators: 100,
                max_depth: 10,
                min_samples_split: 2,
                min_samples_leaf: 1,
                criterion: "gini",
                enableFeatureImportance: true,
                autoTune: false,
            });
        } else if (type === "svm") {
            setParameters({
                C: 1.0,
                kernel: "rbf",
                gamma: "scale",
                probability: true,
                enableFeatureImportance: false,
                autoTune: false,
            });
        }
    };

    // Save configuration
    const saveConfiguration = () => {
        // Would use dispatch to save configuration to backend
        console.log("Saving configuration:", { modelType, parameters });

        // Visual feedback for action
        const configButton = document.getElementById('save-config-button');
        if (configButton) {
            configButton.classList.add('animate-pulse');
            setTimeout(() => {
                configButton.classList.remove('animate-pulse');
            }, 1000);
        }
    };

    // Reset configuration
    const resetConfiguration = () => {
        if (modelType === "random_forest") {
            setParameters({
                n_estimators: 100,
                max_depth: 10,
                min_samples_split: 2,
                min_samples_leaf: 1,
                criterion: "gini",
                enableFeatureImportance: true,
                autoTune: false,
            });
        } else if (modelType === "svm") {
            setParameters({
                C: 1.0,
                kernel: "rbf",
                gamma: "scale",
                probability: true,
                enableFeatureImportance: false,
                autoTune: false,
            });
        }
    };

    // Train model with animation
    const trainModel = () => {
        setIsTraining(true);
        console.log("Training model with config:", { modelType, parameters });

        // Simulate training process
        setTimeout(() => {
            setIsTraining(false);
            // Would dispatch training action in real implementation
        }, 2500);
    };

    // SVG ref for model visualization
    const svgRef = useRef(null);

    // Effect for tree visualization rendering
    useEffect(() => {
        if (svgRef.current && modelType === "random_forest" && activeVisTab === 'structure') {
            renderTreeVisualization();
        }
    }, [modelType, parameters, activeVisTab]);

    // Model performance over time chart config (dummy)
    const performanceOverTimeChart = {
        series: [
            {
                name: 'Accuracy',
                data: trainingRecords.map(record => record.metrics.accuracy * 100).reverse()
            },
            {
                name: 'Precision',
                data: trainingRecords.map(record => record.metrics.precision * 100).reverse()
            },
            {
                name: 'Recall',
                data: trainingRecords.map(record => record.metrics.recall * 100).reverse()
            }
        ],
        options: {
            chart: {
                type: 'area',
                height: 350,
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false
                },
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 800
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 2
            },
            colors: ['#4F46E5', '#10B981', '#3B82F6'],
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.4,
                    opacityTo: 0.1,
                    stops: [0, 90, 100]
                }
            },
            grid: {
                borderColor: '#E2E8F0',
                row: {
                    colors: ['#f3f3f3', 'transparent'],
                    opacity: 0.2
                }
            },
            markers: {
                size: 4,
                hover: {
                    size: 6
                }
            },
            xaxis: {
                categories: trainingRecords.map(record => {
                    const date = new Date(record.date);
                    return `${date.getMonth() + 1}/${date.getDate()}`;
                }).reverse(),
                labels: {
                    style: {
                        colors: '#64748B'
                    }
                }
            },
            yaxis: {
                min: 75,
                max: 95,
                title: {
                    text: 'Score (%)',
                    style: {
                        color: '#64748B'
                    }
                },
                labels: {
                    formatter: function (val) {
                        return val.toFixed(0) + '%';
                    },
                    style: {
                        colors: '#64748B'
                    }
                }
            },
            tooltip: {
                shared: true,
                intersect: false,
                y: {
                    formatter: function (val) {
                        return val.toFixed(1) + '%';
                    }
                }
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right'
            }
        }
    };

    // Enhanced Feature importance chart config
    const featureImportanceChart = {
        series: [{
            name: 'Importance',
            data: featureImportance.map(item => (item.importance * 100).toFixed(1))
        }],
        options: {
            chart: {
                type: 'bar',
                toolbar: {
                    show: false
                },
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 800,
                    animateGradually: {
                        enabled: true,
                        delay: 150
                    },
                    dynamicAnimation: {
                        enabled: true,
                        speed: 350
                    }
                }
            },
            plotOptions: {
                bar: {
                    borderRadius: 6,
                    horizontal: true,
                    barHeight: '70%',
                    distributed: true,
                    dataLabels: {
                        position: 'top'
                    }
                }
            },
            colors: ['#4F46E5', '#3B82F6', '#10B981', '#06B6D4', '#8B5CF6', '#EC4899'].reverse(),
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val + '%';
                },
                offsetX: 30,
                style: {
                    fontSize: '12px',
                    colors: ['#1E293B']
                }
            },
            grid: {
                borderColor: '#E2E8F0',
                strokeDashArray: 4,
                xaxis: {
                    lines: {
                        show: true
                    }
                },
                yaxis: {
                    lines: {
                        show: false
                    }
                }
            },
            xaxis: {
                categories: featureImportance.map(item => item.feature),
                labels: {
                    style: {
                        colors: '#64748B',
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 400
                    }
                },
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: '#64748B',
                        fontSize: '12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 500
                    }
                }
            },
            tooltip: {
                shared: false,
                y: {
                    formatter: function (val) {
                        return val + '%';
                    }
                }
            },
            legend: {
                show: false
            }
        }
    };

    // Enhanced Training history chart config
    const trainingHistoryChart = {
        series: [{
            name: 'Accuracy',
            data: trainingHistory.accuracy.map(value => (value * 100).toFixed(1)),
            type: 'line'
        }, {
            name: 'Loss',
            data: trainingHistory.loss.map(value => (value * 100).toFixed(1)),
            type: 'line'
        }],
        options: {
            chart: {
                toolbar: {
                    show: false
                },
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 800
                }
            },
            stroke: {
                curve: 'smooth',
                width: [3, 3],
                dashArray: [0, 0]
            },
            colors: ['#10B981', '#EF4444'],
            fill: {
                type: ['gradient', 'gradient'],
                gradient: {
                    shade: 'dark',
                    type: "vertical",
                    shadeIntensity: 0.5,
                    gradientToColors: ['#34D399', '#F87171'],
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 0.8
                }
            },
            grid: {
                borderColor: '#E2E8F0',
                strokeDashArray: 4,
                xaxis: {
                    lines: {
                        show: true
                    }
                }
            },
            markers: {
                size: 5,
                colors: ['#10B981', '#EF4444'],
                strokeColors: '#fff',
                strokeWidth: 2,
                strokeOpacity: 0.9,
                strokeDashArray: 0,
                fillOpacity: 1,
                discrete: [],
                shape: "circle",
                radius: 2,
                hover: {
                    size: 7
                }
            },
            xaxis: {
                categories: trainingHistory.iterations,
                title: {
                    text: 'Iterations',
                    style: {
                        color: '#64748B',
                        fontSize: '13px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 500
                    }
                },
                labels: {
                    style: {
                        colors: '#64748B',
                        fontSize: '12px'
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#E2E8F0'
                }
            },
            yaxis: [
                {
                    title: {
                        text: 'Accuracy (%)',
                        style: {
                            color: '#10B981',
                            fontSize: '13px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 500
                        }
                    },
                    labels: {
                        formatter: function (val) {
                            return val.toFixed(0) + '%';
                        },
                        style: {
                            colors: '#64748B'
                        }
                    },
                    min: 70,
                    max: 100
                },
                {
                    opposite: true,
                    title: {
                        text: 'Loss (%)',
                        style: {
                            color: '#EF4444',
                            fontSize: '13px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 500
                        }
                    },
                    labels: {
                        formatter: function (val) {
                            return val.toFixed(0) + '%';
                        },
                        style: {
                            colors: '#64748B'
                        }
                    },
                    min: 0,
                    max: 50
                }
            ],
            tooltip: {
                shared: true,
                intersect: false,
                y: [{
                    formatter: function (val) {
                        return val + '%';
                    }
                }, {
                    formatter: function (val) {
                        return val + '%';
                    }
                }]
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                offsetY: -10,
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    width: 12,
                    height: 12,
                    strokeWidth: 0,
                    radius: 12,
                    offsetX: -3
                }
            }
        }
    };

    // Render tree visualization
    const renderTreeVisualization = () => {
        // Get SVG element reference
        const svg = svgRef.current;
        if (!svg) return;

        // Clear previous content
        while (svg.firstChild) {
            svg.removeChild(svg.firstChild);
        }

        // Set SVG namespace
        const svgNS = "http://www.w3.org/2000/svg";

        // Define gradient for tree nodes
        const defs = document.createElementNS(svgNS, "defs");

        // Main node gradient
        const mainGradient = document.createElementNS(svgNS, "linearGradient");
        mainGradient.setAttribute("id", "mainNodeGradient");
        mainGradient.setAttribute("x1", "0%");
        mainGradient.setAttribute("y1", "0%");
        mainGradient.setAttribute("x2", "0%");
        mainGradient.setAttribute("y2", "100%");

        const mainStop1 = document.createElementNS(svgNS, "stop");
        mainStop1.setAttribute("offset", "0%");
        mainStop1.setAttribute("stop-color", "#4338CA");

        const mainStop2 = document.createElementNS(svgNS, "stop");
        mainStop2.setAttribute("offset", "100%");
        mainStop2.setAttribute("stop-color", "#6366F1");

        mainGradient.appendChild(mainStop1);
        mainGradient.appendChild(mainStop2);
        defs.appendChild(mainGradient);

        // Tree node gradient
        const treeGradient = document.createElementNS(svgNS, "linearGradient");
        treeGradient.setAttribute("id", "treeNodeGradient");
        treeGradient.setAttribute("x1", "0%");
        treeGradient.setAttribute("y1", "0%");
        treeGradient.setAttribute("x2", "0%");
        treeGradient.setAttribute("y2", "100%");

        const treeStop1 = document.createElementNS(svgNS, "stop");
        treeStop1.setAttribute("offset", "0%");
        treeStop1.setAttribute("stop-color", "#1E40AF");

        const treeStop2 = document.createElementNS(svgNS, "stop");
        treeStop2.setAttribute("offset", "100%");
        treeStop2.setAttribute("stop-color", "#3B82F6");

        treeGradient.appendChild(treeStop1);
        treeGradient.appendChild(treeStop2);
        defs.appendChild(treeGradient);

        // Leaf node gradient
        const leafGradient = document.createElementNS(svgNS, "linearGradient");
        leafGradient.setAttribute("id", "leafNodeGradient");
        leafGradient.setAttribute("x1", "0%");
        leafGradient.setAttribute("y1", "0%");
        leafGradient.setAttribute("x2", "0%");
        leafGradient.setAttribute("y2", "100%");

        const leafStop1 = document.createElementNS(svgNS, "stop");
        leafStop1.setAttribute("offset", "0%");
        leafStop1.setAttribute("stop-color", "#047857");

        const leafStop2 = document.createElementNS(svgNS, "stop");
        leafStop2.setAttribute("offset", "100%");
        leafStop2.setAttribute("stop-color", "#10B981");

        leafGradient.appendChild(leafStop1);
        leafGradient.appendChild(leafStop2);
        defs.appendChild(leafGradient);

        svg.appendChild(defs);

        // Draw the main node with shadow
        // Create shadow filter
        const filter = document.createElementNS(svgNS, "filter");
        filter.setAttribute("id", "shadow");
        filter.setAttribute("x", "-50%");
        filter.setAttribute("y", "-50%");
        filter.setAttribute("width", "200%");
        filter.setAttribute("height", "200%");

        const feDropShadow = document.createElementNS(svgNS, "feDropShadow");
        feDropShadow.setAttribute("dx", "0");
        feDropShadow.setAttribute("dy", "1");
        feDropShadow.setAttribute("stdDeviation", "2");
        feDropShadow.setAttribute("flood-color", "rgba(0,0,0,0.3)");
        feDropShadow.setAttribute("flood-opacity", "0.3");

        filter.appendChild(feDropShadow);
        defs.appendChild(filter);

        // Create background rectangle
        const bgRect = document.createElementNS(svgNS, "rect");
        bgRect.setAttribute("width", "100%");
        bgRect.setAttribute("height", "100%");
        bgRect.setAttribute("fill", "white");
        bgRect.setAttribute("rx", "10");
        svg.appendChild(bgRect);

        // Create title and explanation
        const titleText = document.createElementNS(svgNS, "text");
        titleText.setAttribute("x", "50%");
        titleText.setAttribute("y", "20");
        titleText.setAttribute("text-anchor", "middle");
        titleText.setAttribute("font-size", "14");
        titleText.setAttribute("font-weight", "bold");
        titleText.setAttribute("fill", "#1E293B");
        titleText.textContent = "Random Forest Model Structure";
        svg.appendChild(titleText);

        // Draw the main tree node
        const mainNode = document.createElementNS(svgNS, "circle");
        mainNode.setAttribute("cx", "50%");
        mainNode.setAttribute("cy", "50");
        mainNode.setAttribute("r", "18");
        mainNode.setAttribute("fill", "url(#mainNodeGradient)");
        mainNode.setAttribute("filter", "url(#shadow)");
        svg.appendChild(mainNode);

        // Add icon to main node
        const mainText = document.createElementNS(svgNS, "text");
        mainText.setAttribute("x", "50%");
        mainText.setAttribute("y", "55");
        mainText.setAttribute("text-anchor", "middle");
        mainText.setAttribute("font-weight", "bold");
        mainText.setAttribute("font-size", "14");
        mainText.setAttribute("fill", "white");
        mainText.textContent = "RF";
        svg.appendChild(mainText);

        // Create description below main node
        const descText = document.createElementNS(svgNS, "text");
        descText.setAttribute("x", "50%");
        descText.setAttribute("y", "80");
        descText.setAttribute("text-anchor", "middle");
        descText.setAttribute("font-size", "12");
        descText.setAttribute("fill", "#64748B");
        descText.textContent = "Ensemble of " + parameters.n_estimators + " decision trees";
        svg.appendChild(descText);

        // Create child nodes based on n_estimators and max_depth
        const numTrees = Math.min(parameters.n_estimators, 7); // Limit for visualization
        const spacing = 400 / (numTrees + 1);

        // Calculate angles for a fan-like arrangement
        const angleStep = Math.PI / (numTrees + 1);
        const startAngle = Math.PI / 2 + angleStep;
        const radius = 110;

        for (let i = 1; i <= numTrees; i++) {
            const angle = startAngle + i * angleStep;
            const nodeX = (svg.clientWidth / 2) + radius * Math.cos(angle);
            const nodeY = 120 - radius * Math.sin(angle);

            // Connection line with animation
            const line = document.createElementNS(svgNS, "path");

            // Curved connection path
            line.setAttribute("d", `M ${svg.clientWidth / 2} 50 Q ${(svg.clientWidth / 2 + nodeX) / 2} ${(50 + nodeY) / 2 - 20} ${nodeX} ${nodeY}`);
            line.setAttribute("fill", "none");
            line.setAttribute("stroke", "#94A3B8");
            line.setAttribute("stroke-width", "2");
            line.setAttribute("stroke-dasharray", "1, 3");
            svg.appendChild(line);

            // Tree node
            const treeNode = document.createElementNS(svgNS, "circle");
            treeNode.setAttribute("cx", nodeX);
            treeNode.setAttribute("cy", nodeY);
            treeNode.setAttribute("r", "12");
            treeNode.setAttribute("fill", "url(#treeNodeGradient)");
            treeNode.setAttribute("filter", "url(#shadow)");
            svg.appendChild(treeNode);

            // Tree node label
            const treeLabel = document.createElementNS(svgNS, "text");
            treeLabel.setAttribute("x", nodeX);
            treeLabel.setAttribute("y", nodeY + 4);
            treeLabel.setAttribute("text-anchor", "middle");
            treeLabel.setAttribute("font-size", "10");
            treeLabel.setAttribute("fill", "white");
            treeLabel.textContent = `T${i}`;
            svg.appendChild(treeLabel);

            // Tree info
            const treeInfo = document.createElementNS(svgNS, "text");
            treeInfo.setAttribute("x", nodeX);
            treeInfo.setAttribute("y", nodeY + 30);
            treeInfo.setAttribute("text-anchor", "middle");
            treeInfo.setAttribute("font-size", "9");
            treeInfo.setAttribute("fill", "#64748B");
            treeInfo.textContent = `Depth: ${parameters.max_depth}`;
            svg.appendChild(treeInfo);

            // Draw some leaf nodes for each tree
            const depthFactor = parameters.max_depth / 15; // Scale for visualization
            const leafRadius = 6 * depthFactor;
            const leafCount = 3;
            const leafAngleStep = Math.PI / 6;
            const leafStartAngle = angle - ((leafCount - 1) / 2) * leafAngleStep;
            const leafRadius2 = 50;

            for (let j = 0; j < leafCount; j++) {
                const leafAngle = leafStartAngle + j * leafAngleStep;
                const leafX = nodeX + leafRadius2 * Math.cos(leafAngle);
                const leafY = nodeY + leafRadius2 * Math.sin(leafAngle);

                // Connection to leaf
                const branchLine = document.createElementNS(svgNS, "line");
                branchLine.setAttribute("x1", nodeX);
                branchLine.setAttribute("y1", nodeY);
                branchLine.setAttribute("x2", leafX);
                branchLine.setAttribute("y2", leafY);
                branchLine.setAttribute("stroke", "#94A3B8");
                branchLine.setAttribute("stroke-width", "1.5");
                branchLine.setAttribute("stroke-opacity", "0.6");
                svg.appendChild(branchLine);

                // Leaf node
                const leafNode = document.createElementNS(svgNS, "circle");
                leafNode.setAttribute("cx", leafX);
                leafNode.setAttribute("cy", leafY);
                leafNode.setAttribute("r", leafRadius);
                leafNode.setAttribute("fill", "url(#leafNodeGradient)");
                leafNode.setAttribute("filter", "url(#shadow)");
                leafNode.setAttribute("opacity", "0.8");
                svg.appendChild(leafNode);
            }
        }

        // Add legend
        const legendY = 240;
        const legendX = 50;

        // Legend title
        const legendTitle = document.createElementNS(svgNS, "text");
        legendTitle.setAttribute("x", legendX);
        legendTitle.setAttribute("y", legendY);
        legendTitle.setAttribute("font-size", "12");
        legendTitle.setAttribute("font-weight", "bold");
        legendTitle.setAttribute("fill", "#1E293B");
        legendTitle.textContent = "Legend:";
        svg.appendChild(legendTitle);

        // Legend item 1
        const legend1Circle = document.createElementNS(svgNS, "circle");
        legend1Circle.setAttribute("cx", legendX + 10);
        legend1Circle.setAttribute("cy", legendY + 20);
        legend1Circle.setAttribute("r", "6");
        legend1Circle.setAttribute("fill", "url(#mainNodeGradient)");
        svg.appendChild(legend1Circle);

        const legend1Text = document.createElementNS(svgNS, "text");
        legend1Text.setAttribute("x", legendX + 25);
        legend1Text.setAttribute("y", legendY + 23);
        legend1Text.setAttribute("font-size", "10");
        legend1Text.setAttribute("fill", "#64748B");
        legend1Text.textContent = "Random Forest Ensemble";
        svg.appendChild(legend1Text);

        // Legend item 2
        const legend2Circle = document.createElementNS(svgNS, "circle");
        legend2Circle.setAttribute("cx", legendX + 10);
        legend2Circle.setAttribute("cy", legendY + 40);
        legend2Circle.setAttribute("r", "6");
        legend2Circle.setAttribute("fill", "url(#treeNodeGradient)");
        svg.appendChild(legend2Circle);

        const legend2Text = document.createElementNS(svgNS, "text");
        legend2Text.setAttribute("x", legendX + 25);
        legend2Text.setAttribute("y", legendY + 43);
        legend2Text.setAttribute("font-size", "10");
        legend2Text.setAttribute("fill", "#64748B");
        legend2Text.textContent = "Decision Tree";
        svg.appendChild(legend2Text);

        // Legend item 3
        const legend3Circle = document.createElementNS(svgNS, "circle");
        legend3Circle.setAttribute("cx", legendX + 10);
        legend3Circle.setAttribute("cy", legendY + 60);
        legend3Circle.setAttribute("r", "6");
        legend3Circle.setAttribute("fill", "url(#leafNodeGradient)");
        svg.appendChild(legend3Circle);

        const legend3Text = document.createElementNS(svgNS, "text");
        legend3Text.setAttribute("x", legendX + 25);
        legend3Text.setAttribute("y", legendY + 63);
        legend3Text.setAttribute("font-size", "10");
        legend3Text.setAttribute("fill", "#64748B");
        legend3Text.textContent = "Decision Node / Leaf";
        svg.appendChild(legend3Text);

        // Parameters summary on the right
        const paramsX = svg.clientWidth - 40;
        const paramsY = legendY;

        const paramsTitle = document.createElementNS(svgNS, "text");
        paramsTitle.setAttribute("x", paramsX);
        paramsTitle.setAttribute("y", paramsY);
        paramsTitle.setAttribute("text-anchor", "end");
        paramsTitle.setAttribute("font-size", "12");
        paramsTitle.setAttribute("font-weight", "bold");
        paramsTitle.setAttribute("fill", "#1E293B");
        paramsTitle.textContent = "Current Parameters:";
        svg.appendChild(paramsTitle);

        const param1Text = document.createElementNS(svgNS, "text");
        param1Text.setAttribute("x", paramsX);
        param1Text.setAttribute("y", paramsY + 20);
        param1Text.setAttribute("text-anchor", "end");
        param1Text.setAttribute("font-size", "10");
        param1Text.setAttribute("fill", "#64748B");
        param1Text.textContent = `Trees: ${parameters.n_estimators}`;
        svg.appendChild(param1Text);

        const param2Text = document.createElementNS(svgNS, "text");
        param2Text.setAttribute("x", paramsX);
        param2Text.setAttribute("y", paramsY + 40);
        param2Text.setAttribute("text-anchor", "end");
        param2Text.setAttribute("font-size", "10");
        param2Text.setAttribute("fill", "#64748B");
        param2Text.textContent = `Max Depth: ${parameters.max_depth}`;
        svg.appendChild(param2Text);

        const param3Text = document.createElementNS(svgNS, "text");
        param3Text.setAttribute("x", paramsX);
        param3Text.setAttribute("y", paramsY + 60);
        param3Text.setAttribute("text-anchor", "end");
        param3Text.setAttribute("font-size", "10");
        param3Text.setAttribute("fill", "#64748B");
        param3Text.textContent = `Criterion: ${parameters.criterion}`;
        svg.appendChild(param3Text);

        // Copyright/Version line at bottom
        const versionText = document.createElementNS(svgNS, "text");
        versionText.setAttribute("x", "50%");
        versionText.setAttribute("y", svg.clientHeight - 10);
        versionText.setAttribute("text-anchor", "middle");
        versionText.setAttribute("font-size", "9");
        versionText.setAttribute("fill", "#94A3B8");
        versionText.textContent = `Model Version 1.0 | Last Updated: ${new Date().toLocaleDateString()}`;
        svg.appendChild(versionText);
    };

    // Render SVM visualization
    const renderSVMVisualization = () => {
        return (
            <div className="p-4 h-full w-full flex flex-col items-center justify-center">
                <div className="relative w-full h-[200px] mb-4">
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden bg-gray-100 dark:bg-navy-800 rounded-xl">
                        {/* SVM hyperplane visualization */}
                        <div className="absolute w-3/4 h-[1px] bg-red-500 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[30deg]"
                            style={{ transform: `translate(-50%, -50%) rotate(${parameters.C * 20}deg)` }}></div>

                        {/* Support vectors */}
                        <div className="absolute w-4 h-4 rounded-full bg-blue-500 border-2 border-white"
                            style={{ top: '30%', left: '25%' }}></div>
                        <div className="absolute w-4 h-4 rounded-full bg-blue-500 border-2 border-white"
                            style={{ top: '60%', left: '30%' }}></div>
                        <div className="absolute w-4 h-4 rounded-full bg-red-500 border-2 border-white"
                            style={{ top: '25%', left: '65%' }}></div>
                        <div className="absolute w-4 h-4 rounded-full bg-red-500 border-2 border-white"
                            style={{ top: '55%', left: '70%' }}></div>

                        {/* Margin lines */}
                        <div className="absolute w-3/4 h-[1px] bg-red-500/50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[30deg]"
                            style={{ transform: `translate(-50%, calc(-50% - ${parameters.C * 2}px)) rotate(${parameters.C * 20}deg)` }}></div>
                        <div className="absolute w-3/4 h-[1px] bg-red-500/50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[30deg]"
                            style={{ transform: `translate(-50%, calc(-50% + ${parameters.C * 2}px)) rotate(${parameters.C * 20}deg)` }}></div>

                        {/* Data points */}
                        {Array.from({ length: 20 }).map((_, i) => (
                            <div key={`data-point-${i}`}
                                className={`absolute w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-blue-500' : 'bg-red-500'}`}
                                style={{
                                    top: `${Math.random() * 40 + (i % 2 === 0 ? 10 : 50)}%`,
                                    left: `${Math.random() * 40 + (i % 2 === 0 ? 10 : 50)}%`
                                }}></div>
                        ))}
                    </div>
                </div>
                <div className="text-center text-sm">
                    <p className="font-medium text-navy-700 dark:text-white">SVM with {parameters.kernel} kernel</p>
                    <p className="text-gray-600 text-xs mt-1">C: {parameters.C.toFixed(1)} | Gamma: {parameters.gamma}</p>
                    <p className="text-gray-600 text-xs mt-2">
                        The hyperplane separates the data with margin influenced by the C parameter.
                        {parameters.kernel !== 'linear' && " Non-linear kernel transforms the feature space."}
                    </p>
                </div>
            </div>
        );
    };

    // Confusion matrix visualization
    const renderConfusionMatrix = () => {
        const total = confusionMatrix.truePositive + confusionMatrix.falsePositive +
            confusionMatrix.trueNegative + confusionMatrix.falseNegative;

        const accuracy = ((confusionMatrix.truePositive + confusionMatrix.trueNegative) / total).toFixed(2);

        return (
            <div className="p-4 h-full w-full flex flex-col items-center">
                <div className="grid grid-cols-2 gap-1 w-[240px] h-[240px] mb-4">
                    <div className="flex items-center justify-center bg-green-100 dark:bg-green-900/30 p-2 rounded-tl-lg border border-green-200 dark:border-green-900">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{confusionMatrix.truePositive}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">True Positive</div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center bg-amber-100 dark:bg-amber-900/30 p-2 rounded-tr-lg border border-amber-200 dark:border-amber-900">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{confusionMatrix.falsePositive}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">False Positive</div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center bg-amber-100 dark:bg-amber-900/30 p-2 rounded-bl-lg border border-amber-200 dark:border-amber-900">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">{confusionMatrix.falseNegative}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">False Negative</div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center bg-green-100 dark:bg-green-900/30 p-2 rounded-br-lg border border-green-200 dark:border-green-900">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{confusionMatrix.trueNegative}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">True Negative</div>
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-navy-700 dark:text-white font-medium">Accuracy: {accuracy}</p>
                    <p className="text-xs text-gray-600 mt-1">
                        Total samples: {total} | Correct predictions: {confusionMatrix.truePositive + confusionMatrix.trueNegative}
                    </p>
                </div>
            </div>
        );
    };

    // Function to format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    // Render training history component
    const renderTrainingHistory = () => {
        return (
            <div className="mt-5">
                <Card extra="!p-[20px] backdrop-blur-sm bg-white/80 dark:bg-navy-800/80 shadow-lg hover:shadow-xl transition-all" data-aos="fade-up" data-aos-delay="400">
                    <div className="mb-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="rounded-lg bg-purple-500/10 p-2 mr-3">
                                    <MdHistory className="h-6 w-6 text-purple-500" />
                                </div>
                                <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                                    Training History
                                </h4>
                            </div>
                            <button
                                onClick={() => setShowTrainingHistory(!showTrainingHistory)}
                                className="flex items-center text-sm font-medium text-brand-500 transition duration-200 hover:text-brand-600 active:text-brand-700"
                            >
                                {showTrainingHistory ? "Hide Details" : "Show All"} <MdOpenInNew className="ml-1 h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* Performance Over Time Chart */}
                    <div className="h-[280px] w-full rounded-xl bg-white dark:bg-navy-800 p-2 shadow-sm mb-4">
                        <Chart
                            options={performanceOverTimeChart.options}
                            series={performanceOverTimeChart.series}
                            type="area"
                            height="100%"
                        />
                    </div>

                    {/* Training History Records */}
                    {showTrainingHistory && (
                        <div className="mt-4">
                            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-navy-700">
                                <div className="bg-gray-50 dark:bg-navy-800 py-2 px-4 grid grid-cols-12 gap-2 text-xs font-medium text-gray-600 dark:text-gray-400">
                                    <div className="col-span-3">Date</div>
                                    <div className="col-span-2">Model</div>
                                    <div className="col-span-3">Metrics</div>
                                    <div className="col-span-2">Trained By</div>
                                    <div className="col-span-2">Actions</div>
                                </div>
                                <div className="divide-y divide-gray-200 dark:divide-navy-700">
                                    {trainingRecords.map((record) => (
                                        <div
                                            key={record.id}
                                            className={`grid grid-cols-12 gap-2 py-3 px-4 text-sm hover:bg-gray-50 dark:hover:bg-navy-700/50 transition-colors ${selectedHistoryItem === record.id
                                                    ? 'bg-indigo-50 dark:bg-navy-700'
                                                    : ''
                                                }`}
                                        >
                                            <div className="col-span-3 flex items-center">
                                                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${record.status === 'active'
                                                        ? 'bg-green-100 dark:bg-green-900/30'
                                                        : 'bg-gray-100 dark:bg-navy-700'
                                                    } mr-2`}>
                                                    <MdCalendarToday className={`h-4 w-4 ${record.status === 'active'
                                                            ? 'text-green-500 dark:text-green-400'
                                                            : 'text-gray-500 dark:text-gray-400'
                                                        }`} />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-navy-700 dark:text-white">{formatDate(record.date)}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {record.status === 'active' &&
                                                            <span className="inline-flex items-center text-green-600 dark:text-green-400">
                                                                <span className="mr-1 h-2 w-2 rounded-full bg-green-500"></span> Active
                                                            </span>
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-span-2 flex items-center">
                                                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${record.model === 'random_forest'
                                                        ? 'bg-indigo-100 dark:bg-indigo-900/30'
                                                        : 'bg-teal-100 dark:bg-teal-900/30'
                                                    } mr-2`}>
                                                    {record.model === 'random_forest' ? (
                                                        <MdBuildCircle className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                                    ) : (
                                                        <MdSchool className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                                                    )}
                                                </div>
                                                <p className="font-medium text-navy-700 dark:text-white">
                                                    {record.model === 'random_forest' ? 'Random Forest' : 'SVM'}
                                                </p>
                                            </div>
                                            <div className="col-span-3">
                                                <div className="grid grid-cols-2 gap-1 text-xs">
                                                    <div>
                                                        <span className="text-gray-500 dark:text-gray-400">Accuracy:</span>{' '}
                                                        <span className="font-medium text-navy-700 dark:text-white">{(record.metrics.accuracy * 100).toFixed(1)}%</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-500 dark:text-gray-400">Precision:</span>{' '}
                                                        <span className="font-medium text-navy-700 dark:text-white">{(record.metrics.precision * 100).toFixed(1)}%</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-500 dark:text-gray-400">Recall:</span>{' '}
                                                        <span className="font-medium text-navy-700 dark:text-white">{(record.metrics.recall * 100).toFixed(1)}%</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-gray-500 dark:text-gray-400">F1:</span>{' '}
                                                        <span className="font-medium text-navy-700 dark:text-white">{(record.metrics.f1_score * 100).toFixed(1)}%</span>
                                                    </div>
                                                </div>
                                                <div className="mt-1 text-xs text-gray-500">
                                                    <span className="flex items-center">
                                                        <MdAccessTime className="mr-1 h-3 w-3" />
                                                        Training time: {record.metrics.trainingTime}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="col-span-2 flex items-center">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-navy-700 mr-2">
                                                    <MdPerson className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                                </div>
                                                <p className="text-sm text-navy-700 dark:text-white">
                                                    {record.trainedBy}
                                                </p>
                                            </div>
                                            <div className="col-span-2 flex items-center space-x-2">
                                                <button
                                                    onClick={() => setSelectedHistoryItem(record.id === selectedHistoryItem ? null : record.id)}
                                                    className="rounded-lg border border-gray-200 dark:border-navy-600 px-2 py-1 text-xs font-medium text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors"
                                                >
                                                    {record.id === selectedHistoryItem ? 'Hide Details' : 'View Details'}
                                                </button>
                                                {record.status !== 'active' && (
                                                    <button className="rounded-lg bg-brand-50 dark:bg-brand-900/20 px-2 py-1 text-xs font-medium text-brand-500 dark:text-brand-400 hover:bg-brand-100 dark:hover:bg-brand-900/30 transition-colors">
                                                        Restore
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Selected Model Details */}
                            {selectedHistoryItem && (
                                <div className="mt-4 rounded-xl border border-gray-200 dark:border-navy-700 p-4 bg-white dark:bg-navy-800">
                                    <h5 className="font-medium text-navy-700 dark:text-white mb-3">
                                        Model Configuration Details
                                    </h5>

                                    {(() => {
                                        const record = trainingRecords.find(r => r.id === selectedHistoryItem);
                                        if (!record) return null;

                                        return (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Parameters</h6>
                                                    <div className="space-y-2 text-sm">
                                                        {record.model === 'random_forest' ? (
                                                            <>
                                                                <div className="flex justify-between">
                                                                    <span className="text-gray-500">Number of Estimators:</span>
                                                                    <span className="font-medium text-navy-700 dark:text-white">{record.parameters.n_estimators}</span>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <span className="text-gray-500">Max Depth:</span>
                                                                    <span className="font-medium text-navy-700 dark:text-white">{record.parameters.max_depth}</span>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <span className="text-gray-500">Criterion:</span>
                                                                    <span className="font-medium text-navy-700 dark:text-white">{record.parameters.criterion}</span>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="flex justify-between">
                                                                    <span className="text-gray-500">C Parameter:</span>
                                                                    <span className="font-medium text-navy-700 dark:text-white">{record.parameters.C}</span>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <span className="text-gray-500">Kernel:</span>
                                                                    <span className="font-medium text-navy-700 dark:text-white">{record.parameters.kernel}</span>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <span className="text-gray-500">Gamma:</span>
                                                                    <span className="font-medium text-navy-700 dark:text-white">{record.parameters.gamma}</span>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>

                                                <div>
                                                    <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Performance</h6>
                                                    <div className="space-y-3">
                                                        <div>
                                                            <div className="flex justify-between mb-1">
                                                                <span className="text-xs text-gray-500">Accuracy</span>
                                                                <span className="text-xs text-gray-700 dark:text-gray-300">{(record.metrics.accuracy * 100).toFixed(1)}%</span>
                                                            </div>
                                                            <div className="h-1.5 w-full bg-gray-200 dark:bg-navy-600 rounded-full overflow-hidden">
                                                                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${record.metrics.accuracy * 100}%` }}></div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="flex justify-between mb-1">
                                                                <span className="text-xs text-gray-500">Precision</span>
                                                                <span className="text-xs text-gray-700 dark:text-gray-300">{(record.metrics.precision * 100).toFixed(1)}%</span>
                                                            </div>
                                                            <div className="h-1.5 w-full bg-gray-200 dark:bg-navy-600 rounded-full overflow-hidden">
                                                                <div className="h-full bg-green-500 rounded-full" style={{ width: `${record.metrics.precision * 100}%` }}></div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="flex justify-between mb-1">
                                                                <span className="text-xs text-gray-500">Recall</span>
                                                                <span className="text-xs text-gray-700 dark:text-gray-300">{(record.metrics.recall * 100).toFixed(1)}%</span>
                                                            </div>
                                                            <div className="h-1.5 w-full bg-gray-200 dark:bg-navy-600 rounded-full overflow-hidden">
                                                                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${record.metrics.recall * 100}%` }}></div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="flex justify-between mb-1">
                                                                <span className="text-xs text-gray-500">F1 Score</span>
                                                                <span className="text-xs text-gray-700 dark:text-gray-300">{(record.metrics.f1_score * 100).toFixed(1)}%</span>
                                                            </div>
                                                            <div className="h-1.5 w-full bg-gray-200 dark:bg-navy-600 rounded-full overflow-hidden">
                                                                <div className="h-full bg-purple-500 rounded-full" style={{ width: `${record.metrics.f1_score * 100}%` }}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })()}

                                    <div className="mt-4 flex justify-end space-x-3">
                                        <button
                                            onClick={() => setSelectedHistoryItem(null)}
                                            className="flex items-center rounded-lg border border-gray-200 dark:border-navy-600 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors"
                                        >
                                            Close
                                        </button>
                                        <button className="flex items-center rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-600 transition-colors">
                                            <MdCompareArrows className="mr-1 h-4 w-4" />
                                            Compare with Current
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </Card>
            </div>
        );
    };

    return (
        <>
            <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-12">
                {/* Model Selection */}
                <div className="col-span-12 xl:col-span-4" data-aos="fade-up" data-aos-delay="100">
                    <Card extra="!p-[20px] h-full backdrop-blur-sm bg-white/80 dark:bg-navy-800/80 shadow-lg hover:shadow-xl transition-all">
                        <div className="mb-6 w-full">
                            <div className="flex items-center">
                                <div className="rounded-lg bg-brand-500/10 p-2 mr-3">
                                    <MdOutlineMemory className="h-6 w-6 text-brand-500" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                                        Model Selection
                                    </h4>
                                    <p className="mt-1 text-base text-gray-600">
                                        Choose the machine learning model for proposal validation
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-col gap-4">
                            <div
                                onClick={() => handleModelTypeChange("random_forest")}
                                className={`flex cursor-pointer items-center rounded-xl p-4 transition-all duration-300 hover:bg-navy-50 dark:hover:bg-navy-800 border ${modelType === "random_forest"
                                    ? "border-indigo-200 bg-indigo-50/50 dark:border-indigo-900 dark:bg-indigo-900/20"
                                    : "border-transparent"
                                    }`}
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                                    <MdBuildCircle className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <div className="ml-4 flex-1">
                                    <p className="text-base font-medium text-navy-700 dark:text-white">Random Forest</p>
                                    <p className="text-sm text-gray-600">Ensemble learning method using multiple decision trees</p>
                                </div>
                                <div className="ml-auto">
                                    <div className={`h-6 w-6 rounded-full border-2 transition-all duration-300 ${modelType === "random_forest"
                                        ? "border-indigo-600 bg-indigo-600 scale-110"
                                        : "border-gray-300"
                                        }`}>
                                        {modelType === "random_forest" && (
                                            <div className="flex h-full items-center justify-center">
                                                <MdCheck className="h-4 w-4 text-white" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div
                                onClick={() => handleModelTypeChange("svm")}
                                className={`flex cursor-pointer items-center rounded-xl p-4 transition-all duration-300 hover:bg-navy-50 dark:hover:bg-navy-800 border ${modelType === "svm"
                                    ? "border-teal-200 bg-teal-50/50 dark:border-teal-900 dark:bg-teal-900/20"
                                    : "border-transparent"
                                    }`}
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 dark:bg-teal-900">
                                    <MdSchool className="h-7 w-7 text-teal-600 dark:text-teal-400" />
                                </div>
                                <div className="ml-4 flex-1">
                                    <p className="text-base font-medium text-navy-700 dark:text-white">Support Vector Machine</p>
                                    <p className="text-sm text-gray-600">Supervised learning for classification and regression</p>
                                </div>
                                <div className="ml-auto">
                                    <div className={`h-6 w-6 rounded-full border-2 transition-all duration-300 ${modelType === "svm"
                                        ? "border-teal-600 bg-teal-600 scale-110"
                                        : "border-gray-300"
                                        }`}>
                                        {modelType === "svm" && (
                                            <div className="flex h-full items-center justify-center">
                                                <MdCheck className="h-4 w-4 text-white" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <div className="flex items-center">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500/10">
                                    <MdInfo className="h-5 w-5 text-brand-500" />
                                </div>
                                <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                                    Current Model Performance
                                </p>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-3">
                                <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 p-3 dark:from-navy-700 dark:to-navy-800 shadow-sm">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Accuracy</p>
                                    <div className="mt-1 flex items-end">
                                        <p className="text-xl font-bold text-navy-700 dark:text-white">{(modelPerformance.accuracy * 100).toFixed(0)}%</p>
                                        <MdArrowUpward className="ml-2 h-4 w-4 text-green-500" />
                                    </div>
                                    <div className="mt-1 h-1 w-full bg-gray-200 dark:bg-navy-600 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${modelPerformance.accuracy * 100}%` }}></div>
                                    </div>
                                </div>
                                <div className="rounded-xl bg-gradient-to-br from-teal-50 to-green-50 p-3 dark:from-navy-700 dark:to-navy-800 shadow-sm">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Precision</p>
                                    <div className="mt-1 flex items-end">
                                        <p className="text-xl font-bold text-navy-700 dark:text-white">{(modelPerformance.precision * 100).toFixed(0)}%</p>
                                        <MdArrowUpward className="ml-2 h-4 w-4 text-green-500" />
                                    </div>
                                    <div className="mt-1 h-1 w-full bg-gray-200 dark:bg-navy-600 rounded-full overflow-hidden">
                                        <div className="h-full bg-teal-500 rounded-full" style={{ width: `${modelPerformance.precision * 100}%` }}></div>
                                    </div>
                                </div>
                                <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-3 dark:from-navy-700 dark:to-navy-800 shadow-sm">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Recall</p>
                                    <div className="mt-1 flex items-end">
                                        <p className="text-xl font-bold text-navy-700 dark:text-white">{(modelPerformance.recall * 100).toFixed(0)}%</p>
                                        <MdArrowUpward className="ml-2 h-4 w-4 text-green-500" />
                                    </div>
                                    <div className="mt-1 h-1 w-full bg-gray-200 dark:bg-navy-600 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${modelPerformance.recall * 100}%` }}></div>
                                    </div>
                                </div>
                                <div className="rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 p-3 dark:from-navy-700 dark:to-navy-800 shadow-sm">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">F1 Score</p>
                                    <div className="mt-1 flex items-end">
                                        <p className="text-xl font-bold text-navy-700 dark:text-white">{(modelPerformance.f1_score * 100).toFixed(0)}%</p>
                                        <MdArrowUpward className="ml-2 h-4 w-4 text-green-500" />
                                    </div>
                                    <div className="mt-1 h-1 w-full bg-gray-200 dark:bg-navy-600 rounded-full overflow-hidden">
                                        <div className="h-full bg-purple-500 rounded-full" style={{ width: `${modelPerformance.f1_score * 100}%` }}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-navy-700 bg-gray-50 dark:bg-navy-800/50">
                                <div className="flex items-center">
                                    <MdTimeline className="h-5 w-5 text-brand-500" />
                                    <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                        Last trained
                                    </p>
                                </div>
                                <p className="text-sm font-medium text-navy-700 dark:text-white">
                                    {new Date(modelPerformance.latestTraining).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Parameters Configuration */}
                <div className="col-span-12 xl:col-span-8" data-aos="fade-up" data-aos-delay="200">
                    <Card extra="!p-[20px] backdrop-blur-sm bg-white/80 dark:bg-navy-800/80 shadow-lg hover:shadow-xl transition-all">
                        <div className="mb-6 flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="rounded-lg bg-brand-500/10 p-2 mr-3">
                                    <MdTune className="h-6 w-6 text-brand-500" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                                        Model Parameters
                                    </h4>
                                    <p className="mt-1 text-base text-gray-600">
                                        Configure {modelType === "random_forest" ? "Random Forest" : "Support Vector Machine"} parameters
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowAdvanced(!showAdvanced)}
                                className={`flex items-center rounded-lg px-4 py-2 text-base font-medium transition duration-200 ${showAdvanced
                                    ? "bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700"
                                    : "bg-lightPrimary text-brand-500 hover:bg-gray-200 active:bg-gray-300 dark:bg-navy-700 dark:hover:bg-navy-600 dark:active:bg-navy-500"
                                    }`}
                            >
                                <MdSettings className="mr-2 h-5 w-5" />
                                {showAdvanced ? "Hide Advanced" : "Show Advanced"}
                            </button>
                        </div>

                        <div className="mt-4 w-full">
                            {modelType === "random_forest" ? (
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                    <div className="flex flex-col rounded-xl border border-gray-200 dark:border-navy-700 p-4 bg-white dark:bg-navy-800">
                                        <label className="mb-2 text-sm font-medium text-navy-700 dark:text-white">
                                            Number of Estimators
                                        </label>
                                        <div className="flex items-center">
                                            <input
                                                type="range"
                                                min="10"
                                                max="500"
                                                step="10"
                                                value={parameters.n_estimators}
                                                onChange={(e) => handleParamChange("n_estimators", parseInt(e.target.value))}
                                                className="w-full accent-brand-500"
                                            />
                                            <div className="ml-3 min-w-[60px] rounded-md bg-gray-100 dark:bg-navy-700 px-2 py-1 text-center">
                                                <span className="text-sm font-medium text-navy-700 dark:text-white">
                                                    {parameters.n_estimators}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="mt-2 text-xs text-gray-600 flex items-center">
                                            <MdHelp className="mr-1 h-3 w-3" />
                                            Number of trees in the forest
                                        </p>
                                    </div>

                                    <div className="flex flex-col rounded-xl border border-gray-200 dark:border-navy-700 p-4 bg-white dark:bg-navy-800">
                                        <label className="mb-2 text-sm font-medium text-navy-700 dark:text-white">
                                            Max Depth
                                        </label>
                                        <div className="flex items-center">
                                            <input
                                                type="range"
                                                min="1"
                                                max="50"
                                                step="1"
                                                value={parameters.max_depth}
                                                onChange={(e) => handleParamChange("max_depth", parseInt(e.target.value))}
                                                className="w-full accent-brand-500"
                                            />
                                            <div className="ml-3 min-w-[60px] rounded-md bg-gray-100 dark:bg-navy-700 px-2 py-1 text-center">
                                                <span className="text-sm font-medium text-navy-700 dark:text-white">
                                                    {parameters.max_depth}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="mt-2 text-xs text-gray-600 flex items-center">
                                            <MdHelp className="mr-1 h-3 w-3" />
                                            Maximum depth of the tree
                                        </p>
                                    </div>

                                    <div className="flex flex-col rounded-xl border border-gray-200 dark:border-navy-700 p-4 bg-white dark:bg-navy-800">
                                        <label className="mb-2 text-sm font-medium text-navy-700 dark:text-white">
                                            Criterion
                                        </label>
                                        <select
                                            value={parameters.criterion}
                                            onChange={(e) => handleParamChange("criterion", e.target.value)}
                                            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-brand-500 dark:border-gray-600 dark:bg-navy-700"
                                        >
                                            <option value="gini">Gini Impurity</option>
                                            <option value="entropy">Entropy</option>
                                        </select>
                                        <p className="mt-2 text-xs text-gray-600 flex items-center">
                                            <MdHelp className="mr-1 h-3 w-3" />
                                            Function to measure the quality of a split
                                        </p>
                                    </div>

                                    {showAdvanced && (
                                        <>
                                            <div className="flex flex-col rounded-xl border border-gray-200 dark:border-navy-700 p-4 bg-white dark:bg-navy-800">
                                                <label className="mb-2 text-sm font-medium text-navy-700 dark:text-white">
                                                    Min Samples Split
                                                </label>
                                                <div className="flex items-center">
                                                    <input
                                                        type="range"
                                                        min="2"
                                                        max="20"
                                                        step="1"
                                                        value={parameters.min_samples_split}
                                                        onChange={(e) => handleParamChange("min_samples_split", parseInt(e.target.value))}
                                                        className="w-full accent-brand-500"
                                                    />
                                                    <div className="ml-3 min-w-[60px] rounded-md bg-gray-100 dark:bg-navy-700 px-2 py-1 text-center">
                                                        <span className="text-sm font-medium text-navy-700 dark:text-white">
                                                            {parameters.min_samples_split}
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className="mt-2 text-xs text-gray-600 flex items-center">
                                                    <MdHelp className="mr-1 h-3 w-3" />
                                                    Minimum samples required to split a node
                                                </p>
                                            </div>

                                            <div className="flex flex-col rounded-xl border border-gray-200 dark:border-navy-700 p-4 bg-white dark:bg-navy-800">
                                                <label className="mb-2 text-sm font-medium text-navy-700 dark:text-white">
                                                    Min Samples Leaf
                                                </label>
                                                <div className="flex items-center">
                                                    <input
                                                        type="range"
                                                        min="1"
                                                        max="10"
                                                        step="1"
                                                        value={parameters.min_samples_leaf}
                                                        onChange={(e) => handleParamChange("min_samples_leaf", parseInt(e.target.value))}
                                                        className="w-full accent-brand-500"
                                                    />
                                                    <div className="ml-3 min-w-[60px] rounded-md bg-gray-100 dark:bg-navy-700 px-2 py-1 text-center">
                                                        <span className="text-sm font-medium text-navy-700 dark:text-white">
                                                            {parameters.min_samples_leaf}
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className="mt-2 text-xs text-gray-600 flex items-center">
                                                    <MdHelp className="mr-1 h-3 w-3" />
                                                    Minimum samples required at a leaf node
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                    <div className="flex flex-col rounded-xl border border-gray-200 dark:border-navy-700 p-4 bg-white dark:bg-navy-800">
                                        <label className="mb-2 text-sm font-medium text-navy-700 dark:text-white">
                                            C (Regularization)
                                        </label>
                                        <div className="flex items-center">
                                            <input
                                                type="range"
                                                min="0.1"
                                                max="10"
                                                step="0.1"
                                                value={parameters.C}
                                                onChange={(e) => handleParamChange("C", parseFloat(e.target.value))}
                                                className="w-full accent-brand-500"
                                            />
                                            <div className="ml-3 min-w-[60px] rounded-md bg-gray-100 dark:bg-navy-700 px-2 py-1 text-center">
                                                <span className="text-sm font-medium text-navy-700 dark:text-white">
                                                    {parameters.C.toFixed(1)}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="mt-2 text-xs text-gray-600 flex items-center">
                                            <MdHelp className="mr-1 h-3 w-3" />
                                            Regularization parameter
                                        </p>
                                    </div>

                                    <div className="flex flex-col rounded-xl border border-gray-200 dark:border-navy-700 p-4 bg-white dark:bg-navy-800">
                                        <label className="mb-2 text-sm font-medium text-navy-700 dark:text-white">
                                            Kernel
                                        </label>
                                        <select
                                            value={parameters.kernel}
                                            onChange={(e) => handleParamChange("kernel", e.target.value)}
                                            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-brand-500 dark:border-gray-600 dark:bg-navy-700"
                                        >
                                            <option value="rbf">RBF</option>
                                            <option value="linear">Linear</option>
                                            <option value="poly">Polynomial</option>
                                            <option value="sigmoid">Sigmoid</option>
                                        </select>
                                        <p className="mt-2 text-xs text-gray-600 flex items-center">
                                            <MdHelp className="mr-1 h-3 w-3" />
                                            Kernel type to be used in the algorithm
                                        </p>
                                    </div>

                                    {showAdvanced && (
                                        <>
                                            <div className="flex flex-col rounded-xl border border-gray-200 dark:border-navy-700 p-4 bg-white dark:bg-navy-800">
                                                <label className="mb-2 text-sm font-medium text-navy-700 dark:text-white">
                                                    Gamma
                                                </label>
                                                <select
                                                    value={parameters.gamma}
                                                    onChange={(e) => handleParamChange("gamma", e.target.value)}
                                                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-brand-500 dark:border-gray-600 dark:bg-navy-700"
                                                >
                                                    <option value="scale">Scale</option>
                                                    <option value="auto">Auto</option>
                                                </select>
                                                <p className="mt-2 text-xs text-gray-600 flex items-center">
                                                    <MdHelp className="mr-1 h-3 w-3" />
                                                    Kernel coefficient for 'rbf', 'poly' and 'sigmoid'
                                                </p>
                                            </div>

                                            <div className="flex flex-col rounded-xl border border-gray-200 dark:border-navy-700 p-4 bg-white dark:bg-navy-800">
                                                <label className="mb-2 text-sm font-medium text-navy-700 dark:text-white">
                                                    Probability
                                                </label>
                                                <div className="flex items-center">
                                                    <Switch
                                                        checked={parameters.probability}
                                                        onChange={(value) => handleParamChange("probability", value)}
                                                    />
                                                    <span className="ml-2 text-sm text-navy-700 dark:text-white">
                                                        {parameters.probability ? "Enabled" : "Disabled"}
                                                    </span>
                                                </div>
                                                <p className="mt-2 text-xs text-gray-600 flex items-center">
                                                    <MdHelp className="mr-1 h-3 w-3" />
                                                    Enable probability estimates
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}

                            <div className="mt-6 grid grid-cols-1 gap-4 border-t border-gray-200 pt-6 dark:border-gray-700 md:grid-cols-2">
                                <div className="flex items-center rounded-xl border border-gray-200 dark:border-navy-700 p-4 bg-white dark:bg-navy-800">
                                    <Switch
                                        checked={parameters.enableFeatureImportance}
                                        onChange={(value) => handleParamChange("enableFeatureImportance", value)}
                                    />
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-navy-700 dark:text-white">
                                            Feature Importance Analysis
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            Calculate and display feature importance metrics
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center rounded-xl border border-gray-200 dark:border-navy-700 p-4 bg-white dark:bg-navy-800">
                                    <Switch
                                        checked={parameters.autoTune}
                                        onChange={(value) => handleParamChange("autoTune", value)}
                                    />
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-navy-700 dark:text-white">
                                            Auto-tune Parameters
                                        </p>
                                        <p className="text-xs text-gray-600">
                                            Automatically optimize parameters using grid search
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-wrap justify-end gap-3">
                                <button
                                    onClick={resetConfiguration}
                                    className="flex items-center justify-center rounded-lg bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-700 transition duration-200 hover:bg-gray-200 active:bg-gray-300 dark:bg-navy-700 dark:text-white dark:hover:bg-navy-600 dark:active:bg-navy-500"
                                >
                                    <MdRefresh className="mr-2 h-5 w-5" />
                                    Reset
                                </button>

                                <button
                                    id="save-config-button"
                                    onClick={saveConfiguration}
                                    className="flex items-center justify-center rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700"
                                >
                                    <MdSave className="mr-2 h-5 w-5" />
                                    Save Configuration
                                </button>

                                <button
                                    onClick={trainModel}
                                    disabled={isTraining}
                                    className={`flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white transition duration-200 ${isTraining
                                        ? "bg-green-400 cursor-wait"
                                        : "bg-green-500 hover:bg-green-600 active:bg-green-700"
                                        }`}
                                >
                                    {isTraining ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Training...
                                        </>
                                    ) : (
                                        <>
                                            <MdPlayArrow className="mr-2 h-5 w-5" />
                                            Train Model
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </Card>

                    {/* Enhanced Model Visualization */}
                    <Card extra="!p-[20px] mt-5 backdrop-blur-sm bg-white/80 dark:bg-navy-800/80 shadow-lg hover:shadow-xl transition-all" data-aos="fade-up" data-aos-delay="300">
                        <div className="mb-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="rounded-lg bg-brand-500/10 p-2 mr-3">
                                        <MdInsights className="h-6 w-6 text-brand-500" />
                                    </div>
                                    <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                                        Model Visualization
                                    </h4>
                                </div>
                                <div className="flex items-center text-xs text-amber-500 rounded-full bg-amber-100 dark:bg-amber-900/30 px-2 py-1">
                                    <MdWarning className="h-4 w-4 mr-1" />
                                    Interactive visualization demo
                                </div>
                            </div>

                            {/* Visualization tabs */}
                            <div className="mt-4 flex flex-wrap border-b border-gray-200 dark:border-navy-700">
                                <button
                                    onClick={() => setActiveVisTab('structure')}
                                    className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 transition-all ${activeVisTab === 'structure'
                                            ? 'border-brand-500 text-brand-500'
                                            : 'border-transparent text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
                                        }`}
                                >
                                    <MdOutlineMemory className="mr-2 h-4 w-4" />
                                    Model Structure
                                </button>
                                <button
                                    onClick={() => setActiveVisTab('feature')}
                                    className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 transition-all ${activeVisTab === 'feature'
                                            ? 'border-brand-500 text-brand-500'
                                            : 'border-transparent text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
                                        }`}
                                >
                                    <MdOutlineRadar className="mr-2 h-4 w-4" />
                                    Feature Importance
                                </button>
                                <button
                                    onClick={() => setActiveVisTab('confusion')}
                                    className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 transition-all ${activeVisTab === 'confusion'
                                            ? 'border-brand-500 text-brand-500'
                                            : 'border-transparent text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
                                        }`}
                                >
                                    <MdInsights className="mr-2 h-4 w-4" />
                                    Confusion Matrix
                                </button>
                                <button
                                    onClick={() => setActiveVisTab('training')}
                                    className={`flex items-center px-4 py-2 text-sm font-medium border-b-2 transition-all ${activeVisTab === 'training'
                                            ? 'border-brand-500 text-brand-500'
                                            : 'border-transparent text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
                                        }`}
                                >
                                    <MdTimeline className="mr-2 h-4 w-4" />
                                    Training Progress
                                </button>
                            </div>
                        </div>

                        <div className="h-[350px] w-full rounded-xl bg-white dark:bg-navy-800 p-2 shadow-sm">
                            {activeVisTab === 'structure' && (
                                <div className="h-full w-full">
                                    {modelType === "random_forest" ? (
                                        <svg ref={svgRef} width="100%" height="100%" className="overflow-visible"></svg>
                                    ) : (
                                        renderSVMVisualization()
                                    )}
                                </div>
                            )}

                            {activeVisTab === 'feature' && (
                                <div className="h-full w-full">
                                    <div className="p-2 h-full">
                                        <Chart
                                            options={featureImportanceChart.options}
                                            series={featureImportanceChart.series}
                                            type="bar"
                                            height="100%"
                                        />
                                    </div>
                                </div>
                            )}

                            {activeVisTab === 'confusion' && (
                                <div className="h-full w-full">
                                    {renderConfusionMatrix()}
                                </div>
                            )}

                            {activeVisTab === 'training' && (
                                <div className="h-full w-full">
                                    <div className="p-2 h-full">
                                        <Chart
                                            options={trainingHistoryChart.options}
                                            series={trainingHistoryChart.series}
                                            type="line"
                                            height="100%"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-4 flex justify-between items-center text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
                            <div className="flex items-center">
                                <MdInfo className="h-4 w-4 mr-1 text-brand-500" />
                                {activeVisTab === 'structure' && "Visual representation of model architecture and components"}
                                {activeVisTab === 'feature' && "Relative importance of each feature in the prediction algorithm"}
                                {activeVisTab === 'confusion' && "Evaluation of model prediction accuracy categorized by outcome type"}
                                {activeVisTab === 'training' && "Convergence metrics during the model training process"}
                            </div>
                            <div className="flex items-center">
                                <MdNotifications className="h-4 w-4 mr-1 text-amber-500" />
                                <p className="text-xs italic">
                                    Last updated: {new Date().toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Training History Section */}
            {renderTrainingHistory()}
        </>
    );
};

export default ModelConfiguration;
