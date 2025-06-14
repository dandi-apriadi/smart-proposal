import React, { useState, useEffect } from 'react';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer, RadarChart, Radar, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import { FiInfo, FiArrowUp, FiArrowDown, FiFilter, FiDownload } from 'react-icons/fi';

// Sample data for charts and metrics
const performanceHistory = [
    { month: 'Jan', accuracy: 86.4, precision: 83.2, recall: 81.7, f1Score: 82.4 },
    { month: 'Feb', accuracy: 87.1, precision: 84.5, recall: 82.3, f1Score: 83.4 },
    { month: 'Mar', accuracy: 88.2, precision: 85.6, recall: 84.0, f1Score: 84.8 },
    { month: 'Apr', accuracy: 89.0, precision: 86.3, recall: 85.1, f1Score: 85.7 },
    { month: 'Mei', accuracy: 91.2, precision: 88.7, recall: 87.4, f1Score: 88.0 },
    { month: 'Jun', accuracy: 92.5, precision: 89.8, recall: 88.9, f1Score: 89.3 }
];

const featureImportance = [
    { name: 'Format Cover', importance: 0.18 },
    { name: 'Latar Belakang', importance: 0.24 },
    { name: 'Struktur Tujuan', importance: 0.14 },
    { name: 'Detail Anggaran', importance: 0.22 },
    { name: 'Timeline Kegiatan', importance: 0.12 },
    { name: 'Referensi', importance: 0.04 },
    { name: 'Format Lampiran', importance: 0.06 }
];

const confusionMatrix = {
    truePositive: 345,
    falsePositive: 42,
    trueNegative: 278,
    falseNegative: 35
};

const predictionDistribution = [
    { name: 'Valid', value: 623 },
    { name: 'Tidak Valid', value: 377 }
];

const learningCurve = [
    { sampleSize: 100, trainAccuracy: 98.7, validationAccuracy: 83.2 },
    { sampleSize: 200, trainAccuracy: 97.5, validationAccuracy: 86.4 },
    { sampleSize: 300, trainAccuracy: 96.8, validationAccuracy: 88.3 },
    { sampleSize: 400, trainAccuracy: 96.3, validationAccuracy: 90.1 },
    { sampleSize: 500, trainAccuracy: 95.8, validationAccuracy: 91.3 },
    { sampleSize: 600, trainAccuracy: 95.5, validationAccuracy: 92.0 },
    { sampleSize: 700, trainAccuracy: 95.3, validationAccuracy: 92.5 },
    { sampleSize: 800, trainAccuracy: 95.1, validationAccuracy: 93.0 }
];

const radarData = [
    { metric: 'Accuracy', A: 90, fullMark: 100 },
    { metric: 'Precision', A: 88, fullMark: 100 },
    { metric: 'Recall', A: 86, fullMark: 100 },
    { metric: 'F1-Score', A: 87, fullMark: 100 },
    { metric: 'AUC', A: 92, fullMark: 100 }
];

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#0ea5e9'];

