// Dummy data for Bendahara Dashboard

// Data for funding stats summary boxes
export const fundingStats = {
    totalAllocated: 2750000000,
    totalAllocatedTrend: 5.2,
    disbursed: 1500000000,
    disbursedTrend: 7.8,
    pendingVerification: 8,
    pendingVerificationTrend: 2.1,
    tgrCases: 3,
    tgrCasesTrend: -1.5
};

// Data for financial overview charts
export const financialOverview = {
    totalAllocated: 2750000000,
    totalDisbursed: 1500000000,
    allocatedGrowth: 5.2,
    disbursedGrowth: 7.8,
    facultyDistribution: [
        {
            faculty: "Fakultas Teknik",
            allocated: 850000000,
            disbursed: 460000000,
        },
        {
            faculty: "Fakultas Ekonomi",
            allocated: 700000000,
            disbursed: 380000000,
        },
        {
            faculty: "Fakultas Kedokteran",
            allocated: 550000000,
            disbursed: 350000000,
        },
        {
            faculty: "Fakultas Hukum",
            allocated: 350000000,
            disbursed: 180000000,
        },
        {
            faculty: "Fakultas Psikologi",
            allocated: 300000000,
            disbursed: 130000000,
        },
    ]
};

// Data for pending proposals component
export const pendingProposals = [
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
    }
];

// Data for disbursement schedule component
export const disbursementSchedule = [
    {
        phase: 1,
        name: "Pencairan Dana Tahap I",
        status: "Selesai",
        description: "Pencairan awal untuk semua proposal yang disetujui",
        date: "15 Maret 2025",
        progress: 100
    },
    {
        phase: 2,
        name: "Pencairan Dana Tahap II",
        status: "Aktif",
        description: "Pencairan berdasarkan evaluasi laporan kemajuan",
        date: "30 Juni 2025",
        progress: 65
    },
    {
        phase: 3,
        name: "Pencairan Dana Tahap III",
        status: "Belum Mulai",
        description: "Pencairan final setelah laporan akhir disetujui",
        date: "15 Oktober 2025"
    }
];

// Data for recent transactions component
export const recentTransactions = [
    {
        id: "TRX-2025-0178",
        researcher: "Dr. Budi Santoso",
        date: "12 Jun 2025",
        amount: 30000000,
        status: "Sukses"
    },
    {
        id: "TRX-2025-0177",
        researcher: "Prof. Dewi Lestari",
        date: "12 Jun 2025",
        amount: 25000000,
        status: "Sukses"
    },
    {
        id: "TRX-2025-0176",
        researcher: "Dr. Andi Wijaya",
        date: "10 Jun 2025",
        amount: 20000000,
        status: "Pending"
    },
    {
        id: "TRX-2025-0175",
        researcher: "Dr. Ratna Sari",
        date: "08 Jun 2025",
        amount: 35000000,
        status: "Sukses"
    },
    {
        id: "TRX-2025-0174",
        researcher: "Prof. Hendra Gunawan",
        date: "07 Jun 2025",
        amount: 40000000,
        status: "Gagal"
    },
    {
        id: "TRX-2025-0173",
        researcher: "Dr. Maya Putri",
        date: "05 Jun 2025",
        amount: 28000000,
        status: "Sukses"
    },
    {
        id: "TRX-2025-0172",
        researcher: "Dr. Eko Prasetyo",
        date: "03 Jun 2025",
        amount: 22000000,
        status: "Sukses"
    },
    {
        id: "TRX-2025-0171",
        researcher: "Prof. Sinta Wijaya",
        date: "01 Jun 2025",
        amount: 33000000,
        status: "Sukses"
    }
];
