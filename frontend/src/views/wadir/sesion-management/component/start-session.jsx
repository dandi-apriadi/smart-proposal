import React, { useState, useEffect } from 'react';
import {
  MdPlayArrow,
  MdSettings,
  MdGroup,
  MdTimer,
  MdSecurity,
  MdAutorenew,
  MdNotifications,
  MdTimeline,
  MdInsertChart,
  MdTrackChanges,
  MdDateRange
} from 'react-icons/md';
import Card from 'components/card';
import AOS from 'aos';
import 'aos/dist/aos.css';

const StartSession = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  const [sessionConfig, setSessionConfig] = useState({
    sessionName: 'Validasi Proposal Q2 2025',
    sessionType: 'advanced',
    duration: 90,
    maxParticipants: 25,
    securityLevel: 'high',
    mlValidation: true,
    mlThreshold: 85,
    autoApproval: false,
    notifyParticipants: true,
    scheduleStart: '',
    departments: ['Akademik', 'Keuangan', 'Penelitian'],
    priorityLevel: 'medium'
  });

  const handleStartSession = () => {
    console.log('Starting session with config:', sessionConfig);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white shadow-lg" data-aos="fade-down">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Mulai Sesi Validasi</h1>
            <p className="opacity-90 text-lg">Konfigurasi dan mulai sesi validasi proposal baru</p>
          </div>
          <div className="rounded-full bg-white/20 p-4 hover:bg-white/30 transition-all cursor-pointer backdrop-blur-sm">
            <MdPlayArrow className="h-8 w-8" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Configuration */}
        <div className="lg:col-span-2 space-y-6">
          <Card extra="p-6 hover:shadow-lg transition-shadow rounded-xl" data-aos="fade-up">
            <div className="flex items-center mb-4">
              <MdSettings className="h-5 w-5 text-blue-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">Pengaturan Utama</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Sesi
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={sessionConfig.sessionName}
                  onChange={(e) => setSessionConfig({ ...sessionConfig, sessionName: e.target.value })}
                  placeholder="Masukkan nama sesi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipe Sesi
                </label>
                <select
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={sessionConfig.sessionType}
                  onChange={(e) => setSessionConfig({ ...sessionConfig, sessionType: e.target.value })}
                >
                  <option value="standard">Standar</option>
                  <option value="express">Express</option>
                  <option value="advanced">Advanced</option>
                  <option value="intensive">Intensif</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Durasi (menit)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={sessionConfig.duration}
                  onChange={(e) => setSessionConfig({ ...sessionConfig, duration: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jadwal Mulai
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={sessionConfig.scheduleStart}
                  onChange={(e) => setSessionConfig({ ...sessionConfig, scheduleStart: e.target.value })}
                />
              </div>
            </div>
          </Card>

          <Card extra="p-6 hover:shadow-lg transition-shadow rounded-xl" data-aos="fade-up" data-aos-delay="100">
            <div className="flex items-center mb-4">
              <MdInsertChart className="h-5 w-5 text-purple-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">Konfigurasi ML</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                <div className="flex items-center space-x-3">
                  <MdAutorenew className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-800">Validasi Otomatis ML</p>
                    <p className="text-sm text-gray-600">Aktifkan validasi menggunakan Machine Learning</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={sessionConfig.mlValidation}
                    onChange={(e) => setSessionConfig({ ...sessionConfig, mlValidation: e.target.checked })}
                  />
                  <div className="w-14 h-7 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all"></div>
                </label>
              </div>

              {sessionConfig.mlValidation && (
                <div className="p-5 border border-blue-200 rounded-lg space-y-4 bg-white shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Threshold Persetujuan</span>
                    <span className="text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text font-medium">{sessionConfig.mlThreshold}%</span>
                  </div>
                  <input
                    type="range"
                    min="70"
                    max="95"
                    value={sessionConfig.mlThreshold}
                    onChange={(e) => setSessionConfig({ ...sessionConfig, mlThreshold: e.target.value })}
                    className="w-full h-2 bg-gradient-to-r from-blue-300 to-purple-300 rounded-lg appearance-none cursor-pointer"
                  />

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Mode Analisis</p>
                      <p className="text-sm font-medium text-gray-700">Progressive</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Confidence Level</p>
                      <p className="text-sm font-medium text-gray-700">High (95%)</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Side Options */}
        <div className="space-y-6">
          <Card extra="p-6 hover:shadow-lg transition-shadow rounded-xl" data-aos="fade-left">
            <div className="flex items-center mb-4">
              <MdTrackChanges className="h-5 w-5 text-blue-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">Opsi Tambahan</h2>
            </div>
            <div className="space-y-5">
              <div className="flex items-center justify-between p-3 hover:bg-blue-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <MdNotifications className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Notifikasi Peserta</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={sessionConfig.notifyParticipants}
                    onChange={(e) => setSessionConfig({ ...sessionConfig, notifyParticipants: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:bg-gradient-to-r from-blue-500 to-purple-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-3 hover:bg-blue-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <MdAutorenew className="h-5 w-5 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Persetujuan Otomatis</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={sessionConfig.autoApproval}
                    onChange={(e) => setSessionConfig({ ...sessionConfig, autoApproval: e.target.checked })}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:bg-gradient-to-r from-blue-500 to-purple-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Departemen
                </label>
                <select
                  multiple
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-28"
                  value={sessionConfig.departments}
                  onChange={(e) => setSessionConfig({
                    ...sessionConfig,
                    departments: Array.from(e.target.selectedOptions, option => option.value)
                  })}
                >
                  <option value="Akademik">Akademik</option>
                  <option value="Keuangan">Keuangan</option>
                  <option value="Penelitian">Penelitian</option>
                  <option value="Pengembangan">Pengembangan</option>
                  <option value="Kemahasiswaan">Kemahasiswaan</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prioritas
                </label>
                <div className="flex gap-2">
                  {['low', 'medium', 'high'].map((priority) => (
                    <button
                      key={priority}
                      type="button"
                      onClick={() => setSessionConfig({ ...sessionConfig, priorityLevel: priority })}
                      className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium capitalize ${sessionConfig.priorityLevel === priority
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      {priority}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Start Button */}
          <button
            onClick={handleStartSession}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center space-x-2 font-medium text-lg"
            data-aos="fade-up"
          >
            <MdPlayArrow className="h-6 w-6" />
            <span>Mulai Sesi</span>
          </button>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100 text-sm text-gray-600" data-aos="fade-up" data-aos-delay="100">
            <p className="font-medium text-blue-800 mb-1">Info</p>
            <p>Sesi akan berakhir secara otomatis setelah {sessionConfig.duration} menit atau ketika semua proposal telah divalidasi.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartSession;
