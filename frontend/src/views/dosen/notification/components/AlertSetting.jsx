import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    MdNotifications,
    MdEmail,
    MdPhone,
    MdSave,
    MdInfoOutline,
    MdAccessTime,
    MdPriorityHigh,
    MdWarning,
    MdCheck,
    MdArrowBack
} from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AlertSetting = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true
        });
    }, []);

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    // Dummy notification settings
    const [settings, setSettings] = useState({
        channels: {
            inApp: true,
            email: true,
            sms: false,
        },
        categories: {
            proposals: true,
            deadlines: true,
            feedback: true,
            system: false,
            progress: true,
        },
        frequency: {
            proposals: 'immediate',
            deadlines: 'daily',
            feedback: 'immediate',
            system: 'weekly',
            progress: 'daily',
        },
        priority: {
            proposals: 'high',
            deadlines: 'critical',
            feedback: 'medium',
            system: 'low',
            progress: 'medium',
        }
    });

    const handleChannelChange = (channel) => {
        setSettings({
            ...settings,
            channels: {
                ...settings.channels,
                [channel]: !settings.channels[channel]
            }
        });
    };

    const handleCategoryChange = (category) => {
        setSettings({
            ...settings,
            categories: {
                ...settings.categories,
                [category]: !settings.categories[category]
            }
        });
    };

    const handleFrequencyChange = (category, value) => {
        setSettings({
            ...settings,
            frequency: {
                ...settings.frequency,
                [category]: value
            }
        });
    };

    const handlePriorityChange = (category, value) => {
        setSettings({
            ...settings,
            priority: {
                ...settings.priority,
                [category]: value
            }
        });
    };

    const saveSettings = () => {
        // Here would be a dispatch to save settings to backend
        // dispatch(updateNotificationSettings(settings));

        // For now, just show a success message
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const [showSuccess, setShowSuccess] = useState(false);

    const frequencyOptions = [
        { value: 'immediate', label: 'Segera' },
        { value: 'hourly', label: 'Per Jam' },
        { value: 'daily', label: 'Harian' },
        { value: 'weekly', label: 'Mingguan' },
    ];

    const priorityOptions = [
        { value: 'critical', label: 'Kritis' },
        { value: 'high', label: 'Tinggi' },
        { value: 'medium', label: 'Sedang' },
        { value: 'low', label: 'Rendah' },
    ];

    const categoryLabels = {
        proposals: 'Proposal',
        deadlines: 'Tenggat Waktu',
        feedback: 'Umpan Balik',
        system: 'Sistem',
        progress: 'Kemajuan',
    };

    return (
        <div className="w-full p-4 md:p-6 bg-white rounded-lg shadow-lg" data-aos="fade-up">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <button className="mr-2 text-gray-600 hover:text-gray-800">
                        <MdArrowBack size={24} />
                    </button>
                    <h1 className="text-2xl font-semibold text-gray-800">Pengaturan Notifikasi</h1>
                </div>
                <button
                    onClick={saveSettings}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                    <MdSave className="mr-2" />
                    Simpan Pengaturan
                </button>
            </div>

            {showSuccess && (
                <div className="mb-6 p-3 bg-green-100 border border-green-200 text-green-700 rounded-lg flex items-center" data-aos="fade-in">
                    <MdCheck className="mr-2 text-green-500" size={20} />
                    Pengaturan berhasil disimpan!
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Notification Channels Section */}
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm" data-aos="fade-up" data-aos-delay="100">
                    <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                        <MdNotifications className="mr-2 text-blue-600" />
                        Saluran Notifikasi
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <MdNotifications className="mr-3 text-gray-600" />
                                <span>Notifikasi Aplikasi</span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={settings.channels.inApp}
                                    onChange={() => handleChannelChange('inApp')}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <MdEmail className="mr-3 text-gray-600" />
                                <span>Email</span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={settings.channels.email}
                                    onChange={() => handleChannelChange('email')}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <MdPhone className="mr-3 text-gray-600" />
                                <span>SMS</span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={settings.channels.sms}
                                    onChange={() => handleChannelChange('sms')}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Notification Description Section */}
                <div className="bg-blue-50 p-4 rounded-lg shadow-sm" data-aos="fade-up" data-aos-delay="200">
                    <h2 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                        <MdInfoOutline className="mr-2 text-blue-600" />
                        Informasi
                    </h2>
                    <div className="text-sm text-gray-600 space-y-2">
                        <p>• Pengaturan notifikasi memungkinkan Anda mengontrol jenis pemberitahuan yang Anda terima.</p>
                        <p>• Aktifkan saluran notifikasi yang Anda inginkan (Aplikasi, Email, SMS).</p>
                        <p>• Atur kategori notifikasi yang relevan untuk kebutuhan Anda.</p>
                        <p>• Pilih frekuensi dan prioritas untuk setiap kategori.</p>
                        <p className="text-blue-700 mt-4">Perubahan akan berlaku setelah Anda menyimpan pengaturan.</p>
                    </div>
                </div>
            </div>

            {/* Notification Categories Section */}
            <div className="mt-8" data-aos="fade-up" data-aos-delay="300">
                <h2 className="text-lg font-medium text-gray-800 mb-4">Kategori Notifikasi</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aktif</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        <MdAccessTime className="mr-1" />
                                        Frekuensi
                                    </div>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    <div className="flex items-center">
                                        <MdPriorityHigh className="mr-1" />
                                        Prioritas
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {Object.keys(settings.categories).map((category) => (
                                <tr key={category} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{categoryLabels[category]}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={settings.categories[category]}
                                                onChange={() => handleCategoryChange(category)}
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <select
                                            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                                            value={settings.frequency[category]}
                                            onChange={(e) => handleFrequencyChange(category, e.target.value)}
                                            disabled={!settings.categories[category]}
                                        >
                                            {frequencyOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <select
                                            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                                            value={settings.priority[category]}
                                            onChange={(e) => handlePriorityChange(category, e.target.value)}
                                            disabled={!settings.categories[category]}
                                        >
                                            {priorityOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Tips section */}
            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-100 rounded-lg" data-aos="fade-up" data-aos-delay="400">
                <div className="flex items-start">
                    <MdWarning className="text-yellow-500 mr-3 flex-shrink-0 mt-1" size={24} />
                    <div>
                        <h3 className="font-medium text-yellow-800">Tips Pengaturan Notifikasi</h3>
                        <ul className="mt-2 text-sm text-yellow-700 space-y-1 list-disc list-inside">
                            <li>Untuk notifikasi penting seperti tenggat waktu, sebaiknya aktifkan prioritas tinggi.</li>
                            <li>Jika Anda sering menggunakan aplikasi, notifikasi in-app sudah cukup untuk updatean rutin.</li>
                            <li>Gunakan notifikasi email untuk informasi penting yang perlu disimpan.</li>
                            <li>SMS dapat digunakan untuk notifikasi urgen yang memerlukan perhatian segera.</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Save button bottom */}
            <div className="mt-8 flex justify-end" data-aos="fade-up" data-aos-delay="500">
                <button
                    onClick={saveSettings}
                    className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md"
                >
                    <MdSave className="mr-2" />
                    Simpan Pengaturan
                </button>
            </div>
        </div>
    );
};

export default AlertSetting;
