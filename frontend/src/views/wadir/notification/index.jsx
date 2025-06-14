import React, { useState, useEffect } from "react";
import {
  MdNotifications,
  MdSettings,
  MdWarning,
  MdInfo,
  MdCheck,
  MdDelete,
  MdEmail,
  MdPhoneAndroid,
  MdDesktopMac,
} from "react-icons/md";
import Card from "components/card";
import AOS from "aos";
import "aos/dist/aos.css";

const NotificationPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "warning",
      title: "Proposal Memerlukan Review Segera",
      message: "3 proposal baru memerlukan review dalam 24 jam",
      time: "5 menit yang lalu",
      isRead: false,
    },
    {
      id: 2,
      type: "info",
      title: "Update Sistem Machine Learning",
      message: "Sistem ML telah diperbarui dengan akurasi yang lebih tinggi",
      time: "1 jam yang lalu",
      isRead: true,
    }
  ]);

  const [settings, setSettings] = useState({
    email: true,
    push: true,
    desktop: false,
    proposalAlerts: true,
    systemUpdates: true,
    deadlineReminders: true,
  });

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div 
        className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-xl p-6 mb-6 text-white"
        data-aos="fade-down"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Notifikasi</h1>
            <p className="opacity-90">Kelola notifikasi dan pengaturan pemberitahuan</p>
          </div>
          <div className="relative">
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notifications.filter(n => !n.isRead).length}
            </span>
            <MdNotifications className="h-8 w-8" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Important Alerts */}
        <div className="lg:col-span-2">
          <Card extra="p-4" data-aos="fade-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Pemberitahuan Penting</h2>
              <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                Tandai Semua Dibaca
              </button>
            </div>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border transition-all ${
                    notification.isRead ? 'bg-white' : 'bg-indigo-50'
                  }`}
                  data-aos="fade-up"
                >
                  <div className="flex items-start">
                    <div className={`rounded-full p-2 ${
                      notification.type === 'warning' 
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {notification.type === 'warning' ? <MdWarning /> : <MdInfo />}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{notification.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        </div>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Notification Settings */}
        <div className="lg:col-span-1">
          <Card extra="p-4" data-aos="fade-up">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Pengaturan Notifikasi</h2>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">Metode Pemberitahuan</h3>
                <div className="space-y-3">
                  {[
                    { icon: MdEmail, label: 'Email', key: 'email' },
                    { icon: MdPhoneAndroid, label: 'Notifikasi Push', key: 'push' },
                    { icon: MdDesktopMac, label: 'Notifikasi Desktop', key: 'desktop' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <item.icon className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="text-gray-700">{item.label}</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={settings[item.key]}
                          onChange={() => setSettings(s => ({ ...s, [item.key]: !s[item.key] }))}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-gray-700">Jenis Pemberitahuan</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Alert Proposal', key: 'proposalAlerts' },
                    { label: 'Update Sistem', key: 'systemUpdates' },
                    { label: 'Pengingat Deadline', key: 'deadlineReminders' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <span className="text-gray-700">{item.label}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={settings[item.key]}
                          onChange={() => setSettings(s => ({ ...s, [item.key]: !s[item.key] }))}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
