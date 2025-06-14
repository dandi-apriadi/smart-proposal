import React, { useState, useEffect } from 'react';
import {
  MdAccessTime,
  MdCheck,
  MdWarning,
  MdError,
  MdFilterList,
  MdRefresh,
  MdAutorenew,
  MdPerson
} from 'react-icons/md';
import Card from 'components/card';
import AOS from 'aos';
import 'aos/dist/aos.css';

const RecentActions = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  const [filter, setFilter] = useState('all');
  const [recentActions] = useState([
    {
      id: 1,
      action: "Validasi Proposal",
      document: "Proposal Pengadaan Lab Komputer",
      user: "Dr. Ahmad",
      timestamp: "2 menit yang lalu",
      status: "success",
      mlScore: 95,
      details: "Format sesuai dengan standar"
    },
    {
      id: 2,
      action: "Review Format",
      document: "Proposal Workshop AI",
      user: "Prof. Sarah",
      timestamp: "15 menit yang lalu",
      status: "warning",
      mlScore: 78,
      details: "Beberapa bagian perlu direvisi"
    },
    {
      id: 3,
      action: "Validasi Otomatis",
      document: "Proposal Seminar Nasional",
      user: "System ML",
      timestamp: "30 menit yang lalu",
      status: "error",
      mlScore: 65,
      details: "Format tidak sesuai standar"
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'error': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <Card extra="p-6" data-aos="fade-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Aktivitas Terbaru</h2>
          <p className="text-gray-600">Monitoring aktivitas validasi proposal</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            className="px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Semua Aktivitas</option>
            <option value="success">Tervalidasi</option>
            <option value="warning">Perlu Review</option>
            <option value="error">Ditolak</option>
          </select>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
            <MdRefresh className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Actions List */}
      <div className="space-y-4">
        {recentActions.map((action) => (
          <div
            key={action.id}
            className="p-4 border rounded-lg hover:shadow-md transition-all"
            data-aos="fade-up"
          >
            <div className="flex items-start gap-4">
              <div className={`rounded-full p-2 ${getStatusColor(action.status)}`}>
                {action.status === 'success' ? <MdCheck className="h-5 w-5" /> :
                 action.status === 'warning' ? <MdWarning className="h-5 w-5" /> :
                 <MdError className="h-5 w-5" />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">{action.action}</h3>
                    <p className="text-sm text-gray-600">{action.document}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center text-sm text-gray-500">
                        <MdPerson className="h-4 w-4 mr-1" />
                        {action.user}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MdAccessTime className="h-4 w-4 mr-1" />
                        {action.timestamp}
                      </div>
                    </div>
                  </div>
                  {action.mlScore && (
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      action.mlScore >= 90 ? 'bg-green-100 text-green-800' :
                      action.mlScore >= 75 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      ML Score: {action.mlScore}%
                    </div>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-600">{action.details}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {recentActions.length === 0 && (
        <div className="text-center py-12">
          <MdAutorenew className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900">Tidak ada aktivitas terbaru</h3>
          <p className="text-gray-500 mt-1">Aktivitas baru akan muncul di sini</p>
        </div>
      )}
    </Card>
  );
};

export default RecentActions;
