import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdArrowBack,
    MdPerson,
    MdEmail,
    MdPhone,
    MdLocationOn,
    MdSchool,
    MdEdit,
    MdSave,
    MdUpload,
    MdDelete,
    MdLanguage,
    MdAccessTime,
    MdCheck,
    MdOutlineDevices,
    MdOutlineAccessTime,
    MdSettings,
    MdOutlineDarkMode,
    MdOutlineTranslate,
    MdColorLens,
    MdWifiTethering,
    MdHelpOutline,
    MdOutlineNewspaper,
} from "react-icons/md";

const AccountSettings = () => {
    // Dummy settings data
    const [settings, setSettings] = useState({
        language: "id",
        timeZone: "Asia/Jakarta",
        darkMode: "auto",
        theme: "default",
        accessibility: {
            largeText: false,
            highContrast: false,
            reduceMotion: false,
        },
        notifications: {
            email: true,
            push: true,
            sms: false,
        },
        privacy: {
            showOnlineStatus: true,
            showLastActive: true,
            allowDataCollection: true,
        },
        deviceHistory: [
            {
                name: "Chrome di Windows 10",
                lastUsed: "Hari ini, 10:35",
                status: "Saat ini",
            },
            {
                name: "Safari di MacBook Pro",
                lastUsed: "Kemarin, 15:22",
                status: "Aktif",
            },
            {
                name: "Aplikasi Mobile Android",
                lastUsed: "3 hari yang lalu",
                status: "Aktif",
            },
        ],
    });

    // State for form editing mode
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (section, field, value) => {
        if (section) {
            setSettings({
                ...settings,
                [section]: {
                    ...settings[section],
                    [field]: value,
                },
            });
        } else {
            setSettings({
                ...settings,
                [field]: value,
            });
        }
    };

    const handleSaveChanges = () => {
        // In a real app, you would save changes to the server here
        setIsEditing(false);
        // Show success notification (not implemented in this example)
    };

    return (
        <div className="pt-5">
            <div className="mb-8">
                <div className="flex items-center">
                    <Link
                        to="/bendahara/profile"
                        className="mr-3 p-2 bg-gray-100 dark:bg-navy-800 rounded-full hover:bg-gray-200 dark:hover:bg-navy-700"
                    >
                        <MdArrowBack className="h-5 w-5 text-gray-600 dark:text-white" />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-navy-700 dark:text-white">
                            Pengaturan Akun
                        </h2>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            Konfigurasi pengaturan akun sesuai preferensi Anda
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-5 mb-5">
                <div className="lg:w-2/3">
                    <Card extra="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center">
                                <MdSettings className="h-6 w-6 text-brand-500 mr-2" />
                                <h5 className="text-base font-bold text-navy-700 dark:text-white">
                                    Pengaturan Umum
                                </h5>
                            </div>
                            {!isEditing ? (
                                <button
                                    className="px-3 py-1.5 bg-brand-50 dark:bg-brand-500/20 text-brand-500 rounded-lg hover:bg-brand-100 dark:hover:bg-brand-500/30 text-sm"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Edit Pengaturan
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        className="px-3 py-1.5 bg-gray-100 dark:bg-navy-700 text-gray-700 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-navy-600 text-sm flex items-center"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        <MdDelete className="mr-1" />
                                        <span>Batal</span>
                                    </button>
                                    <button
                                        className="px-3 py-1.5 bg-brand-500 text-white rounded-lg hover:bg-brand-600 text-sm flex items-center"
                                        onClick={handleSaveChanges}
                                    >
                                        <MdSave className="mr-1" />
                                        <span>Simpan</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="space-y-6">
                            {/* Language and Localization */}
                            <div className="border-b border-gray-100 dark:border-navy-700 pb-6">
                                <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-4 flex items-center">
                                    <MdLanguage className="mr-2" />
                                    Bahasa & Lokalisasi
                                </h6>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-gray-500 dark:text-gray-400 mb-1.5 block">
                                            Bahasa
                                        </label>
                                        {isEditing ? (
                                            <select
                                                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                                value={settings.language}
                                                onChange={(e) =>
                                                    handleChange(null, "language", e.target.value)
                                                }
                                            >
                                                <option value="id">Bahasa Indonesia</option>
                                                <option value="en">English</option>
                                                <option value="ja">日本語</option>
                                            </select>
                                        ) : (
                                            <div className="text-sm text-navy-700 dark:text-white px-3 py-2 bg-gray-50 dark:bg-navy-800 rounded-lg">
                                                Bahasa Indonesia
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="text-xs text-gray-500 dark:text-gray-400 mb-1.5 block">
                                            Zona Waktu
                                        </label>
                                        {isEditing ? (
                                            <select
                                                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                                value={settings.timeZone}
                                                onChange={(e) =>
                                                    handleChange(null, "timeZone", e.target.value)
                                                }
                                            >
                                                <option value="Asia/Jakarta">Asia/Jakarta (GMT+7)</option>
                                                <option value="Asia/Makassar">Asia/Makassar (GMT+8)</option>
                                                <option value="Asia/Jayapura">Asia/Jayapura (GMT+9)</option>
                                            </select>
                                        ) : (
                                            <div className="text-sm text-navy-700 dark:text-white px-3 py-2 bg-gray-50 dark:bg-navy-800 rounded-lg">
                                                Asia/Jakarta (GMT+7)
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Appearance */}
                            <div className="border-b border-gray-100 dark:border-navy-700 pb-6">
                                <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-4 flex items-center">
                                    <MdOutlineDarkMode className="mr-2" />
                                    Tampilan
                                </h6>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-gray-500 dark:text-gray-400 mb-1.5 block">
                                            Mode Tampilan
                                        </label>
                                        {isEditing ? (
                                            <select
                                                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                                value={settings.darkMode}
                                                onChange={(e) =>
                                                    handleChange(null, "darkMode", e.target.value)
                                                }
                                            >
                                                <option value="light">Mode Terang</option>
                                                <option value="dark">Mode Gelap</option>
                                                <option value="auto">Otomatis (sistem)</option>
                                            </select>
                                        ) : (
                                            <div className="text-sm text-navy-700 dark:text-white px-3 py-2 bg-gray-50 dark:bg-navy-800 rounded-lg">
                                                Otomatis (sistem)
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="text-xs text-gray-500 dark:text-gray-400 mb-1.5 block">
                                            Tema
                                        </label>
                                        {isEditing ? (
                                            <select
                                                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                                value={settings.theme}
                                                onChange={(e) => handleChange(null, "theme", e.target.value)}
                                            >
                                                <option value="default">Default</option>
                                                <option value="blue">Biru</option>
                                                <option value="green">Hijau</option>
                                                <option value="purple">Ungu</option>
                                            </select>
                                        ) : (
                                            <div className="text-sm text-navy-700 dark:text-white px-3 py-2 bg-gray-50 dark:bg-navy-800 rounded-lg">
                                                Default
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Accessibility */}
                            <div className="border-b border-gray-100 dark:border-navy-700 pb-6">
                                <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-4 flex items-center">
                                    <MdColorLens className="mr-2" />
                                    Aksesibilitas
                                </h6>

                                <div className="grid grid-cols-1 gap-3">
                                    {isEditing ? (
                                        <>
                                            <label className="flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-brand-500 rounded border-gray-300 dark:border-navy-600 focus:ring-brand-500 dark:focus:ring-brand-400"
                                                    checked={settings.accessibility.largeText}
                                                    onChange={(e) =>
                                                        handleChange(
                                                            "accessibility",
                                                            "largeText",
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <span className="ml-2 text-sm text-gray-700 dark:text-white">
                                                    Ukuran Teks Lebih Besar
                                                </span>
                                            </label>

                                            <label className="flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-brand-500 rounded border-gray-300 dark:border-navy-600 focus:ring-brand-500 dark:focus:ring-brand-400"
                                                    checked={settings.accessibility.highContrast}
                                                    onChange={(e) =>
                                                        handleChange(
                                                            "accessibility",
                                                            "highContrast",
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <span className="ml-2 text-sm text-gray-700 dark:text-white">
                                                    Kontras Tinggi
                                                </span>
                                            </label>

                                            <label className="flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-brand-500 rounded border-gray-300 dark:border-navy-600 focus:ring-brand-500 dark:focus:ring-brand-400"
                                                    checked={settings.accessibility.reduceMotion}
                                                    onChange={(e) =>
                                                        handleChange(
                                                            "accessibility",
                                                            "reduceMotion",
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <span className="ml-2 text-sm text-gray-700 dark:text-white">
                                                    Kurangi Animasi
                                                </span>
                                            </label>
                                        </>
                                    ) : (
                                        <div className="space-y-2 text-sm text-navy-700 dark:text-white">
                                            <div className="flex items-center">
                                                <div
                                                    className={`w-5 h-5 rounded border ${settings.accessibility.largeText
                                                        ? "bg-brand-500 border-brand-500"
                                                        : "bg-gray-100 dark:bg-navy-800 border-gray-200 dark:border-navy-600"
                                                        } flex items-center justify-center`}
                                                >
                                                    {settings.accessibility.largeText && (
                                                        <MdCheck className="text-white text-sm" />
                                                    )}
                                                </div>
                                                <span className="ml-2">Ukuran Teks Lebih Besar</span>
                                            </div>

                                            <div className="flex items-center">
                                                <div
                                                    className={`w-5 h-5 rounded border ${settings.accessibility.highContrast
                                                        ? "bg-brand-500 border-brand-500"
                                                        : "bg-gray-100 dark:bg-navy-800 border-gray-200 dark:border-navy-600"
                                                        } flex items-center justify-center`}
                                                >
                                                    {settings.accessibility.highContrast && (
                                                        <MdCheck className="text-white text-sm" />
                                                    )}
                                                </div>
                                                <span className="ml-2">Kontras Tinggi</span>
                                            </div>

                                            <div className="flex items-center">
                                                <div
                                                    className={`w-5 h-5 rounded border ${settings.accessibility.reduceMotion
                                                        ? "bg-brand-500 border-brand-500"
                                                        : "bg-gray-100 dark:bg-navy-800 border-gray-200 dark:border-navy-600"
                                                        } flex items-center justify-center`}
                                                >
                                                    {settings.accessibility.reduceMotion && (
                                                        <MdCheck className="text-white text-sm" />
                                                    )}
                                                </div>
                                                <span className="ml-2">Kurangi Animasi</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Privacy */}
                            <div>
                                <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-4 flex items-center">
                                    <MdWifiTethering className="mr-2" />
                                    Privasi Akun
                                </h6>

                                <div className="grid grid-cols-1 gap-3">
                                    {isEditing ? (
                                        <>
                                            <label className="flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-brand-500 rounded border-gray-300 dark:border-navy-600 focus:ring-brand-500 dark:focus:ring-brand-400"
                                                    checked={settings.privacy.showOnlineStatus}
                                                    onChange={(e) =>
                                                        handleChange(
                                                            "privacy",
                                                            "showOnlineStatus",
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <span className="ml-2 text-sm text-gray-700 dark:text-white">
                                                    Tampilkan Status Online
                                                </span>
                                            </label>

                                            <label className="flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-brand-500 rounded border-gray-300 dark:border-navy-600 focus:ring-brand-500 dark:focus:ring-brand-400"
                                                    checked={settings.privacy.showLastActive}
                                                    onChange={(e) =>
                                                        handleChange(
                                                            "privacy",
                                                            "showLastActive",
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <span className="ml-2 text-sm text-gray-700 dark:text-white">
                                                    Tampilkan Aktivitas Terakhir
                                                </span>
                                            </label>

                                            <label className="flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox h-5 w-5 text-brand-500 rounded border-gray-300 dark:border-navy-600 focus:ring-brand-500 dark:focus:ring-brand-400"
                                                    checked={settings.privacy.allowDataCollection}
                                                    onChange={(e) =>
                                                        handleChange(
                                                            "privacy",
                                                            "allowDataCollection",
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <span className="ml-2 text-sm text-gray-700 dark:text-white">
                                                    Izinkan Pengumpulan Data untuk Peningkatan Sistem
                                                </span>
                                            </label>
                                        </>
                                    ) : (
                                        <div className="space-y-2 text-sm text-navy-700 dark:text-white">
                                            <div className="flex items-center">
                                                <div
                                                    className={`w-5 h-5 rounded border ${settings.privacy.showOnlineStatus
                                                        ? "bg-brand-500 border-brand-500"
                                                        : "bg-gray-100 dark:bg-navy-800 border-gray-200 dark:border-navy-600"
                                                        } flex items-center justify-center`}
                                                >
                                                    {settings.privacy.showOnlineStatus && (
                                                        <MdCheck className="text-white text-sm" />
                                                    )}
                                                </div>
                                                <span className="ml-2">Tampilkan Status Online</span>
                                            </div>

                                            <div className="flex items-center">
                                                <div
                                                    className={`w-5 h-5 rounded border ${settings.privacy.showLastActive
                                                        ? "bg-brand-500 border-brand-500"
                                                        : "bg-gray-100 dark:bg-navy-800 border-gray-200 dark:border-navy-600"
                                                        } flex items-center justify-center`}
                                                >
                                                    {settings.privacy.showLastActive && (
                                                        <MdCheck className="text-white text-sm" />
                                                    )}
                                                </div>
                                                <span className="ml-2">Tampilkan Aktivitas Terakhir</span>
                                            </div>

                                            <div className="flex items-center">
                                                <div
                                                    className={`w-5 h-5 rounded border ${settings.privacy.allowDataCollection
                                                        ? "bg-brand-500 border-brand-500"
                                                        : "bg-gray-100 dark:bg-navy-800 border-gray-200 dark:border-navy-600"
                                                        } flex items-center justify-center`}
                                                >
                                                    {settings.privacy.allowDataCollection && (
                                                        <MdCheck className="text-white text-sm" />
                                                    )}
                                                </div>
                                                <span className="ml-2">
                                                    Izinkan Pengumpulan Data untuk Peningkatan Sistem
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="lg:w-1/3 space-y-5">
                    <Card extra="p-6">
                        <div className="flex items-center mb-4">
                            <MdOutlineDevices className="h-6 w-6 text-brand-500 mr-2" />
                            <h5 className="text-base font-bold text-navy-700 dark:text-white">
                                Perangkat Login
                            </h5>
                        </div>

                        <div className="space-y-3">
                            {settings.deviceHistory.map((device, index) => (
                                <div
                                    key={index}
                                    className="p-3 border border-gray-100 dark:border-navy-700 rounded-lg"
                                >
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium text-navy-700 dark:text-white">
                                            {device.name}
                                        </span>
                                        {device.status === "Saat ini" && (
                                            <span className="px-2 py-0.5 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                                                {device.status}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            Login terakhir: {device.lastUsed}
                                        </span>
                                        {device.status !== "Saat ini" && (
                                            <button className="text-xs text-red-500 dark:text-red-400 hover:underline">
                                                Keluarkan
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-4 px-3 py-2 bg-gray-100 dark:bg-navy-700 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-navy-600 rounded-lg text-sm">
                            Keluarkan dari Semua Perangkat
                        </button>
                    </Card>

                    <Card extra="p-6">
                        <div className="flex items-center mb-4">
                            <MdOutlineAccessTime className="h-6 w-6 text-brand-500 mr-2" />
                            <h5 className="text-base font-bold text-navy-700 dark:text-white">
                                Sesi Login
                            </h5>
                        </div>

                        <div className="bg-gray-50 dark:bg-navy-800 p-3 rounded-lg mb-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium text-navy-700 dark:text-white">
                                    Status
                                </span>
                                <span className="px-2 py-0.5 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                                    Aktif
                                </span>
                            </div>
                            <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                                Login terakhir: Hari ini, 10:35 AM
                            </div>
                            <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                                Dari: Jakarta, Indonesia (103.28.214.XX)
                            </div>
                        </div>

                        <button className="w-full px-3 py-2 bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg text-sm">
                            Akhiri Sesi Login Saat Ini
                        </button>
                    </Card>

                    <Card extra="p-6">
                        <div className="flex items-center mb-4">
                            <MdHelpOutline className="h-6 w-6 text-brand-500 mr-2" />
                            <h5 className="text-base font-bold text-navy-700 dark:text-white">
                                Bantuan & Sumber Daya
                            </h5>
                        </div>

                        <div className="space-y-2">
                            <a
                                href="#"
                                className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-navy-800 text-gray-700 dark:text-gray-300 hover:text-brand-500"
                            >
                                <MdOutlineNewspaper className="h-5 w-5 mr-2" />
                                <span className="text-sm">Panduan Pengguna</span>
                            </a>

                            <a
                                href="#"
                                className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-navy-800 text-gray-700 dark:text-gray-300 hover:text-brand-500"
                            >
                                <MdOutlineTranslate className="h-5 w-5 mr-2" />
                                <span className="text-sm">Bahasa & Terjemahan</span>
                            </a>

                            <a
                                href="#"
                                className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-navy-800 text-gray-700 dark:text-gray-300 hover:text-brand-500"
                            >
                                <MdColorLens className="h-5 w-5 mr-2" />
                                <span className="text-sm">Tema & Tampilan</span>
                            </a>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AccountSettings;
