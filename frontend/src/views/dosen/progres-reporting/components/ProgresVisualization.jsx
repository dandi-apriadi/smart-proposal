import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    MdTimeline,
    MdInsertChart,
    MdCompareArrows,
    MdCheckCircle,
    MdWarning,
    MdAccessTime,
    MdFilterList,
    MdInfoOutline,
    MdTrendingUp,
    MdTrendingDown,
    MdRefresh
} from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ProgresVisualization = () => {
    const [activeView, setActiveView] = useState('overview');
    const [timeFilter, setTimeFilter] = useState('all');
    const { baseURL } = useSelector((state) => state.auth);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    // Dummy data for progress visualization
    const progressData = {
        overall: 68,
        milestones: [
            { id: 1, name: 'Initial Proposal', deadline: '2025-04-15', completed: true, completionDate: '2025-04-12' },
            { id: 2, name: 'Literature Review', deadline: '2025-05-20', completed: true, completionDate: '2025-05-18' },
            { id: 3, name: 'Data Collection', deadline: '2025-06-30', completed: true, completionDate: '2025-06-25' },
            { id: 4, name: 'Methodology Validation', deadline: '2025-07-15', completed: true, completionDate: '2025-07-20' },
            { id: 5, name: 'Preliminary Results', deadline: '2025-08-10', completed: false, completionDate: null },
            { id: 6, name: 'Analysis & Discussion', deadline: '2025-09-05', completed: false, completionDate: null },
            { id: 7, name: 'Final Draft', deadline: '2025-09-25', completed: false, completionDate: null },
        ],
        monthlyProgress: [
            { month: 'April', planned: 10, actual: 12 },
            { month: 'May', planned: 25, actual: 24 },
            { month: 'June', planned: 45, actual: 42 },
            { month: 'July', planned: 65, actual: 68 },
            { month: 'August', planned: 80, actual: 0 },
            { month: 'September', planned: 100, actual: 0 },
        ],
        categories: [
            { name: 'Research Documentation', progress: 75 },
            { name: 'Data Analysis', progress: 60 },
            { name: 'Implementation', progress: 45 },
            { name: 'Testing & Validation', progress: 30 },
            { name: 'Documentation', progress: 40 },
        ],
        risks: [
            { id: 1, name: 'Dataset Limitations', severity: 'medium', impact: 'May affect model accuracy', status: 'Monitoring' },
            { id: 2, name: 'Timeline Slippage', severity: 'high', impact: 'Could delay final submission', status: 'Mitigating' },
            { id: 3, name: 'Resource Constraints', severity: 'low', impact: 'Minimal impact expected', status: 'Resolved' },
        ]
    };

    const getStatusColor = (milestone) => {
        if (milestone.completed) {
            return 'bg-green-100 text-green-800';
        }

        // Check if the deadline is approaching (within 7 days)
        const deadlineDate = new Date(milestone.deadline);
        const today = new Date();
        const daysDiff = Math.floor((deadlineDate - today) / (1000 * 60 * 60 * 24));

        if (daysDiff < 0) {
            return 'bg-red-100 text-red-800'; // Overdue
        } else if (daysDiff <= 7) {
            return 'bg-yellow-100 text-yellow-800'; // Approaching
        } else {
            return 'bg-blue-100 text-blue-800'; // Future milestone
        }
    };

    const getStatusIcon = (milestone) => {
        if (milestone.completed) {
            return <MdCheckCircle className="inline mr-1" />;
        }

        const deadlineDate = new Date(milestone.deadline);
        const today = new Date();
        const daysDiff = Math.floor((deadlineDate - today) / (1000 * 60 * 60 * 24));

        if (daysDiff < 0) {
            return <MdWarning className="inline mr-1" />; // Overdue
        } else {
            return <MdAccessTime className="inline mr-1" />; // Future or approaching
        }
    };

    const getMonthProgress = () => {
        const currentDate = new Date();
        const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
        const currentMonthData = progressData.monthlyProgress.find(item => item.month === currentMonth);

        return currentMonthData ? currentMonthData.actual : 0;
    };

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'high': return 'bg-red-100 text-red-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const calculateCompletionTrend = () => {
        // Use the last two months with actual progress to determine trend
        const monthsWithProgress = progressData.monthlyProgress.filter(m => m.actual > 0);
        if (monthsWithProgress.length >= 2) {
            const lastMonth = monthsWithProgress[monthsWithProgress.length - 1];
            const previousMonth = monthsWithProgress[monthsWithProgress.length - 2];

            // Check if ahead or behind plan
            const planDiff = lastMonth.actual - lastMonth.planned;

            // Check month-to-month progress trend
            const progressDiff = lastMonth.actual - previousMonth.actual;

            return {
                planStatus: planDiff >= 0 ? 'ahead' : 'behind',
                planDiff: Math.abs(planDiff),
                trend: progressDiff >= 0 ? 'up' : 'down',
                progressDiff: Math.abs(progressDiff)
            };
        }

        return { planStatus: 'on-track', planDiff: 0, trend: 'up', progressDiff: 0 };
    };

    const trend = calculateCompletionTrend();

    return (
        <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2 md:mb-0">Progress Visualization</h2>
                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <select
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={timeFilter}
                                onChange={(e) => setTimeFilter(e.target.value)}
                            >
                                <option value="all">All Time</option>
                                <option value="month">This Month</option>
                                <option value="quarter">This Quarter</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <MdFilterList />
                            </div>
                        </div>
                        <button
                            className="p-2.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 transition duration-300"
                            title="Refresh Data"
                        >
                            <MdRefresh />
                        </button>
                    </div>
                </div>
            </div>

            {/* Visualization Navigation */}
            <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex overflow-x-auto hide-scrollbar space-x-4">
                    <button
                        onClick={() => setActiveView('overview')}
                        className={`py-2 px-4 text-sm font-medium rounded-md flex items-center transition-colors duration-300 ${activeView === 'overview'
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <MdInsertChart className="mr-1.5" /> Overview
                    </button>
                    <button
                        onClick={() => setActiveView('timeline')}
                        className={`py-2 px-4 text-sm font-medium rounded-md flex items-center transition-colors duration-300 ${activeView === 'timeline'
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <MdTimeline className="mr-1.5" /> Timeline
                    </button>
                    <button
                        onClick={() => setActiveView('comparison')}
                        className={`py-2 px-4 text-sm font-medium rounded-md flex items-center transition-colors duration-300 ${activeView === 'comparison'
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                    >
                        <MdCompareArrows className="mr-1.5" /> Comparison
                    </button>
                </div>
            </div>

            <div className="p-6">
                {activeView === 'overview' && (
                    <div data-aos="fade-up">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h3 className="text-gray-500 text-sm uppercase font-semibold">Overall Progress</h3>
                                        <p className="text-3xl font-bold text-gray-800 mt-1">{progressData.overall}%</p>
                                    </div>
                                    <div className="p-2 bg-blue-50 rounded-lg">
                                        <MdInsertChart className="text-blue-500 text-2xl" />
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
                                    <div
                                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000"
                                        style={{ width: `${progressData.overall}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between mt-2 text-xs text-gray-500">
                                    <span>Start</span>
                                    <span>Target</span>
                                </div>
                            </div>

                            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h3 className="text-gray-500 text-sm uppercase font-semibold">This Month</h3>
                                        <p className="text-3xl font-bold text-gray-800 mt-1">{getMonthProgress()}%</p>
                                    </div>
                                    <div className="p-2 bg-green-50 rounded-lg">
                                        <MdTrendingUp className="text-green-500 text-2xl" />
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center">
                                    <div className={`text-sm font-medium ${trend.planStatus === 'ahead' ? 'text-green-600' : 'text-red-600'}`}>
                                        {trend.planStatus === 'ahead' ? (
                                            <span className="flex items-center"><MdTrendingUp className="mr-1" /> {trend.planDiff}% ahead of plan</span>
                                        ) : (
                                            <span className="flex items-center"><MdTrendingDown className="mr-1" /> {trend.planDiff}% behind plan</span>
                                        )}
                                    </div>
                                </div>
                                <div className="mt-4 text-sm text-gray-600">
                                    <div className="flex justify-between items-center mb-1">
                                        <span>Monthly Target:</span>
                                        <span className="font-medium">{progressData.monthlyProgress.find(m => m.month === new Date().toLocaleString('default', { month: 'long' }))?.planned || 0}%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h3 className="text-gray-500 text-sm uppercase font-semibold">Milestones</h3>
                                        <p className="text-3xl font-bold text-gray-800 mt-1">
                                            {progressData.milestones.filter(m => m.completed).length}/{progressData.milestones.length}
                                        </p>
                                    </div>
                                    <div className="p-2 bg-purple-50 rounded-lg">
                                        <MdCheckCircle className="text-purple-500 text-2xl" />
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <h4 className="text-sm font-medium text-gray-700 mb-2">Next Milestone:</h4>
                                    {progressData.milestones.find(m => !m.completed) && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-600">
                                                {progressData.milestones.find(m => !m.completed).name}
                                            </span>
                                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(progressData.milestones.find(m => !m.completed))}`}>
                                                {getStatusIcon(progressData.milestones.find(m => !m.completed))}
                                                {new Date(progressData.milestones.find(m => !m.completed).deadline).toLocaleDateString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                                <h3 className="text-lg font-medium text-gray-800 mb-4">Category Progress</h3>
                                <div className="space-y-4">
                                    {progressData.categories.map((category, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm font-medium text-gray-700">{category.name}</span>
                                                <span className="text-sm text-gray-600">{category.progress}%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                                                    style={{ width: `${category.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                                <h3 className="text-lg font-medium text-gray-800 mb-4">Risk Assessment</h3>
                                <div className="space-y-3">
                                    {progressData.risks.map((risk) => (
                                        <div key={risk.id} className="flex items-start p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                            <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${getSeverityColor(risk.severity)}`}>
                                                <MdWarning />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <h4 className="font-medium text-gray-800">{risk.name}</h4>
                                                    <span className={`text-xs px-2 py-0.5 rounded-full ${getSeverityColor(risk.severity)}`}>
                                                        {risk.severity}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 mt-1">{risk.impact}</p>
                                                <div className="text-xs text-gray-500 mt-2">Status: {risk.status}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeView === 'timeline' && (
                    <div data-aos="fade-up">
                        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm mb-6">
                            <h3 className="text-lg font-medium text-gray-800 mb-4">Project Timeline</h3>
                            <div className="relative">
                                {/* Timeline line */}
                                <div className="absolute left-5 ml-2.5 w-0.5 h-full bg-gray-200 hidden md:block"></div>

                                {/* Timeline items */}
                                <div className="space-y-6">
                                    {progressData.milestones.map((milestone, index) => (
                                        <div
                                            key={milestone.id}
                                            className="flex flex-col md:flex-row gap-4 md:gap-8 relative"
                                            data-aos="fade-up"
                                            data-aos-delay={index * 100}
                                        >
                                            {/* Timeline dot */}
                                            <div className="hidden md:flex absolute left-5 transform -translate-x-1/2 items-center justify-center">
                                                <div className={`w-5 h-5 rounded-full ${milestone.completed ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                                            </div>

                                            {/* Date */}
                                            <div className="md:w-32 text-right hidden md:block">
                                                <span className="text-sm font-medium text-gray-600">
                                                    {new Date(milestone.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                </span>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 ml-0 md:ml-8 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-medium text-gray-800">{milestone.name}</h4>
                                                        <div className="flex items-center mt-1 md:hidden">
                                                            <MdAccessTime className="text-gray-400 mr-1" />
                                                            <span className="text-xs text-gray-500">
                                                                Due: {new Date(milestone.deadline).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(milestone)}`}>
                                                            {getStatusIcon(milestone)}
                                                            {milestone.completed ? 'Completed' : 'Pending'}
                                                        </span>
                                                    </div>
                                                </div>

                                                {milestone.completed && (
                                                    <div className="mt-2 text-sm text-gray-600 flex items-center">
                                                        <MdCheckCircle className="text-green-500 mr-1" />
                                                        Completed on {new Date(milestone.completionDate).toLocaleDateString()}
                                                        {new Date(milestone.completionDate) <= new Date(milestone.deadline) ? (
                                                            <span className="ml-2 text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">On time</span>
                                                        ) : (
                                                            <span className="ml-2 text-xs text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full">Delayed</span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeView === 'comparison' && (
                    <div data-aos="fade-up">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                                <h3 className="text-lg font-medium text-gray-800 mb-4">Planned vs Actual Progress</h3>
                                <div className="space-y-6">
                                    {progressData.monthlyProgress.map((month, index) => (
                                        <div key={index}>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm font-medium text-gray-700">{month.month}</span>
                                                <div className="text-sm text-gray-600">
                                                    <span className="text-blue-600 font-medium">{month.actual}%</span> /
                                                    <span className="text-gray-500">{month.planned}%</span>
                                                </div>
                                            </div>
                                            <div className="relative pt-1">
                                                <div className="w-full h-2 bg-gray-200 rounded-full">
                                                    <div
                                                        className="h-2 bg-blue-600 rounded-full transition-all duration-1000"
                                                        style={{ width: `${month.actual}%` }}
                                                    ></div>
                                                </div>
                                                <div className="absolute top-0 h-2 border-r-2 border-gray-400 transition-all duration-1000"
                                                    style={{ left: `${month.planned}%` }}
                                                ></div>
                                            </div>
                                            <div className="flex text-xs mt-1">
                                                <div className="flex items-center mr-4">
                                                    <div className="w-3 h-3 bg-blue-600 rounded-full mr-1"></div>
                                                    <span>Actual</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <div className="w-3 h-3 border-r-2 border-gray-400 mr-1"></div>
                                                    <span>Planned</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                                <h3 className="text-lg font-medium text-gray-800 mb-4">Completion Analysis</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                                        <div className="mr-4 bg-blue-100 p-3 rounded-full">
                                            <MdInfoOutline className="text-blue-600 text-xl" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-800">Current Completion Rate</h4>
                                            <p className="text-sm text-gray-600 mt-1">
                                                At the current pace, you're {trend.planStatus === 'ahead' ? 'ahead of' : 'behind'} schedule by approximately {trend.planDiff}%.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-4 border border-gray-200 rounded-lg">
                                        <h4 className="font-medium text-gray-800 mb-3">Milestone Timeliness</h4>
                                        <div className="flex justify-around text-center">
                                            <div>
                                                <div className="text-2xl font-bold text-green-600">
                                                    {progressData.milestones.filter(m =>
                                                        m.completed && new Date(m.completionDate) <= new Date(m.deadline)
                                                    ).length}
                                                </div>
                                                <div className="text-sm text-gray-600">On Time</div>
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-yellow-600">
                                                    {progressData.milestones.filter(m =>
                                                        m.completed && new Date(m.completionDate) > new Date(m.deadline)
                                                    ).length}
                                                </div>
                                                <div className="text-sm text-gray-600">Delayed</div>
                                            </div>
                                            <div>
                                                <div className="text-2xl font-bold text-blue-600">
                                                    {progressData.milestones.filter(m => !m.completed).length}
                                                </div>
                                                <div className="text-sm text-gray-600">Pending</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 border border-gray-200 rounded-lg">
                                        <h4 className="font-medium text-gray-800 mb-2">Projected Completion</h4>
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm text-gray-600">
                                                Based on current progress, estimated to complete by:
                                            </div>
                                            <div className="font-medium text-gray-800">Sep 25, 2025</div>
                                        </div>
                                        <div className="mt-2 text-xs text-gray-500 flex items-center">
                                            <MdInfoOutline className="mr-1" />
                                            Original target completion: Sep 25, 2025
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProgresVisualization;
