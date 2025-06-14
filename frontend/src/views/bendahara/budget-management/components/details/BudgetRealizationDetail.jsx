import React from 'react';
import { MdCalendarToday, MdFileDownload } from 'react-icons/md';

const BudgetRealizationDetail = () => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 dark:bg-navy-900 rounded-xl p-4">
                    <h6 className="font-medium text-gray-800 dark:text-white mb-3">Status Laporan Terjadwal</h6>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center bg-white dark:bg-navy-800 p-3 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-800 dark:text-white">Realisasi Triwulan 1</p>
                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                    <MdCalendarToday className="h-3 w-3 mr-1" />
                                    <span>31 Mar 2025</span>
                                    <span className="mx-1">•</span>
                                    <span>PDF, XLS</span>
                                </div>
                            </div>
                            <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs">
                                Selesai
                            </span>
                        </div>

                        <div className="flex justify-between items-center bg-white dark:bg-navy-800 p-3 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-800 dark:text-white">Realisasi Triwulan 2</p>
                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                    <MdCalendarToday className="h-3 w-3 mr-1" />
                                    <span>30 Jun 2025</span>
                                    <span className="mx-1">•</span>
                                    <span>PDF, XLS</span>
                                </div>
                            </div>
                            <span className="px-2 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-full text-xs">
                                Pending
                            </span>
                        </div>

                        <div className="flex justify-between items-center bg-white dark:bg-navy-800 p-3 rounded-lg">
                            <div>
                                <p className="font-medium text-gray-800 dark:text-white">Realisasi Tahunan</p>
                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                    <MdCalendarToday className="h-3 w-3 mr-1" />
                                    <span>31 Des 2025</span>
                                    <span className="mx-1">•</span>
                                    <span>PDF, XLS, PPT</span>
                                </div>
                            </div>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 dark:bg-navy-700 dark:text-gray-400 rounded-full text-xs">
                                Belum
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-navy-900 rounded-xl p-4">
                    <h6 className="font-medium text-gray-800 dark:text-white mb-3">Realisasi Anggaran</h6>

                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center mb-1">
                                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">Q1 2025</span>
                                <span className="text-xs ml-auto font-medium text-gray-800 dark:text-gray-200">100%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2 mr-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: "100%" }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center mb-1">
                                <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">Q2 2025</span>
                                <span className="text-xs ml-auto font-medium text-gray-800 dark:text-gray-200">67%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2 mr-2">
                                <div className="bg-amber-500 h-2 rounded-full" style={{ width: "67%" }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center mb-1">
                                <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">Q3 2025</span>
                                <span className="text-xs ml-auto font-medium text-gray-800 dark:text-gray-200">0%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2 mr-2">
                                <div className="bg-gray-400 h-2 rounded-full" style={{ width: "0%" }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center mb-1">
                                <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">Q4 2025</span>
                                <span className="text-xs ml-auto font-medium text-gray-800 dark:text-gray-200">0%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2 mr-2">
                                <div className="bg-gray-400 h-2 rounded-full" style={{ width: "0%" }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h6 className="font-medium text-gray-800 dark:text-white mb-2">Ekspor Format Laporan</h6>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <button className="flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 dark:bg-navy-900 dark:hover:bg-navy-800 rounded-lg p-3 transition-colors">
                        <MdFileDownload className="h-8 w-8 text-blue-500 mb-1" />
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">PDF</span>
                    </button>

                    <button className="flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 dark:bg-navy-900 dark:hover:bg-navy-800 rounded-lg p-3 transition-colors">
                        <MdFileDownload className="h-8 w-8 text-green-500 mb-1" />
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Excel</span>
                    </button>

                    <button className="flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 dark:bg-navy-900 dark:hover:bg-navy-800 rounded-lg p-3 transition-colors">
                        <MdFileDownload className="h-8 w-8 text-red-500 mb-1" />
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">PowerPoint</span>
                    </button>

                    <button className="flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 dark:bg-navy-900 dark:hover:bg-navy-800 rounded-lg p-3 transition-colors">
                        <MdFileDownload className="h-8 w-8 text-indigo-500 mb-1" />
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">CSV</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default BudgetRealizationDetail;