const MLPerformance = () => {
    const [timeRange, setTimeRange] = useState('6m'); // 1m, 3m, 6m, 1y, all
    const [isLoading, setIsLoading] = useState(false);

    // Calculate metrics
    const accuracy = (confusionMatrix.truePositive + confusionMatrix.trueNegative) /
        (confusionMatrix.truePositive + confusionMatrix.trueNegative +
            confusionMatrix.falsePositive + confusionMatrix.falseNegative) * 100;

    const precision = (confusionMatrix.truePositive) /
        (confusionMatrix.truePositive + confusionMatrix.falsePositive) * 100;

    const recall = (confusionMatrix.truePositive) /
        (confusionMatrix.truePositive + confusionMatrix.falseNegative) * 100;

    const f1Score = 2 * (precision * recall) / (precision + recall);

    // AOS initialization
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const AOS = require('aos');
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
            });
            AOS.refresh();
        }

        // Simulate loading of data
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    // Handle time range change
    const handleTimeRangeChange = (range) => {
        setIsLoading(true);
        setTimeRange(range);

        // Simulate data loading
        setTimeout(() => {
            setIsLoading(false);
        }, 800);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 border-b border-gray-100">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Performance Model Random Forest</h2>
                    <p className="text-gray-500 text-sm">
                        Metrik dan visualisasi performa model machine learning
                    </p>
                </div>

                <div className="mt-4 md:mt-0 flex items-center space-x-2">
                    <div className="flex bg-gray-100 rounded-lg overflow-hidden">
                        <button
                            className={`py-1 px-3 text-xs font-medium ${timeRange === '1m' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                            onClick={() => handleTimeRangeChange('1m')}
                        >
                            1 Bulan
                        </button>
                        <button
                            className={`py-1 px-3 text-xs font-medium ${timeRange === '3m' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                            onClick={() => handleTimeRangeChange('3m')}
                        >
                            3 Bulan
                        </button>
                        <button
                            className={`py-1 px-3 text-xs font-medium ${timeRange === '6m' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                            onClick={() => handleTimeRangeChange('6m')}
                        >
                            6 Bulan
                        </button>
                        <button
                            className={`py-1 px-3 text-xs font-medium ${timeRange === '1y' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                            onClick={() => handleTimeRangeChange('1y')}
                        >
                            1 Tahun
                        </button>
                    </div>

                    <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-600">
                        <FiDownload size={16} />
                    </button>

                    <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-600">
                        <FiFilter size={16} />
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                </div>
            ) : (
                <div className="p-6">
                    {/* Key Metrics Cards */}
                    <div
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
                        data-aos="fade-up"
                    >
                        <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-500">Accuracy</span>
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${accuracy >= 90 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                    }`}>
                                    <FiArrowUp className="inline mr-1" size={10} />
                                    +2.3%
                                </span>
                            </div>
                            <div className="text-2xl font-bold text-gray-800">{accuracy.toFixed(1)}%</div>
                            <div className="mt-2 text-xs text-gray-500">
                                Rasio prediksi benar dari total prediksi
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-500">Precision</span>
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${precision >= 90 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                    }`}>
                                    <FiArrowUp className="inline mr-1" size={10} />
                                    +1.1%
                                </span>
                            </div>
                            <div className="text-2xl font-bold text-gray-800">{precision.toFixed(1)}%</div>
                            <div className="mt-2 text-xs text-gray-500">
                                Rasio true positives dari prediksi positif
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-500">Recall</span>
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${recall >= 90 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                    }`}>
                                    <FiArrowUp className="inline mr-1" size={10} />
                                    +3.8%
                                </span>
                            </div>
                            <div className="text-2xl font-bold text-gray-800">{recall.toFixed(1)}%</div>
                            <div className="mt-2 text-xs text-gray-500">
                                Rasio true positives yang terdeteksi
                            </div>
                        </div>

                        <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-500">F1 Score</span>
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${f1Score >= 90 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                                    }`}>
                                    <FiArrowUp className="inline mr-1" size={10} />
                                    +2.2%
                                </span>
                            </div>
                            <div className="text-2xl font-bold text-gray-800">{f1Score.toFixed(1)}%</div>
                            <div className="mt-2 text-xs text-gray-500">
                                Rata-rata harmonik precision dan recall
                            </div>
                        </div>
                    </div>

                    {/* Chart Row 1 - Performance History & Feature Importance */}
                    <div
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        {/* Performance History Line Chart */}
                        <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Tren Performa Model</h3>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <FiInfo size={18} />
                                </button>
                            </div>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        data={performanceHistory}
                                        margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                                        <XAxis dataKey="month" stroke="#9ca3af" />
                                        <YAxis domain={[70, 100]} stroke="#9ca3af" />
                                        <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px' }} />
                                        <Legend verticalAlign="top" height={36} />
                                        <Line type="monotone" dataKey="accuracy" stroke="#4f46e5" strokeWidth={2} name="Accuracy" activeDot={{ r: 8 }} />
                                        <Line type="monotone" dataKey="precision" stroke="#10b981" strokeWidth={2} name="Precision" activeDot={{ r: 8 }} />
                                        <Line type="monotone" dataKey="recall" stroke="#f59e0b" strokeWidth={2} name="Recall" />
                                        <Line type="monotone" dataKey="f1Score" stroke="#ec4899" strokeWidth={2} name="F1 Score" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Feature Importance Bar Chart */}
                        <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Feature Importance</h3>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <FiInfo size={18} />
                                </button>
                            </div>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={[...featureImportance].sort((a, b) => b.importance - a.importance)}
                                        layout="vertical"
                                        margin={{ top: 5, right: 30, left: 50, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" horizontal={false} />
                                        <XAxis type="number" domain={[0, Math.max(...featureImportance.map(item => item.importance)) * 1.1]} stroke="#9ca3af" />
                                        <YAxis dataKey="name" type="category" stroke="#9ca3af" />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px' }}
                                            formatter={(value) => [`${(value * 100).toFixed(1)}%`, 'Importance']}
                                        />
                                        <Bar dataKey="importance" radius={[0, 4, 4, 0]}>
                                            {featureImportance.map((_, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Chart Row 2 - Confusion Matrix & Learning Curve */}
                    <div
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        {/* Confusion Matrix */}
                        <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Confusion Matrix</h3>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <FiInfo size={18} />
                                </button>
                            </div>
                            <div className="h-80 flex items-center justify-center">
                                <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
                                    <div className="col-start-1 col-span-1 flex items-center justify-end pr-2">
                                        <div className="text-xs text-gray-600">Predicted</div>
                                    </div>
                                    <div className="col-start-2 col-span-1 flex items-center justify-start pl-2">
                                        <div className="text-xs text-gray-600">Actual</div>
                                    </div>

                                    {/* Headers */}
                                    <div className="col-start-2 row-start-2 flex items-center justify-center">
                                        <div className="text-xs font-medium text-gray-800">Valid</div>
                                    </div>
                                    <div className="col-start-3 row-start-2 flex items-center justify-center">
                                        <div className="text-xs font-medium text-gray-800">Tidak Valid</div>
                                    </div>
                                    <div className="col-start-1 row-start-3 flex items-center justify-center">
                                        <div className="text-xs font-medium text-gray-800">Valid</div>
                                    </div>
                                    <div className="col-start-1 row-start-4 flex items-center justify-center">
                                        <div className="text-xs font-medium text-gray-800">Tidak Valid</div>
                                    </div>

                                    {/* True Positive */}
                                    <div className="bg-green-100 rounded-lg p-6 flex flex-col items-center justify-center">
                                        <div className="text-xl font-bold text-green-700">{confusionMatrix.truePositive}</div>
                                        <div className="text-xs text-green-700 mt-1">True Positive</div>
                                    </div>

                                    {/* False Negative */}
                                    <div className="bg-red-100 rounded-lg p-6 flex flex-col items-center justify-center">
                                        <div className="text-xl font-bold text-red-700">{confusionMatrix.falseNegative}</div>
                                        <div className="text-xs text-red-700 mt-1">False Negative</div>
                                    </div>

                                    {/* False Positive */}
                                    <div className="bg-red-100 rounded-lg p-6 flex flex-col items-center justify-center">
                                        <div className="text-xl font-bold text-red-700">{confusionMatrix.falsePositive}</div>
                                        <div className="text-xs text-red-700 mt-1">False Positive</div>
                                    </div>

                                    {/* True Negative */}
                                    <div className="bg-green-100 rounded-lg p-6 flex flex-col items-center justify-center">
                                        <div className="text-xl font-bold text-green-700">{confusionMatrix.trueNegative}</div>
                                        <div className="text-xs text-green-700 mt-1">True Negative</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Learning Curve */}
                        <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Learning Curve</h3>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <FiInfo size={18} />
                                </button>
                            </div>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        data={learningCurve}
                                        margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                                        <XAxis dataKey="sampleSize" stroke="#9ca3af" label={{ value: 'Jumlah Sampel Training', position: 'insideBottom', offset: -5 }} />
                                        <YAxis domain={[80, 100]} stroke="#9ca3af" label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft' }} />
                                        <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px' }} />
                                        <Legend verticalAlign="top" height={36} />
                                        <Line type="monotone" dataKey="trainAccuracy" stroke="#4f46e5" strokeWidth={2} name="Training" />
                                        <Line type="monotone" dataKey="validationAccuracy" stroke="#10b981" strokeWidth={2} name="Validation" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Chart Row 3 - Prediction Distribution & Radar Chart */}
                    <div
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                        data-aos="fade-up"
                        data-aos-delay="300"
                    >
                        {/* Prediction Distribution */}
                        <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Distribusi Prediksi</h3>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <FiInfo size={18} />
                                </button>
                            </div>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={predictionDistribution}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="value"
                                            nameKey="name"
                                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                                        >
                                            {predictionDistribution.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={index === 0 ? '#4f46e5' : '#ef4444'} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px' }} formatter={(value) => `${value} proposal`} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Radar Chart */}
                        <div className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-gray-800">Ringkasan Metrik Model</h3>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <FiInfo size={18} />
                                </button>
                            </div>
                            <div className="h-80">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                        <PolarGrid stroke="#e5e7eb" />
                                        <PolarAngleAxis dataKey="metric" stroke="#6b7280" />
                                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                                        <Radar name="Current Model" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.6} />
                                        <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '8px' }} />
                                        <Legend />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Explainability Notes */}
                    <div
                        className="mt-8 bg-indigo-50 rounded-lg p-4 text-sm text-indigo-800"
                        data-aos="fade-up"
                        data-aos-delay="400"
                    >
                        <h4 className="font-medium mb-2 flex items-center">
                            <FiInfo className="mr-2" /> Informasi Random Forest
                        </h4>
                        <p className="mb-2">
                            Model Random Forest ini dilatih menggunakan {learningCurve[learningCurve.length - 1].sampleSize} proposal dengan {featureImportance.length} fitur utama.
                            Performa tertinggi dicapai dengan parameter berikut:
                        </p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Jumlah pohon keputusan (n_estimators): 100</li>
                            <li>Kedalaman maksimum (max_depth): 20</li>
                            <li>Minimum sampel daun (min_samples_leaf): 4</li>
                            <li>Fitur yang paling berpengaruh: {featureImportance[0].name} ({(featureImportance[0].importance * 100).toFixed(1)}%)</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MLPerformance;
