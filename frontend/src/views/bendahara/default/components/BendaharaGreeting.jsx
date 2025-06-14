import React from "react";
import { MdOutlineWavingHand } from "react-icons/md";

const BendaharaGreeting = () => {
    // Get current time for greeting
    const currentHour = new Date().getHours();
    let greeting;

    if (currentHour < 12) {
        greeting = "Selamat Pagi";
    } else if (currentHour < 15) {
        greeting = "Selamat Siang";
    } else if (currentHour < 18) {
        greeting = "Selamat Sore";
    } else {
        greeting = "Selamat Malam";
    }

    return (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center">
                <div className="mr-4 h-14 w-14 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center shadow-md">
                    <MdOutlineWavingHand className="h-8 w-8 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-navy-700 dark:text-white">
                        {greeting}, Bendahara
                    </h1>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                        Selamat datang kembali di dashboard pengelolaan keuangan penelitian
                    </p>
                </div>
            </div>

            <div className="mt-4 lg:mt-0">
                <div className="rounded-xl bg-gradient-to-r from-blue-50 to-teal-50 dark:from-navy-800 dark:to-navy-700 px-4 py-3 shadow-sm border border-gray-100 dark:border-navy-700">
                    <div className="flex items-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.5001 6H3.5" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M18.8334 8.5L18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M9.5 11L10 16" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M14.5 11L14 16" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M6.5 6C6.55588 6 6.58382 6 6.60915 5.99936C7.43259 5.97849 8.15902 5.45491 8.43922 4.68032C8.44784 4.65649 8.45667 4.62999 8.47434 4.57697L8.57143 4.28571C8.65431 4.03708 8.69575 3.91276 8.75071 3.8072C8.97001 3.38607 9.37574 3.09364 9.84461 3.01877C9.96213 3 10.0932 3 10.3553 3H13.6447C13.9068 3 14.0379 3 14.1554 3.01877C14.6243 3.09364 15.03 3.38607 15.2493 3.8072C15.3043 3.91276 15.3457 4.03708 15.4286 4.28571L15.5257 4.57697C15.5433 4.62992 15.5522 4.65651 15.5608 4.68032C15.841 5.45491 16.5674 5.97849 17.3909 5.99936C17.4162 6 17.4441 6 17.5 6" stroke="#0EA5E9" strokeWidth="1.5" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-xs text-gray-600 dark:text-gray-400">Sisa Anggaran Penelitian</p>
                            <div className="flex items-baseline">
                                <p className="text-lg font-bold text-gray-800 dark:text-white">Rp 1,250,000,000</p>
                                <p className="ml-1 text-xs text-green-600 dark:text-green-400">(45% dari total)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BendaharaGreeting;
