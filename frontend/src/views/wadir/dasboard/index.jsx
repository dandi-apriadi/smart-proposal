import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProposalSummary from './components/proposalsumarry';
import NotificationsSummary from './components/notificationssummary';
import LogActivitySummary from './components/logactsummary';
import LaporanSummary from './components/laporansummary';
import ScheduleDisplay from './components/jadwalsaatini';
import { FaUser, FaChartBar, FaRegClock, FaRegCalendarCheck } from 'react-icons/fa';

const WadirDashboard = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  const currentUser = {
    name: 'Dr. Ahmad Zakaria',
    role: 'Wakil Direktur',
    avatar: 'https://randomuser.me/api/portraits/men/42.jpg'
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      {/* Welcome Header with User Info */}
      <div
        className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl shadow-xl p-6 mb-8 text-white relative overflow-hidden"
        data-aos="fade-down"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mt-20 -mr-20"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-400 opacity-10 rounded-full -mb-10 -ml-10"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="mr-4 hidden md:block">
              <img
                src={currentUser.avatar}
                alt="User"
                className="w-16 h-16 rounded-full border-4 border-white shadow-md"
              />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Selamat Datang, {currentUser.name}</h1>
              <p className="text-blue-100 font-medium mt-1">Dashboard {currentUser.role}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm">
            <div className="bg-white bg-opacity-20 py-2 px-4 rounded-lg backdrop-blur-sm">
              <div className="flex items-center">
                <FaRegClock className="mr-2" />
                <span>{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
            </div>
            <button className="bg-white text-blue-800 py-2 px-4 rounded-lg font-medium shadow-sm hover:bg-blue-50 transition-colors">
              <span className="hidden md:inline">Lihat</span> Notifikasi
            </button>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        {/* Left Column */}
        <div className="xl:col-span-2 space-y-6">
          {/* Proposal Summary */}
          <ProposalSummary />

          {/* Schedule Display */}
          <div data-aos="fade-up" data-aos-delay="150">
            <ScheduleDisplay />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Notifications */}
          <div data-aos="fade-left" data-aos-delay="100">
            <NotificationsSummary />
          </div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-2 gap-4" data-aos="fade-up" data-aos-delay="200">
            <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-500 hover:shadow-lg transition-shadow">
              <div className="text-green-500 mb-2">
                <FaRegCalendarCheck className="text-xl" />
              </div>
              <h3 className="text-gray-500 text-sm">Rapat Hari Ini</h3>
              <p className="text-xl font-bold text-gray-800">3</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
              <div className="text-blue-500 mb-2">
                <FaChartBar className="text-xl" />
              </div>
              <h3 className="text-gray-500 text-sm">Target Bulanan</h3>
              <p className="text-xl font-bold text-gray-800">85%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Log Activity */}
        <div data-aos="fade-right" data-aos-delay="250">
          <LogActivitySummary />
        </div>

        {/* Report Summary */}
        <div data-aos="fade-left" data-aos-delay="300">
          <LaporanSummary />
        </div>
      </div>
    </div>
  );
};

export default WadirDashboard;
