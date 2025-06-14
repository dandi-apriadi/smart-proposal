import React from 'react';
import Card from "components/card";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { MdStackedLineChart } from 'react-icons/md';

const BudgetTrendChart = ({ monthlyBudgetData }) => {
    return (
        <Card extra="p-6 rounded-2xl border border-gray-100 dark:border-navy-700 hover:shadow-lg transition-all" data-aos="fade-up" data-aos-delay="700">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h5 className="text-lg font-bold text-gray-800 dark:text-white mb-2 md:mb-0 flex items-center">
                    <MdStackedLineChart className="h-5 w-5 text-indigo-500 mr-2" />
                    Tren Penggunaan Anggaran
                </h5>
                <div className="flex items-center gap-1 bg-gray-50 dark:bg-navy-900 p-1 rounded-lg">
                    <button className="px-3 py-1 text-xs rounded-md bg-indigo-500 text-white">2025</button>
                    <button className="px-3 py-1 text-xs rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-navy-800">2024</button>
                    <button className="px-3 py-1 text-xs rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-navy-800">2023</button>
                </div>
            </div>
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={monthlyBudgetData}
                        margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                        <XAxis dataKey="name" stroke="#A0AEC0" />
                        <YAxis tickFormatter={(value) => `${value / 1000000}M`} stroke="#A0AEC0" />
                        <Tooltip formatter={(value) => [`Rp ${value.toLocaleString()}`, undefined]}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                        />
                        <Legend iconType="circle" iconSize={10} />
                        <defs>
                            <linearGradient id="allocatedGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#4318FF" />
                                <stop offset="100%" stopColor="#6C47FF" />
                            </linearGradient>
                            <linearGradient id="usedGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#6AD2FF" />
                                <stop offset="100%" stopColor="#38B6FF" />
                            </linearGradient>
                        </defs>
                        <Line
                            type="monotone"
                            dataKey="allocated"
                            name="Alokasi"
                            stroke="url(#allocatedGradient)"
                            strokeWidth={3}
                            dot={{ r: 6, fill: '#4318FF', strokeWidth: 3, stroke: '#fff' }}
                            activeDot={{ r: 8, strokeWidth: 0 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="used"
                            name="Penggunaan"
                            stroke="url(#usedGradient)"
                            strokeWidth={3}
                            dot={{ r: 6, fill: '#6AD2FF', strokeWidth: 3, stroke: '#fff' }}
                            activeDot={{ r: 8, strokeWidth: 0 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};

export default BudgetTrendChart;
