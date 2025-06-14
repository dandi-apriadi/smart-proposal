import React from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, Sector,
    RadialBarChart, RadialBar
} from 'recharts';
import Card from "components/card";
import { Link } from "react-router-dom";
import { MdBarChart, MdOutlineArrowForward } from "react-icons/md";

const FundingSummary = ({ financialOverview = {} }) => {
    // This color array is for the pie chart - updated with better contrasting colors
    const COLORS = [
        "#4318FF", // Primary - allocated (darker blue)
        "#22DDAA", // Secondary - disbursed (teal)
        "#FF8A65", // Light - remaining (coral)
    ];

    // Default faculty distribution data when none is provided
    const defaultFacultyData = [
        { faculty: "Fakultas Teknik", allocated: 350000000, disbursed: 230000000 },
        { faculty: "Fakultas Ekonomi", allocated: 280000000, disbursed: 175000000 },
        { faculty: "Fakultas Kedokteran", allocated: 420000000, disbursed: 310000000 },
        { faculty: "Fakultas Hukum", allocated: 180000000, disbursed: 120000000 },
        { faculty: "Fakultas MIPA", allocated: 250000000, disbursed: 190000000 }
    ];

    // Calculate default financial overview data
    const defaultTotalAllocated = 1480000000; // Sum of all faculty allocations
    const defaultTotalDisbursed = 1025000000; // About 70% of total allocation
    const defaultAllocatedGrowth = 8.5; // 8.5% growth compared to previous period
    const defaultDisbursedGrowth = 12.3; // 12.3% growth in disbursements

    // Default allocation categories data
    const defaultAllocationData = [
        {
            name: 'Penelitian',
            value: 420000000,
            fill: '#8884d8',
            percentage: 35
        },
        {
            name: 'Pengabdian',
            value: 300000000,
            fill: '#83a6ed',
            percentage: 25
        },
        {
            name: 'Inovasi',
            value: 240000000,
            fill: '#8dd1e1',
            percentage: 20
        },
        {
            name: 'Beasiswa',
            value: 180000000,
            fill: '#82ca9d',
            percentage: 15
        },
        {
            name: 'Operasional',
            value: 60000000,
            fill: '#ffc658',
            percentage: 5
        },
    ];

    // Calculate percentages for the pie chart with default values if undefined
    const totalAllocated = financialOverview?.totalAllocated || defaultTotalAllocated;
    const totalDisbursed = financialOverview?.totalDisbursed || defaultTotalDisbursed;
    const totalRemaining = totalAllocated - totalDisbursed;
    const allocatedGrowth = financialOverview?.allocatedGrowth || defaultAllocatedGrowth;
    const disbursedGrowth = financialOverview?.disbursedGrowth || defaultDisbursedGrowth;
    const facultyDistribution = financialOverview?.facultyDistribution?.length > 0
        ? financialOverview.facultyDistribution
        : defaultFacultyData;

    const allocationCategories = financialOverview?.allocationCategories?.length > 0
        ? financialOverview.allocationCategories
        : defaultAllocationData;

    const pieData = [
        { name: "Dialokasikan", value: totalAllocated },
        { name: "Dicairkan", value: totalDisbursed },
        { name: "Sisa", value: totalRemaining },
    ];

    // Adding state for active pie sector
    const [activeIndex, setActiveIndex] = React.useState(0);

    // Custom renderer for active pie sector with animation
    const renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
            fill, payload, percent, value } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';

        return (
            <g>
                <text x={cx} y={cy} dy={-4} textAnchor="middle" fill={fill} className="text-xs font-medium">
                    {payload.name}
                </text>
                <text x={cx} y={cy} dy={15} textAnchor="middle" fill="#333" className="text-xs">
                    {`${(percent * 100).toFixed(1)}%`}
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius + 6}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
                <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey + 5} textAnchor={textAnchor} fill="#333" className="text-xs">
                    {`Rp ${value.toLocaleString()}`}
                </text>
            </g>
        );
    };

    return (
        <Card extra="p-4">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <div>
                    <div className="flex items-center">
                        <MdBarChart className="h-6 w-6 text-brand-500 mr-2" />
                        <h4 className="text-lg font-bold text-navy-700 dark:text-white">
                            Ringkasan Pembiayaan
                        </h4>
                    </div>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Informasi pembiayaan aktif tahun 2025
                    </p>
                </div>
                <Link to="/bendahara/funding-management" className="mt-2 md:mt-0 flex items-center text-brand-500 font-medium text-sm hover:underline">
                    Manajemen Pembiayaan
                    <MdOutlineArrowForward className="ml-1 h-4 w-4" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Financial stats on the left - 7 columns */}
                <div className="md:col-span-7 space-y-6">
                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-gray-50 dark:bg-navy-800 p-3 rounded-xl">
                            <p className="text-xs text-gray-600 dark:text-gray-400">Total Alokasi</p>
                            <h5 className="text-lg font-bold text-navy-700 dark:text-white mt-1">
                                Rp {totalAllocated.toLocaleString()}
                            </h5>
                            <div className="flex items-center mt-1">
                                <span className="text-xs font-medium text-green-600 dark:text-green-400">
                                    {allocatedGrowth}%
                                </span>
                                <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                                    vs periode lalu
                                </span>
                            </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-navy-800 p-3 rounded-xl">
                            <p className="text-xs text-gray-600 dark:text-gray-400">Total Dicairkan</p>
                            <h5 className="text-lg font-bold text-navy-700 dark:text-white mt-1">
                                Rp {totalDisbursed.toLocaleString()}
                            </h5>
                            <div className="flex items-center mt-1">
                                <span className="text-xs font-medium text-green-600 dark:text-green-400">
                                    {disbursedGrowth}%
                                </span>
                                <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                                    vs periode lalu
                                </span>
                            </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-navy-800 p-3 rounded-xl">
                            <p className="text-xs text-gray-600 dark:text-gray-400">Sisa Dana</p>
                            <h5 className="text-lg font-bold text-navy-700 dark:text-white mt-1">
                                Rp {totalRemaining.toLocaleString()}
                            </h5>
                            <div className="flex items-center mt-1">
                                <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                                    {totalAllocated > 0 ? Math.round(totalRemaining / totalAllocated * 100) : 0}%
                                </span>
                                <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
                                    dari total
                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Distribusi Dana per Fakultas
                        </h5>
                        <div className="h-60">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={facultyDistribution}
                                    layout="vertical"
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                    <XAxis type="number" domain={[0, 'dataMax + 50000000']} tickFormatter={(value) => `${value / 1000000}M`} />
                                    <YAxis dataKey="faculty" type="category" width={100} />
                                    <Tooltip formatter={(value) => [`Rp ${value.toLocaleString()}`, 'Dana']} />
                                    <Bar dataKey="allocated" fill="#4318FF" name="Alokasi" barSize={10} radius={[0, 4, 4, 0]} />
                                    <Bar dataKey="disbursed" fill="#6AD2FF" name="Dicairkan" barSize={10} radius={[0, 4, 4, 0]} />
                                    <Legend />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Pie chart on the right - 5 columns - Enhanced version */}
                <div className="md:col-span-5">
                    <div className="flex flex-col justify-center h-full">
                        <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-center">
                            Status Alokasi Dana
                        </h5>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        activeIndex={activeIndex}
                                        activeShape={renderActiveShape}
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        outerRadius={90}
                                        innerRadius={60}
                                        fill="#8884d8"
                                        dataKey="value"
                                        onMouseEnter={(_, index) => setActiveIndex(index)}
                                        animationBegin={200}
                                        animationDuration={1200}
                                        animationEasing="ease-out"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                                stroke="white"
                                                strokeWidth={1}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value) => `Rp ${value.toLocaleString()}`}
                                        contentStyle={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                            borderRadius: '6px',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                            border: 'none',
                                            padding: '8px 12px'
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mt-4">
                            {COLORS.map((color, index) => {
                                const item = pieData[index];
                                return (
                                    <div
                                        key={`legend-${index}`}
                                        className="flex flex-col items-center"
                                        onClick={() => setActiveIndex(index)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="flex items-center">
                                            <div
                                                className="w-3 h-3 rounded-full mr-1.5"
                                                style={{ backgroundColor: color }}
                                            ></div>
                                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                                {item.name}
                                            </span>
                                        </div>
                                        <p className="text-sm font-bold text-navy-700 dark:text-white mt-1">
                                            Rp {item.value.toLocaleString()}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {totalAllocated > 0 ? Math.round((item.value / totalAllocated) * 100) : 0}%
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* New Fund Allocation Categories Chart */}
            <div className="mt-6">
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Alokasi Dana Berdasarkan Kategori
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Radial bar chart */}
                    <div className="md:col-span-5">
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadialBarChart
                                    cx="50%"
                                    cy="50%"
                                    innerRadius="20%"
                                    outerRadius="90%"
                                    barSize={20}
                                    data={allocationCategories}
                                    startAngle={180}
                                    endAngle={0}
                                >
                                    <RadialBar
                                        minAngle={15}
                                        label={{ position: 'insideStart', fill: '#fff', fontWeight: 'bold', fontSize: 12 }}
                                        background
                                        clockWise
                                        dataKey="value"
                                        cornerRadius={8}
                                    />
                                    <Legend
                                        iconSize={10}
                                        layout="vertical"
                                        verticalAlign="middle"
                                        wrapperStyle={{ lineHeight: '24px' }}
                                        align="right"
                                        formatter={(value) => <span className="text-xs font-medium">{value}</span>}
                                    />
                                    <Tooltip
                                        formatter={(value, name) => [`Rp ${value.toLocaleString()}`, name]}
                                        contentStyle={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                            borderRadius: '6px',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                            border: 'none',
                                            padding: '8px 12px'
                                        }}
                                    />
                                </RadialBarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Allocation stats */}
                    <div className="md:col-span-7">
                        <div className="grid grid-cols-1 gap-4">
                            {allocationCategories.map((category, index) => (
                                <div key={`category-${index}`} className="bg-gray-50 dark:bg-navy-800 p-3 rounded-xl">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {category.name}
                                            </p>
                                            <h5 className="text-base font-bold text-navy-700 dark:text-white mt-1">
                                                Rp {category.value.toLocaleString()}
                                            </h5>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="text-right">
                                                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                                                    {category.percentage}% dari total
                                                </span>
                                            </div>
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{ backgroundColor: category.fill }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="w-full bg-gray-200 dark:bg-navy-700 rounded-full h-1.5 mt-2">
                                        <div
                                            className="h-1.5 rounded-full"
                                            style={{
                                                width: `${category.percentage}%`,
                                                backgroundColor: category.fill
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default FundingSummary;
