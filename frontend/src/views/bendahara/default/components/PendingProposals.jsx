import React, { useState, useRef } from "react";
import Card from "components/card";
import { Link } from "react-router-dom";
import { MdOutlinePending, MdOutlineArrowForward, MdPayment, MdClose, MdCheck, MdAttachMoney, MdCalendarToday, MdDescription, MdUpload, MdDelete, MdAttachFile } from "react-icons/md";

// Dummy data for pending proposals
const dummyPendingProposals = [
    {
        id: "PRP-2025-042",
        title: "Pengembangan Machine Learning untuk Deteksi Penyakit Tanaman",
        researcher: "Dr. Budi Santoso",
        amount: 75000000,
        approvedDate: "10 Jun 2025",
        priority: "Tinggi"
    },
    {
        id: "PRP-2025-038",
        title: "Analisis Dampak Ekonomi dari Perubahan Iklim di Indonesia",
        researcher: "Prof. Dewi Lestari",
        amount: 65000000,
        approvedDate: "08 Jun 2025",
        priority: "Sedang"
    },
    {
        id: "PRP-2025-036",
        title: "Efektivitas Metode Pembelajaran Jarak Jauh pada Mahasiswa",
        researcher: "Dr. Andi Wijaya",
        amount: 50000000,
        approvedDate: "05 Jun 2025",
        priority: "Rendah"
    },
    {
        id: "PRP-2025-035",
        title: "Sistem Monitoring Kualitas Air Berbasis IoT",
        researcher: "Dr. Ratna Sari",
        amount: 82000000,
        approvedDate: "04 Jun 2025",
        priority: "Tinggi"
    },
    {
        id: "PRP-2025-032",
        title: "Pengembangan Bahan Bakar Alternatif dari Mikroalga",
        researcher: "Prof. Hendra Gunawan",
        amount: 95000000,
        approvedDate: "02 Jun 2025",
        priority: "Sedang"
    },
    {
        id: "PRP-2025-029",
        title: "Analisis Big Data untuk Prediksi Perilaku Konsumen",
        researcher: "Dr. Maya Putri",
        amount: 68000000,
        approvedDate: "28 Mei 2025",
        priority: "Sedang"
    },
    {
        id: "PRP-2025-027",
        title: "Implementasi Blockchain dalam Sistem Pembiayaan Penelitian",
        researcher: "Dr. Farhan Akbar",
        amount: 90000000,
        approvedDate: "25 Mei 2025",
        priority: "Tinggi"
    },
    {
        id: "PRP-2025-025",
        title: "Pengembangan Vaksin Berbasis DNA untuk Penyakit Tropis",
        researcher: "Prof. Amelia Wijaya",
        amount: 120000000,
        approvedDate: "20 Mei 2025",
        priority: "Tinggi"
    },
    {
        id: "PRP-2025-023",
        title: "Optimasi Proses Manufaktur Menggunakan AI",
        researcher: "Dr. Rudi Hartanto",
        amount: 85000000,
        approvedDate: "18 Mei 2025",
        priority: "Sedang"
    },
    {
        id: "PRP-2025-022",
        title: "Studi Kebijakan Publik dalam Era Digital",
        researcher: "Prof. Diana Kusuma",
        amount: 55000000,
        approvedDate: "15 Mei 2025",
        priority: "Rendah"
    }
];

