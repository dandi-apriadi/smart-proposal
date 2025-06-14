import React, { useState, useEffect } from 'react';
import {
  MdHistory,
  MdAccessTime,
  MdPerson,
  MdDescription,
  MdCheck,
  MdClose,
  MdWarning,
  MdRefresh,
  MdFilterList,
  MdSearch
} from 'react-icons/md';
import Card from 'components/card';
import AOS from 'aos';
import 'aos/dist/aos.css';

const LogActivity = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activities] = useState([
    {
      id: 1,
      type: 'validation',
      user: 'Dr. Ahmad',
      action: 'Validasi Proposal',
      target: 'Proposal Pengadaan Lab',
      result: 'approved',
      mlScore: 95,
      timestamp: '2 menit yang lalu'
    },
    {
      id: 2,
      type: 'review',
      user: 'Prof. Sarah',
      action: 'Review Format',
      target: 'Proposal Workshop AI',
      result: 'revision',
      mlScore: 78,
      timestamp: '15 menit yang lalu'
    }
  ]);

  const getActivityIcon = (type) => {
    switch(type) {
      case 'validation': return <MdCheck className="h-5 w-5" />;
      case 'review': return <MdDescription className="h-5 w-5" />;
      default: return <MdHistory className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 mb-6 text-white" data-aos="fade-down">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">Log Aktivitas</h1>
            <p className="opacity-90">Pantau aktivitas validasi proposal dan sistem ML</p>
          </div>
          <button 
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all flex items-center gap-2"
            onClick={() => window.location.reload()}
          >
            <MdRefresh className="h-5 w-5" />
            <span>Segarkan</span>
          </button>
        </div>
      </div>

      {/* Control Panel */}
      <Card extra="p-4 mb-6" data-aos="fade-up">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Cari aktivitas..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <MdSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="flex gap-2">
            <select
              className="px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Semua Aktivitas</option>
              <option value="validation">Validasi</option>
              <option value="review">Review</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Activity Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Actions */}
        <div className="lg:col-span-2">
          <Card extra="p-6" data-aos="fade-right">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Aktivitas Terbaru</h2>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="p-4 bg-white border rounded-lg hover:shadow-md transition-all"
                  data-aos="fade-up"
                >
                  <div className="flex items-start gap-4">
                    <div className={`rounded-full p-2 ${
                      activity.result === 'approved' ? 'bg-green-100 text-green-600' :
                      activity.result === 'revision' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-800">{activity.action}</h3>
                          <p className="text-sm text-gray-600">{activity.target}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <MdPerson className="text-gray-400" />
                            <span className="text-sm text-gray-500">{activity.user}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-gray-500">{activity.timestamp}</span>
                          {activity.mlScore && (
                            <div className={`mt-1 px-2 py-1 rounded-full text-xs ${
                              activity.mlScore >= 90 ? 'bg-green-100 text-green-800' :
                              activity.mlScore >= 75 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              ML Score: {activity.mlScore}%
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Activity Stats */}
        <div className="space-y-6">
          <Card extra="p-6" data-aos="fade-left">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Ringkasan Aktivitas</h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-blue-800">Total Aktivitas</span>
                  <span className="font-bold text-blue-800">48</span>
                </div>
                <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <span className="text-green-800">Disetujui</span>
                  <h4 className="text-2xl font-bold text-green-800 mt-1">32</h4>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <span className="text-yellow-800">Revisi</span>
                  <h4 className="text-2xl font-bold text-yellow-800 mt-1">16</h4>
                </div>
              </div>
            </div>
          </Card>

          {/* ML Performance */}
          <Card extra="p-6" data-aos="fade-left">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Performa ML</h2>
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 rounded-lg">
                <span className="text-purple-800">Akurasi Validasi</span>
                <h4 className="text-2xl font-bold text-purple-800 mt-1">95.8%</h4>
                <div className="mt-2 w-full bg-purple-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '95.8%' }}></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LogActivity;
