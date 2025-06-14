import React, { useState, useEffect } from 'react';
import { 
  MdWarning, 
  MdErrorOutline, 
  MdInfo, 
  MdCheck,
  MdNotifications,
  MdDelete 
} from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ImportantAlerts = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'urgent',
      title: 'Proposal Memerlukan Validasi Segera',
      message: 'Terdapat 3 proposal yang menunggu validasi dengan deadline hari ini',
      timestamp: '5 menit yang lalu',
      category: 'proposal',
      unread: true
    },
    {
      id: 2,
      type: 'warning',
      title: 'Peringatan Batas Waktu',
      message: 'Deadline pengumpulan laporan kegiatan akan berakhir dalam 24 jam',
      timestamp: '1 jam yang lalu',
      category: 'deadline',
      unread: true
    },
    {
      id: 3,
      type: 'info',
      title: 'Update Sistem Machine Learning',
      message: 'Model ML telah diperbarui dengan akurasi 95.8%',
      timestamp: '2 jam yang lalu',
      category: 'system',
      unread: false
    }
  ]);

  const getAlertIcon = (type) => {
    switch (type) {
      case 'urgent':
        return <MdErrorOutline className="h-6 w-6 text-red-600" />;
      case 'warning':
        return <MdWarning className="h-6 w-6 text-yellow-600" />;
      case 'info':
        return <MdInfo className="h-6 w-6 text-blue-600" />;
      default:
        return <MdNotifications className="h-6 w-6 text-gray-600" />;
    }
  };

  const getAlertStyle = (type) => {
    switch (type) {
      case 'urgent':
        return 'border-l-4 border-red-500 bg-red-50';
      case 'warning':
        return 'border-l-4 border-yellow-500 bg-yellow-50';
      case 'info':
        return 'border-l-4 border-blue-500 bg-blue-50';
      default:
        return 'border-l-4 border-gray-500 bg-gray-50';
    }
  };

  return (
    <div className="space-y-4" data-aos="fade-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <MdWarning className="h-6 w-6 text-red-500" />
          <h2 className="text-xl font-bold text-gray-800">Pemberitahuan Penting</h2>
        </div>
        <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
          {alerts.filter(alert => alert.unread).length} Baru
        </span>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg shadow-sm transition-all hover:shadow-md ${getAlertStyle(alert.type)}`}
            data-aos="fade-left"
          >
            <div className="flex items-start space-x-4">
              <div className={`rounded-full p-2 ${
                alert.type === 'urgent' ? 'bg-red-100' :
                alert.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
              }`}>
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {alert.title}
                      {alert.unread && (
                        <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full">
                          Baru
                        </span>
                      )}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">{alert.message}</p>
                    <div className="mt-2 flex items-center space-x-4">
                      <span className="text-xs text-gray-500">{alert.timestamp}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        alert.category === 'proposal' ? 'bg-purple-100 text-purple-600' :
                        alert.category === 'deadline' ? 'bg-orange-100 text-orange-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {alert.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      className="p-2 hover:bg-gray-100 rounded-full transition-all"
                      onClick={() => {
                        setAlerts(alerts.map(a => 
                          a.id === alert.id ? {...a, unread: false} : a
                        ));
                      }}
                    >
                      <MdCheck className="h-5 w-5 text-green-600" />
                    </button>
                    <button 
                      className="p-2 hover:bg-gray-100 rounded-full transition-all"
                      onClick={() => {
                        setAlerts(alerts.filter(a => a.id !== alert.id));
                      }}
                    >
                      <MdDelete className="h-5 w-5 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {alerts.length === 0 && (
        <div className="text-center py-8" data-aos="fade-up">
          <MdInfo className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-500">Tidak ada pemberitahuan penting saat ini</p>
        </div>
      )}
    </div>
  );
};

export default ImportantAlerts;