const PendingProposals = ({ pendingProposals = dummyPendingProposals }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProposal, setSelectedProposal] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState("pending");
    const [paymentDate, setPaymentDate] = useState("");
    const [paymentNote, setPaymentNote] = useState("");
    const [paymentProof, setPaymentProof] = useState(null);
    const fileInputRef = useRef(null);

    const openPaymentModal = (proposal) => {
        setSelectedProposal(proposal);
        setPaymentStatus("pending");
        setPaymentDate("");
        setPaymentNote("");
        setPaymentProof(null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProposal(null);
    };

    const handleSubmitPayment = () => {
        // Here we would handle the actual payment processing
        // For now we just close the modal
        alert(`Pembayaran untuk proposal ${selectedProposal.id} telah diproses!`);
        closeModal();
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setPaymentProof(e.target.files[0]);
        }
    };

    const clearPaymentProof = () => {
        setPaymentProof(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <Card extra="p-4 h-screen flex flex-col">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                    <MdOutlinePending className="h-6 w-6 text-amber-500 mr-2" />
                    <h4 className="text-lg font-bold text-navy-700 dark:text-white">
                        Proposal Menunggu Pencairan
                    </h4>
                </div>
                <span className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 rounded-full">
                    {pendingProposals.length} Proposal
                </span>
            </div>

            <div className="flex flex-col gap-3 flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-300 dark:scrollbar-thumb-navy-600">
                {pendingProposals.length > 0 ? (
                    pendingProposals.map((proposal) => (
                        <div
                            key={proposal.id}
                            className="flex items-start p-3 rounded-xl bg-gray-50 dark:bg-navy-800 hover:bg-gray-100 dark:hover:bg-navy-700 transition-colors"
                        >
                            <div className={`flex-shrink-0 w-2 h-10 rounded-full ${proposal.priority === 'Tinggi' ? 'bg-red-500' :
                                proposal.priority === 'Sedang' ? 'bg-amber-500' : 'bg-blue-500'
                                } mr-3`}></div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <h5 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                        {proposal.title}
                                    </h5>
                                    <button
                                        className="ml-2 p-1.5 rounded-lg bg-brand-50 dark:bg-brand-500/20 text-brand-500 hover:bg-brand-100 dark:hover:bg-brand-500/30 transition-colors"
                                        title="Edit Status Pembayaran"
                                        onClick={() => openPaymentModal(proposal)}
                                    >
                                        <MdPayment className="h-4 w-4" />
                                    </button>
                                </div>
                                <div className="flex items-center mt-1">
                                    <span className="text-xs text-gray-600 dark:text-gray-400">
                                        {proposal.researcher}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-xs font-medium text-brand-500">
                                        Rp {proposal.amount.toLocaleString()}
                                    </span>
                                    <span className="text-xs text-gray-600 dark:text-gray-400">
                                        Disetujui: {proposal.approvedDate}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-4 text-sm text-gray-500 dark:text-gray-400">
                        Tidak ada proposal yang menunggu pencairan
                    </div>
                )}
            </div>

            <div className="mt-4">
                <Link
                    to="/bendahara/funding-management/approved-proposals"
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-50 dark:bg-brand-500/20 py-2.5 text-sm font-medium text-brand-500 hover:bg-brand-100 dark:hover:bg-brand-500/30 transition-colors"
                >
                    Lihat Semua Proposal
                    <MdOutlineArrowForward className="h-4 w-4" />
                </Link>
            </div>

            {/* Payment Management Modal */}
            {isModalOpen && selectedProposal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-navy-800 rounded-2xl w-full max-w-md overflow-hidden shadow-xl">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold text-navy-700 dark:text-white">
                                    Manajemen Pembayaran
                                </h3>
                                <button
                                    className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-navy-700"
                                    onClick={closeModal}
                                >
                                    <MdClose className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                                </button>
                            </div>

                            <div className="mb-4">
                                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Detail Proposal</h4>
                                <div className="p-3 bg-gray-50 dark:bg-navy-900 rounded-lg">
                                    <p className="text-sm font-medium text-navy-700 dark:text-white">{selectedProposal.title}</p>
                                    <div className="mt-1 flex items-center justify-between">
                                        <span className="text-xs text-gray-600 dark:text-gray-400">{selectedProposal.researcher}</span>
                                        <span className="text-xs font-medium text-brand-500">ID: {selectedProposal.id}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Status Pembayaran
                                    </label>
                                    <div className="flex gap-2">
                                        <button
                                            className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1 text-sm ${paymentStatus === 'pending'
                                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                                                : 'bg-gray-100 text-gray-700 dark:bg-navy-700 dark:text-gray-300'
                                                }`}
                                            onClick={() => setPaymentStatus('pending')}
                                        >
                                            <MdOutlinePending className="h-4 w-4" />
                                            Menunggu
                                        </button>
                                        <button
                                            className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1 text-sm ${paymentStatus === 'processing'
                                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                                                : 'bg-gray-100 text-gray-700 dark:bg-navy-700 dark:text-gray-300'
                                                }`}
                                            onClick={() => setPaymentStatus('processing')}
                                        >
                                            <MdAttachMoney className="h-4 w-4" />
                                            Diproses
                                        </button>
                                        <button
                                            className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-1 text-sm ${paymentStatus === 'completed'
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                : 'bg-gray-100 text-gray-700 dark:bg-navy-700 dark:text-gray-300'
                                                }`}
                                            onClick={() => setPaymentStatus('completed')}
                                        >
                                            <MdCheck className="h-4 w-4" />
                                            Selesai
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        <div className="flex items-center gap-1">
                                            <MdCalendarToday className="h-4 w-4" />
                                            Tanggal Pembayaran
                                        </div>
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500"
                                        value={paymentDate}
                                        onChange={(e) => setPaymentDate(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        <div className="flex items-center gap-1">
                                            <MdDescription className="h-4 w-4" />
                                            Catatan Pembayaran
                                        </div>
                                    </label>
                                    <textarea
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500"
                                        placeholder="Tambahkan catatan pembayaran..."
                                        rows={3}
                                        value={paymentNote}
                                        onChange={(e) => setPaymentNote(e.target.value)}
                                    />
                                </div>

                                {/* Payment Proof Upload Section */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        <div className="flex items-center gap-1">
                                            <MdAttachFile className="h-4 w-4" />
                                            Bukti Pembayaran
                                        </div>
                                    </label>

                                    {!paymentProof ? (
                                        <div
                                            className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-navy-900"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <MdUpload className="h-8 w-8 mx-auto text-gray-400 dark:text-gray-600" />
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                Klik untuk unggah bukti pembayaran
                                            </p>
                                            <p className="text-xs text-gray-400 dark:text-gray-500">
                                                Format: JPG, PNG, atau PDF (Maks. 5MB)
                                            </p>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept=".jpg,.jpeg,.png,.pdf"
                                                ref={fileInputRef}
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                    ) : (
                                        <div className="bg-gray-50 dark:bg-navy-900 rounded-lg p-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="p-2 bg-brand-50 dark:bg-brand-500/20 rounded-lg">
                                                        <MdAttachFile className="h-5 w-5 text-brand-500" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate max-w-[180px]">
                                                            {paymentProof.name}
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                            {(paymentProof.size / 1024).toFixed(2)} KB
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    className="p-1.5 rounded-full bg-red-50 dark:bg-red-500/20 text-red-500 hover:bg-red-100"
                                                    onClick={clearPaymentProof}
                                                    title="Hapus file"
                                                >
                                                    <MdDelete className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        Unggah bukti transfer, nota, atau dokumen lain sebagai bukti pembayaran
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    className="flex-1 py-2 rounded-lg bg-gray-100 dark:bg-navy-700 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-navy-800"
                                    onClick={closeModal}
                                >
                                    Batal
                                </button>
                                <button
                                    className="flex-1 py-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white"
                                    onClick={handleSubmitPayment}
                                >
                                    Simpan Perubahan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default PendingProposals;
