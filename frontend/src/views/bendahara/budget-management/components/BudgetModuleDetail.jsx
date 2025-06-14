import React from 'react';
import { Link } from "react-router-dom";
import {
    MdVisibility,
    MdOutlineTextSnippet,
    MdAnalytics,
    MdPieChart,
    MdMoneyOff,
    MdStackedLineChart,
} from "react-icons/md";
import SessionAllocationDetail from './details/SessionAllocationDetail';
import FundMonitoringDetail from './details/FundMonitoringDetail';
import BudgetDistributionDetail from './details/BudgetDistributionDetail';
import RemainingBudgetDetail from './details/RemainingBudgetDetail';
import BudgetRealizationDetail from './details/BudgetRealizationDetail';

const BudgetModuleDetail = ({ moduleId, module, featureDetails }) => {
    // Add null check for featureDetails - this is what's causing the error
    if (!featureDetails) {
        console.error(`Feature details not found for module: ${moduleId}`);
        return (
            <div className="bg-white dark:bg-navy-800 rounded-xl border border-gray-100 dark:border-navy-700 shadow-lg overflow-hidden p-6">
                <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">Detail tidak tersedia saat ini.</p>
                    <Link
                        to={module?.path || "#"}
                        className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors inline-block"
                    >
                        Lihat Halaman Detail
                    </Link>
                </div>
            </div>
        );
    }

    // Map of module IDs to their detail components
    const detailComponents = {
        sessionAllocation: SessionAllocationDetail,
        fundMonitoring: FundMonitoringDetail,
        budgetDistribution: BudgetDistributionDetail,
        remainingBudget: RemainingBudgetDetail,
        budgetRealization: BudgetRealizationDetail,
    };

    // Get the appropriate detail component for the current module
    const DetailComponent = detailComponents[moduleId];

    // Module-specific colors for buttons
    const buttonColors = {
        sessionAllocation: "bg-indigo-500 hover:bg-indigo-600",
        fundMonitoring: "bg-cyan-500 hover:bg-cyan-600",
        budgetDistribution: "bg-pink-500 hover:bg-pink-600",
        remainingBudget: "bg-amber-500 hover:bg-amber-600",
        budgetRealization: "bg-green-500 hover:bg-green-600",
    };

    // Module-specific icons
    const moduleIcons = {
        sessionAllocation: <MdOutlineTextSnippet className="h-5 w-5 text-indigo-500" />,
        fundMonitoring: <MdAnalytics className="h-5 w-5 text-cyan-500" />,
        budgetDistribution: <MdPieChart className="h-5 w-5 text-pink-500" />,
        remainingBudget: <MdMoneyOff className="h-5 w-5 text-amber-500" />,
        budgetRealization: <MdStackedLineChart className="h-5 w-5 text-green-500" />,
    };

    return (
        <div className="bg-white dark:bg-navy-800 rounded-xl border border-gray-100 dark:border-navy-700 shadow-lg overflow-hidden">
            <div className="p-6">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-4 border-b border-gray-100 dark:border-navy-700 pb-4">
                    <h5 className="font-bold text-lg text-gray-800 dark:text-white flex items-center gap-2">
                        {moduleIcons[moduleId] || <div className="w-5 h-5"></div>}
                        Detail {featureDetails.title}
                    </h5>
                    <Link
                        to={module.path}
                        className={`px-4 py-2 text-white rounded-xl transition-colors text-sm font-medium flex items-center ${buttonColors[moduleId] || "bg-indigo-500 hover:bg-indigo-600"}`}
                    >
                        <MdVisibility className="mr-2 h-4 w-4" /> Detail Lengkap
                    </Link>
                </div>

                {/* Render the appropriate detail component if it exists */}
                {DetailComponent ? <DetailComponent /> : (
                    <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400">Detail sedang dipersiapkan.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BudgetModuleDetail;
