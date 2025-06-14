import React, { useState, useEffect } from "react";
import Card from "components/card";
import {
    MdSecurity,
    MdLock,
    MdOutlineLock,
    MdCheckCircle,
    MdError,
    MdInfoOutline,
    MdHelp,
    MdEmail,
    MdArrowBack,
    MdEdit,
    MdDelete,
    MdRefresh,
    MdAdd,
    MdRemove,
    MdNotificationsActive,
    MdHistory
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const AccountSecurity = () => {
    const [twoFAMethod, setTwoFAMethod] = useState("app");
    const [securityActivity, setSecurityActivity] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        AOS.init({
            duration: 700,
            easing: 'ease-out-cubic',
            once: true
        });

        // Fetch security activity data (dummy data for now)
        setSecurityActivity([
            {
                id: 1,
                activity: "Login berhasil",
                status: "success",
                device: "Windows 10 • Chrome",
                location: "Jakarta, Indonesia",
                date: "2025-04-20 10:15:32"
            },
            {
                id: 2,
                activity: "Ganti kata sandi",
                status: "success",
                device: "iPhone 13 • Mobile App",
                location: "Bandung, Indonesia",
                date: "2025-04-18 14:22:10"
            },
            {
                id: 3,
                activity: "Login gagal",
                status: "error",
                device: "MacBook Pro • Safari",
                location: "Jakarta, Indonesia",
                date: "2025-04-17 09:05:47"
            },
            {
                id: 4,
                activity: "Aktivasi 2FA",
                status: "info",
                device: "Samsung Galaxy S21 • Mobile App",
                location: "Surabaya, Indonesia",
                date: "2025-04-15 16:30:12"
            }
        ]);
    }, []);

    const handleRefresh = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    const getActivityIcon = (status) => {
        switch (status) {
            case "success":
                return <MdCheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />;
            case "error":
                return <MdError className="h-5 w-5 text-red-500 dark:text-red-400" />;
            case "info":
                return <MdInfoOutline className="h-5 w-5 text-blue-500 dark:text-blue-400" />;
            default:
                return null;
        }
    };

    return (
        <div className="pt-5">
            <div className="mb-8" data-aos="fade-up">
                <div className="flex items-center">
                    <div className="mr-3 p-2 bg-gray-100 dark:bg-navy-800 rounded-full">
                        <MdArrowBack className="h-5 w-5 text-gray-600 dark:text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-navy-700 dark:text-white">Keamanan Akun</h2>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            Kelola pengaturan keamanan untuk melindungi akun Anda
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
                <Card extra="p-6" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex items-center mb-6">
                        <MdSecurity className="h-6 w-6 text-brand-500 mr-2" />
                        <h5 className="text-base font-bold text-navy-700 dark:text-white">
                            Autentikasi Dua Faktor
                        </h5>
                    </div>

                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Tingkatkan keamanan akun Anda dengan mengaktifkan autentikasi dua faktor.
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setTwoFAMethod('app')}
                                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2
                ${twoFAMethod === 'app' ? 'bg-brand-500 text-white shadow-md' : 'bg-gray-100 dark:bg-navy-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-navy-600'}`}
                            >
                                <MdOutlineLock className="h-5 w-5" />
                                Aplikasi Authenticator
                                {twoFAMethod === 'app' && <MdCheckCircle className="h-5 w-5 text-white" />}
                            </button>

                            <button
                                onClick={() => setTwoFAMethod('sms')}
                                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2
                ${twoFAMethod === 'sms' ? 'bg-brand-500 text-white shadow-md' : 'bg-gray-100 dark:bg-navy-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-navy-600'}`}
                            >
                                <MdNotificationsActive className="h-5 w-5" />
                                SMS
                                {twoFAMethod === 'sms' && <MdCheckCircle className="h-5 w-5 text-white" />}
                            </button>

                            <button
                                onClick={() => setTwoFAMethod('email')}
                                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2
                ${twoFAMethod === 'email' ? 'bg-brand-500 text-white shadow-md' : 'bg-gray-100 dark:bg-navy-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-navy-600'}`}
                            >
                                <MdEmail className="h-5 w-5" />
                                Email
                                {twoFAMethod === 'email' && <MdCheckCircle className="h-5 w-5 text-white" />}
                            </button>
                        </div>

                        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 rounded-lg">
                            <div className="flex items-center mb-2">
                                <MdInfoOutline className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                                <h6 className="text-sm font-medium text-blue-800 dark:text-blue-400">
                                    {twoFAMethod === 'app'
                                        ? 'Aplikasi Authenticator 2FA'
                                        : twoFAMethod === 'sms'
                                            ? 'Kode Verifikasi via SMS'
                                            : 'Kode Verifikasi via Email'}
                                </h6>
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                {twoFAMethod === 'app'
                                    ? 'Gunakan aplikasi Google Authenticator, Microsoft Authenticator, atau aplikasi 2FA lainnya untuk memindai kode QR dan menghasilkan kode verifikasi.'
                                    : twoFAMethod === 'sms'
                                        ? 'Anda akan menerima kode verifikasi melalui SMS ke nomor telepon terdaftar setiap kali melakukan login.'
                                        : 'Anda akan menerima kode verifikasi melalui email ke alamat email terdaftar setiap kali melakukan login.'}
                            </p>
                        </div>
                    </div>
                </Card>

                <Card extra="p-6">
                    <div className="flex items-center mb-6">
                        <MdHistory className="h-6 w-6 text-brand-500 mr-2" />
                        <h5 className="text-base font-bold text-navy-700 dark:text-white">
                            Riwayat Aktivitas Keamanan
                        </h5>
                    </div>

                    <div className="space-y-4">
                        {securityActivity.map((activity, index) => (
                            <div key={index} className="p-3 border border-gray-100 dark:border-navy-700 rounded-lg">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center mb-1">
                                            {getActivityIcon(activity.status)}
                                            <span className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                                                {activity.activity}
                                            </span>
                                        </div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400">
                                            <span>{activity.device} • {activity.location}</span>
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                        {activity.date}
                                    </span>
                                </div>
                            </div>
                        ))}

                        <button className="w-full mt-2 py-2 px-4 bg-gray-100 dark:bg-navy-700 hover:bg-gray-200 dark:hover:bg-navy-600 text-sm text-gray-700 dark:text-gray-300 rounded-lg">
                            Lihat Semua Aktivitas
                        </button>
                    </div>
                </Card>
            </div>

            <div className="lg:w-1/3">
                <Card extra="p-6 mb-5">
                    <div className="flex items-center mb-6">
                        <MdHelp className="h-6 w-6 text-brand-500 mr-2" />
                        <h5 className="text-base font-bold text-navy-700 dark:text-white">
                            Tips Keamanan
                        </h5>
                    </div>

                    <div className="space-y-3">
                        <div className="p-3 bg-white dark:bg-navy-700 rounded-lg border border-gray-100 dark:border-navy-600">
                            <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-2">
                                Gunakan kata sandi yang kuat
                            </h6>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                Buat kata sandi yang kuat dengan kombinasi huruf besar, huruf kecil, angka, dan simbol khusus.
                            </p>
                        </div>

                        <div className="p-3 bg-white dark:bg-navy-700 rounded-lg border border-gray-100 dark:border-navy-600">
                            <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-2">
                                Aktifkan autentikasi dua faktor
                            </h6>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                Tingkatkan keamanan akun dengan mengaktifkan autentikasi dua faktor untuk login.
                            </p>
                        </div>

                        <div className="p-3 bg-white dark:bg-navy-700 rounded-lg border border-gray-100 dark:border-navy-600">
                            <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-2">
                                Perbarui kata sandi secara berkala
                            </h6>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                Ubah kata sandi Anda secara berkala untuk meningkatkan keamanan akun.
                            </p>
                        </div>

                        <div className="p-3 bg-white dark:bg-navy-700 rounded-lg border border-gray-100 dark:border-navy-600">
                            <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-2">
                                Waspada terhadap phishing
                            </h6>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                Selalu pastikan bahwa Anda berada di situs yang tepat sebelum memasukkan informasi login.
                            </p>
                        </div>
                    </div>
                </Card>

                <Card extra="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h5 className="text-base font-bold text-navy-700 dark:text-white">
                            Login Devices
                        </h5>
                        <button className="text-xs text-brand-500 hover:text-brand-600 hover:underline">
                            Manage
                        </button>
                    </div>

                    <div className="space-y-3">
                        <div className="p-3 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20 rounded-lg">
                            <div className="flex justify-between items-center mb-1">
                                <div className="flex items-center">
                                    <MdCheckCircle className="h-4 w-4 text-green-500 dark:text-green-400 mr-2" />
                                    <span className="text-sm font-medium text-navy-700 dark:text-white">
                                        Windows 10 • Chrome
                                    </span>
                                </div>
                                <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full">
                                    Current
                                </span>
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                Last active: Just now • Jakarta, Indonesia
                            </div>
                        </div>

                        <div className="p-3 bg-white dark:bg-navy-700 rounded-lg border border-gray-100 dark:border-navy-600">
                            <div className="flex justify-between items-center mb-1">
                                <div className="flex items-center">
                                    <span className="text-sm font-medium text-navy-700 dark:text-white">
                                        MacBook Pro • Safari
                                    </span>
                                </div>
                                <button className="text-xs text-red-500 hover:text-red-600 hover:underline">
                                    Logout
                                </button>
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                Last active: 2 days ago • Jakarta, Indonesia
                            </div>
                        </div>

                        <div className="p-3 bg-white dark:bg-navy-700 rounded-lg border border-gray-100 dark:border-navy-600">
                            <div className="flex justify-between items-center mb-1">
                                <div className="flex items-center">
                                    <span className="text-sm font-medium text-navy-700 dark:text-white">
                                        iPhone 13 • Mobile App
                                    </span>
                                </div>
                                <button className="text-xs text-red-500 hover:text-red-600 hover:underline">
                                    Logout
                                </button>
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                Last active: 5 days ago • Bandung, Indonesia
                            </div>
                        </div>
                    </div>

                    <button className="w-full mt-4 py-2 px-4 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 text-sm rounded-lg">
                        Logout from all devices
                    </button>
                </Card>
            </div>
        </div>
    );
};

export default AccountSecurity;