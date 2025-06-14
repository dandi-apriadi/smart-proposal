import React from 'react';
import { MdDashboard, MdCalendarToday, MdDateRange, MdRefresh, MdFilterList } from 'react-icons/md';

const BudgetFilterControls = ({ timeFilter, setTimeFilter, handleRefresh, isLoading }) => {
    return (
        <div className="flex flex-wrap items-center justify-between mb-6 bg-white dark:bg-navy-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-navy-700" data-aos="fade-up" data-aos-delay="100">
            <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-3 md:mb-0 flex items-center">
                <MdDashboard className="h-5 w-5 mr-2 text-indigo-500" />
                Overview Anggaran
            </h4>
            <div className="flex flex-wrap gap-3 items-center">
                <div className="flex items-center bg-gray-50 dark:bg-navy-900 rounded-xl p-1">
                    <button
                        type="button"
                        className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${timeFilter === "monthly" ? "bg-indigo-500 text-white shadow-md" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-800"}`}
                        onClick={() => setTimeFilter("monthly")}
                    >
                        <div className="flex items-center">
                            <MdCalendarToday className="mr-1.5 h-4 w-4" />
                            Bulanan
                        </div>
                    </button>
                    <button
                        type="button"
                        className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${timeFilter === "quarterly" ? "bg-indigo-500 text-white shadow-md" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-800"}`}
                        onClick={() => setTimeFilter("quarterly")}
                    >
                        <div className="flex items-center">
                            <MdDateRange className="mr-1.5 h-4 w-4" />
                            Kuartal
                        </div>
                    </button>
                    <button
                        type="button"
                        className={`px-4 py-2 text-sm font-medium rounded-xl transition-all ${timeFilter === "yearly" ? "bg-indigo-500 text-white shadow-md" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-800"}`}
                        onClick={() => setTimeFilter("yearly")}
                    >
                        <div className="flex items-center">
                            <MdDateRange className="mr-1.5 h-4 w-4" />
                            Tahunan
                        </div>
                    </button>
                </div>
                <div className="flex gap-2">
                    <button
                        className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:hover:bg-navy-700 transition-all"
                        onClick={handleRefresh}
                    >
                        <MdRefresh className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
                    </button>
                    <button
                        className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:hover:bg-navy-700 transition-all"
                    >
                        <MdFilterList className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BudgetFilterControls;
