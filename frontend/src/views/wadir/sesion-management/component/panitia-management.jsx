import React, { useState, useEffect } from 'react';
import {
  MdPeople,
  MdPersonAdd,
  MdEdit,
  MdDelete,
  MdSecurity,
  MdVerified,
  MdManageAccounts,
  MdMoreVert,
  MdFilterList,
  MdAssignment,
  MdAccessTime,
  MdCheck,
  MdClose,
  MdSort
} from 'react-icons/md';
import Card from 'components/card';
import AOS from 'aos';
import 'aos/dist/aos.css';

const PanitiaManagement = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const [members] = useState([
    {
      id: 1,
      name: "Dr. Ahmad Santoso",
      role: "Ketua Panitia",
      department: "Teknik Informatika",
      status: "active",
      lastActive: "5 menit yang lalu",
      assignedTasks: 8,
      completedTasks: 6,
      expertise: ["ML Validation", "System Design", "Penelitian"],
      performance: 95,
      avatar: "AS"
    },
    {
      id: 2,
      name: "Prof. Sarah Johnson",
      role: "Validator",
      department: "P3M",
      status: "active",
      lastActive: "15 menit yang lalu",
      assignedTasks: 5,
      completedTasks: 4,
      expertise: ["Proposal Review", "Documentation", "Evaluasi"],
      performance: 88,
      avatar: "SJ"
    },
    {
      id: 3,
      name: "Dr. Budi Pratama",
      role: "Reviewer",
      department: "Teknik Elektro",
      status: "active",
      lastActive: "1 jam yang lalu",
      assignedTasks: 7,
      completedTasks: 7,
      expertise: ["Technical Evaluation", "Hardware Analysis"],
      performance: 100,
      avatar: "BP"
    },
    {
      id: 4,
      name: "Ir. Maya Wijaya",
      role: "Sekretaris",
      department: "P3M",
      status: "inactive",
      lastActive: "2 hari yang lalu",
      assignedTasks: 6,
      completedTasks: 2,
      expertise: ["Administrasi", "Dokumentasi"],
      performance: 65,
      avatar: "MW"
    },
    {
      id: 5,
      name: "Dr. Indra Kusuma",
      role: "Validator",
      department: "Manajemen Bisnis",
      status: "active",
      lastActive: "30 menit yang lalu",
      assignedTasks: 4,
      completedTasks: 3,
      expertise: ["Analisis Bisnis", "Review Anggaran"],
      performance: 92,
      avatar: "IK"
    },
    {
      id: 6,
      name: "Prof. Dewi Suryani",
      role: "Reviewer",
      department: "Teknik Kimia",
      status: "active",
      lastActive: "2 jam yang lalu",
      assignedTasks: 6,
      completedTasks: 5,
      expertise: ["Kimia Terapan", "Keamanan Lab", "Metodologi"],
      performance: 87,
      avatar: "DS"
    },
    {
      id: 7,
      name: "Dr. Hendra Wijaya",
      role: "Validator",
      department: "Teknik Sipil",
      status: "active",
      lastActive: "45 menit yang lalu",
      assignedTasks: 9,
      completedTasks: 7,
      expertise: ["Struktur Bangunan", "Analisis Dampak"],
      performance: 91,
      avatar: "HW"
    },
    {
      id: 8,
      name: "Ir. Siti Nurhaliza",
      role: "Sekretaris",
      department: "P3M",
      status: "active",
      lastActive: "20 menit yang lalu",
      assignedTasks: 4,
      completedTasks: 4,
      expertise: ["Administrasi", "Koordinasi Tim"],
      performance: 100,
      avatar: "SN"
    },
    {
      id: 9,
      name: "Dr. Agus Setiawan",
      role: "Reviewer",
      department: "Mekatronika",
      status: "inactive",
      lastActive: "3 hari yang lalu",
      assignedTasks: 5,
      completedTasks: 1,
      expertise: ["Robotika", "Otomasi Industri"],
      performance: 60,
      avatar: "AS"
    },
    {
      id: 10,
      name: "Prof. Rini Puspita",
      role: "Validator",
      department: "Teknik Lingkungan",
      status: "active",
      lastActive: "1 jam yang lalu",
      assignedTasks: 7,
      completedTasks: 6,
      expertise: ["Analisis Dampak Lingkungan", "Sustainability"],
      performance: 94,
      avatar: "RP"
    },
    {
      id: 11,
      name: "Dr. Bambang Sutrisno",
      role: "Reviewer",
      department: "Teknologi Pangan",
      status: "active",
      lastActive: "50 menit yang lalu",
      assignedTasks: 6,
      completedTasks: 5,
      expertise: ["Food Safety", "Nutrisi Terapan"],
      performance: 89,
      avatar: "BS"
    },
    {
      id: 12,
      name: "Ir. Anita Permatasari",
      role: "Validator",
      department: "Sistem Informasi",
      status: "inactive",
      lastActive: "5 hari yang lalu",
      assignedTasks: 8,
      completedTasks: 3,
      expertise: ["Database Management", "Sistem Analisis"],
      performance: 72,
      avatar: "AP"
    }
  ]);

  const filteredMembers = members.filter(member => {
    // Filter by tab
    if (activeTab !== 'all' && member.status !== activeTab) return false;

    // Filter by search
    if (searchTerm && !member.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !member.department.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !member.role.toLowerCase().includes(searchTerm.toLowerCase())) return false;

    return true;
  });

  // Sort members based on selected criteria
  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'department') {
      return a.department.localeCompare(b.department);
    } else if (sortBy === 'performance') {
      return b.performance - a.performance;
    }
    return 0;
  });

  const getStatusBadgeColor = (status) => {
    return status === 'active'
      ? 'bg-emerald-100 text-emerald-800'
      : 'bg-gray-100 text-gray-600';
  };

  const getPerformanceColor = (score) => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 70) return 'text-blue-600';
    return 'text-amber-600';
  };

  const getAvatarColor = (name) => {
    const colors = [
      'bg-blue-100 text-blue-600',
      'bg-emerald-100 text-emerald-600',
      'bg-amber-100 text-amber-600',
      'bg-purple-100 text-purple-600',
      'bg-pink-100 text-pink-600',
    ];

    const hash = name.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    return colors[hash % colors.length];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className="bg-gradient-to-br from-cyan-600 to-blue-700 rounded-xl p-6 text-white shadow-md"
        data-aos="fade-down"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">Manajemen Panitia</h1>
            <p className="opacity-90 text-cyan-100">Kelola tim validasi proposal dengan mudah dan efisien</p>
          </div>
          <button className="px-4 py-2 bg-white text-blue-700 rounded-lg hover:bg-blue-50 transition-all flex items-center gap-2 shadow-sm">
            <MdPersonAdd className="h-5 w-5" />
            Tambah Anggota
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" data-aos="fade-up">
        {[
          {
            title: 'Total Anggota',
            value: members.length,
            icon: MdPeople,
            color: 'from-blue-500 to-blue-600',
          },
          {
            title: 'Aktif Hari Ini',
            value: members.filter(m => m.status === 'active').length,
            icon: MdVerified,
            color: 'from-emerald-500 to-emerald-600',
          },
          {
            title: 'Tugas Berjalan',
            value: members.reduce((acc, m) => acc + (m.assignedTasks - m.completedTasks), 0),
            icon: MdAssignment,
            color: 'from-amber-500 to-amber-600',
          },
          {
            title: 'Rata-rata Kinerja',
            value: `${Math.round(members.reduce((acc, m) => acc + m.performance, 0) / members.length)}%`,
            icon: MdSecurity,
            color: 'from-violet-500 to-violet-600',
          },
        ].map((stat, index) => (
          <Card
            key={index}
            extra="p-4 hover:shadow-lg transition-all border border-gray-100"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="flex items-center">
              <div className={`rounded-full p-3 bg-gradient-to-br ${stat.color} text-white shadow-sm`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h3 className="text-xl font-bold text-gray-800">{stat.value}</h3>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filter Tabs */}
      <Card extra="p-6 border border-gray-100" data-aos="fade-up">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex space-x-2">
            {[
              { id: 'all', label: 'Semua' },
              { id: 'active', label: 'Aktif' },
              { id: 'inactive', label: 'Tidak Aktif' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeTab === tab.id
                  ? 'bg-cyan-100 text-cyan-800 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0 md:w-64">
              <input
                type="text"
                placeholder="Cari anggota..."
                className="pl-10 pr-4 py-2 w-full rounded-lg border focus:ring-2 focus:ring-cyan-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <MdFilterList className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <select
              className="p-2 border border-gray-200 rounded-lg text-gray-700"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Nama</option>
              <option value="department">Departemen</option>
              <option value="performance">Performa</option>
            </select>
          </div>
        </div>

        {/* Members List */}
        <div className="space-y-4">
          {sortedMembers.length > 0 ? (
            sortedMembers.map((member) => (
              <div
                key={member.id}
                className="p-4 bg-white border rounded-lg hover:shadow-md transition-all"
                data-aos="fade-up"
              >
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-12 h-12 rounded-full ${getAvatarColor(member.name)} flex items-center justify-center shadow-sm`}>
                        <span className="text-xl font-bold">
                          {member.avatar}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.role} • {member.department}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                      <div className="text-sm">
                        <span className="text-gray-500 block mb-1">Status</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeColor(member.status)}`}>
                          {member.status === 'active' ? (
                            <span className="flex items-center gap-1">
                              <MdCheck className="inline" size={14} />
                              Aktif
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <MdClose className="inline" size={14} />
                              Tidak Aktif
                            </span>
                          )}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500 block mb-1">Tugas</span>
                        <span className="font-medium">{member.completedTasks}/{member.assignedTasks}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500 block mb-1">Performa</span>
                        <span className={`font-medium ${getPerformanceColor(member.performance)}`}>
                          {member.performance}%
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500 block mb-1">Terakhir Aktif</span>
                        <span>{member.lastActive}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {member.expertise.map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-all">
                      <MdEdit className="h-5 w-5" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-all">
                      <MdDelete className="h-5 w-5" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-all">
                      <MdMoreVert className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
              <MdPeople className="mx-auto h-12 w-12 text-gray-400 mb-3" />
              <p className="font-medium">Tidak ada anggota yang ditemukan</p>
              <p className="text-sm mt-1">Coba ubah filter atau kata kunci pencarian</p>
            </div>
          )}

          {sortedMembers.length > 0 && (
            <div className="flex justify-between items-center pt-3 text-sm text-gray-500">
              <div>Menampilkan {sortedMembers.length} dari {members.length} anggota</div>
              <div>Diurutkan berdasarkan: {sortBy === 'name' ? 'Nama' : sortBy === 'department' ? 'Departemen' : 'Performa'}</div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PanitiaManagement;
