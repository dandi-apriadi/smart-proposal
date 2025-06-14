import React, { useState, useEffect } from 'react';
import {
  MdTimer,
  MdPeople,
  MdSecurity,
  MdHistory,
  MdBlock,
  MdRefresh,
  MdEdit,
  MdDelete,
  MdCheckCircle,
  MdWarning
} from 'react-icons/md';
import Card from 'components/card';
import AOS from 'aos';
import 'aos/dist/aos.css';

const DetailSession = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  const [sessionDetails] = useState({
    id: 'SES-2023-001',
    name: 'Sesi Validasi Proposal Pengadaan Q4 2023',
    status: 'active',
    startTime: '2023-12-20 09:00',
    duration: '180',
    currentUsers: 12,
    maxUsers: 30,
    securityLevel: 'high',
    mlValidation: true,
    mlThreshold: 85,
    allowedDepartments: ['Teknik Informatika', 'Teknik Elektro', 'Akuntansi'],
    activeProposals: 8,
    completedValidations: 45,
    lastActivity: '2 menit yang lalu'
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white" data-aos="fade-down">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold">{sessionDetails.name}</h1>
              <span className={`px-3 py-1 rounded-full text-sm ${
                sessionDetails.status === 'active' ? 'bg-green-400' : 'bg-yellow-400'
              }`}>
                {sessionDetails.status === 'active' ? 'Aktif' : 'Inactive'}
              </span>
            </div>
            <p className="mt-2 opacity-90">ID: {sessionDetails.id}</p>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg flex items-center gap-2 transition-all">
              <MdEdit className="h-5 w-5" />
              <span>Edit</span>
            </button>
            <button className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg flex items-center gap-2 transition-all">
              <MdBlock className="h-5 w-5" />
              <span>Hentikan Sesi</span>
            </button>
          </div>
        </div>
      </div>

      {/* Session Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: MdTimer, title: 'Durasi', value: `${sessionDetails.duration} menit` },
          { icon: MdPeople, title: 'Pengguna Aktif', value: `${sessionDetails.currentUsers}/${sessionDetails.maxUsers}` },
          { icon: MdCheckCircle, title: 'Validasi Selesai', value: sessionDetails.completedValidations },
          { icon: MdHistory, title: 'Aktivitas Terakhir', value: sessionDetails.lastActivity }
        ].map((stat, index) => (
          <Card
            key={index}
            extra="p-4 hover:shadow-lg transition-all"
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="flex items-center">
              <div className="rounded-full p-3 bg-blue-100">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h3 className="text-xl font-bold text-gray-800">{stat.value}</h3>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Session Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card extra="p-6" data-aos="fade-right">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Konfigurasi Sesi</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <MdSecurity className="h-5 w-5 text-blue-600 mr-3" />
                <span className="text-gray-700">Level Keamanan</span>
              </div>
              <span className="font-medium text-blue-600 capitalize">{sessionDetails.securityLevel}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <MdCheckCircle className="h-5 w-5 text-green-600 mr-3" />
                <span className="text-gray-700">Validasi ML</span>
              </div>
              <span className="font-medium text-green-600">{sessionDetails.mlThreshold}% threshold</span>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-800 mb-2">Departemen yang Diizinkan</h3>
              <div className="flex flex-wrap gap-2">
                {sessionDetails.allowedDepartments.map((dept, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                    {dept}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card extra="p-6" data-aos="fade-left">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Aktivitas Proposal</h2>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center">
                <MdWarning className="h-6 w-6 text-yellow-600 mr-3" />
                <div>
                  <h3 className="font-medium text-yellow-800">Proposal Aktif</h3>
                  <p className="text-yellow-600 mt-1">
                    {sessionDetails.activeProposals} proposal sedang dalam proses validasi
                  </p>
                </div>
              </div>
            </div>
            <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Area untuk Grafik Aktivitas</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DetailSession;
