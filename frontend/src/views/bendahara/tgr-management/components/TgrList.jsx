import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "components/card";
import {
    MdArrowBack,
    MdSearch,
    MdFilterList,
    MdRefresh,
    MdWarning,
    MdRequestPage,
    MdAttachFile,
    MdPendingActions,
    MdNotificationsActive,
    MdHistory,
    MdOutlineAssignmentLate,
    MdFileDownload,
    MdCheck,
    MdClose,
    MdVisibility,
    MdPhone,
    MdEmail,
    MdInfo,
    MdAccessTime,
    MdFilterAlt,
    MdCategory,
    MdDashboard
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
// Import Recharts components for data visualization
import {
    PieChart, Pie, Cell,
    BarChart, Bar,
    XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const TgrList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedTgr, setSelectedTgr] = useState(null);

    // Dummy data for TGR cases
    const tgrStats = {
        totalCases: 25,
        resolvedCases: 10,
        inProcessCases: 15
    };

    // Enhanced and expanded TGR cases data
    const tgrCases = [
        {
            id: "TGR-2025-001",
            proposalId: "PRP-2025-042",
            title: "Pengembangan Machine Learning untuk Deteksi Penyakit Tanaman",
            researcher: "Dr. Budi Santoso",
            nip: "198705142010121002",
            faculty: "Fakultas Teknik",
            department: "Teknik Informatika",
            amount: 75000000,
            category: "Teknologi",
            status: "Aktif",
            urgency: "Tinggi",
            issueDate: "2025-06-01",
            dueDate: "2025-06-15",
            description: "Ketidaksesuaian penggunaan anggaran pada kegiatan pengumpulan data lapangan. Ditemukan alokasi dana yang tidak sesuai dengan rencana anggaran yang telah disetujui pada proposal awal.",
            resolution: null,
            assignedTo: "Hendri Wijaya",
            progress: 0,
            documents: [
                { id: "DOC-001", name: "Surat Peringatan TGR.pdf", date: "2025-06-01" },
                { id: "DOC-002", name: "Bukti Pengeluaran Tidak Sesuai.pdf", date: "2025-06-01" }
            ],
            history: [
                { date: "2025-06-01", status: "Dilaporkan", note: "Kasus dilaporkan oleh Auditor Internal" },
                { date: "2025-06-02", status: "Diverifikasi", note: "Verifikasi bukti awal oleh Tim Keuangan" },
                { date: "2025-06-03", status: "Aktif", note: "Kasus dikonfirmasi dan diproses sebagai TGR" }
            ],
            contact: {
                email: "budi.santoso@university.ac.id",
                phone: "081234567890",
                address: "Jl. Merdeka No. 123, Kota Universitas"
            },
            notes: "Peneliti telah dihubungi melalui email dan diminta untuk menghadiri pertemuan pembahasan TGR pada tanggal 10 Juni 2025."
        },
        {
            id: "TGR-2025-002",
            proposalId: "PRP-2025-036",
            title: "Efektivitas Metode Pembelajaran Jarak Jauh pada Mahasiswa",
            researcher: "Dr. Andi Wijaya",
            nip: "198601052009121003",
            faculty: "Fakultas Psikologi",
            department: "Psikologi Pendidikan",
            amount: 50000000,
            category: "Sosial",
            status: "Dalam Proses",
            urgency: "Sedang",
            issueDate: "2025-06-10",
            dueDate: "2025-06-20",
            description: "Laporan keuangan tidak lengkap untuk penggunaan dana pada penelitian survei online. Ada ketidaklengkapan bukti transaksi senilai Rp 50.000.000.",
            resolution: null,
            assignedTo: "Siti Rahmawati",
            progress: 35,
            documents: [
                { id: "DOC-003", name: "Surat Peringatan TGR.pdf", date: "2025-06-10" },
                { id: "DOC-004", name: "Balasan Peneliti.pdf", date: "2025-06-12" }
            ],
            history: [
                { date: "2025-06-10", status: "Dilaporkan", note: "Kasus dilaporkan oleh Bagian Keuangan" },
                { date: "2025-06-11", status: "Diverifikasi", note: "Verifikasi bukti awal oleh Tim Audit" },
                { date: "2025-06-12", status: "Dalam Proses", note: "Peneliti telah mengakui masalah dan mengajukan proses penyelesaian" }
            ],
            contact: {
                email: "andi.wijaya@university.ac.id",
                phone: "082345678901",
                address: "Jl. Pendidikan No. 45, Kota Universitas"
            },
            notes: "Peneliti telah mengajukan jadwal cicilan pengembalian dana selama 3 bulan. Menunggu persetujuan dari Komite TGR."
        },
        {
            id: "TGR-2025-003",
            proposalId: "PRP-2025-034",
            title: "Pengembangan Energi Terbarukan di Daerah Terpencil",
            researcher: "Dr. Adi Suryanto",
            nip: "197905122008011005",
            faculty: "Fakultas Teknik",
            department: "Teknik Elektro",
            amount: 85000000,
            category: "Lingkungan",
            status: "Terselesaikan",
            urgency: "Rendah",
            issueDate: "2025-05-15",
            dueDate: "2025-06-01",
            description: "Keterlambatan pelaporan keuangan dan ketidaksesuaian penggunaan dana pada komponen honorarium.",
            resolution: "Peneliti telah mengembalikan dana yang tidak sesuai penggunaannya dan melengkapi seluruh dokumentasi yang diminta. Kasus dinyatakan selesai pada 28 Mei 2025.",
            assignedTo: "Bambang Hermawan",
            progress: 100,
            documents: [
                { id: "DOC-005", name: "Surat Peringatan TGR.pdf", date: "2025-05-15" },
                { id: "DOC-006", name: "Bukti Pengembalian Dana.pdf", date: "2025-05-25" },
                { id: "DOC-007", name: "Surat Keterangan Bebas TGR.pdf", date: "2025-05-28" }
            ],
            history: [
                { date: "2025-05-15", status: "Dilaporkan", note: "Kasus dilaporkan oleh Bagian Monev Penelitian" },
                { date: "2025-05-17", status: "Diverifikasi", note: "Verifikasi bukti dan konfirmasi kepada peneliti" },
                { date: "2025-05-20", status: "Dalam Proses", note: "Peneliti menyanggupi untuk mengembalikan dana" },
                { date: "2025-05-25", status: "Pembayaran", note: "Peneliti melakukan pengembalian dana melalui transfer bank" },
                { date: "2025-05-28", status: "Terselesaikan", note: "Dokumentasi lengkap dan kasus ditutup" }
            ],
            contact: {
                email: "adi.suryanto@university.ac.id",
                phone: "083456789012",
                address: "Jl. Teknik No. 78, Kota Universitas"
            },
            notes: "Seluruh proses penyelesaian berjalan lancar dan tepat waktu. Peneliti dapat mengajukan proposal baru tanpa hambatan."
        },
        {
            id: "TGR-2025-004",
            proposalId: "PRP-2025-028",
            title: "Analisis Dampak Ekonomi Pandemi pada UMKM",
            researcher: "Dr. Dian Pertiwi",
            nip: "198204232007012004",
            faculty: "Fakultas Ekonomi",
            department: "Ekonomi Pembangunan",
            amount: 62500000,
            category: "Ekonomi",
            status: "Aktif",
            urgency: "Tinggi",
            issueDate: "2025-05-28",
            dueDate: "2025-06-12",
            description: "Penggunaan dana melebihi anggaran yang dialokasikan untuk beberapa pos penelitian tanpa persetujuan revisi anggaran sebelumnya.",
            resolution: null,
            assignedTo: "Anton Wijaya",
            progress: 15,
            documents: [
                { id: "DOC-008", name: "Surat Peringatan TGR.pdf", date: "2025-05-28" },
                { id: "DOC-009", name: "Rincian Penggunaan Dana.xlsx", date: "2025-05-30" }
            ],
            history: [
                { date: "2025-05-28", status: "Dilaporkan", note: "Kasus dilaporkan oleh Tim Audit Dana Penelitian" },
                { date: "2025-05-30", status: "Diverifikasi", note: "Verifikasi bukti dan konfirmasi ketidaksesuaian anggaran" },
                { date: "2025-06-01", status: "Aktif", note: "Surat peringatan dikirimkan ke peneliti" }
            ],
            contact: {
                email: "dian.pertiwi@university.ac.id",
                phone: "084567890123",
                address: "Jl. Ekonomi No. 56, Kota Universitas"
            },
            notes: "Peneliti mengajukan keberatan terhadap beberapa temuan. Jadwal pertemuan pembahasan direncanakan pada tanggal 8 Juni 2025."
        },
        {
            id: "TGR-2025-005",
            proposalId: "PRP-2025-021",
            title: "Pengembangan Vaksin Berbasis Protein Rekombinan",
            researcher: "Prof. Ratna Sari",
            nip: "197602182003122002",
            faculty: "Fakultas Kedokteran",
            department: "Mikrobiologi Kedokteran",
            amount: 125000000,
            category: "Kesehatan",
            status: "Dalam Proses",
            urgency: "Sedang",
            issueDate: "2025-05-20",
            dueDate: "2025-06-05",
            description: "Ketidaklengkapan bukti pengeluaran untuk pembelian alat laboratorium dan bahan penelitian.",
            resolution: null,
            assignedTo: "Dr. Ahmad Fauzi",
            progress: 60,
            documents: [
                { id: "DOC-010", name: "Surat Peringatan TGR.pdf", date: "2025-05-20" },
                { id: "DOC-011", name: "Bukti Penggunaan Parsial.pdf", date: "2025-05-27" },
                { id: "DOC-012", name: "Jadwal Pelengkapan Dokumen.pdf", date: "2025-05-28" }
            ],
            history: [
                { date: "2025-05-20", status: "Dilaporkan", note: "Kasus dilaporkan oleh Tim Audit Internal" },
                { date: "2025-05-22", status: "Diverifikasi", note: "Verifikasi bukti dan konfirmasi ke peneliti" },
                { date: "2025-05-25", status: "Dalam Proses", note: "Peneliti telah menanggapi dan berkomitmen melengkapi dokumentasi" },
                { date: "2025-05-27", status: "Dokumen Parsial", note: "Peneliti menyerahkan sebagian bukti yang diminta" }
            ],
            contact: {
                email: "ratna.sari@university.ac.id",
                phone: "085678901234",
                address: "Jl. Kedokteran No. 32, Kota Universitas"
            },
            notes: "Peneliti sedang dalam proses mengumpulkan bukti tambahan dari supplier peralatan laboratorium yang sedang mengalami kendala administrasi."
        },
        {
            id: "TGR-2025-006",
            proposalId: "PRP-2025-018",
            title: "Pemanfaatan AI untuk Optimasi Transportasi Publik",
            researcher: "Dr. Reza Pratama",
            nip: "198510302010011008",
            faculty: "Fakultas Ilmu Komputer",
            department: "Sistem Informasi",
            amount: 95000000,
            category: "Teknologi",
            status: "Terselesaikan",
            urgency: "Sedang",
            issueDate: "2025-05-12",
            dueDate: "2025-05-30",
            description: "Ketidaksesuaian spesifikasi perangkat yang dibeli dengan proposal dan tidak adanya permohonan perubahan sebelumnya.",
            resolution: "Peneliti telah memberikan bukti bahwa perubahan spesifikasi tidak mengubah tujuan penelitian dan telah mengembalikan selisih harga perangkat. Dokumentasi telah dilengkapi dengan berita acara pengujian performa yang membuktikan kesesuaian hasil.",
            assignedTo: "Indah Sulistyowati",
            progress: 100,
            documents: [
                { id: "DOC-013", name: "Surat Peringatan TGR.pdf", date: "2025-05-12" },
                { id: "DOC-014", name: "Bukti Pengembalian Selisih.pdf", date: "2025-05-18" },
                { id: "DOC-015", name: "Berita Acara Pengujian.pdf", date: "2025-05-20" },
                { id: "DOC-016", name: "Surat Keterangan Bebas TGR.pdf", date: "2025-05-26" }
            ],
            history: [
                { date: "2025-05-12", status: "Dilaporkan", note: "Kasus dilaporkan oleh Tim Monev Penelitian" },
                { date: "2025-05-14", status: "Diverifikasi", note: "Verifikasi bukti dan diskusi dengan peneliti" },
                { date: "2025-05-16", status: "Dalam Proses", note: "Peneliti menyerahkan dokumen tambahan dan penjelasan" },
                { date: "2025-05-18", status: "Pembayaran", note: "Pengembalian selisih harga perangkat" },
                { date: "2025-05-23", status: "Verifikasi Final", note: "Pemeriksaan akhir seluruh dokumentasi" },
                { date: "2025-05-26", status: "Terselesaikan", note: "Kasus ditutup dan surat keterangan diterbitkan" }
            ],
            contact: {
                email: "reza.pratama@university.ac.id",
                phone: "086789012345",
                address: "Jl. Informatika No. 89, Kota Universitas"
            },
            notes: "Proses penyelesaian berjalan dengan baik dan menjadi contoh penanganan TGR yang efektif melalui komunikasi aktif antara peneliti dan tim audit."
        },
        {
            id: "TGR-2025-007",
            proposalId: "PRP-2025-015",
            title: "Aplikasi Nanomaterial untuk Remediasi Lingkungan Tercemar",
            researcher: "Dr. Maya Anggraini",
            nip: "198103242006042002",
            faculty: "Fakultas MIPA",
            department: "Kimia",
            amount: 115000000,
            category: "Lingkungan",
            status: "Aktif",
            urgency: "Rendah",
            issueDate: "2025-05-05",
            dueDate: "2025-06-05",
            description: "Keterlambatan pelaporan kemajuan penelitian dan inkonsistensi antara laporan teknis dan laporan keuangan.",
            resolution: null,
            assignedTo: "Ferdy Alamsyah",
            progress: 25,
            documents: [
                { id: "DOC-017", name: "Surat Peringatan TGR.pdf", date: "2025-05-05" },
                { id: "DOC-018", name: "Hasil Audit Keuangan.pdf", date: "2025-05-08" }
            ],
            history: [
                { date: "2025-05-05", status: "Dilaporkan", note: "Kasus dilaporkan oleh Tim Audit Penelitian" },
                { date: "2025-05-07", status: "Diverifikasi", note: "Verifikasi laporan dan dokumentasi" },
                { date: "2025-05-10", status: "Aktif", note: "Peneliti dinotifikasi dan diminta klarifikasi" },
                { date: "2025-05-15", status: "Klarifikasi", note: "Peneliti menyerahkan penjelasan awal" }
            ],
            contact: {
                email: "maya.anggraini@university.ac.id",
                phone: "087890123456",
                address: "Jl. MIPA No. 42, Kota Universitas"
            },
            notes: "Peneliti mengajukan penambahan waktu untuk melengkapi dokumentasi karena sedang menghadiri konferensi internasional hingga 25 Mei 2025."
        },
        {
            id: "TGR-2025-008",
            proposalId: "PRP-2025-012",
            title: "Analisis Dampak Media Sosial pada Perilaku Politik Generasi Z",
            researcher: "Dr. Fajar Nugroho",
            nip: "198802152012011005",
            faculty: "Fakultas Ilmu Sosial dan Politik",
            department: "Ilmu Politik",
            amount: 78000000,
            category: "Sosial",
            status: "Dalam Proses",
            urgency: "Tinggi",
            issueDate: "2025-04-28",
            dueDate: "2025-05-15",
            description: "Penggunaan dana untuk kegiatan yang tidak tercantum dalam proposal dan ketidaklengkapan bukti pengeluaran untuk beberapa aktivitas penelitian.",
            resolution: null,
            assignedTo: "Dewi Lestari",
            progress: 75,
            documents: [
                { id: "DOC-019", name: "Surat Peringatan TGR.pdf", date: "2025-04-28" },
                { id: "DOC-020", name: "Bukti Komunikasi dengan Peneliti.pdf", date: "2025-05-02" },
                { id: "DOC-021", name: "Dokumen Klarifikasi Peneliti.pdf", date: "2025-05-08" },
                { id: "DOC-022", name: "Bukti Pengembalian Sebagian.pdf", date: "2025-05-10" }
            ],
            history: [
                { date: "2025-04-28", status: "Dilaporkan", note: "Kasus dilaporkan oleh Bagian Keuangan" },
                { date: "2025-05-01", status: "Diverifikasi", note: "Verifikasi bukti dan komunikasi dengan peneliti" },
                { date: "2025-05-03", status: "Dalam Proses", note: "Peneliti mengakui sebagian temuan dan mengajukan klarifikasi" },
                { date: "2025-05-08", status: "Klarifikasi", note: "Peneliti menyerahkan dokumen tambahan" },
                { date: "2025-05-10", status: "Pembayaran Parsial", note: "Pengembalian dana untuk pos yang tidak dapat diklarifikasi" }
            ],
            contact: {
                email: "fajar.nugroho@university.ac.id",
                phone: "088901234567",
                address: "Jl. Politik No. 25, Kota Universitas"
            },
            notes: "Peneliti telah mengembalikan 60% dari total nilai TGR. Pertemuan final direncanakan pada tanggal 12 Mei 2025 untuk membahas sisa pengembalian."
        },
        {
            id: "TGR-2025-009",
            proposalId: "PRP-2025-008",
            title: "Rekayasa Genetika untuk Peningkatan Produktivitas Tanaman Padi",
            researcher: "Prof. Hendra Wijaya",
            nip: "197411052002121001",
            faculty: "Fakultas Pertanian",
            department: "Agronomi",
            amount: 135000000,
            category: "Pertanian",
            status: "Terselesaikan",
            urgency: "Tinggi",
            issueDate: "2025-04-15",
            dueDate: "2025-05-10",
            description: "Dugaan pengalihan dana penelitian untuk kegiatan pribadi dan pemalsuan bukti pengeluaran.",
            resolution: "Setelah investigasi mendalam, ditemukan bahwa tuduhan tidak berdasar. Semua pengeluaran telah diverifikasi dan sesuai dengan ketentuan. Kasus ditutup dengan permintaan maaf kepada peneliti.",
            assignedTo: "Komite Etik Penelitian",
            progress: 100,
            documents: [
                { id: "DOC-023", name: "Surat Peringatan TGR.pdf", date: "2025-04-15" },
                { id: "DOC-024", name: "Hasil Investigasi.pdf", date: "2025-04-25" },
                { id: "DOC-025", name: "Bukti Verifikasi Transaksi.pdf", date: "2025-04-28" },
                { id: "DOC-026", name: "Surat Pembebasan TGR.pdf", date: "2025-05-02" }
            ],
            history: [
                { date: "2025-04-15", status: "Dilaporkan", note: "Kasus dilaporkan berdasarkan laporan anonim" },
                { date: "2025-04-16", status: "Diverifikasi", note: "Proses verifikasi awal dan pengumpulan bukti" },
                { date: "2025-04-18", status: "Investigasi", note: "Pembentukan tim khusus untuk investigasi mendalam" },
                { date: "2025-04-25", status: "Hasil Investigasi", note: "Investigasi selesai dengan hasil tidak terbukti" },
                { date: "2025-04-30", status: "Verifikasi Final", note: "Pemeriksaan akhir dan klarifikasi ke pelapor" },
                { date: "2025-05-02", status: "Terselesaikan", note: "Kasus ditutup dan peneliti diberi surat keterangan" }
            ],
            contact: {
                email: "hendra.wijaya@university.ac.id",
                phone: "089012345678",
                address: "Jl. Pertanian No. 114, Kota Universitas"
            },
            notes: "Kasus ini menjadi pelajaran tentang pentingnya verifikasi menyeluruh sebelum mengeluarkan surat peringatan TGR."
        },
        {
            id: "TGR-2025-010",
            proposalId: "PRP-2025-003",
            title: "Pengembangan Teknologi Augmented Reality untuk Pembelajaran Anatomi",
            researcher: "Dr. Indra Kusuma",
            nip: "198307182008011007",
            faculty: "Fakultas Kedokteran",
            department: "Anatomi",
            amount: 110000000,
            category: "Pendidikan",
            status: "Aktif",
            urgency: "Sedang",
            issueDate: "2025-04-10",
            dueDate: "2025-05-25",
            description: "Perubahan alokasi anggaran tanpa persetujuan dan penggunaan dana untuk pembelian perangkat yang tidak sesuai spesifikasi.",
            resolution: null,
            assignedTo: "Taufik Rahman",
            progress: 30,
            documents: [
                { id: "DOC-027", name: "Surat Peringatan TGR.pdf", date: "2025-04-10" },
                { id: "DOC-028", name: "Daftar Pembelian Perangkat.pdf", date: "2025-04-15" },
                { id: "DOC-029", name: "Tanggapan Peneliti.pdf", date: "2025-04-20" }
            ],
            history: [
                { date: "2025-04-10", status: "Dilaporkan", note: "Kasus dilaporkan oleh Bagian Pengadaan" },
                { date: "2025-04-12", status: "Diverifikasi", note: "Verifikasi spesifikasi perangkat vs proposal" },
                { date: "2025-04-15", status: "Aktif", note: "Peneliti dinotifikasi dan diminta klarifikasi" },
                { date: "2025-04-20", status: "Tanggapan", note: "Peneliti mengirimkan penjelasan tertulis" },
                { date: "2025-04-25", status: "Evaluasi", note: "Tim TGR mengevaluasi tanggapan peneliti" }
            ],
            contact: {
                email: "indra.kusuma@university.ac.id",
                phone: "090123456789",
                address: "Jl. Anatomi No. 67, Kota Universitas"
            },
            notes: "Peneliti berargumen bahwa perubahan spesifikasi dilakukan untuk mengikuti perkembangan teknologi terbaru dan tidak mengurangi kualitas penelitian."
        }
    ];

    // Add active state for pie chart segments
    const [activeIndex, setActiveIndex] = useState(null);
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(null);

    // Add tabbed view for the detail panel
    const [activeTab, setActiveTab] = useState('details');

    // Generate data for status chart
    const statusData = [
        { name: "Aktif", value: tgrCases.filter(tgr => tgr.status === "Aktif").length, color: "#3b82f6" }, // blue-500
        { name: "Dalam Proses", value: tgrCases.filter(tgr => tgr.status === "Dalam Proses").length, color: "#f59e0b" }, // amber-500
        { name: "Terselesaikan", value: tgrCases.filter(tgr => tgr.status === "Terselesaikan").length, color: "#10b981" }, // green-500
    ];

    // Generate data for category distribution
    const categoryData = Array.from(
        new Set(tgrCases.map(tgr => tgr.category))
    ).map(category => ({
        name: category,
        value: tgrCases.filter(tgr => tgr.category === category).length,
        color: getCategoryColor(category)
    }));

    // Generate data for urgency distribution
    const urgencyData = [
        { name: "Tinggi", value: tgrCases.filter(tgr => tgr.urgency === "Tinggi").length, color: "#ef4444" }, // red-500
        { name: "Sedang", value: tgrCases.filter(tgr => tgr.urgency === "Sedang").length, color: "#f59e0b" }, // amber-500
        { name: "Rendah", value: tgrCases.filter(tgr => tgr.urgency === "Rendah").length, color: "#10b981" }, // green-500
    ];

    // Color function for categories
    function getCategoryColor(category) {
        switch (category) {
            case "Teknologi": return "#3b82f6"; // blue
            case "Sosial": return "#8b5cf6"; // purple
            case "Lingkungan": return "#10b981"; // green
            case "Ekonomi": return "#f59e0b"; // amber
            case "Kesehatan": return "#ec4899"; // pink
            default: return "#6b7280"; // gray
        }
    }

    useEffect(() => {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }, []);

    const handleRefresh = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    const filteredTgrCases = tgrCases.filter(tgr => {
        const matchesSearch =
            tgr.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tgr.researcher.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tgr.proposalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            tgr.id.toLowerCase().includes(searchTerm.toLowerCase());

        if (filterStatus === "all") return matchesSearch;
        else if (filterStatus === "aktif") return matchesSearch && tgr.status === "Aktif";
        else if (filterStatus === "dalam proses") return matchesSearch && tgr.status === "Dalam Proses";
        else if (filterStatus === "terselesaikan") return matchesSearch && tgr.status === "Terselesaikan";

        return matchesSearch;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case "Aktif": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
            case "Dalam Proses": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
            case "Terselesaikan": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
            default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
        }
    };

    const getUrgencyColor = (urgency) => {
        switch (urgency) {
            case "Tinggi": return "text-red-600 dark:text-red-400";
            case "Sedang": return "text-amber-600 dark:text-amber-400";
            case "Rendah": return "text-green-600 dark:text-green-400";
            default: return "text-gray-600 dark:text-gray-400";
        }
    };

    const handleTgrSelect = (tgr) => {
        setSelectedTgr(tgr);
    };

    // Custom tooltip for pie chart
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-navy-800 p-3 rounded-lg shadow-lg border border-gray-100 dark:border-navy-700">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{payload[0].name}</p>
                    <p className="text-sm font-bold text-brand-500 dark:text-brand-400">
                        {payload[0].value} kasus ({Math.round((payload[0].value / tgrStats.totalCases) * 100)}%)
                    </p>
                </div>
            );
        }
        return null;
    };

    const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899', '#6b7280'];

    return (
        <div className="pt-5">
            <div className="mb-8" data-aos="fade-up">
                <div className="flex items-center">
                    <Link to="/bendahara/tgr-management" className="mr-3 p-2.5 bg-brand-50 dark:bg-navy-800 rounded-full hover:bg-brand-100 dark:hover:bg-navy-700 transition-all duration-300 shadow-sm">
                        <MdArrowBack className="h-5 w-5 text-brand-500 dark:text-white" />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-navy-700 dark:text-white tracking-tight">Manajemen TGR</h2>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">
                            Kelola dan pantau status TGR untuk setiap proposal
                        </p>
                    </div>
                </div>
            </div>

            {/* Modern Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                <Card extra="p-4 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="100">
                    <div className="flex items-center">
                        <div className="rounded-full p-3.5 bg-gradient-to-br from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 shadow-md">
                            <MdSearch className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Total Kasus</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white mt-1">
                                {tgrStats.totalCases}
                            </h4>
                        </div>
                    </div>
                    <div className="h-1 w-full bg-gray-100 dark:bg-navy-700 rounded-full mt-4">
                        <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 rounded-full"
                            style={{ width: '100%' }}></div>
                    </div>
                </Card>

                <Card extra="p-4 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="150">
                    <div className="flex items-center">
                        <div className="rounded-full p-3.5 bg-gradient-to-br from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 shadow-md">
                            <MdCheck className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Terselesaikan</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white mt-1">
                                {tgrStats.resolvedCases}
                            </h4>
                        </div>
                    </div>
                    <div className="h-1 w-full bg-gray-100 dark:bg-navy-700 rounded-full mt-4">
                        <div className="h-1 bg-gradient-to-r from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 rounded-full"
                            style={{ width: `${(tgrStats.resolvedCases / tgrStats.totalCases) * 100}%` }}></div>
                    </div>
                </Card>

                <Card extra="p-4 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="200">
                    <div className="flex items-center">
                        <div className="rounded-full p-3.5 bg-gradient-to-br from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700 shadow-md">
                            <MdNotificationsActive className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-4">
                            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">Dalam Proses</p>
                            <h4 className="text-2xl font-bold text-navy-700 dark:text-white mt-1">
                                {tgrStats.inProcessCases}
                            </h4>
                        </div>
                    </div>
                    <div className="h-1 w-full bg-gray-100 dark:bg-navy-700 rounded-full mt-4">
                        <div className="h-1 bg-gradient-to-r from-amber-400 to-amber-600 dark:from-amber-500 dark:to-amber-700 rounded-full"
                            style={{ width: `${(tgrStats.inProcessCases / tgrStats.totalCases) * 100}%` }}></div>
                    </div>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                {/* Status Distribution Chart */}
                <Card extra="p-5 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="250">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-base font-bold text-navy-700 dark:text-white flex items-center">
                            <MdDashboard className="mr-2 h-5 w-5 text-brand-500 dark:text-brand-400" />
                            Distribusi Status
                        </h5>
                        <span className="px-2 py-1 text-xs font-medium rounded-md bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400">
                            {tgrStats.totalCases} Kasus
                        </span>
                    </div>

                    <div className="h-52" data-aos="fade-up" data-aos-delay="300">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={30}
                                    outerRadius={60}
                                    fill="#8884d8"
                                    dataKey="value"
                                    onMouseEnter={(_, index) => setActiveIndex(index)}
                                    onMouseLeave={() => setActiveIndex(null)}
                                    paddingAngle={2}
                                >
                                    {statusData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                            stroke={activeIndex === index ? "#ffffff" : "none"}
                                            strokeWidth={activeIndex === index ? 2 : 0}
                                            className="transition-all duration-300"
                                        />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-2">
                        {statusData.map((entry, index) => (
                            <div
                                key={index}
                                className={`flex flex-col items-center justify-center p-2 rounded-lg text-center cursor-pointer transition-all duration-200 ${activeIndex === index ? 'bg-gray-50 dark:bg-navy-800' : 'hover:bg-gray-50 dark:hover:bg-navy-800'}`}
                                onMouseEnter={() => setActiveIndex(index)}
                                onMouseLeave={() => setActiveIndex(null)}
                            >
                                <div className="w-3 h-3 rounded-full mb-1" style={{ backgroundColor: entry.color }}></div>
                                <div className="text-xs font-medium">{entry.name}</div>
                                <div className="text-xs text-gray-500">{entry.value}</div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Category Distribution Chart */}
                <Card extra="p-5 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="300">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-base font-bold text-navy-700 dark:text-white flex items-center">
                            <MdCategory className="mr-2 h-5 w-5 text-brand-500 dark:text-brand-400" />
                            Distribusi Kategori
                        </h5>
                        <span className="px-2 py-1 text-xs font-medium rounded-md bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400">
                            {categoryData.length} Kategori
                        </span>
                    </div>

                    <div className="h-52" data-aos="fade-up" data-aos-delay="350">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={categoryData}
                                layout="vertical"
                                margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                                barSize={12}
                            >
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e5e7eb" className="dark:stroke-navy-700" />
                                <XAxis
                                    type="number"
                                    hide={true}
                                />
                                <YAxis
                                    type="category"
                                    dataKey="name"
                                    tick={{ fill: '#6B7280', fontSize: 10 }}
                                    tickLine={false}
                                    axisLine={false}
                                    width={65}
                                    className="dark:text-gray-400"
                                />
                                <Tooltip
                                    content={<CustomTooltip />}
                                    cursor={{ fill: 'rgba(229, 231, 235, 0.2)', className: "dark:fill-navy-700 dark:fill-opacity-30" }}
                                />
                                <Bar
                                    dataKey="value"
                                    radius={[0, 10, 10, 0]}
                                    onMouseEnter={(_, index) => setActiveCategoryIndex(index)}
                                    onMouseLeave={() => setActiveCategoryIndex(null)}
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                            className={`transition-opacity duration-300 ${activeCategoryIndex === index ? 'opacity-80' : 'opacity-100'}`}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Urgency Distribution Chart */}
                <Card extra="p-5 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="350">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-base font-bold text-navy-700 dark:text-white flex items-center">
                            <MdAccessTime className="mr-2 h-5 w-5 text-brand-500 dark:text-brand-400" />
                            Distribusi Urgensi
                        </h5>
                    </div>

                    <div className="h-52" data-aos="fade-up" data-aos-delay="400">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={urgencyData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={70}
                                    fill="#8884d8"
                                    dataKey="value"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    className="text-xs"
                                >
                                    {urgencyData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 mb-5">
                <Card extra="p-6 lg:w-2/3 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="400">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                        <h5 className="text-lg font-bold text-navy-700 dark:text-white mb-3 md:mb-0 flex items-center">
                            <MdOutlineAssignmentLate className="mr-2 h-5 w-5 text-brand-500 dark:text-brand-400" />
                            Daftar Kasus TGR
                            <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-brand-50 text-brand-500 dark:bg-brand-900/30 dark:text-brand-400">
                                {filteredTgrCases.length} Kasus
                            </span>
                        </h5>
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="flex items-center gap-2">
                                <div className="relative flex-grow w-full md:w-64">
                                    <input
                                        type="text"
                                        placeholder="Cari kasus TGR..."
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 transition-all duration-200"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <MdSearch className="absolute right-3 top-2.5 text-gray-500 dark:text-gray-400" />
                                </div>
                                <select
                                    className="px-3 py-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-sm text-gray-700 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20 appearance-none pr-8 transition-all duration-200"
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center", backgroundSize: "1.5em 1.5em" }}
                                >
                                    <option value="all">Semua Status</option>
                                    <option value="aktif">Aktif</option>
                                    <option value="dalam proses">Dalam Proses</option>
                                    <option value="terselesaikan">Terselesaikan</option>
                                </select>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleRefresh}
                                    className="p-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-800 transition-all duration-200"
                                    title="Refresh data"
                                >
                                    <MdRefresh className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
                                </button>
                                <button
                                    className="p-2.5 rounded-xl border border-gray-200 dark:border-navy-600 bg-white dark:bg-navy-700 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-navy-800 transition-all duration-200"
                                    title="Download data"
                                >
                                    <MdFileDownload className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[800px] table-auto">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-navy-800 rounded-lg">
                                    <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                        ID TGR
                                    </th>
                                    <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                        Peneliti
                                    </th>
                                    <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                        Judul Penelitian
                                    </th>
                                    <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                        Jumlah
                                    </th>
                                    <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                        Kategori
                                    </th>
                                    <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                        Status
                                    </th>
                                    <th className="py-3 px-4 text-start text-sm font-medium text-gray-600 dark:text-white border-b border-gray-200 dark:border-navy-700">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTgrCases.length > 0 ? (
                                    filteredTgrCases.map((tgr, index) => (
                                        <tr
                                            key={index}
                                            className={`hover:bg-gray-50 dark:hover:bg-navy-700/50 transition-all duration-200 cursor-pointer ${selectedTgr?.id === tgr.id ? 'bg-gray-50 dark:bg-navy-700/50' : ''}`}
                                            onClick={() => handleTgrSelect(tgr)}
                                        >
                                            <td className="py-3 px-4 text-sm font-medium text-navy-700 dark:text-white border-b border-gray-100 dark:border-navy-700">
                                                <Link to={`/bendahara/tgr-management/tgr-list/${tgr.id}`} className="hover:text-brand-500 transition-colors duration-200">
                                                    {tgr.id}
                                                </Link>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">{tgr.proposalId}</div>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400 border-b border-gray-100 dark:border-navy-700">
                                                <div className="font-medium text-navy-700 dark:text-white">{tgr.researcher}</div>
                                                <div className="text-xs">{tgr.faculty}</div>
                                            </td>
                                            <td className="py-3 px-4 text-sm font-medium text-navy-700 dark:text-white max-w-[200px] truncate border-b border-gray-100 dark:border-navy-700">
                                                {tgr.title}
                                            </td>
                                            <td className="py-3 px-4 text-sm font-medium text-navy-700 dark:text-white border-b border-gray-100 dark:border-navy-700">
                                                Rp {tgr.amount.toLocaleString()}
                                            </td>
                                            <td className="py-3 px-4 text-sm border-b border-gray-100 dark:border-navy-700">
                                                <span className="px-2.5 py-1 text-xs font-medium rounded-full" style={{
                                                    backgroundColor: `${getCategoryColor(tgr.category)}20`,
                                                    color: getCategoryColor(tgr.category)
                                                }}>
                                                    {tgr.category}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm border-b border-gray-100 dark:border-navy-700">
                                                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(tgr.status)}`}>
                                                    {tgr.status}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-sm border-b border-gray-100 dark:border-navy-700">
                                                <div className="flex space-x-2">
                                                    <Link to={`/bendahara/tgr-management/tgr-clearance-process/${tgr.id}`}>
                                                        <button className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition-colors duration-200" title="Lihat detail">
                                                            <MdVisibility size={16} />
                                                        </button>
                                                    </Link>
                                                    <Link to={`/bendahara/tgr-management/tgr-history/${tgr.id}`}>
                                                        <button className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 hover:bg-amber-100 transition-colors duration-200" title="Lihat riwayat">
                                                            <MdHistory size={16} />
                                                        </button>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="py-8 text-center text-gray-500 dark:text-gray-400">
                                            <div className="flex flex-col items-center">
                                                <MdInfo className="h-10 w-10 text-gray-300 dark:text-gray-600 mb-2" />
                                                <p>Tidak ada kasus TGR yang sesuai dengan kriteria pencarian</p>
                                                <button
                                                    className="mt-3 text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 font-medium"
                                                    onClick={() => {
                                                        setSearchTerm("");
                                                        setFilterStatus("all");
                                                    }}
                                                >
                                                    Reset filter
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>

                <Card extra="p-6 lg:w-1/3 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-navy-800" data-aos="fade-up" data-aos-delay="450">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-lg font-bold text-navy-700 dark:text-white flex items-center">
                            <MdWarning className="mr-2 h-5 w-5 text-brand-500 dark:text-brand-400" />
                            Detail Kasus TGR
                        </h5>
                        {selectedTgr && (
                            <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedTgr.status)}`}>
                                {selectedTgr.status}
                            </span>
                        )}
                    </div>

                    {selectedTgr ? (
                        <>
                            {/* Tabbed navigation for detail panel */}
                            <div className="flex space-x-2 mb-4 border-b border-gray-200 dark:border-navy-700">
                                <button
                                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 relative ${activeTab === 'details' ? 'text-brand-500 dark:text-brand-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300'}`}
                                    onClick={() => setActiveTab('details')}
                                >
                                    Detail
                                    {activeTab === 'details' && (
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-500 dark:bg-brand-400"></span>
                                    )}
                                </button>
                                <button
                                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 relative ${activeTab === 'info' ? 'text-brand-500 dark:text-brand-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300'}`}
                                    onClick={() => setActiveTab('info')}
                                >
                                    Informasi
                                    {activeTab === 'info' && (
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-500 dark:bg-brand-400"></span>
                                    )}
                                </button>
                                <button
                                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 relative ${activeTab === 'contact' ? 'text-brand-500 dark:text-brand-400' : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300'}`}
                                    onClick={() => setActiveTab('contact')}
                                >
                                    Kontak
                                    {activeTab === 'contact' && (
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-500 dark:bg-brand-400"></span>
                                    )}
                                </button>
                            </div>

                            {activeTab === 'details' && (
                                <div className="space-y-4">
                                    <div>
                                        <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-2">
                                            {selectedTgr.title}
                                        </h6>
                                        <div className="flex gap-2 items-center text-xs text-gray-500 dark:text-gray-400">
                                            <span className="bg-gray-100 dark:bg-navy-800 px-2 py-0.5 rounded">{selectedTgr.id}</span>
                                            <span>•</span>
                                            <span className="bg-gray-100 dark:bg-navy-800 px-2 py-0.5 rounded">{selectedTgr.proposalId}</span>
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-navy-800 space-y-3 shadow-sm">
                                        <div className="flex justify-between">
                                            <span className="text-xs text-gray-600 dark:text-gray-400">Peneliti:</span>
                                            <span className="text-xs font-medium text-navy-700 dark:text-white">{selectedTgr.researcher}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-xs text-gray-600 dark:text-gray-400">NIP:</span>
                                            <span className="text-xs font-medium text-navy-700 dark:text-white">{selectedTgr.nip}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-xs text-gray-600 dark:text-gray-400">Fakultas:</span>
                                            <span className="text-xs font-medium text-navy-700 dark:text-white">{selectedTgr.faculty}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-xs text-gray-600 dark:text-gray-400">Nilai TGR:</span>
                                            <span className="text-xs font-medium text-navy-700 dark:text-white">
                                                Rp {selectedTgr.amount.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-xs text-gray-600 dark:text-gray-400">Kategori:</span>
                                            <span className="text-xs font-medium px-1.5 py-0.5 rounded" style={{
                                                backgroundColor: `${getCategoryColor(selectedTgr.category)}20`,
                                                color: getCategoryColor(selectedTgr.category)
                                            }}>
                                                {selectedTgr.category}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-xs text-gray-600 dark:text-gray-400">Urgency:</span>
                                            <span className={`text-xs font-medium ${getUrgencyColor(selectedTgr.urgency)}`}>
                                                {selectedTgr.urgency}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-2 flex items-center">
                                            <MdWarning className="h-4 w-4 mr-1.5 text-amber-500" />
                                            Deskripsi Masalah
                                        </h6>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-navy-800 p-3 rounded-xl shadow-sm">
                                            {selectedTgr.description}
                                        </p>
                                    </div>

                                    {selectedTgr.resolution && (
                                        <div>
                                            <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-2 flex items-center">
                                                <MdCheck className="h-4 w-4 mr-1.5 text-green-500" />
                                                Resolusi
                                            </h6>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 bg-green-50 dark:bg-green-900/10 p-3 rounded-xl border border-green-100 dark:border-green-900/20 shadow-sm">
                                                {selectedTgr.resolution}
                                            </p>
                                        </div>
                                    )}

                                    <div className="pt-3 flex gap-2 justify-end">
                                        <Link to={`/bendahara/tgr-management/tgr-clearance-process/${selectedTgr.id}`}>
                                            <button className="px-3 py-2 rounded-lg bg-gradient-to-r from-brand-400 to-brand-600 hover:from-brand-500 hover:to-brand-700 text-white text-xs font-medium transition-all duration-300 shadow-sm hover:shadow">
                                                Proses Kasus
                                            </button>
                                        </Link>
                                        {selectedTgr.status !== "Terselesaikan" && (
                                            <Link to={`/bendahara/tgr-management/tgr-clearance-validation/${selectedTgr.id}`}>
                                                <button className="px-3 py-2 rounded-lg bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white text-xs font-medium transition-all duration-300 shadow-sm hover:shadow">
                                                    Selesaikan
                                                </button>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'info' && (
                                <div className="space-y-4">
                                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-navy-800 space-y-3 shadow-sm">
                                        <div className="flex justify-between">
                                            <span className="text-xs text-gray-600 dark:text-gray-400">Tanggal Masalah:</span>
                                            <span className="text-xs font-medium text-navy-700 dark:text-white">
                                                {selectedTgr.issueDate}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-xs text-gray-600 dark:text-gray-400">Batas Waktu:</span>
                                            <span className="text-xs font-medium text-navy-700 dark:text-white">
                                                {selectedTgr.dueDate}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-xs text-gray-600 dark:text-gray-400">Status:</span>
                                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(selectedTgr.status)}`}>
                                                {selectedTgr.status}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-xs text-gray-600 dark:text-gray-400">Urgency:</span>
                                            <span className={`text-xs font-medium ${getUrgencyColor(selectedTgr.urgency)}`}>
                                                {selectedTgr.urgency}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Timeline visualization */}
                                    <div>
                                        <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-3">
                                            Timeline
                                        </h6>
                                        <div className="relative pl-6">
                                            <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200 dark:bg-navy-700"></div>

                                            <div className="mb-4 relative">
                                                <div className="absolute left-[-12px] top-0 w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500 dark:border-blue-400"></div>
                                                <p className="text-xs font-medium text-navy-700 dark:text-white">
                                                    Kasus Dibuat
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {selectedTgr.issueDate}
                                                </p>
                                            </div>

                                            <div className="mb-4 relative">
                                                <div className="absolute left-[-12px] top-0 w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/30 border-2 border-amber-500 dark:border-amber-400"></div>
                                                <p className="text-xs font-medium text-navy-700 dark:text-white">
                                                    Tenggat Waktu
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {selectedTgr.dueDate}
                                                </p>
                                            </div>

                                            {selectedTgr.status === "Terselesaikan" && (
                                                <div className="relative">
                                                    <div className="absolute left-[-12px] top-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 border-2 border-green-500 dark:border-green-400"></div>
                                                    <p className="text-xs font-medium text-navy-700 dark:text-white">
                                                        Kasus Terselesaikan
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        Selesai
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'contact' && (
                                <div className="space-y-4">
                                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-navy-800 shadow-sm">
                                        <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-3">
                                            Kontak Peneliti
                                        </h6>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 p-2 bg-white dark:bg-navy-700 rounded-lg shadow-sm">
                                                <div className="p-2.5 rounded-full bg-blue-50 dark:bg-blue-900/20">
                                                    <MdEmail className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                                                    <a href={`mailto:${selectedTgr.contact.email}`} className="text-xs font-medium text-brand-500 dark:text-brand-400 hover:text-brand-600 dark:hover:text-brand-300 transition-colors">
                                                        {selectedTgr.contact.email}
                                                    </a>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 p-2 bg-white dark:bg-navy-700 rounded-lg shadow-sm">
                                                <div className="p-2.5 rounded-full bg-green-50 dark:bg-green-900/20">
                                                    <MdPhone className="h-4 w-4 text-green-500 dark:text-green-400" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Telepon</p>
                                                    <a href={`tel:${selectedTgr.contact.phone}`} className="text-xs font-medium text-brand-500 dark:text-brand-400 hover:text-brand-600 dark:hover:text-brand-300 transition-colors">
                                                        {selectedTgr.contact.phone}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 shadow-sm border border-blue-100 dark:border-blue-900/20">
                                        <h6 className="text-sm font-medium text-blue-800 dark:text-blue-400 mb-2 flex items-center">
                                            <MdInfo className="h-4 w-4 mr-1.5" />
                                            Tindakan yang Disarankan
                                        </h6>
                                        <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                                            <li className="flex items-center gap-1.5">
                                                <div className="w-1 h-1 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
                                                <span>Hubungi peneliti via email untuk informasi lebih lanjut</span>
                                            </li>
                                            <li className="flex items-center gap-1.5">
                                                <div className="w-1 h-1 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
                                                <span>Jadwalkan pertemuan untuk mendiskusikan penyelesaian TGR</span>
                                            </li>
                                            <li className="flex items-center gap-1.5">
                                                <div className="w-1 h-1 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
                                                <span>Kirimkan notifikasi pengingat sebelum tenggat waktu</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="p-4 rounded-full bg-gray-100 dark:bg-navy-800 mb-4">
                                <MdOutlineAssignmentLate className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                Pilih kasus TGR untuk melihat detail
                            </p>
                            <span className="text-xs text-gray-400 dark:text-gray-500 max-w-[200px]">
                                Klik pada baris tabel untuk memilih kasus yang ingin dilihat detailnya
                            </span>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default TgrList;