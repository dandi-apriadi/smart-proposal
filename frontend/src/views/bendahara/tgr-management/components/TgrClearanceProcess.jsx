import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "components/card";
import {
    MdAssignmentTurnedIn,
    MdArrowBack,
    MdInfoOutline,
    MdAttachFile,
    MdFileUpload,
    MdCheck,
    MdOutlineClose,
    MdSend,
    MdDownload,
    MdArrowForward,
    MdEmail,
    MdPhone,
    MdComment,
    MdAccessTime,
    MdOutlinePending,
    MdDone,
    MdDescription,
    MdPerson,
    MdVerifiedUser,
    MdFilePresent,
    MdDelete,
    MdCalendarToday,
    MdRemoveRedEye,
    MdOutlinePriorityHigh,
    MdTask,
    MdBadge
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const TgrClearanceProcess = () => {
    const { id } = useParams();
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [attachedFiles, setAttachedFiles] = useState([]);
    const [comment, setComment] = useState("");
    const [tgrData, setTgrData] = useState(null);

    // Dummy data for TGR clearance process
    const dummyTgrData = {
        id: "TGR-2025-016",
        proposalId: "PRP-2023-036",
        title: "Efektivitas Metode Pembelajaran Jarak Jauh pada Mahasiswa",
        researcher: "Dr. Andi Wijaya",
        faculty: "Fakultas Psikologi",
        nip: "198202182015041001",
        amount: 12000000,
        issueDate: "01 Jun 2025",
        dueDate: "01 Jul 2025",
        status: "Dalam Proses",
        category: "Bukti Tidak Valid",
        urgency: "Tinggi",
        description: "Bukti pengeluaran yang disubmit tidak valid dan terdapat indikasi penggunaan dana tidak sesuai peruntukan",
        contact: {
            email: "andi.wijaya@example.ac.id",
            phone: "081234567892"
        },
        requirements: [
            {
                id: 1,
                title: "Melengkapi Bukti Pengeluaran",
                description: "Peneliti harus melengkapi bukti pengeluaran yang valid sesuai dengan alokasi dana yang diterima",
                status: "Pending"
            },
            {
                id: 2,
                title: "Laporan Penggunaan Dana",
                description: "Membuat laporan rinci penggunaan dana dengan melampirkan bukti pendukung",
                status: "Pending"
            },
            {
                id: 3,
                title: "Pengembalian Dana Tidak Terpakai",
                description: "Mengembalikan dana yang tidak terpakai atau tidak sesuai peruntukan",
                status: "Not Started"
            }
        ],
        history: [
            {
                date: "01 Jun 2025",
                action: "Kasus TGR dibuka",
                actor: "Sistem",
                comment: "Terdapat ketidaksesuaian dalam bukti pengeluaran"
            },
            {
                date: "02 Jun 2025",
                action: "Notifikasi dikirim ke peneliti",
                actor: "Bendahara",
                comment: "Pemberitahuan kasus TGR dan permintaan tindak lanjut"
            },
            {
                date: "05 Jun 2025",
                action: "Peneliti mengirimkan tanggapan",
                actor: "Dr. Andi Wijaya",
                comment: "Akan segera melengkapi bukti pengeluaran yang diminta"
            }
        ]
    };

    useEffect(() => {
        // Simulate API call to get TGR data
        setIsLoading(true);
        setTimeout(() => {
            setTgrData(dummyTgrData);
            setIsLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }, []);

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        const newFiles = files.map(file => ({
            id: Date.now() + Math.random().toString(36).substr(2, 9),
            name: file.name,
            size: file.size,
            type: file.type,
            uploadDate: new Date().toLocaleDateString(),
            status: "Uploaded"
        }));

        setAttachedFiles([...attachedFiles, ...newFiles]);
    };

    const handleRemoveFile = (id) => {
        setAttachedFiles(attachedFiles.filter(file => file.id !== id));
    };

    const handlePrevStep = () => {
        setCurrentStep(step => Math.max(1, step - 1));
    };

    const handleNextStep = () => {
        setCurrentStep(step => Math.min(4, step + 1));
    };

    const getStepColor = (stepNumber) => {
        if (stepNumber < currentStep) return "bg-gradient-to-r from-green-400 to-green-600 text-white border-green-500 shadow-md";
        if (stepNumber === currentStep) return "bg-gradient-to-r from-blue-400 to-blue-600 text-white border-blue-500 shadow-md";
        return "bg-gray-100 text-gray-700 dark:bg-navy-700 dark:text-gray-400 border-gray-200 dark:border-navy-600";
    };

    const getStepLineColor = (stepNumber) => {
        if (stepNumber < currentStep) return "bg-green-500 dark:bg-green-500";
        return "bg-gray-200 dark:bg-navy-600";
    };

    const getStatusBadge = (status) => {
        switch (status.toLowerCase()) {
            case "complete":
                return <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs rounded-full">Selesai</span>;
            case "pending":
                return <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs rounded-full">Pending</span>;
            default:
                return <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">Belum Dimulai</span>;
        }
    };

    const getFileIcon = (fileType) => {
        if (fileType.includes("pdf")) return "📄";
        if (fileType.includes("image")) return "📷";
        if (fileType.includes("excel") || fileType.includes("sheet")) return "📊";
        if (fileType.includes("word") || fileType.includes("document")) return "📝";
        return "📁";
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[70vh]">
                <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-t-2 border-brand-500"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-medium text-brand-500">Loading</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-5">
            <div className="mb-8" data-aos="fade-up">
                <div className="flex items-center">
                    <Link to="/bendahara/tgr-management/tgr-list" className="mr-3 p-2.5 bg-brand-50 dark:bg-navy-800 rounded-full hover:bg-brand-100 dark:hover:bg-navy-700 transition-all duration-300 shadow-sm">
                        <MdArrowBack className="h-5 w-5 text-brand-500 dark:text-white" />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-navy-700 dark:text-white tracking-tight">Proses Bebas TGR</h2>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            Proses penyelesaian tuntutan ganti rugi untuk kasus <span className="font-medium text-brand-500 dark:text-brand-400">{tgrData?.id}</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                    <Card extra="p-6 relative hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up">
                        {/* Modern Progress Steps */}
                        <div className="mb-10 px-2" data-aos="fade-up" data-aos-delay="100">
                            <div className="flex items-center justify-between relative">
                                <div className="absolute left-[10%] right-[10%] top-1/2 h-1 -z-10 flex">
                                    <div className={`flex-1 h-full rounded-l-full ${getStepLineColor(1)}`}></div>
                                    <div className={`flex-1 h-full ${getStepLineColor(2)}`}></div>
                                    <div className={`flex-1 h-full rounded-r-full ${getStepLineColor(3)}`}></div>
                                </div>
                                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${getStepColor(1)} font-bold transition-all duration-300 z-10`}>
                                    1
                                </div>
                                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${getStepColor(2)} font-bold transition-all duration-300 z-10`}>
                                    2
                                </div>
                                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${getStepColor(3)} font-bold transition-all duration-300 z-10`}>
                                    3
                                </div>
                                <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${getStepColor(4)} font-bold transition-all duration-300 z-10`}>
                                    4
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-3 px-1 text-xs font-medium">
                                <span className={`${currentStep >= 1 ? "text-brand-500 dark:text-brand-400" : "text-gray-500 dark:text-gray-400"} transition-colors duration-300`}>Identifikasi</span>
                                <span className={`${currentStep >= 2 ? "text-brand-500 dark:text-brand-400" : "text-gray-500 dark:text-gray-400"} transition-colors duration-300`}>Pengumpulan</span>
                                <span className={`${currentStep >= 3 ? "text-brand-500 dark:text-brand-400" : "text-gray-500 dark:text-gray-400"} transition-colors duration-300`}>Verifikasi</span>
                                <span className={`${currentStep >= 4 ? "text-brand-500 dark:text-brand-400" : "text-gray-500 dark:text-gray-400"} transition-colors duration-300`}>Resolusi</span>
                            </div>
                        </div>

                        {/* Step content with enhanced design */}
                        <div className="min-h-[350px]">
                            {currentStep === 1 && (
                                <div data-aos="fade-up" data-aos-delay="150">
                                    <h3 className="text-lg font-bold text-navy-700 dark:text-white mb-5 flex items-center">
                                        <MdTask className="mr-2 text-brand-500 h-5 w-5" />
                                        Identifikasi Masalah TGR
                                    </h3>

                                    <div className="bg-gray-50 dark:bg-navy-800 p-5 rounded-xl mb-5 shadow-sm border border-gray-100 dark:border-navy-700">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-base font-medium text-navy-700 dark:text-white flex items-center">
                                                <MdDescription className="mr-2 text-gray-500 h-5 w-5" />
                                                Detail Kasus
                                            </h4>
                                            <span className="px-2.5 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-medium rounded-full">
                                                {tgrData?.urgency}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-gray-600 dark:text-gray-400">ID Kasus:</span>
                                                    <span className="text-xs font-medium text-navy-700 dark:text-white bg-gray-100 dark:bg-navy-700 px-2 py-0.5 rounded">
                                                        {tgrData?.id}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-gray-600 dark:text-gray-400">Kategori:</span>
                                                    <span className="text-xs font-medium text-navy-700 dark:text-white">
                                                        {tgrData?.category}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-gray-600 dark:text-gray-400">Status:</span>
                                                    <span className="text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded">
                                                        {tgrData?.status}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-gray-600 dark:text-gray-400">Nilai TGR:</span>
                                                    <span className="text-xs font-medium text-navy-700 dark:text-white">
                                                        Rp {tgrData?.amount.toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-gray-600 dark:text-gray-400">Tanggal Kasus:</span>
                                                    <div className="flex items-center">
                                                        <MdCalendarToday className="h-3.5 w-3.5 text-gray-500 mr-1" />
                                                        <span className="text-xs font-medium text-navy-700 dark:text-white">
                                                            {tgrData?.issueDate}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-xs text-gray-600 dark:text-gray-400">Batas Waktu:</span>
                                                    <div className="flex items-center text-red-500 dark:text-red-400">
                                                        <MdOutlinePriorityHigh className="h-3.5 w-3.5 mr-1" />
                                                        <span className="text-xs font-medium">
                                                            {tgrData?.dueDate}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-5">
                                        <h4 className="text-base font-medium text-navy-700 dark:text-white mb-3 flex items-center">
                                            <MdInfoOutline className="mr-2 text-amber-500 h-5 w-5" />
                                            Deskripsi Masalah
                                        </h4>
                                        <div className="p-4 bg-white dark:bg-navy-800 rounded-xl border border-gray-100 dark:border-navy-700 shadow-sm">
                                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                                {tgrData?.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-base font-medium text-navy-700 dark:text-white mb-3 flex items-center">
                                            <MdTask className="mr-2 text-green-500 h-5 w-5" />
                                            Syarat Penyelesaian
                                        </h4>
                                        <div className="space-y-3">
                                            {tgrData?.requirements.map((req, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-start gap-3 p-4 bg-white dark:bg-navy-800 rounded-xl border border-gray-100 dark:border-navy-700 shadow-sm hover:shadow-md transition-all duration-300"
                                                >
                                                    <div className="mt-0.5">
                                                        {req.status === "Complete" ? (
                                                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                                                <MdDone className="h-4 w-4 text-white" />
                                                            </div>
                                                        ) : req.status === "Pending" ? (
                                                            <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                                                                <MdOutlinePending className="h-4 w-4 text-white" />
                                                            </div>
                                                        ) : (
                                                            <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                                                                <MdAccessTime className="h-4 w-4 text-white" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-center mb-1">
                                                            <span className="text-sm font-medium text-navy-700 dark:text-white">
                                                                {req.title}
                                                            </span>
                                                            {getStatusBadge(req.status)}
                                                        </div>
                                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                                            {req.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div data-aos="fade-up" data-aos-delay="150">
                                    <h3 className="text-lg font-bold text-navy-700 dark:text-white mb-5 flex items-center">
                                        <MdAttachFile className="mr-2 text-brand-500 h-5 w-5" />
                                        Pengumpulan Dokumen dan Bukti
                                    </h3>

                                    <div className="p-5 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/20 mb-6 shadow-sm">
                                        <div className="flex items-start gap-3">
                                            <div className="p-3 bg-blue-100 dark:bg-blue-800/30 rounded-lg">
                                                <MdInfoOutline className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <div>
                                                <p className="text-base font-medium text-blue-800 dark:text-blue-400 mb-2">
                                                    Dokumen yang Dibutuhkan
                                                </p>
                                                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 ml-1">
                                                    <li className="flex items-start gap-2">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                                                        <span>Bukti pengeluaran yang valid dan lengkap</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                                                        <span>Laporan penggunaan dana yang terperinci</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                                                        <span>Bukti transfer pengembalian dana (jika ada)</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                                                        <span>Dokumen pendukung lainnya</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h4 className="text-base font-medium text-navy-700 dark:text-white mb-3 flex items-center">
                                            <MdFileUpload className="mr-2 text-amber-500 h-5 w-5" />
                                            Unggah Dokumen
                                        </h4>
                                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 dark:border-navy-600 rounded-xl cursor-pointer bg-gray-50 dark:bg-navy-800 hover:bg-gray-100 dark:hover:bg-navy-700 transition-all duration-300">
                                            <div className="flex flex-col items-center justify-center py-6">
                                                <div className="p-3 bg-amber-50 dark:bg-amber-900/10 rounded-full mb-3">
                                                    <MdFileUpload className="w-8 h-8 text-amber-500 dark:text-amber-400" />
                                                </div>
                                                <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                                                    <span className="font-semibold">Klik untuk unggah</span> atau drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    PDF, JPG, PNG atau Excel (Max. 10MB)
                                                </p>
                                            </div>
                                            <input type="file" className="hidden" onChange={handleFileUpload} multiple />
                                        </label>
                                    </div>

                                    <div>
                                        <h4 className="text-base font-medium text-navy-700 dark:text-white mb-3 flex items-center">
                                            <MdFilePresent className="mr-2 text-green-500 h-5 w-5" />
                                            Dokumen yang Diunggah
                                        </h4>
                                        {attachedFiles.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[250px] overflow-y-auto p-1">
                                                {attachedFiles.map((file) => (
                                                    <div
                                                        key={file.id}
                                                        className="flex items-center justify-between p-3 bg-white dark:bg-navy-700 border border-gray-100 dark:border-navy-600 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                                                    >
                                                        <div className="flex items-center">
                                                            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-navy-800 mr-3">
                                                                <span className="text-xl">{getFileIcon(file.type)}</span>
                                                            </div>
                                                            <div>
                                                                <p className="text-xs font-medium text-navy-700 dark:text-white line-clamp-1">{file.name}</p>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                    {(file.size / 1024 / 1024).toFixed(2)} MB • {file.uploadDate}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <button
                                                            className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors duration-200"
                                                            onClick={() => handleRemoveFile(file.id)}
                                                        >
                                                            <MdDelete className="h-4 w-4 text-red-500 dark:text-red-400" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center py-8 bg-gray-50 dark:bg-navy-800 rounded-xl border border-gray-100 dark:border-navy-700">
                                                <div className="p-3 bg-gray-100 dark:bg-navy-700 rounded-full mb-3">
                                                    <MdAttachFile className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                                                </div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Belum ada dokumen yang diunggah
                                                </p>
                                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                                    Dokumen yang diunggah akan muncul di sini
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div data-aos="fade-up" data-aos-delay="150">
                                    <h3 className="text-lg font-bold text-navy-700 dark:text-white mb-5 flex items-center">
                                        <MdRemoveRedEye className="mr-2 text-brand-500 h-5 w-5" />
                                        Verifikasi Dokumen dan Data
                                    </h3>

                                    <div className="mb-6">
                                        <h4 className="text-base font-medium text-navy-700 dark:text-white mb-3 flex items-center">
                                            <MdAttachFile className="mr-2 text-blue-500 h-5 w-5" />
                                            Dokumen yang Perlu Diverifikasi
                                        </h4>
                                        {attachedFiles.length > 0 ? (
                                            <div className="space-y-3 mb-4">
                                                {attachedFiles.map((file) => (
                                                    <div
                                                        key={file.id}
                                                        className="flex items-center justify-between p-4 bg-white dark:bg-navy-700 border border-gray-100 dark:border-navy-600 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                                                    >
                                                        <div className="flex items-center">
                                                            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-navy-800 mr-3">
                                                                <span className="text-xl">{getFileIcon(file.type)}</span>
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium text-navy-700 dark:text-white">{file.name}</p>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                    Diunggah pada {file.uploadDate}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <button className="p-2 bg-gray-100 dark:bg-navy-800 text-gray-700 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-navy-700 transition-colors duration-200" title="Unduh">
                                                                <MdDownload className="h-4 w-4" />
                                                            </button>
                                                            <div className="flex gap-1">
                                                                <button className="p-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors duration-200" title="Terima">
                                                                    <MdCheck className="h-4 w-4" />
                                                                </button>
                                                                <button className="p-2 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors duration-200" title="Tolak">
                                                                    <MdOutlineClose className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="p-5 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 rounded-xl flex items-start gap-3 mb-4 shadow-sm">
                                                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                                                    <MdInfoOutline className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-amber-800 dark:text-amber-400 mb-1">
                                                        Belum Ada Dokumen
                                                    </p>
                                                    <p className="text-sm text-amber-700 dark:text-amber-300">
                                                        Belum ada dokumen yang diunggah untuk diverifikasi. Harap unggah dokumen terlebih dahulu.
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        <div className="mb-6">
                                            <h4 className="text-base font-medium text-navy-700 dark:text-white mb-3 flex items-center">
                                                <MdComment className="mr-2 text-purple-500 h-5 w-5" />
                                                Catatan Verifikasi
                                            </h4>
                                            <textarea
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                placeholder="Tambahkan catatan verifikasi..."
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 transition-all duration-200"
                                                rows={4}
                                            ></textarea>
                                        </div>

                                        <div>
                                            <h4 className="text-base font-medium text-navy-700 dark:text-white mb-3 flex items-center">
                                                <MdTask className="mr-2 text-green-500 h-5 w-5" />
                                                Status Persyaratan
                                            </h4>
                                            <div className="space-y-3">
                                                {tgrData?.requirements.map((req, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center justify-between p-4 bg-white dark:bg-navy-700 rounded-xl border border-gray-100 dark:border-navy-700 shadow-sm hover:shadow-md transition-all duration-300"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div>
                                                                {req.status === "Complete" ? (
                                                                    <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                                                        <MdDone className="h-5 w-5 text-green-500 dark:text-green-400" />
                                                                    </div>
                                                                ) : req.status === "Pending" ? (
                                                                    <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                                                                        <MdOutlinePending className="h-5 w-5 text-amber-500 dark:text-amber-400" />
                                                                    </div>
                                                                ) : (
                                                                    <div className="p-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg">
                                                                        <MdAccessTime className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <span className="text-sm font-medium text-navy-700 dark:text-white">{req.title}</span>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button className="p-2 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors duration-200" title="Terima">
                                                                <MdCheck className="h-4 w-4" />
                                                            </button>
                                                            <button className="p-2 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors duration-200" title="Tolak">
                                                                <MdOutlineClose className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 4 && (
                                <div data-aos="fade-up" data-aos-delay="150">
                                    <h3 className="text-lg font-bold text-navy-700 dark:text-white mb-5 flex items-center">
                                        <MdVerifiedUser className="mr-2 text-brand-500 h-5 w-5" />
                                        Finalisasi dan Resolusi
                                    </h3>

                                    <div className="mb-6">
                                        <div className="p-5 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-navy-800 dark:to-navy-900 rounded-xl mb-6 shadow-sm border border-gray-100 dark:border-navy-700">
                                            <h4 className="text-base font-medium text-navy-700 dark:text-white mb-4 flex items-center">
                                                <MdDescription className="mr-2 text-gray-500 h-5 w-5" />
                                                Ringkasan Kasus
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                                <div className="space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-600 dark:text-gray-400">ID Kasus:</span>
                                                        <span className="font-medium text-navy-700 dark:text-white px-2 py-0.5 bg-gray-100 dark:bg-navy-700 rounded">{tgrData?.id}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-600 dark:text-gray-400">Peneliti:</span>
                                                        <span className="font-medium text-navy-700 dark:text-white">{tgrData?.researcher}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-600 dark:text-gray-400">Fakultas:</span>
                                                        <span className="font-medium text-navy-700 dark:text-white">{tgrData?.faculty}</span>
                                                    </div>
                                                </div>
                                                <div className="space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-600 dark:text-gray-400">Nilai TGR:</span>
                                                        <span className="font-medium text-navy-700 dark:text-white">Rp {tgrData?.amount.toLocaleString()}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-600 dark:text-gray-400">Batas Waktu:</span>
                                                        <span className="font-medium text-navy-700 dark:text-white">{tgrData?.dueDate}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-600 dark:text-gray-400">Status:</span>
                                                        <span className="font-medium px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded">{tgrData?.status}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-6">
                                            <h4 className="text-base font-medium text-navy-700 dark:text-white mb-3 flex items-center">
                                                <MdTask className="mr-2 text-green-500 h-5 w-5" />
                                                Status Persyaratan
                                            </h4>
                                            <div className="space-y-3">
                                                {tgrData?.requirements.map((req, index) => (
                                                    <div
                                                        key={index}
                                                        className={`flex items-start gap-3 p-4 rounded-xl shadow-sm border ${req.status === "Complete"
                                                                ? "bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-900/20"
                                                                : req.status === "Pending"
                                                                    ? "bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/20"
                                                                    : "bg-gray-50 dark:bg-navy-800 border-gray-100 dark:border-navy-700"
                                                            }`}
                                                    >
                                                        <div>
                                                            {req.status === "Complete" ? (
                                                                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                                                    <MdCheck className="h-5 w-5 text-green-500 dark:text-green-400" />
                                                                </div>
                                                            ) : req.status === "Pending" ? (
                                                                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                                                                    <MdOutlinePending className="h-5 w-5 text-amber-500 dark:text-amber-400" />
                                                                </div>
                                                            ) : (
                                                                <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
                                                                    <MdAccessTime className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-navy-700 dark:text-white mb-1">{req.title}</p>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">{req.description}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mb-6">
                                            <h4 className="text-base font-medium text-navy-700 dark:text-white mb-3 flex items-center">
                                                <MdAttachFile className="mr-2 text-blue-500 h-5 w-5" />
                                                Dokumen Terkait
                                            </h4>
                                            {attachedFiles.length > 0 ? (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[150px] overflow-y-auto p-1">
                                                    {attachedFiles.map((file) => (
                                                        <div
                                                            key={file.id}
                                                            className="flex items-center gap-3 p-3 bg-white dark:bg-navy-700 rounded-lg border border-gray-100 dark:border-navy-600 shadow-sm hover:shadow-md transition-all duration-200"
                                                        >
                                                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 dark:bg-navy-800">
                                                                <span className="text-lg">{getFileIcon(file.type)}</span>
                                                            </div>
                                                            <div className="flex-1 truncate">
                                                                <span className="text-xs text-gray-700 dark:text-gray-300">{file.name}</span>
                                                            </div>
                                                            <button className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                                                                <MdDownload className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="flex items-center justify-center p-4 bg-gray-50 dark:bg-navy-800 rounded-xl border border-gray-100 dark:border-navy-700">
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                                        Tidak ada dokumen yang terlampir
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="mb-6">
                                            <h4 className="text-base font-medium text-navy-700 dark:text-white mb-3 flex items-center">
                                                <MdComment className="mr-2 text-purple-500 h-5 w-5" />
                                                Buat Kesimpulan
                                            </h4>
                                            <textarea
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                placeholder="Tuliskan kesimpulan dan resolusi kasus TGR..."
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 transition-all duration-200"
                                                rows={3}
                                            ></textarea>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <button className="px-4 py-3 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white text-sm font-medium rounded-xl transition-all duration-300 shadow-sm hover:shadow-md">
                                                <div className="flex items-center justify-center gap-2">
                                                    <MdVerifiedUser className="h-5 w-5" />
                                                    <span>Selesaikan Kasus</span>
                                                </div>
                                            </button>
                                            <button className="px-4 py-3 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white text-sm font-medium rounded-xl transition-all duration-300 shadow-sm hover:shadow-md">
                                                <div className="flex items-center justify-center gap-2">
                                                    <MdEmail className="h-5 w-5" />
                                                    <span>Minta Tambahan Dokumen</span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between pt-5 mt-6 border-t border-gray-200 dark:border-navy-600">
                            <button
                                onClick={handlePrevStep}
                                disabled={currentStep === 1}
                                className={`px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium transition-all duration-300 ${currentStep === 1
                                    ? "bg-gray-100 text-gray-400 dark:bg-navy-800 dark:text-gray-600 cursor-not-allowed"
                                    : "bg-gray-100 hover:bg-gray-200 dark:bg-navy-800 dark:hover:bg-navy-700 text-gray-700 dark:text-white hover:shadow-sm"}`}
                            >
                                <MdArrowBack className="h-4 w-4" />
                                <span>Sebelumnya</span>
                            </button>
                            <button
                                onClick={handleNextStep}
                                disabled={currentStep === 4}
                                className={`px-4 py-2.5 rounded-xl flex items-center gap-2 text-sm font-medium transition-all duration-300 ${currentStep === 4
                                    ? "bg-gray-100 text-gray-400 dark:bg-navy-800 dark:text-gray-600 cursor-not-allowed"
                                    : "bg-gradient-to-r from-brand-400 to-brand-600 hover:from-brand-500 hover:to-brand-700 text-white hover:shadow-md"}`}
                            >
                                <span>Selanjutnya</span>
                                <MdArrowForward className="h-4 w-4" />
                            </button>
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-1">
                    <Card extra="p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="200">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-lg font-bold text-navy-700 dark:text-white flex items-center">
                                <MdPerson className="mr-2 text-brand-500 h-5 w-5" />
                                Detail Peneliti
                            </h3>
                            <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400">
                                Dosen
                            </span>
                        </div>

                        <div className="p-5 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-navy-800 dark:to-navy-900 rounded-xl mb-6 shadow-sm border border-gray-100 dark:border-navy-700">
                            <div className="flex items-center mb-4">
                                <div className="w-14 h-14 mr-4 rounded-full bg-gradient-to-br from-blue-100 to-blue-300 dark:from-blue-900/30 dark:to-blue-700/30 flex items-center justify-center shadow-sm">
                                    <MdPerson className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h4 className="text-base font-bold text-navy-700 dark:text-white">
                                        {tgrData?.researcher}
                                    </h4>
                                    <div className="flex items-center">
                                        <MdBadge className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400 mr-1" />
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {tgrData?.faculty}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-200 dark:border-navy-600 space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                        <MdEmail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <a
                                        href={`mailto:${tgrData?.contact.email}`}
                                        className="text-sm text-brand-500 dark:text-brand-400 hover:underline hover:text-brand-600 dark:hover:text-brand-300 transition-colors"
                                    >
                                        {tgrData?.contact.email}
                                    </a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                        <MdPhone className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    </div>
                                    <a
                                        href={`tel:${tgrData?.contact.phone}`}
                                        className="text-sm text-brand-500 dark:text-brand-400 hover:underline hover:text-brand-600 dark:hover:text-brand-300 transition-colors"
                                    >
                                        {tgrData?.contact.phone}
                                    </a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                        <MdBadge className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                        NIP: {tgrData?.nip}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mb-5">
                            <h3 className="text-base font-bold text-navy-700 dark:text-white mb-3 flex items-center">
                                <MdAccessTime className="mr-2 text-amber-500 h-5 w-5" />
                                Riwayat Kasus
                            </h3>
                            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 relative">
                                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-navy-700 z-0"></div>

                                {tgrData?.history.map((item, index) => (
                                    <div key={index} className="relative pl-8">
                                        <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-white dark:bg-navy-800 border-2 border-brand-500 dark:border-brand-400 z-10 flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-brand-500 dark:bg-brand-400"></div>
                                        </div>

                                        <div className="p-4 bg-white dark:bg-navy-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-navy-600">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-sm font-medium text-navy-700 dark:text-white">{item.action}</span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-0.5 bg-gray-100 dark:bg-navy-800 rounded-full">{item.date}</span>
                                            </div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                                                Oleh: <span className="font-medium text-brand-500 dark:text-brand-400">{item.actor}</span>
                                            </div>
                                            {item.comment && (
                                                <p className="text-xs italic text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-navy-800 p-2 rounded-lg mt-2">
                                                    "{item.comment}"
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-base font-bold text-navy-700 dark:text-white mb-3 flex items-center">
                                <MdEmail className="mr-2 text-green-500 h-5 w-5" />
                                Kirim Pesan
                            </h3>
                            <div className="mb-3">
                                <textarea
                                    placeholder="Ketik pesan untuk peneliti..."
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 transition-all duration-200"
                                    rows={3}
                                ></textarea>
                            </div>
                            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-brand-400 to-brand-600 hover:from-brand-500 hover:to-brand-700 text-white text-sm font-medium rounded-xl transition-all duration-300 shadow-sm hover:shadow-md">
                                <MdSend className="h-4 w-4" />
                                <span>Kirim Pesan</span>
                            </button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default TgrClearanceProcess;
