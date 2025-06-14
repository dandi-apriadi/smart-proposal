import React from 'react';
import { MdNotifications, MdOutlineBarChart } from "react-icons/md";

const FundMonitoringDetail = () => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 dark:bg-navy-900 rounded-xl p-4">
                    <h6 className="font-medium text-gray-800 dark:text-white mb-3 flex items-center">
                        <MdNotifications className="h-4 w-4 text-amber-500 mr-2" />
                        Notifikasi Terakhir
                    </h6>
                    <div className="space-y-2">
                        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-lg p-3 text-sm">
                            <p className="font-medium text-amber-800 dark:text-amber-400">Penggunaan Dana Tinggi</p>
                            <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Fakultas Teknik telah menggunakan 85% dana dialokasikan</p>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-lg p-3 text-sm">
                            <p className="font-medium text-blue-800 dark:text-blue-400">Dana Tidak Terpakai</p>
                            <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">Dana riset AI belum digunakan: Rp 120 juta</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-navy-900 rounded-xl p-4 flex flex-col justify-between">
                    <h6 className="font-medium text-gray-800 dark:text-white mb-3 flex items-center">
                        <MdOutlineBarChart className="h-4 w-4 text-cyan-500 mr-2" />
                        Penggunaan Dana Real-time
                    </h6>

                    <div className="flex-grow flex items-center justify-center">
                        <div className="relative">
                            <div className="w-28 h-28 rounded-full border-8 border-gray-200 dark:border-gray-700"></div>
                            <div className="w-28 h-28 rounded-full border-8 border-cyan-500 absolute top-0 left-0" style={{
                                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
                                transform: 'rotate(282deg)'
                            }}></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                <p className="text-2xl font-bold text-gray-800 dark:text-white">78.6%</p>
                                <p className="text-xs text-gray-500">Terpakai</p>
                            </div>
                        </div>
                    </div>

                    <div className="text-center text-xs text-gray-600 dark:text-gray-400 mt-3">
                        Terakhir diperbarui: Hari ini, 14:35 WIB
                    </div>
                </div>
            </div>

            <div>
                <h6 className="font-medium text-gray-800 dark:text-white mb-2">Fakultas dengan Penggunaan Tertinggi</h6>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-cyan-500 mr-2"></div>
                            <span className="text-sm text-gray-800 dark:text-gray-200">Fakultas Teknik</span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Rp 460JT (85%)</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
                            <span className="text-sm text-gray-800 dark:text-gray-200">Fakultas Ekonomi</span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Rp 380JT (78%)</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                            <span className="text-sm text-gray-800 dark:text-gray-200">Fakultas Kedokteran</span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Rp 350JT (64%)</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FundMonitoringDetail;
