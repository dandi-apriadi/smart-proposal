import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdPerson,
    MdArrowBack,
    MdEdit,
    MdEmail,
    MdPhone,
    MdPlace,
    MdWork,
    MdSchool,
    MdVerified,
    MdEventNote,
    MdFileUpload,
    MdSave
} from "react-icons/md";

const ProfileInfo = () => {
    const [isEditing, setIsEditing] = useState(false);

    // Dummy data for profile information
    const [profileData, setProfileData] = useState({
        name: "Dra. Siska Widyawati, M.Ak",
        nip: "198005152004012003",
        role: "Bendahara Dana Penelitian",
        email: "siska.widyawati@universitas.ac.id",
        phone: "+62 812-3456-7890",
        address: "Jl. Cendrawasih No. 25, Kota Jakarta",
        department: "Biro Keuangan dan Akuntansi",
        education: "S2 Akuntansi, Universitas Indonesia",
        joinedDate: "15 Januari 2004",
        lastActive: "Hari ini, 10:35",
        bio: "Bendahara Dana Penelitian dengan pengalaman lebih dari 15 tahun dalam pengelolaan keuangan dan administrasi dana penelitian di lingkungan universitas."
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
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
                    <Link to="/bendahara/profile" className="mr-3 p-2 bg-gray-100 dark:bg-navy-800 rounded-full hover:bg-gray-200 dark:hover:bg-navy-700">
                        <MdArrowBack className="h-5 w-5 text-gray-600 dark:text-white" />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-navy-700 dark:text-white">Informasi Profil</h2>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            Lihat dan kelola informasi profil Anda
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-5 mb-5">
                <div className="lg:w-1/3">
                    <Card extra="p-6">
                        <div className="flex flex-col items-center">
                            <div className="relative mb-4">
                                <div className="w-28 h-28 rounded-full bg-gray-100 dark:bg-navy-700 flex items-center justify-center border-4 border-white dark:border-navy-800 shadow-lg overflow-hidden">
                                    <div className="h-full w-full flex items-center justify-center bg-gray-50 dark:bg-navy-900 text-gray-400 dark:text-gray-600">
                                        <MdPerson className="text-5xl" />
                                    </div>
                                    {isEditing && (
                                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-full cursor-pointer">
                                            <MdFileUpload className="text-white text-2xl" />
                                        </div>
                                    )}
                                </div>
                                {!isEditing && (
                                    <button
                                        className="absolute bottom-0 right-0 p-1.5 rounded-full bg-brand-500 text-white hover:bg-brand-600"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        <MdEdit size={18} />
                                    </button>
                                )}
                            </div>

                            <h3 className="text-lg font-bold text-navy-700 dark:text-white mb-1">
                                {profileData.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                {profileData.role}
                            </p>
                            <div className="flex items-center justify-center px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-700 dark:text-blue-400 text-xs mb-4">
                                <MdVerified className="mr-1" /> Akun Terverifikasi
                            </div>

                            <div className="w-full border-t border-gray-200 dark:border-navy-700 pt-4 mt-2 space-y-3">
                                <div className="flex items-center">
                                    <MdEmail className="h-5 w-5 text-brand-500 mr-3" />
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                                        <p className="text-sm text-navy-700 dark:text-white">{profileData.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <MdPhone className="h-5 w-5 text-brand-500 mr-3" />
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Telepon</p>
                                        <p className="text-sm text-navy-700 dark:text-white">{profileData.phone}</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <MdPlace className="h-5 w-5 text-brand-500 mr-3" />
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Alamat</p>
                                        <p className="text-sm text-navy-700 dark:text-white">{profileData.address}</p>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <MdWork className="h-5 w-5 text-brand-500 mr-3" />
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Departemen</p>
                                        <p className="text-sm text-navy-700 dark:text-white">{profileData.department}</p>
                                    </div>
                                </div>
                            </div>

                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="mt-6 px-4 py-2 w-full bg-gray-100 dark:bg-navy-700 text-gray-700 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-navy-600 flex items-center justify-center gap-2"
                                >
                                    <MdEdit size={16} />
                                    <span>Edit Profil</span>
                                </button>
                            ) : (
                                <div className="flex gap-2 w-full mt-6">
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="px-4 py-2 flex-1 bg-gray-100 dark:bg-navy-700 text-gray-700 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-navy-600"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={handleSaveChanges}
                                        className="px-4 py-2 flex-1 bg-brand-500 text-white rounded-lg hover:bg-brand-600 flex items-center justify-center gap-2"
                                    >
                                        <MdSave size={16} />
                                        <span>Simpan</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </Card>

                    <Card extra="p-6 mt-5">
                        <div className="mb-4">
                            <h5 className="text-base font-bold text-navy-700 dark:text-white flex items-center">
                                <MdEventNote className="mr-2" /> Status Akun
                            </h5>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">Status:</span>
                                <span className="text-green-600 dark:text-green-400 font-medium">Aktif</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">NIP:</span>
                                <span className="text-navy-700 dark:text-white">{profileData.nip}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">Tanggal Bergabung:</span>
                                <span className="text-navy-700 dark:text-white">{profileData.joinedDate}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">Aktif Terakhir:</span>
                                <span className="text-navy-700 dark:text-white">{profileData.lastActive}</span>
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="lg:w-2/3">
                    <Card extra="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h5 className="text-base font-bold text-navy-700 dark:text-white">
                                Detail Informasi Profil
                            </h5>
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="p-2 bg-gray-100 dark:bg-navy-700 text-gray-700 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-navy-600"
                                >
                                    <MdEdit size={18} />
                                </button>
                            ) : (
                                <button
                                    onClick={handleSaveChanges}
                                    className="p-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600"
                                >
                                    <MdSave size={18} />
                                </button>
                            )}
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h6 className="text-sm font-semibold text-navy-700 dark:text-white mb-2">
                                    Informasi Umum
                                </h6>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
                                            Nama Lengkap
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="name"
                                                value={profileData.name}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                            />
                                        ) : (
                                            <p className="text-sm text-navy-700 dark:text-white">{profileData.name}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
                                            NIP
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="nip"
                                                value={profileData.nip}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                            />
                                        ) : (
                                            <p className="text-sm text-navy-700 dark:text-white">{profileData.nip}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
                                            Jabatan
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="role"
                                                value={profileData.role}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                            />
                                        ) : (
                                            <p className="text-sm text-navy-700 dark:text-white">{profileData.role}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
                                            Departemen
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="department"
                                                value={profileData.department}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                            />
                                        ) : (
                                            <p className="text-sm text-navy-700 dark:text-white">{profileData.department}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 dark:border-navy-700 pt-4">
                                <h6 className="text-sm font-semibold text-navy-700 dark:text-white mb-2">
                                    Kontak Informasi
                                </h6>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
                                            Email
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={profileData.email}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                            />
                                        ) : (
                                            <p className="text-sm text-navy-700 dark:text-white">{profileData.email}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
                                            Telepon
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={profileData.phone}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                            />
                                        ) : (
                                            <p className="text-sm text-navy-700 dark:text-white">{profileData.phone}</p>
                                        )}
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
                                            Alamat
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="address"
                                                value={profileData.address}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                            />
                                        ) : (
                                            <p className="text-sm text-navy-700 dark:text-white">{profileData.address}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 dark:border-navy-700 pt-4">
                                <h6 className="text-sm font-semibold text-navy-700 dark:text-white mb-2">
                                    Informasi Pendidikan & Pengalaman
                                </h6>
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
                                            Pendidikan
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="education"
                                                value={profileData.education}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                            />
                                        ) : (
                                            <p className="text-sm text-navy-700 dark:text-white">{profileData.education}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
                                            Bio / Tentang Saya
                                        </label>
                                        {isEditing ? (
                                            <textarea
                                                name="bio"
                                                value={profileData.bio}
                                                onChange={handleInputChange}
                                                rows={3}
                                                className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400"
                                            ></textarea>
                                        ) : (
                                            <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-navy-800 p-3 rounded-lg">
                                                {profileData.bio}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card extra="p-6 mt-5">
                        <div className="flex items-center justify-between mb-4">
                            <h5 className="text-base font-bold text-navy-700 dark:text-white flex items-center">
                                <MdSchool className="mr-2" /> Riwayat Pendidikan
                            </h5>
                        </div>

                        <div className="space-y-3">
                            <div className="p-3 border border-gray-100 dark:border-navy-700 rounded-lg">
                                <div className="flex justify-between">
                                    <div>
                                        <h6 className="text-sm font-medium text-navy-700 dark:text-white">S2 Akuntansi</h6>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Universitas Indonesia</p>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">2000 - 2002</p>
                                </div>
                            </div>

                            <div className="p-3 border border-gray-100 dark:border-navy-700 rounded-lg">
                                <div className="flex justify-between">
                                    <div>
                                        <h6 className="text-sm font-medium text-navy-700 dark:text-white">S1 Ekonomi</h6>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Universitas Gadjah Mada</p>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">1996 - 2000</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;
