import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdNotifications,
    MdSearch,
    MdFilterList,
    MdRefresh,
    MdArrowBack,
    MdEmail,
    MdSmartphone,
    MdAccessTime,
    MdDevices,
    MdAccountBalance,
    MdReport,
    MdOutlineVerifiedUser,
    MdOutlineAttachMoney,
    MdOutlineDescription,
    MdSecurity,
    MdCalendarToday,
    MdOutlineNotificationsActive,
    MdSave,
    MdCheck,
    MdInfoOutline
} from "react-icons/md";

const NotificationPreferences = () => {
    // State for notification preferences
    const [preferences, setPreferences] = useState({
        channels: {
            email: true,
            pushNotification: true,
            sms: false,
            inApp: true
        },
        frequencyDigest: "daily", // Options: "realtime", "daily", "weekly"
        categories: {
            fundingApproval: true,
            fundingDisbursement: true,
            reportVerification: true,
            upcomingDeadlines: true,
            tgrManagement: true,
            auditReports: false,
            systemUpdates: false,
            securityAlerts: true
        },
        quietHours: {
            enabled: true,
            startTime: "22:00",
            endTime: "07:00"
        }
    });

    const [isEditing, setIsEditing] = useState(false);

    // Handle preference changes
    const handleChannelChange = (channel) => {
        setPreferences({
            ...preferences,
            channels: {
                ...preferences.channels,
                [channel]: !preferences.channels[channel]
            }
        });
    };

    const handleCategoryChange = (category) => {
        setPreferences({
            ...preferences,
            categories: {
                ...preferences.categories,
                [category]: !preferences.categories[category]
            }
        });
    };

    const handleFrequencyChange = (e) => {
        setPreferences({
            ...preferences,
            frequencyDigest: e.target.value
        });
    };

    const handleQuietHoursToggle = () => {
        setPreferences({
            ...preferences,
            quietHours: {
                ...preferences.quietHours,
                enabled: !preferences.quietHours.enabled
            }
        });
    };

    const handleTimeChange = (timeType, e) => {
        setPreferences({
            ...preferences,
            quietHours: {
                ...preferences.quietHours,
                [timeType]: e.target.value
            }
        });
    };

    const handleSavePreferences = () => {
        // Here we would send preferences to the backend
        console.log("Saving preferences:", preferences);
        setIsEditing(false);
        // Show success message (not implemented in this example)
        alert("Preferensi notifikasi berhasil disimpan");
    };

    return (
        <div className="pt-5">
            <div className="mb-8">
                <div className="flex items-center">
                    <Link to="/bendahara/profile" className="mr-3 p-2 bg-gray-100 dark:bg-navy-800 rounded-full hover:bg-gray-200 dark:hover:bg-navy-700">
                        <MdArrowBack className="h-5 w-5 text-gray-600 dark:text-white" />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-navy-700 dark:text-white">Preferensi Notifikasi</h2>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            Atur preferensi untuk notifikasi yang Anda terima
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2">
                    <Card extra="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center">
                                <MdNotifications className="h-6 w-6 text-brand-500 mr-2" />
                                <h5 className="text-base font-bold text-navy-700 dark:text-white">
                                    Pengaturan Notifikasi
                                </h5>
                            </div>
                            {!isEditing ? (
                                <button
                                    className="px-3 py-1.5 bg-brand-50 dark:bg-brand-500/20 text-brand-500 rounded-lg hover:bg-brand-100 dark:hover:bg-brand-500/30 text-sm"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Edit Preferensi
                                </button>
                            ) : (
                                <button
                                    className="px-3 py-1.5 flex items-center gap-1.5 bg-brand-500 text-white rounded-lg hover:bg-brand-600 text-sm"
                                    onClick={handleSavePreferences}
                                >
                                    <MdSave size={16} />
                                    <span>Simpan</span>
                                </button>
                            )}
                        </div>

                        {/* Channel preferences */}
                        <div className="mb-8 border-b border-gray-200 dark:border-navy-700 pb-6">
                            <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-4 flex items-center">
                                <MdDevices className="mr-2" />
                                Saluran Notifikasi
                            </h6>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <MdEmail className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                                        <div>
                                            <p className="text-sm text-navy-700 dark:text-white">Email</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Terima notifikasi melalui email
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`relative ${!isEditing && "opacity-60 pointer-events-none"}`}>
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only"
                                                checked={preferences.channels.email}
                                                onChange={() => handleChannelChange('email')}
                                                disabled={!isEditing}
                                            />
                                            <div className={`w-11 h-6 rounded-full transition ${preferences.channels.email ? 'bg-brand-500' : 'bg-gray-200 dark:bg-navy-700'}`}>
                                                <div className={`w-5 h-5 rounded-full bg-white transition-all transform ${preferences.channels.email ? 'translate-x-5' : 'translate-x-1'}`}></div>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <MdOutlineNotificationsActive className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                                        <div>
                                            <p className="text-sm text-navy-700 dark:text-white">Notifikasi Di Aplikasi</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Terima notifikasi di dalam aplikasi
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`relative ${!isEditing && "opacity-60 pointer-events-none"}`}>
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only"
                                                checked={preferences.channels.inApp}
                                                onChange={() => handleChannelChange('inApp')}
                                                disabled={!isEditing}
                                            />
                                            <div className={`w-11 h-6 rounded-full transition ${preferences.channels.inApp ? 'bg-brand-500' : 'bg-gray-200 dark:bg-navy-700'}`}>
                                                <div className={`w-5 h-5 rounded-full bg-white transition-all transform ${preferences.channels.inApp ? 'translate-x-5' : 'translate-x-1'}`}></div>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <MdSmartphone className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                                        <div>
                                            <p className="text-sm text-navy-700 dark:text-white">Push Notification</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Terima notifikasi di perangkat mobile
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`relative ${!isEditing && "opacity-60 pointer-events-none"}`}>
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only"
                                                checked={preferences.channels.pushNotification}
                                                onChange={() => handleChannelChange('pushNotification')}
                                                disabled={!isEditing}
                                            />
                                            <div className={`w-11 h-6 rounded-full transition ${preferences.channels.pushNotification ? 'bg-brand-500' : 'bg-gray-200 dark:bg-navy-700'}`}>
                                                <div className={`w-5 h-5 rounded-full bg-white transition-all transform ${preferences.channels.pushNotification ? 'translate-x-5' : 'translate-x-1'}`}></div>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <MdSmartphone className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
                                        <div>
                                            <p className="text-sm text-navy-700 dark:text-white">SMS</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Terima notifikasi melalui SMS
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`relative ${!isEditing && "opacity-60 pointer-events-none"}`}>
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only"
                                                checked={preferences.channels.sms}
                                                onChange={() => handleChannelChange('sms')}
                                                disabled={!isEditing}
                                            />
                                            <div className={`w-11 h-6 rounded-full transition ${preferences.channels.sms ? 'bg-brand-500' : 'bg-gray-200 dark:bg-navy-700'}`}>
                                                <div className={`w-5 h-5 rounded-full bg-white transition-all transform ${preferences.channels.sms ? 'translate-x-5' : 'translate-x-1'}`}></div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Frequency preferences */}
                        <div className="mb-8 border-b border-gray-200 dark:border-navy-700 pb-6">
                            <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-4 flex items-center">
                                <MdAccessTime className="mr-2" />
                                Frekuensi Notifikasi
                            </h6>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-navy-700 dark:text-white mb-2">
                                        Ringkasan Notifikasi
                                    </p>
                                    <div className={`grid grid-cols-3 gap-3 ${!isEditing && "opacity-60 pointer-events-none"}`}>
                                        <label className={`px-3 py-2 text-center text-sm rounded-lg border cursor-pointer ${preferences.frequencyDigest === 'realtime' ? 'bg-brand-50 dark:bg-brand-900/20 border-brand-200 dark:border-brand-700 text-brand-700 dark:text-brand-400' : 'bg-gray-50 dark:bg-navy-700 border-gray-200 dark:border-navy-600 text-gray-700 dark:text-gray-300'}`}>
                                            <input
                                                type="radio"
                                                name="frequency"
                                                value="realtime"
                                                className="hidden"
                                                checked={preferences.frequencyDigest === 'realtime'}
                                                onChange={handleFrequencyChange}
                                                disabled={!isEditing}
                                            />
                                            Real-time
                                        </label>
                                        <label className={`px-3 py-2 text-center text-sm rounded-lg border cursor-pointer ${preferences.frequencyDigest === 'daily' ? 'bg-brand-50 dark:bg-brand-900/20 border-brand-200 dark:border-brand-700 text-brand-700 dark:text-brand-400' : 'bg-gray-50 dark:bg-navy-700 border-gray-200 dark:border-navy-600 text-gray-700 dark:text-gray-300'}`}>
                                            <input
                                                type="radio"
                                                name="frequency"
                                                value="daily"
                                                className="hidden"
                                                checked={preferences.frequencyDigest === 'daily'}
                                                onChange={handleFrequencyChange}
                                                disabled={!isEditing}
                                            />
                                            Harian
                                        </label>
                                        <label className={`px-3 py-2 text-center text-sm rounded-lg border cursor-pointer ${preferences.frequencyDigest === 'weekly' ? 'bg-brand-50 dark:bg-brand-900/20 border-brand-200 dark:border-brand-700 text-brand-700 dark:text-brand-400' : 'bg-gray-50 dark:bg-navy-700 border-gray-200 dark:border-navy-600 text-gray-700 dark:text-gray-300'}`}>
                                            <input
                                                type="radio"
                                                name="frequency"
                                                value="weekly"
                                                className="hidden"
                                                checked={preferences.frequencyDigest === 'weekly'}
                                                onChange={handleFrequencyChange}
                                                disabled={!isEditing}
                                            />
                                            Mingguan
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-sm text-navy-700 dark:text-white">
                                            Jam Tenang
                                        </p>
                                        <div className={`relative ${!isEditing && "opacity-60 pointer-events-none"}`}>
                                            <label className="inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only"
                                                    checked={preferences.quietHours.enabled}
                                                    onChange={handleQuietHoursToggle}
                                                    disabled={!isEditing}
                                                />
                                                <div className={`w-11 h-6 rounded-full transition ${preferences.quietHours.enabled ? 'bg-brand-500' : 'bg-gray-200 dark:bg-navy-700'}`}>
                                                    <div className={`w-5 h-5 rounded-full bg-white transition-all transform ${preferences.quietHours.enabled ? 'translate-x-5' : 'translate-x-1'}`}></div>
                                                </div>
                                            </label>
                                        </div>
                                    </div>

                                    {preferences.quietHours.enabled && (
                                        <div className={`flex items-center gap-3 ${!isEditing && "opacity-60 pointer-events-none"}`}>
                                            <div className="flex-1">
                                                <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
                                                    Mulai
                                                </label>
                                                <input
                                                    type="time"
                                                    value={preferences.quietHours.startTime}
                                                    onChange={(e) => handleTimeChange('startTime', e)}
                                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
                                                    Selesai
                                                </label>
                                                <input
                                                    type="time"
                                                    value={preferences.quietHours.endTime}
                                                    onChange={(e) => handleTimeChange('endTime', e)}
                                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                                    disabled={!isEditing}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Category preferences */}
                        <div>
                            <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-4 flex items-center">
                                <MdAccountBalance className="mr-2" />
                                Kategori Notifikasi
                            </h6>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-navy-800 rounded-lg">
                                    <div className="flex items-center">
                                        <MdOutlineVerifiedUser className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
                                        <span className="text-sm text-navy-700 dark:text-white">Persetujuan Dana</span>
                                    </div>
                                    <div className={`relative ${!isEditing && "opacity-60 pointer-events-none"}`}>
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only"
                                                checked={preferences.categories.fundingApproval}
                                                onChange={() => handleCategoryChange('fundingApproval')}
                                                disabled={!isEditing}
                                            />
                                            <div className={`w-11 h-6 rounded-full transition ${preferences.categories.fundingApproval ? 'bg-brand-500' : 'bg-gray-200 dark:bg-navy-700'}`}>
                                                <div className={`w-5 h-5 rounded-full bg-white transition-all transform ${preferences.categories.fundingApproval ? 'translate-x-5' : 'translate-x-1'}`}></div>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-navy-800 rounded-lg">
                                    <div className="flex items-center">
                                        <MdOutlineAttachMoney className="h-5 w-5 text-green-500 dark:text-green-400 mr-2" />
                                        <span className="text-sm text-navy-700 dark:text-white">Pencairan Dana</span>
                                    </div>
                                    <div className={`relative ${!isEditing && "opacity-60 pointer-events-none"}`}>
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only"
                                                checked={preferences.categories.fundingDisbursement}
                                                onChange={() => handleCategoryChange('fundingDisbursement')}
                                                disabled={!isEditing}
                                            />
                                            <div className={`w-11 h-6 rounded-full transition ${preferences.categories.fundingDisbursement ? 'bg-brand-500' : 'bg-gray-200 dark:bg-navy-700'}`}>
                                                <div className={`w-5 h-5 rounded-full bg-white transition-all transform ${preferences.categories.fundingDisbursement ? 'translate-x-5' : 'translate-x-1'}`}></div>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-navy-800 rounded-lg">
                                    <div className="flex items-center">
                                        <MdOutlineDescription className="h-5 w-5 text-amber-500 dark:text-amber-400 mr-2" />
                                        <span className="text-sm text-navy-700 dark:text-white">Verifikasi Laporan</span>
                                    </div>
                                    <div className={`relative ${!isEditing && "opacity-60 pointer-events-none"}`}>
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only"
                                                checked={preferences.categories.reportVerification}
                                                onChange={() => handleCategoryChange('reportVerification')}
                                                disabled={!isEditing}
                                            />
                                            <div className={`w-11 h-6 rounded-full transition ${preferences.categories.reportVerification ? 'bg-brand-500' : 'bg-gray-200 dark:bg-navy-700'}`}>
                                                <div className={`w-5 h-5 rounded-full bg-white transition-all transform ${preferences.categories.reportVerification ? 'translate-x-5' : 'translate-x-1'}`}></div>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-navy-800 rounded-lg">
                                    <div className="flex items-center">
                                        <MdCalendarToday className="h-5 w-5 text-purple-500 dark:text-purple-400 mr-2" />
                                        <span className="text-sm text-navy-700 dark:text-white">Tenggat Waktu</span>
                                    </div>
                                    <div className={`relative ${!isEditing && "opacity-60 pointer-events-none"}`}>
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only"
                                                checked={preferences.categories.upcomingDeadlines}
                                                onChange={() => handleCategoryChange('upcomingDeadlines')}
                                                disabled={!isEditing}
                                            />
                                            <div className={`w-11 h-6 rounded-full transition ${preferences.categories.upcomingDeadlines ? 'bg-brand-500' : 'bg-gray-200 dark:bg-navy-700'}`}>
                                                <div className={`w-5 h-5 rounded-full bg-white transition-all transform ${preferences.categories.upcomingDeadlines ? 'translate-x-5' : 'translate-x-1'}`}></div>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-navy-800 rounded-lg">
                                    <div className="flex items-center">
                                        <MdReport className="h-5 w-5 text-amber-500 dark:text-amber-400 mr-2" />
                                        <span className="text-sm text-navy-700 dark:text-white">Manajemen TGR</span>
                                    </div>
                                    <div className={`relative ${!isEditing && "opacity-60 pointer-events-none"}`}>
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only"
                                                checked={preferences.categories.tgrManagement}
                                                onChange={() => handleCategoryChange('tgrManagement')}
                                                disabled={!isEditing}
                                            />
                                            <div className={`w-11 h-6 rounded-full transition ${preferences.categories.tgrManagement ? 'bg-brand-500' : 'bg-gray-200 dark:bg-navy-700'}`}>
                                                <div className={`w-5 h-5 rounded-full bg-white transition-all transform ${preferences.categories.tgrManagement ? 'translate-x-5' : 'translate-x-1'}`}></div>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-navy-800 rounded-lg">
                                    <div className="flex items-center">
                                        <MdSecurity className="h-5 w-5 text-red-500 dark:text-red-400 mr-2" />
                                        <span className="text-sm text-navy-700 dark:text-white">Peringatan Keamanan</span>
                                    </div>
                                    <div className={`relative ${!isEditing && "opacity-60 pointer-events-none"}`}>
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only"
                                                checked={preferences.categories.securityAlerts}
                                                onChange={() => handleCategoryChange('securityAlerts')}
                                                disabled={!isEditing}
                                            />
                                            <div className={`w-11 h-6 rounded-full transition ${preferences.categories.securityAlerts ? 'bg-brand-500' : 'bg-gray-200 dark:bg-navy-700'}`}>
                                                <div className={`w-5 h-5 rounded-full bg-white transition-all transform ${preferences.categories.securityAlerts ? 'translate-x-5' : 'translate-x-1'}`}></div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-1">
                    <Card extra="p-6 mb-5">
                        <h5 className="text-base font-bold text-navy-700 dark:text-white mb-4">
                            Ringkasan Preferensi
                        </h5>
                        <div className="space-y-4">
                            <div className="p-3 bg-gray-50 dark:bg-navy-800 rounded-lg">
                                <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-2">
                                    Saluran Aktif
                                </h6>
                                <div className="space-y-2">
                                    {Object.entries(preferences.channels).map(([key, value]) => (
                                        value && (
                                            <div key={key} className="flex items-center">
                                                <MdCheck className="h-4 w-4 text-green-500 mr-2" />
                                                <span className="text-xs text-gray-600 dark:text-gray-400">
                                                    {key === 'email' ? 'Email' :
                                                        key === 'pushNotification' ? 'Push Notification' :
                                                            key === 'sms' ? 'SMS' : 'Notifikasi di Aplikasi'}
                                                </span>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>

                            <div className="p-3 bg-gray-50 dark:bg-navy-800 rounded-lg">
                                <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-2">
                                    Frekuensi
                                </h6>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    {preferences.frequencyDigest === 'realtime' ? 'Real-time' :
                                        preferences.frequencyDigest === 'daily' ? 'Ringkasan Harian' : 'Ringkasan Mingguan'}
                                </p>
                                {preferences.quietHours.enabled && (
                                    <div className="mt-2">
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            Jam Tenang: {preferences.quietHours.startTime} - {preferences.quietHours.endTime}
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 rounded-lg">
                                <div className="flex items-start gap-2">
                                    <MdInfoOutline className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                                    <div>
                                        <p className="text-xs font-medium text-blue-800 dark:text-blue-400 mb-1">
                                            Informasi
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            Semua perubahan pada preferensi notifikasi akan diterapkan segera setelah disimpan. Notifikasi penting terkait keamanan akan tetap dikirimkan meskipun dalam mode jam tenang.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {isEditing && (
                                <button
                                    className="w-full bg-brand-500 hover:bg-brand-600 text-white py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                                    onClick={handleSavePreferences}
                                >
                                    <MdSave size={16} />
                                    <span>Simpan Preferensi</span>
                                </button>
                            )}
                        </div>
                    </Card>

                    <Card extra="p-6">
                        <h5 className="text-base font-bold text-navy-700 dark:text-white mb-4 flex items-center">
                            <MdOutlineNotificationsActive className="mr-2" />
                            Notifikasi Terbaru
                        </h5>

                        <div className="space-y-2.5">
                            <div className="p-2.5 bg-white dark:bg-navy-700 border border-gray-100 dark:border-navy-600 rounded-lg">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs font-medium text-navy-700 dark:text-white">Pencairan Dana Disetujui</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">10 menit lalu</span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    Proposal PRP-2025-042 telah disetujui pencairan dananya.
                                </p>
                            </div>

                            <div className="p-2.5 bg-white dark:bg-navy-700 border border-gray-100 dark:border-navy-600 rounded-lg">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs font-medium text-navy-700 dark:text-white">Verifikasi Laporan Diperlukan</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">2 jam lalu</span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    3 laporan baru memerlukan verifikasi dari Anda.
                                </p>
                            </div>

                            <div className="p-2.5 bg-white dark:bg-navy-700 border border-gray-100 dark:border-navy-600 rounded-lg">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-xs font-medium text-navy-700 dark:text-white">Pengingat Tenggat Waktu</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">5 jam lalu</span>
                                </div>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    2 laporan harus diselesaikan dalam 3 hari.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default NotificationPreferences;
