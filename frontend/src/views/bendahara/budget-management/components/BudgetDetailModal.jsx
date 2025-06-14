import React from 'react';
import { Link } from 'react-router-dom';
import { MdClose, MdVisibility } from 'react-icons/md';

// Import the detail content components
import SessionAllocationDetail from './details/SessionAllocationDetail';
import FundMonitoringDetail from './details/FundMonitoringDetail';
import BudgetDistributionDetail from './details/BudgetDistributionDetail';
import RemainingBudgetDetail from './details/RemainingBudgetDetail';
import BudgetRealizationDetail from './details/BudgetRealizationDetail';

const BudgetDetailModal = ({ isOpen, onClose, moduleId, module, featureDetails }) => {
    if (!isOpen) return null;

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

    // Handle case when feature details are not available
    if (!featureDetails) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                <div className="bg-white dark:bg-navy-800 rounded-xl max-w-3xl w-full max-h-[85vh] overflow-hidden shadow-xl">
                    <div className="p-5 flex items-center justify-between border-b border-gray-200 dark:border-navy-700">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                            Detail {module?.title || 'Modul'}
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                            <MdClose className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="p-6">
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
                </div>
            </div>
        );
    }

    // Get the background gradient for the header based on the module
    const headerBg = {
        sessionAllocation: "bg-gradient-to-r from-indigo-500 to-blue-500",
        fundMonitoring: "bg-gradient-to-r from-cyan-500 to-blue-500",
        budgetDistribution: "bg-gradient-to-r from-pink-500 to-rose-500",
        remainingBudget: "bg-gradient-to-r from-amber-500 to-orange-500",
        budgetRealization: "bg-gradient-to-r from-green-500 to-emerald-500",
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black bg-opacity-50 animate-fadeIn overflow-hidden">
            {/* Increased modal size - wider and taller */}
            <div className="bg-white dark:bg-navy-800 rounded-xl w-full max-w-6xl max-h-[90vh] overflow-hidden shadow-2xl">
                {/* Enhanced Modal Header with color gradient */}
                <div className={`p-5 flex items-center justify-between border-b border-gray-200 dark:border-navy-700 ${headerBg[moduleId] || "bg-gradient-to-r from-indigo-600 to-blue-500"} text-white`}>
                    <h3 className="text-2xl font-semibold flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-xl">
                            {featureDetails.icon}
                        </div>
                        {featureDetails.title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all"
                    >
                        <MdClose className="h-6 w-6" />
                    </button>
                </div>

                {/* Modal Body - Larger height and better padding */}
                <div className="overflow-auto p-0 max-h-[calc(90vh-180px)]">
                    {/* Description and Stats in an enhanced header section */}
                    <div className="p-6 bg-gray-50 dark:bg-navy-900/50 border-b border-gray-200 dark:border-navy-700">
                        {/* Description */}
                        <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
                            {featureDetails.description}
                        </p>

                        {/* Stats - Made larger and more prominent */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {featureDetails.stats.map((stat, i) => (
                                <div key={i} className="bg-white dark:bg-navy-800 rounded-xl p-4 shadow-sm flex items-center">
                                    <div className="rounded-lg p-3 bg-gray-50 dark:bg-navy-900 mr-3 flex-shrink-0">
                                        {stat.icon}
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Detail Component - with better padding and more space */}
                    <div className="p-8">
                        {DetailComponent ? <DetailComponent /> : (
                            <div className="text-center py-12">
                                <p className="text-gray-500 dark:text-gray-400">Detail sedang dipersiapkan.</p>
                            </div>
                        )}

                        {/* Additional Info */}
                        <div className="mt-8 text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-navy-700 pt-6">
                            <p className="italic">{featureDetails.moreInfo}</p>
                        </div>
                    </div>
                </div>

                {/* Modal Footer - More padding and clearer buttons */}
                <div className="border-t border-gray-200 dark:border-navy-700 p-5 flex justify-end bg-gray-50 dark:bg-navy-900/50">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-navy-700 dark:text-gray-300 dark:hover:bg-navy-600 mr-4 font-medium"
                    >
                        Tutup
                    </button>
                    <Link
                        to={featureDetails.path}
                        className={`px-6 py-2.5 rounded-xl text-white flex items-center font-medium ${buttonColors[moduleId] || "bg-indigo-500 hover:bg-indigo-600"}`}
                    >
                        <MdVisibility className="mr-2 h-5 w-5" />
                        Lihat Detail Lengkap
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BudgetDetailModal;
