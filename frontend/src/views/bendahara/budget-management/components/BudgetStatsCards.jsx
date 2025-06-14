import React from 'react';
import Card from "components/card";
import { MdAccountBalance, MdPieChart, MdMoneyOff, MdArrowUpward, MdArrowDownward } from 'react-icons/md';

const BudgetStatsCards = ({ budgetStats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            {/* Total Budget Card */}
            <Card extra="p-5 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-700 rounded-2xl" data-aos="fade-up" data-aos-delay="150">
                <div className="flex items-center">
                    <div className="rounded-xl p-3 bg-indigo-50 dark:bg-indigo-900/30">
                        <MdAccountBalance className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Anggaran</p>
                        <h4 className="text-xl font-bold text-gray-800 dark:text-white">
                            Rp {(budgetStats.totalBudget / 1000000000).toFixed(1)} M
                        </h4>
                    </div>
                    <div className="ml-auto">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center ${budgetStats.budgetTrend >= 0 ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"}`}>
                            {budgetStats.budgetTrend >= 0 ? <MdArrowUpward className="mr-1" /> : <MdArrowDownward className="mr-1" />}
                            {budgetStats.budgetTrend}%
                        </span>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="flex justify-between mb-1 text-xs text-gray-500 dark:text-gray-400">
                        <span>Progress</span>
                        <span>100%</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-navy-700 rounded-full h-2">
                        <div className="bg-indigo-500 h-2 rounded-full" style={{ width: "100%" }}></div>
                    </div>
                </div>
            </Card>

            {/* Allocated Budget Card */}
            <Card extra="p-5 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-700 rounded-2xl" data-aos="fade-up" data-aos-delay="200">
                <div className="flex items-center">
                    <div className="rounded-xl p-3 bg-green-50 dark:bg-green-900/30">
                        <MdPieChart className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Alokasi Terpakai</p>
                        <h4 className="text-xl font-bold text-gray-800 dark:text-white">
                            Rp {(budgetStats.allocationUsed / 1000000000).toFixed(1)} M
                        </h4>
                    </div>
                    <div className="ml-auto">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center ${budgetStats.allocationUsedTrend >= 0 ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"}`}>
                            {budgetStats.allocationUsedTrend >= 0 ? <MdArrowUpward className="mr-1" /> : <MdArrowDownward className="mr-1" />}
                            {budgetStats.allocationUsedTrend}%
                        </span>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="flex justify-between mb-1 text-xs text-gray-500 dark:text-gray-400">
                        <span>Progress</span>
                        <span>{budgetStats.allocationRate}%</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-navy-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${budgetStats.allocationRate}%` }}></div>
                    </div>
                </div>
            </Card>

            {/* Remaining Budget Card */}
            <Card extra="p-5 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-700 rounded-2xl" data-aos="fade-up" data-aos-delay="250">
                <div className="flex items-center">
                    <div className="rounded-xl p-3 bg-amber-50 dark:bg-amber-900/30">
                        <MdMoneyOff className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Sisa Anggaran</p>
                        <h4 className="text-xl font-bold text-gray-800 dark:text-white">
                            Rp {(budgetStats.remainingBudget / 1000000000).toFixed(1)} M
                        </h4>
                    </div>
                    <div className="ml-auto">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium flex items-center ${budgetStats.remainingBudgetTrend <= 0 ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"}`}>
                            {budgetStats.remainingBudgetTrend >= 0 ? <MdArrowUpward className="mr-1" /> : <MdArrowDownward className="mr-1" />}
                            {Math.abs(budgetStats.remainingBudgetTrend)}%
                        </span>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="flex justify-between mb-1 text-xs text-gray-500 dark:text-gray-400">
                        <span>Remaining</span>
                        <span>{(100 - budgetStats.allocationRate).toFixed(2)}%</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-navy-700 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${100 - budgetStats.allocationRate}%` }}></div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default BudgetStatsCards;
