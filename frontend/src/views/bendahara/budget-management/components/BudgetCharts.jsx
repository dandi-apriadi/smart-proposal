import React from 'react';
import Card from "components/card";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer,
    AreaChart, Area
} from 'recharts';
import { MdOutlineInsertChart, MdOutlineShowChart } from 'react-icons/md';

const BudgetCharts = ({ monthlyBudgetData, facultyBudgetData }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8">
            {/* Monthly Budget Chart - Modern Design */}
            <Card extra="p-6 col-span-1 lg:col-span-8 rounded-2xl border border-gray-100 dark:border-navy-700 hover:shadow-lg transition-all" data-aos="fade-up" data-aos-delay="300">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <h5 className="text-lg font-bold text-gray-800 dark:text-white mb-2 md:mb-0 flex items-center">
                        <MdOutlineInsertChart className="h-5 w-5 text-indigo-500 mr-2" />
                        Anggaran vs Penggunaan Dana Per Bulan
                    </h5>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">Alokasi</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">Penggunaan</span>
                        </div>
                    </div>
                </div>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={monthlyBudgetData}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorAllocated" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4318FF" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#4318FF" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorUsed" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6AD2FF" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#6AD2FF" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                            <XAxis dataKey="name" stroke="#A0AEC0" />
                            <YAxis tickFormatter={(value) => `${value / 1000000}M`} stroke="#A0AEC0" />
                            <Tooltip formatter={(value) => [`Rp ${value.toLocaleString()}`, undefined]} />
                            <Area type="monotone" dataKey="allocated" name="Alokasi" stroke="#4318FF" strokeWidth={3} fillOpacity={1} fill="url(#colorAllocated)" activeDot={{ r: 6, strokeWidth: 0 }} />
                            <Area type="monotone" dataKey="used" name="Penggunaan" stroke="#6AD2FF" strokeWidth={3} fillOpacity={1} fill="url(#colorUsed)" activeDot={{ r: 6, strokeWidth: 0 }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            {/* Faculty Budget Distribution - Modern Design */}
            <Card extra="p-6 col-span-1 lg:col-span-4 rounded-2xl border border-gray-100 dark:border-navy-700 hover:shadow-lg transition-all" data-aos="fade-up" data-aos-delay="350">
                <h5 className="text-lg font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                    <MdOutlineShowChart className="h-5 w-5 text-indigo-500 mr-2" />
                    Penggunaan Dana per Fakultas
                </h5>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={facultyBudgetData}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E2E8F0" />
                            <XAxis type="number" tickFormatter={(value) => `${value / 1000000}M`} stroke="#A0AEC0" />
                            <YAxis dataKey="name" type="category" width={80} stroke="#A0AEC0" />
                            <Tooltip formatter={(value) => [`Rp ${value.toLocaleString()}`, undefined]} />
                            <Bar dataKey="budget" name="Anggaran" fill="#4318FF" barSize={18} radius={[0, 4, 4, 0]}>
                                <defs>
                                    <linearGradient id="budgetGradient" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#4318FF" />
                                        <stop offset="100%" stopColor="#4318FF" stopOpacity={0.7} />
                                    </linearGradient>
                                </defs>
                            </Bar>
                            <Bar dataKey="used" name="Terpakai" fill="#6AD2FF" barSize={18} radius={[0, 4, 4, 0]}>
                                <defs>
                                    <linearGradient id="usedGradient" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#6AD2FF" />
                                        <stop offset="100%" stopColor="#6AD2FF" stopOpacity={0.7} />
                                    </linearGradient>
                                </defs>
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
};

export default BudgetCharts;
