import React from 'react';
import { MdArrowUpward, MdArrowDownward } from 'react-icons/md';

const BudgetDistributionDetail = () => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 dark:bg-navy-900 rounded-xl p-4">
                    <h6 className="font-medium text-gray-800 dark:text-white mb-3">Distribusi Per Fakultas</h6>

                    <div className="space-y-3">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600 dark:text-gray-400">F. Teknik</span>
                                <span className="font-medium text-gray-800 dark:text-gray-200">Rp 850JT (24.3%)</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2">
                                <div className="bg-pink-500 h-2 rounded-full" style={{ width: "24.3%" }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600 dark:text-gray-400">F. Ekonomi</span>
                                <span className="font-medium text-gray-800 dark:text-gray-200">Rp 700JT (20%)</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2">
                                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: "20%" }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600 dark:text-gray-400">F. Kedokteran</span>
                                <span className="font-medium text-gray-800 dark:text-gray-200">Rp 550JT (15.7%)</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2">
                                <div className="bg-cyan-500 h-2 rounded-full" style={{ width: "15.7%" }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-navy-900 rounded-xl p-4">
                    <h6 className="font-medium text-gray-800 dark:text-white mb-3">Distribusi Per Kategori</h6>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white dark:bg-navy-800 rounded-lg p-3 text-center">
                            <div className="mx-auto w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center mb-2">
                                <div className="w-5 h-5 rounded-full bg-pink-500"></div>
                            </div>
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Riset Dasar</p>
                            <p className="font-bold text-gray-900 dark:text-white">35%</p>
                        </div>

                        <div className="bg-white dark:bg-navy-800 rounded-lg p-3 text-center">
                            <div className="mx-auto w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/20 flex items-center justify-center mb-2">
                                <div className="w-5 h-5 rounded-full bg-cyan-500"></div>
                            </div>
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Riset Terapan</p>
                            <p className="font-bold text-gray-900 dark:text-white">25%</p>
                        </div>

                        <div className="bg-white dark:bg-navy-800 rounded-lg p-3 text-center">
                            <div className="mx-auto w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center mb-2">
                                <div className="w-5 h-5 rounded-full bg-amber-500"></div>
                            </div>
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Pengembangan</p>
                            <p className="font-bold text-gray-900 dark:text-white">20%</p>
                        </div>

                        <div className="bg-white dark:bg-navy-800 rounded-lg p-3 text-center">
                            <div className="mx-auto w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-2">
                                <div className="w-5 h-5 rounded-full bg-gray-500"></div>
                            </div>
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Lainnya</p>
                            <p className="font-bold text-gray-900 dark:text-white">20%</p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h6 className="font-medium text-gray-800 dark:text-white mb-3">Tren Distribusi Anggaran</h6>
                <div className="bg-gray-50 dark:bg-navy-900 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Fakultas Teknik</span>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400 flex items-center">
                            <MdArrowUpward className="h-4 w-4 mr-1" />
                            5.2%
                        </span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Fakultas Ekonomi</span>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400 flex items-center">
                            <MdArrowUpward className="h-4 w-4 mr-1" />
                            3.7%
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Fakultas Kedokteran</span>
                        <span className="text-sm font-medium text-red-600 dark:text-red-400 flex items-center">
                            <MdArrowDownward className="h-4 w-4 mr-1" />
                            2.1%
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BudgetDistributionDetail;
