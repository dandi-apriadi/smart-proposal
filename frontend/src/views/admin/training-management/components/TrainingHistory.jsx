import React, { useState, useEffect } from "react";
import {
    MdCalendarToday,
    MdFilterList,
    MdSearch,
    MdTrendingUp,
    MdHistory,
    MdCheckCircle,
    MdError,
    MdWarning,
    MdRefresh,
    MdInfo,
    MdExpandMore,
    MdExpandLess,
    MdAccessTime,
    MdCode,
    MdStorage,
    MdLoop,
    MdPerson,
    MdFileDownload,
    MdAssessment,
    MdMemory,
    MdLightbulbOutline,
    MdSettings,
    MdShowChart
} from "react-icons/md";
import Card from "components/card";
import LineChart from "components/charts/LineChart";
import BarChart from "components/charts/BarChart";

const TrainingHistory = () => {
    const [trainingData, setTrainingData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    // Changed from object to single string ID
    const [expandedItemId, setExpandedItemId] = useState("");
    const [loading, setLoading] = useState(true);

    // Dummy data for initial display
    const dummyTrainingData = [
        {
            id: "tr-001",
            modelName: "Proposal Format Validator v1.2",
            algorithm: "Random Forest",
            startDate: "2025-04-10T08:30:00Z",
            endDate: "2025-04-10T10:45:00Z",
            duration: "2h 15m",
            status: "success",
            accuracy: 0.92,
            precision: 0.89,
            recall: 0.94,
            f1Score: 0.91,
            datasetSize: 1250,
            featureCount: 28,
            iterations: 100,
            trainedBy: "System Admin",
            metrics: {
                accuracyHistory: [0.78, 0.82, 0.85, 0.88, 0.90, 0.91, 0.92],
                lossHistory: [0.42, 0.38, 0.32, 0.26, 0.20, 0.18, 0.17]
            }
        },
        {
            id: "tr-002",
            modelName: "Document Format Classifier v2.0",
            algorithm: "Random Forest",
            startDate: "2025-04-05T14:15:00Z",
            endDate: "2025-04-05T16:30:00Z",
            duration: "2h 15m",
            status: "success",
            accuracy: 0.88,
            precision: 0.86,
            recall: 0.91,
            f1Score: 0.88,
            datasetSize: 980,
            featureCount: 24,
            iterations: 80,
            trainedBy: "AI System",
            metrics: {
                accuracyHistory: [0.75, 0.79, 0.82, 0.85, 0.87, 0.88],
                lossHistory: [0.45, 0.40, 0.35, 0.30, 0.25, 0.23]
            }
        },
        {
            id: "tr-003",
            modelName: "Proposal Completeness Checker v1.0",
            algorithm: "Random Forest",
            startDate: "2025-03-28T09:00:00Z",
            endDate: "2025-03-28T11:30:00Z",
            duration: "2h 30m",
            status: "warning",
            accuracy: 0.74,
            precision: 0.72,
            recall: 0.78,
            f1Score: 0.75,
            datasetSize: 850,
            featureCount: 22,
            iterations: 60,
            trainedBy: "Data Scientist",
            metrics: {
                accuracyHistory: [0.65, 0.68, 0.70, 0.72, 0.74],
                lossHistory: [0.55, 0.48, 0.43, 0.40, 0.38]
            }
        },
        {
            id: "tr-004",
            modelName: "Administrative Requirements Validator v1.5",
            algorithm: "Random Forest",
            startDate: "2025-03-20T13:45:00Z",
            endDate: "2025-03-20T14:30:00Z",
            duration: "0h 45m",
            status: "error",
            accuracy: 0.62,
            precision: 0.58,
            recall: 0.67,
            f1Score: 0.62,
            datasetSize: 500,
            featureCount: 18,
            iterations: 40,
            trainedBy: "System Admin",
            metrics: {
                accuracyHistory: [0.55, 0.58, 0.60, 0.62],
                lossHistory: [0.65, 0.60, 0.58, 0.57]
            },
            errorMessage: "Insufficient training data for expected accuracy"
        },
        {
            id: "tr-005",
            modelName: "Proposal Format Validator v1.1",
            algorithm: "Random Forest",
            startDate: "2025-03-15T10:00:00Z",
            endDate: "2025-03-15T12:15:00Z",
            duration: "2h 15m",
            status: "success",
            accuracy: 0.87,
            precision: 0.85,
            recall: 0.89,
            f1Score: 0.87,
            datasetSize: 1100,
            featureCount: 26,
            iterations: 90,
            trainedBy: "AI System",
            metrics: {
                accuracyHistory: [0.75, 0.80, 0.83, 0.85, 0.87],
                lossHistory: [0.45, 0.38, 0.32, 0.28, 0.25]
            }
        }
    ];

    useEffect(() => {
        // Simulating API call
        setTimeout(() => {
            setTrainingData(dummyTrainingData);
            setFilteredData(dummyTrainingData);
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        // Filter data based on search term and status filter
        const filtered = trainingData.filter(item => {
            const matchesSearch = item.modelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.algorithm.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = filterStatus === "all" || item.status === filterStatus;
            return matchesSearch && matchesStatus;
        });
        setFilteredData(filtered);
    }, [searchTerm, filterStatus, trainingData]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (status) => {
        setFilterStatus(status);
    };

    // Modified toggle function to handle only one expanded item
    const toggleExpand = (id) => {
        // If the clicked item is already expanded, close it
        // Otherwise, expand the clicked item (which automatically closes any other)
        setExpandedItemId(expandedItemId === id ? "" : id);
    };

    // Helper function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Enhanced StatusBadge component with more distinct visual styling
    const StatusBadge = ({ status }) => {
        const statusConfig = {
            success: {
                color: "from-green-500 to-green-600",
                icon: <MdCheckCircle className="w-4 h-4 mr-1" />,
                glow: "shadow-green-300",
                ringColor: "ring-green-500"
            },
            warning: {
                color: "from-amber-500 to-orange-600",
                icon: <MdWarning className="w-4 h-4 mr-1" />,
                glow: "shadow-amber-300",
                ringColor: "ring-amber-500"
            },
            error: {
                color: "from-pink-500 to-red-600",
                icon: <MdError className="w-4 h-4 mr-1" />,
                glow: "shadow-pink-300",
                ringColor: "ring-pink-500"
            },
        };

        const config = statusConfig[status] || statusConfig.warning;

        return (
            <span className={`flex items-center px-3 py-1 rounded-full text-xs font-medium shadow-md bg-gradient-to-r ${config.color} text-white ${config.glow} transition-all duration-300 ring-2 ring-offset-2 dark:ring-offset-navy-800 ${config.ringColor}`}>
                {config.icon}
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    // Modern metric card component with gradient icons
    const MetricCard = ({ label, value, icon, color, bgColor }) => {
        return (
            <div className="relative overflow-hidden backdrop-blur-sm bg-white/80 dark:bg-navy-700/90 rounded-xl border border-gray-100/50 dark:border-navy-600/50 hover:shadow-lg transition-all duration-300 group">
                <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-10 bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-600 dark:to-gray-800 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="p-4 relative">
                    <div className="flex items-center mb-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${color} text-white mr-3 shadow-md`}>
                            {icon}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">{label}</p>
                    </div>
                    <p className="text-2xl font-extrabold text-navy-700 dark:text-white tracking-tight">{value}</p>
                </div>
            </div>
        );
    };

    // Data tag component for training info
    const DataTag = ({ icon, text, color }) => (
        <div className="flex items-center text-xs rounded-full px-3 py-1.5 bg-gray-50 dark:bg-navy-800 border border-gray-100 dark:border-navy-700">
            <div className={`p-1 rounded-md ${color} mr-1.5`}>
                {icon}
            </div>
            {text}
        </div>
    );

    return (
        <div className="w-full" data-aos="fade-up" data-aos-duration="800">
            {/* Main Card with Glass Effect */}
            <div className="relative rounded-2xl overflow-hidden mb-6">
                {/* Decorative Background Elements */}
                <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-br from-indigo-200/30 to-purple-300/30 blur-2xl"></div>
                <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-tr from-teal-200/20 to-blue-300/20 blur-3xl"></div>

                <Card extra="w-full p-0 backdrop-blur-xl bg-white/90 dark:bg-navy-800/90 border border-gray-100/30 dark:border-navy-700/30 shadow-xl">
                    {/* Modern Header with Linear Gradient */}
                    <div className="relative mb-6 overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between relative z-10">
                                <div className="flex items-center">
                                    <div className="bg-white/10 p-3 rounded-xl backdrop-blur-sm shadow-inner shadow-white/10 mr-4">
                                        <MdHistory className="h-8 w-8 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-bold text-white tracking-tight">
                                            Training History
                                        </h4>
                                        <p className="mt-1 text-indigo-100/80 text-sm">
                                            Track and analyze machine learning model training sessions
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0">
                                    <button className="px-4 py-2.5 bg-white/10 text-white rounded-xl shadow-md hover:bg-white/20 backdrop-blur-sm transition-all duration-300 flex items-center group">
                                        <MdRefresh className="mr-2 group-hover:rotate-180 transition-transform duration-500" />
                                        Refresh Data
                                    </button>
                                </div>
                            </div>
                            <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-indigo-500/20 to-transparent"></div>
                        </div>

                        {/* Floating Search & Filter Panel */}
                        <div className="px-6 -mt-6 relative z-20">
                            <div className="p-4 bg-white/80 dark:bg-navy-700/80 rounded-xl shadow-xl backdrop-blur-md border border-gray-100/50 dark:border-navy-600/50">
                                <div className="flex flex-col lg:flex-row items-stretch justify-between gap-4">
                                    <div className="flex-1 w-full lg:w-auto">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Search model name or algorithm..."
                                                className="w-full pl-12 pr-4 py-3 border-0 bg-gray-50/80 dark:bg-navy-800/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all duration-300 backdrop-blur-sm"
                                                value={searchTerm}
                                                onChange={handleSearch}
                                            />
                                            <div className="absolute left-3 top-3 text-indigo-500 dark:text-indigo-400">
                                                <MdSearch className="h-5 w-5" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 flex-wrap">
                                        <button
                                            onClick={() => handleFilterChange("all")}
                                            className={`px-4 py-3 rounded-xl transition-all duration-300 flex items-center shadow-sm ${filterStatus === "all"
                                                ? "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-md shadow-indigo-500/20"
                                                : "bg-gray-50/80 dark:bg-navy-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-navy-700/80"
                                                }`}
                                        >
                                            <MdFilterList className="mr-2" /> All
                                        </button>
                                        <button
                                            onClick={() => handleFilterChange("success")}
                                            className={`px-4 py-3 rounded-xl transition-all duration-300 flex items-center shadow-sm ${filterStatus === "success"
                                                ? "bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md shadow-green-500/20"
                                                : "bg-gray-50/80 dark:bg-navy-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-navy-700/80"
                                                }`}
                                        >
                                            <MdCheckCircle className="mr-2" /> Success
                                        </button>
                                        <button
                                            onClick={() => handleFilterChange("warning")}
                                            className={`px-4 py-3 rounded-xl transition-all duration-300 flex items-center shadow-sm ${filterStatus === "warning"
                                                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/20"
                                                : "bg-gray-50/80 dark:bg-navy-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-navy-700/80"
                                                }`}
                                        >
                                            <MdWarning className="mr-2" /> Warning
                                        </button>
                                        <button
                                            onClick={() => handleFilterChange("error")}
                                            className={`px-4 py-3 rounded-xl transition-all duration-300 flex items-center shadow-sm ${filterStatus === "error"
                                                ? "bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-md shadow-pink-500/20"
                                                : "bg-gray-50/80 dark:bg-navy-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-navy-700/80"
                                                }`}
                                        >
                                            <MdError className="mr-2" /> Error
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 pb-6">
                        {/* Modern Loading State */}
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="relative">
                                    <div className="w-16 h-16 border-t-4 border-b-4 border-indigo-500 rounded-full animate-spin"></div>
                                    <div className="w-16 h-16 border-r-4 border-l-4 border-indigo-300 rounded-full animate-spin absolute top-0 left-0" style={{ animationDirection: 'reverse', animationDuration: '1.2s' }}></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-8 h-8 bg-white dark:bg-navy-800 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        ) : filteredData.length === 0 ? (
                            <div className="bg-white/80 dark:bg-navy-700/80 backdrop-blur-sm rounded-xl p-8 text-center shadow-lg border border-gray-100/50 dark:border-navy-600/50">
                                <div className="w-20 h-20 mx-auto bg-gray-50 dark:bg-navy-800 rounded-full flex items-center justify-center mb-4 border border-gray-100 dark:border-navy-600">
                                    <MdInfo className="h-10 w-10 text-gray-400" />
                                </div>
                                <h3 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">No training sessions found</h3>
                                <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                                    Try adjusting your search or filter criteria to find what you're looking for.
                                </p>
                                <button className="mt-6 px-4 py-2.5 bg-indigo-50 dark:bg-navy-900 text-indigo-600 dark:text-indigo-400 rounded-xl hover:bg-indigo-100 dark:hover:bg-navy-800 transition-colors duration-300 font-medium">
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {filteredData.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className={`relative bg-white/80 dark:bg-navy-700/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-100/50 dark:border-navy-600/50 transition-all duration-300 ${expandedItemId === item.id ? 'shadow-xl ring-1 ring-indigo-500/50 dark:ring-indigo-400/30' : 'hover:shadow-xl hover:bg-white dark:hover:bg-navy-700'}`}
                                        data-aos="fade-up"
                                        data-aos-delay={index * 100}
                                    >
                                        <div
                                            className={`p-5 cursor-pointer relative ${expandedItemId === item.id ? 'border-b border-gray-100/50 dark:border-navy-600/50' : ''}`}
                                            onClick={() => toggleExpand(item.id)}
                                        >
                                            <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0">
                                                <div className={`absolute -right-8 -top-8 w-24 h-24 rounded-full opacity-30 ${item.status === 'success' ? 'bg-green-500/20' :
                                                    item.status === 'warning' ? 'bg-amber-500/20' :
                                                        'bg-pink-500/20'
                                                    }`}></div>
                                            </div>

                                            <div className="flex flex-col md:flex-row md:items-center justify-between relative z-10">
                                                <div className="flex-1">
                                                    <div className="flex items-center flex-wrap gap-2">
                                                        <h5 className="text-lg font-bold text-navy-700 dark:text-white">
                                                            {item.modelName}
                                                        </h5>
                                                        <StatusBadge status={item.status} />
                                                    </div>
                                                    <div className="mt-3 flex flex-wrap gap-2">
                                                        <DataTag
                                                            icon={<MdCalendarToday className="h-3.5 w-3.5 text-indigo-500 dark:text-indigo-400" />}
                                                            text={formatDate(item.startDate)}
                                                            color="bg-indigo-50 dark:bg-indigo-900/20"
                                                        />
                                                        <DataTag
                                                            icon={<MdTrendingUp className="h-3.5 w-3.5 text-green-500 dark:text-green-400" />}
                                                            text={`${(item.accuracy * 100).toFixed(1)}% Accuracy`}
                                                            color="bg-green-50 dark:bg-green-900/20"
                                                        />
                                                        <DataTag
                                                            icon={<MdStorage className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />}
                                                            text={`${item.datasetSize} Samples`}
                                                            color="bg-blue-50 dark:bg-blue-900/20"
                                                        />
                                                        <DataTag
                                                            icon={<MdAccessTime className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />}
                                                            text={item.duration}
                                                            color="bg-blue-50 dark:bg-blue-900/20"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mt-4 md:mt-0 flex items-center">
                                                    <div className={`p-2 rounded-full transition-all duration-300 ${expandedItemId === item.id
                                                        ? 'bg-indigo-100 dark:bg-indigo-900/30 shadow-md scale-110'
                                                        : 'bg-gray-50 dark:bg-navy-800'
                                                        }`}>
                                                        {expandedItemId === item.id ? (
                                                            <MdExpandLess className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                                        ) : (
                                                            <MdExpandMore className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Enhanced Expanded view */}
                                        {expandedItemId === item.id && (
                                            <div className="px-5 pb-5 pt-4" data-aos="fade-down" data-aos-duration="400">
                                                {/* Performance metrics in a modern grid */}
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                                    <MetricCard
                                                        label="Accuracy"
                                                        value={`${(item.accuracy * 100).toFixed(1)}%`}
                                                        icon={<MdTrendingUp className="h-5 w-5" />}
                                                        color="from-green-400 to-teal-500"
                                                    />
                                                    <MetricCard
                                                        label="Precision"
                                                        value={`${(item.precision * 100).toFixed(1)}%`}
                                                        icon={<MdCheckCircle className="h-5 w-5" />}
                                                        color="from-blue-400 to-indigo-500"
                                                    />
                                                    <MetricCard
                                                        label="Recall"
                                                        value={`${(item.recall * 100).toFixed(1)}%`}
                                                        icon={<MdMemory className="h-5 w-5" />}
                                                        color="from-blue-400 to-purple-500"
                                                    />
                                                    <MetricCard
                                                        label="F1 Score"
                                                        value={`${(item.f1Score * 100).toFixed(1)}%`}
                                                        icon={<MdAssessment className="h-5 w-5" />}
                                                        color="from-amber-400 to-orange-500"
                                                    />
                                                </div>

                                                {/* Training details */}
                                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
                                                    <div className="lg:col-span-1 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-navy-800 dark:to-indigo-900/30 p-5 rounded-xl border border-indigo-100/50 dark:border-navy-700/50 backdrop-blur-sm">
                                                        <h6 className="font-semibold mb-4 text-navy-700 dark:text-white flex items-center">
                                                            <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg mr-2">
                                                                <MdSettings className="text-indigo-600 dark:text-indigo-400 h-5 w-5" />
                                                            </div>
                                                            Training Configuration
                                                        </h6>

                                                        <div className="space-y-4">
                                                            <div className="flex items-center">
                                                                <div className="w-10 h-10 rounded-lg bg-white/70 dark:bg-navy-700/70 shadow-sm flex items-center justify-center mr-3">
                                                                    <MdAccessTime className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
                                                                    <p className="font-semibold text-navy-700 dark:text-white">{item.duration}</p>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center">
                                                                <div className="w-10 h-10 rounded-lg bg-white/70 dark:bg-navy-700/70 shadow-sm flex items-center justify-center mr-3">
                                                                    <MdCode className="h-5 w-5 text-purple-500 dark:text-purple-400" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Algorithm</p>
                                                                    <p className="font-semibold text-navy-700 dark:text-white">{item.algorithm}</p>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center">
                                                                <div className="w-10 h-10 rounded-lg bg-white/70 dark:bg-navy-700/70 shadow-sm flex items-center justify-center mr-3">
                                                                    <MdShowChart className="h-5 w-5 text-teal-500 dark:text-teal-400" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Features</p>
                                                                    <p className="font-semibold text-navy-700 dark:text-white">{item.featureCount}</p>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center">
                                                                <div className="w-10 h-10 rounded-lg bg-white/70 dark:bg-navy-700/70 shadow-sm flex items-center justify-center mr-3">
                                                                    <MdLoop className="h-5 w-5 text-pink-500 dark:text-pink-400" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Iterations</p>
                                                                    <p className="font-semibold text-navy-700 dark:text-white">{item.iterations}</p>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center">
                                                                <div className="w-10 h-10 rounded-lg bg-white/70 dark:bg-navy-700/70 shadow-sm flex items-center justify-center mr-3">
                                                                    <MdPerson className="h-5 w-5 text-amber-500 dark:text-amber-400" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Trained By</p>
                                                                    <p className="font-semibold text-navy-700 dark:text-white">{item.trainedBy}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Performance Chart */}
                                                    <div className="lg:col-span-2">
                                                        <div className="bg-white/80 dark:bg-navy-700/80 backdrop-blur-sm p-5 rounded-xl border border-gray-100/50 dark:border-navy-600/50 h-full">
                                                            <h6 className="font-semibold mb-4 text-navy-700 dark:text-white flex items-center">
                                                                <div className="bg-teal-100 dark:bg-teal-900/30 p-2 rounded-lg mr-2">
                                                                    <MdTrendingUp className="text-teal-600 dark:text-teal-400 h-5 w-5" />
                                                                </div>
                                                                Training Progress
                                                            </h6>
                                                            <div className="h-72">
                                                                <LineChart
                                                                    series={[
                                                                        {
                                                                            name: "Accuracy",
                                                                            data: item.metrics.accuracyHistory.map(val => val * 100)
                                                                        },
                                                                        {
                                                                            name: "Loss",
                                                                            data: item.metrics.lossHistory.map(val => val * 100)
                                                                        }
                                                                    ]}
                                                                    options={{
                                                                        chart: {
                                                                            toolbar: { show: false },
                                                                            animations: {
                                                                                enabled: true,
                                                                                easing: 'easeinout',
                                                                                speed: 800,
                                                                            },
                                                                            background: 'transparent',
                                                                        },
                                                                        tooltip: {
                                                                            theme: 'dark',
                                                                            style: {
                                                                                fontSize: '12px',
                                                                                fontFamily: 'Inter, sans-serif',
                                                                            },
                                                                        },
                                                                        grid: {
                                                                            borderColor: '#f1f1f1',
                                                                            strokeDashArray: 5,
                                                                            xaxis: {
                                                                                lines: { show: true }
                                                                            },
                                                                            yaxis: {
                                                                                lines: { show: true }
                                                                            },
                                                                        },
                                                                        fill: {
                                                                            type: 'gradient',
                                                                            gradient: {
                                                                                shade: 'dark',
                                                                                type: "vertical",
                                                                                shadeIntensity: 0.5,
                                                                                gradientToColors: undefined,
                                                                                inverseColors: true,
                                                                                opacityFrom: 0.8,
                                                                                opacityTo: 0.3,
                                                                            },
                                                                        },
                                                                        stroke: {
                                                                            curve: 'smooth',
                                                                            width: 3
                                                                        },
                                                                        xaxis: {
                                                                            categories: Array.from({ length: item.metrics.accuracyHistory.length }, (_, i) => `Epoch ${i + 1}`),
                                                                            labels: {
                                                                                style: {
                                                                                    colors: '#A3AED0',
                                                                                    fontSize: '12px',
                                                                                    fontWeight: '500'
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
                                                                                    colors: '#A3AED0',
                                                                                    fontSize: '12px',
                                                                                    fontWeight: '500'
                                                                                },
                                                                                formatter: function (val) {
                                                                                    return val.toFixed(1) + '%';
                                                                                }
                                                                            }
                                                                        },
                                                                        colors: ['#0EA5E9', '#F97316'],
                                                                        markers: {
                                                                            size: 5,
                                                                            hover: {
                                                                                size: 7
                                                                            }
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Error message with enhanced design */}
                                                    {item.status === "error" && item.errorMessage && (
                                                        <div className="lg:col-span-3">
                                                            <div className="relative overflow-hidden bg-red-50 border border-red-100 dark:bg-red-900/10 dark:border-red-900/20 text-red-800 dark:text-red-300 p-5 rounded-xl">
                                                                <div className="absolute -right-8 -top-8 w-24 h-24 bg-red-500/10 rounded-full"></div>
                                                                <div className="flex items-start">
                                                                    <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg mr-3 mt-0.5">
                                                                        <MdError className="h-5 w-5 text-red-600 dark:text-red-400" />
                                                                    </div>
                                                                    <div>
                                                                        <h6 className="font-semibold mb-2">Error Details</h6>
                                                                        <p className="text-sm">{item.errorMessage}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Action buttons with improved design */}
                                                <div className="mt-5 flex flex-wrap justify-end gap-3">
                                                    <button className="px-4 py-2.5 bg-white dark:bg-navy-800 text-gray-700 dark:text-gray-300 rounded-xl border border-gray-200 dark:border-navy-700 hover:bg-gray-50 dark:hover:bg-navy-700 shadow-sm transition-all duration-300 flex items-center">
                                                        <MdFileDownload className="mr-2" />
                                                        Export Results
                                                    </button>
                                                    <button className="px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300 flex items-center">
                                                        <MdAssessment className="mr-2" />
                                                        View Full Report
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Enhanced Summary statistics */}
                        <div className="mt-8 bg-white/80 dark:bg-navy-700/80 backdrop-blur-sm rounded-xl p-5 border border-gray-100/50 dark:border-navy-600/50 shadow-lg" data-aos="fade-up">
                            <h5 className="text-lg font-bold mb-5 text-navy-700 dark:text-white flex items-center">
                                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-lg mr-2">
                                    <MdLightbulbOutline className="text-indigo-600 dark:text-indigo-400 h-5 w-5" />
                                </div>
                                Training Performance Insights
                            </h5>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Enhanced Accuracy chart */}
                                <div className="bg-white/90 dark:bg-navy-800/90 p-5 rounded-xl shadow-sm border border-gray-100/50 dark:border-navy-600/50">
                                    <h6 className="font-semibold mb-4 text-navy-700 dark:text-white">Model Accuracy Comparison</h6>
                                    <div className="h-72">
                                        <BarChart
                                            series={[
                                                {
                                                    name: "Accuracy",
                                                    data: filteredData.map(item => parseFloat((item.accuracy * 100).toFixed(1)))
                                                }
                                            ]}
                                            options={{
                                                chart: {
                                                    toolbar: { show: false },
                                                    animations: {
                                                        enabled: true,
                                                        easing: 'easeinout',
                                                        speed: 800,
                                                    },
                                                    background: 'transparent',
                                                },
                                                plotOptions: {
                                                    bar: {
                                                        borderRadius: 8,
                                                        distributed: true,
                                                        columnWidth: '60%',
                                                        dataLabels: {
                                                            position: 'top',
                                                        },
                                                    }
                                                },
                                                dataLabels: {
                                                    enabled: true,
                                                    formatter: function (val) {
                                                        return val.toFixed(0) + '%';
                                                    },
                                                    offsetY: -20,
                                                    style: {
                                                        fontSize: '12px',
                                                        colors: ["#304758"]
                                                    }
                                                },
                                                grid: {
                                                    borderColor: '#f1f1f1',
                                                    strokeDashArray: 5,
                                                    xaxis: {
                                                        lines: { show: false }
                                                    },
                                                    yaxis: {
                                                        lines: { show: true }
                                                    },
                                                },
                                                xaxis: {
                                                    categories: filteredData.map(item => item.modelName.split(' ').slice(0, 2).join('\n')),
                                                    labels: {
                                                        style: {
                                                            colors: Array(filteredData.length).fill('#A3AED0'),
                                                            fontSize: '11px',
                                                            fontWeight: '500'
                                                        },
                                                        rotate: -45,
                                                        rotateAlways: false,
                                                        hideOverlappingLabels: true
                                                    },
                                                    axisBorder: {
                                                        show: false
                                                    },
                                                    axisTicks: {
                                                        show: false
                                                    }
                                                },
                                                yaxis: {
                                                    min: Math.max(0, Math.floor(Math.min(...filteredData.map(item => item.accuracy * 100)) - 10)),
                                                    max: 100,
                                                    labels: {
                                                        style: {
                                                            colors: '#A3AED0',
                                                            fontSize: '12px',
                                                            fontWeight: '500'
                                                        },
                                                        formatter: function (val) {
                                                            return val.toFixed(0) + '%';
                                                        }
                                                    }
                                                },
                                                fill: {
                                                    type: 'gradient',
                                                    gradient: {
                                                        shade: 'dark',
                                                        type: "vertical",
                                                        shadeIntensity: 0.5,
                                                        gradientToColors: undefined,
                                                        inverseColors: true,
                                                        opacityFrom: 0.8,
                                                        opacityTo: 0.7,
                                                        stops: [0, 100],
                                                        colorStops: filteredData.map((item, i) => ({
                                                            offset: 0,
                                                            color: item.status === 'success' ? '#10B981' :
                                                                item.status === 'warning' ? '#F59E0B' : '#EF4444',
                                                            opacity: 0.8
                                                        }))
                                                    },
                                                },
                                                colors: filteredData.map(item =>
                                                    item.status === 'success' ? '#10B981' :
                                                        item.status === 'warning' ? '#F59E0B' : '#EF4444'
                                                ),
                                                tooltip: {
                                                    theme: 'dark',
                                                    y: {
                                                        formatter: function (val) {
                                                            return val.toFixed(1) + '%';
                                                        }
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Enhanced F1 Score chart */}
                                <div className="bg-white/90 dark:bg-navy-800/90 p-5 rounded-xl shadow-sm border border-gray-100/50 dark:border-navy-600/50">
                                    <h6 className="font-semibold mb-4 text-navy-700 dark:text-white">F1 Score Evolution</h6>
                                    <div className="h-72">
                                        <LineChart
                                            series={[
                                                {
                                                    name: "F1 Score",
                                                    data: filteredData.map(item => parseFloat((item.f1Score * 100).toFixed(1)))
                                                }
                                            ]}
                                            options={{
                                                chart: {
                                                    toolbar: { show: false },
                                                    animations: {
                                                        enabled: true,
                                                        easing: 'easeinout',
                                                        speed: 800,
                                                    },
                                                    background: 'transparent',
                                                    dropShadow: {
                                                        enabled: true,
                                                        top: 3,
                                                        left: 0,
                                                        blur: 4,
                                                        opacity: 0.2
                                                    }
                                                },
                                                grid: {
                                                    borderColor: '#f1f1f1',
                                                    strokeDashArray: 5,
                                                    xaxis: {
                                                        lines: { show: true }
                                                    },
                                                    yaxis: {
                                                        lines: { show: true }
                                                    },
                                                },
                                                stroke: {
                                                    curve: 'smooth',
                                                    width: 4
                                                },
                                                fill: {
                                                    type: 'gradient',
                                                    gradient: {
                                                        shade: 'dark',
                                                        type: "vertical",
                                                        shadeIntensity: 0.5,
                                                        gradientToColors: ['#06B6D4'],
                                                        inverseColors: false,
                                                        opacityFrom: 0.7,
                                                        opacityTo: 0.2,
                                                    },
                                                },
                                                xaxis: {
                                                    categories: filteredData.map(item => {
                                                        const date = new Date(item.startDate);
                                                        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                                                    }),
                                                    labels: {
                                                        style: {
                                                            colors: '#A3AED0',
                                                            fontSize: '12px',
                                                            fontWeight: '500'
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
                                                    min: Math.max(60, Math.floor(Math.min(...filteredData.map(item => item.f1Score * 100)) - 5)),
                                                    max: 100,
                                                    labels: {
                                                        style: {
                                                            colors: '#A3AED0',
                                                            fontSize: '12px',
                                                            fontWeight: '500'
                                                        },
                                                        formatter: function (val) {
                                                            return val.toFixed(0) + '%';
                                                        }
                                                    }
                                                },
                                                colors: ['#0EA5E9'],
                                                markers: {
                                                    size: 6,
                                                    colors: ['#0EA5E9'],
                                                    strokeColors: '#fff',
                                                    strokeWidth: 2,
                                                    hover: {
                                                        size: 8,
                                                    }
                                                },
                                                tooltip: {
                                                    theme: 'dark',
                                                    y: {
                                                        formatter: function (val) {
                                                            return val.toFixed(1) + '%';
                                                        }
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default TrainingHistory;
