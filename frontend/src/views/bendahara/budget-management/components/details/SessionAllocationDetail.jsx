import React from 'react';

const SessionAllocationDetail = () => {
    return (
        <>
            <div className="mb-4">
                <h6 className="font-medium text-gray-800 dark:text-white mb-2">Sesi Aktif</h6>
                <div className="grid gap-3">
                    <div className="flex justify-between items-center bg-gray-50 dark:bg-navy-900 p-3 rounded-lg">
                        <div>
                            <h6 className="font-medium">Semester 1 - 2025</h6>
                            <p className="text-sm text-gray-500">Rp 1.2M - Terpakai: 100%</p>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full text-xs">Selesai</span>
                    </div>

                    <div className="flex justify-between items-center bg-gray-50 dark:bg-navy-900 p-3 rounded-lg">
                        <div>
                            <h6 className="font-medium">Semester 2 - 2025</h6>
                            <p className="text-sm text-gray-500">Rp 1.5M - Terpakai: 65%</p>
                        </div>
                        <span className="px-2 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-full text-xs">Berjalan</span>
                    </div>

                    <div className="flex justify-between items-center bg-gray-50 dark:bg-navy-900 p-3 rounded-lg">
                        <div>
                            <h6 className="font-medium">Khusus RnD - 2025</h6>
                            <p className="text-sm text-gray-500">Rp 0.8M - Terpakai: 30%</p>
                        </div>
                        <span className="px-2 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 rounded-full text-xs">Berjalan</span>
                    </div>
                </div>
            </div>

            <div>
                <h6 className="font-medium text-gray-800 dark:text-white mb-2">Statistik Alokasi</h6>
                <div className="bg-gray-50 dark:bg-navy-900 p-4 rounded-lg space-y-4">
                    <div>
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Total Alokasi</span>
                            <span>Rp 3.5M</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2">
                            <div className="bg-indigo-500 h-2 rounded-full" style={{ width: "100%" }}></div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Total Terpakai</span>
                            <span>Rp 2.75M (78.57%)</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: "78.57%" }}></div>
                        </div>
                    </div>

                    <div>
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Total Sisa</span>
                            <span>Rp 750JT (21.43%)</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-2">
                            <div className="bg-amber-500 h-2 rounded-full" style={{ width: "21.43%" }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SessionAllocationDetail;
