import React, { useState, useEffect } from 'react';
import {
  MdNotifications,
  MdEmail,
  MdPhoneAndroid,
  MdDesktopWindows,
  MdSecurity,
  MdSchedule,
  MdWarning,
  MdSave
} from 'react-icons/md';
import Card from 'components/card';
import AOS from 'aos';
import 'aos/dist/aos.css';

const NotificationSettings = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  const [settings, setSettings] = useState({
    channels: {
      email: true,
      push: true,
      desktop: false
    },
    preferences: {
      proposalSubmissions: true,
      mlValidationAlerts: true,
      systemUpdates: true,
      securityAlerts: true,
      deadlineReminders: true
    },
    mlThresholds: {
      urgentAlerts: 90,
      warningAlerts: 75
    }
  });

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    // Add API call here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl p-6 text-white" data-aos="fade-down">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Pengaturan Notifikasi</h1>
            <p className="opacity-90">Konfigurasi preferensi notifikasi dan alert sistem</p>
          </div>
          <div className="rounded-full bg-white/20 p-3">
            <MdNotifications className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notification Channels */}
        <Card extra="p-6" data-aos="fade-right">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Channel Notifikasi</h2>
          <div className="space-y-4">
            {[
              { key: 'email', icon: MdEmail, label: 'Email Notifications' },
              { key: 'push', icon: MdPhoneAndroid, label: 'Push Notifications' },
              { key: 'desktop', icon: MdDesktopWindows, label: 'Desktop Alerts' }
            ].map((channel) => (
              <div key={channel.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <channel.icon className="h-5 w-5 text-purple-600" />
                  <span className="text-gray-700">{channel.label}</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.channels[channel.key]}
                    onChange={() => setSettings({
                      ...settings,
                      channels: {
                        ...settings.channels,
                        [channel.key]: !settings.channels[channel.key]
                      }
                    })}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-purple-300 peer-checked:after:translate-x-full peer-checked:bg-purple-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            ))}
          </div>
        </Card>

        {/* ML Alert Settings */}
        <Card extra="p-6" data-aos="fade-left">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Pengaturan ML Alert</h2>
          <div className="space-y-6">
            {Object.entries(settings.mlThresholds).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </label>
                  <span className="text-sm text-purple-600">{value}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={value}
                  onChange={(e) => setSettings({
                    ...settings,
                    mlThresholds: {
                      ...settings.mlThresholds,
                      [key]: parseInt(e.target.value)
                    }
                  })}
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Notification Preferences */}
        <Card extra="p-6 lg:col-span-2" data-aos="fade-up">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Preferensi Notifikasi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(settings.preferences).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={value}
                    onChange={() => setSettings({
                      ...settings,
                      preferences: {
                        ...settings.preferences,
                        [key]: !value
                      }
                    })}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-purple-300 peer-checked:after:translate-x-full peer-checked:bg-purple-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end" data-aos="fade-up">
        <button
          onClick={handleSaveSettings}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all flex items-center gap-2"
        >
          <MdSave className="h-5 w-5" />
          <span>Simpan Pengaturan</span>
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;
