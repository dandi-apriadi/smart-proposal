import React from 'react';

const RemainingBudgetDetail = () => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 dark:bg-navy-900 rounded-xl p-4">
                    <div className="mb-4 text-center">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Sisa Anggaran</div>
                        <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">Rp 750.000.000</div>
                        <div className="text-sm text-gray-500">(21.43% dari total anggaran)</div>
                    </div>

                    <div className="relative pt-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Sisa</span>
                            <span>21.43%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-3">
                            <div className="bg-amber-500 h-3 rounded-full" style={{ width: "21.43%" }}></div>
                        </div>

                        <div className="mt-4 flex justify-between text-xs font-medium">
                            <div className="text-center">
                                <div className="text-gray-600 dark:text-gray-400">Terpakai</div>
                                <div className="text-green-600 dark:text-green-400">78.57%</div>
                            </div>
                            <div className="text-center">
                                <div className="text-gray-600 dark:text-gray-400">Sisa</div>
                                <div className="text-amber-600 dark:text-amber-400">21.43%</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-navy-900 rounded-xl p-4">
                    <h6 className="font-medium text-gray-800 dark:text-white mb-3">Rekomendasi Penggunaan</h6>

                    <div className="space-y-3">
                        <div className="bg-white dark:bg-navy-800 rounded-lg p-3">
                            <div className="flex justify-between">
                                <p className="font-medium text-gray-800 dark:text-white">Alokasi Penelitian Unggulan</p>
                                <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">Prioritas Tinggi</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Rp 300.000.000 (40% dari sisa)</p>
                        </div>

                        <div className="bg-white dark:bg-navy-800 rounded-lg p-3">
                            <div className="flex justify-between">
                                <p className="font-medium text-gray-800 dark:text-white">Dana Cadangan</p>
                                <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">Prioritas Sedang</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Rp 200.000.000 (26.7% dari sisa)</p>
                        </div>

                        <div className="bg-white dark:bg-navy-800 rounded-lg p-3">
                            <div className="flex justify-between">
                                <p className="font-medium text-gray-800 dark:text-white">Program Penelitian Baru</p>
                                <span className="text-xs px-2 py-0.5 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">Prioritas Tinggi</span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Rp 250.000.000 (33.3% dari sisa)</p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h6 className="font-medium text-gray-800 dark:text-white mb-2">Status Dana yang Dapat Dialokasi</h6>
                <div className="bg-gray-50 dark:bg-navy-900 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">Dapat Dialokasikan</span>
                        </div>
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Rp 600.000.000 (80%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">Tidak Dapat Dialokasikan</span>
                        </div>
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Rp 150.000.000 (20%)</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RemainingBudgetDetail;
