import React from 'react';
import { MdOutlineAttachMoney, MdOutlineBarChart } from 'react-icons/md';

const BudgetHero = ({ budgetStats }) => {
    return (
        <div className="relative mb-10 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-3xl p-8 text-white overflow-hidden" data-aos="fade-up">
            <div className="absolute inset-0 bg-pattern-dots opacity-10"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full transform translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white opacity-10 rounded-full transform -translate-x-10 translate-y-10"></div>

            <div className="relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="mb-6 lg:mb-0">
                        <h1 className="text-3xl font-bold mb-2">Manajemen Anggaran</h1>
                        <p className="text-lg text-indigo-100 mb-6">
                            Kelola dan monitor anggaran penelitian secara komprehensif
                        </p>

                        <div className="inline-flex space-x-2 mb-2">
                            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 text-sm">
                                <span className="text-white/70">Tahun Anggaran:</span>
                                <span className="text-white font-medium ml-1">2025</span>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 text-sm">
                                <span className="text-white/70">Periode:</span>
                                <span className="text-white font-medium ml-1">Jan-Des</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-[180px]">
                            <div className="flex items-center">
                                <MdOutlineAttachMoney className="h-8 w-8 text-white/80" />
                                <div className="ml-3">
                                    <p className="text-sm text-white/80">Total Budget</p>
                                    <h3 className="text-xl font-bold">Rp {(budgetStats.totalBudget / 1000000000).toFixed(1)} M</h3>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-[180px]">
                            <div className="flex items-center">
                                <MdOutlineBarChart className="h-8 w-8 text-white/80" />
                                <div className="ml-3">
                                    <p className="text-sm text-white/80">Terpakai</p>
                                    <h3 className="text-xl font-bold">{budgetStats.allocationRate}%</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BudgetHero;
