import React, { useState, useEffect } from "react";
import {
  MdComputer,
  MdPhoneAndroid,
  MdTablet,
  MdLocationOn,
  MdAccessTime,
  MdClose,
  MdRefresh,
  MdWarning,
  MdSecurity,
  MdHistory,
  MdInfo,
  MdDevices,
  MdFilterList,
  MdSearch,
  MdMoreVert,
  MdCheck,
} from "react-icons/md";
import Card from "components/card";
import AOS from "aos";
import "aos/dist/aos.css";

const SessionManagement = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  // Updated with more realistic and comprehensive session data
  const [activeSessions, setActiveSessions] = useState([
    {
      id: 1,
      user: "Dr. Budi Santoso",
      role: "Ketua Jurusan",
      device: "Desktop",
      browser: "Chrome 121.0.6167",
      os: "Windows 11",
      ip: "192.168.1.107",
      location: "Manado, Indonesia",
      lastActive: "2 menit yang lalu",
      loginTime: "08:45 WIB",
      status: "active",
      activities: ["Mengedit dokumen", "Menyetujui proposal"],
      suspicious: false,
    },
    {
      id: 2,
      user: "Dra. Maya Wijaya",
      role: "Dosen",
      device: "Mobile",
      browser: "Safari 17.3",
      os: "iOS 17.4",
      ip: "192.168.1.224",
      location: "Manado, Indonesia",
      lastActive: "5 menit yang lalu",
      loginTime: "09:12 WIB",
      status: "active",
      activities: ["Mengakses berkas mahasiswa"],
      suspicious: false,
    },
    {
      id: 3,
      user: "Agus Priyanto, S.T.",
      role: "Admin Fakultas",
      device: "Desktop",
      browser: "Firefox 123.0",
      os: "Ubuntu 22.04",
      ip: "192.168.1.56",
      location: "Jakarta, Indonesia",
      lastActive: "7 menit yang lalu",
      loginTime: "08:30 WIB",
      status: "idle",
      activities: ["Mengunggah dokumen", "Membuat pengumuman"],
      suspicious: false,
    },
    {
      id: 4,
      user: "Dr. Ratna Dewi",
      role: "Wadir",
      device: "Tablet",
      browser: "Chrome 120.0.6099",
      os: "iPadOS 16.5",
      ip: "103.121.45.78",
      location: "Bandung, Indonesia",
      lastActive: "12 menit yang lalu",
      loginTime: "07:55 WIB",
      status: "active",
      activities: ["Mereview pengajuan anggaran"],
      suspicious: false,
    },
    {
      id: 5,
      user: "Unknown User",
      role: "Staff",
      device: "Mobile",
      browser: "Unknown Browser",
      os: "Android 10",
      ip: "45.67.89.123",
      location: "Singapore",
      lastActive: "1 menit yang lalu",
      loginTime: "09:27 WIB",
      status: "active",
      activities: ["Mengakses data mahasiswa", "Mengakses data keuangan"],
      suspicious: true,
    },
  ]);

  const [selectedSession, setSelectedSession] = useState(null);
  const [filter, setFilter] = useState("all"); // all, active, idle, suspicious
  const [searchQuery, setSearchQuery] = useState("");

  // Filter sessions based on filter state and search query
  const filteredSessions = activeSessions.filter((session) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "suspicious" && session.suspicious) ||
      (filter !== "suspicious" && session.status === filter);

    const matchesSearch =
      session.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.browser.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.device.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const getDeviceIcon = (device) => {
    switch (device) {
      case "Desktop":
        return <MdComputer className="h-6 w-6" />;
      case "Mobile":
        return <MdPhoneAndroid className="h-6 w-6" />;
      default:
        return <MdTablet className="h-6 w-6" />;
    }
  };

  const endSession = (id) => {
    if (window.confirm("Apakah Anda yakin ingin mengakhiri sesi ini?")) {
      setActiveSessions(activeSessions.filter((session) => session.id !== id));
    }
  };

  const refreshData = () => {
    // Simulate data refresh with a visual indication
    const refreshBtn = document.getElementById("refresh-btn");
    refreshBtn.classList.add("animate-spin");

    setTimeout(() => {
      refreshBtn.classList.remove("animate-spin");
      // You would typically fetch new data from the server here
    }, 1000);
  };

  const getStatusIndicator = (status, suspicious) => {
    if (suspicious) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <span className="animate-ping absolute h-2.5 w-2.5 rounded-full bg-red-400 opacity-75"></span>
          <span className="relative h-2 w-2 rounded-full bg-red-500 mr-1.5"></span>
          Mencurigakan
        </span>
      );
    }

    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></span>
            Aktif
          </span>
        );
      case "idle":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <span className="h-2 w-2 rounded-full bg-yellow-500 mr-1.5"></span>
            Idle
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <span className="h-2 w-2 rounded-full bg-gray-500 mr-1.5"></span>
            Unknown
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen p-4" data-aos="fade-up">
      {/* Header Section with Modern Gradient */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 mb-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Manajemen Sesi</h1>
            <p className="opacity-90">
              Monitor dan kelola aktivitas pengguna secara realtime
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              id="refresh-btn"
              onClick={refreshData}
              className="bg-white text-indigo-700 px-4 py-2 rounded-xl hover:bg-indigo-50 transition-all flex items-center shadow-md hover:shadow-lg"
            >
              <MdRefresh className="mr-2" /> Segarkan Data
            </button>
          </div>
        </div>
      </div>

      {/* Modern Card Dashboard with Subtle Box Shadow */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card
          extra="p-5 hover:shadow-lg transition-all overflow-hidden relative border border-gray-100"
          data-aos="fade-up"
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-green-100 rounded-full -m-10 opacity-60"></div>
          <div className="flex items-center">
            <div className="rounded-xl p-3 bg-green-100">
              <MdDevices className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 font-medium">Sesi Aktif</p>
              <h3 className="text-3xl font-bold text-gray-800">
                {
                  activeSessions.filter((s) => s.status === "active")
                    .length
                }
              </h3>
            </div>
          </div>
        </Card>

        <Card
          extra="p-5 hover:shadow-lg transition-all overflow-hidden relative border border-gray-100"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-red-100 rounded-full -m-10 opacity-60"></div>
          <div className="flex items-center">
            <div className="rounded-xl p-3 bg-red-100">
              <MdSecurity className="h-8 w-8 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 font-medium">
                Sesi Mencurigakan
              </p>
              <h3 className="text-3xl font-bold text-gray-800">
                {
                  activeSessions.filter((s) => s.suspicious).length
                }
              </h3>
            </div>
          </div>
        </Card>

        <Card
          extra="p-5 hover:shadow-lg transition-all overflow-hidden relative border border-gray-100"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100 rounded-full -m-10 opacity-60"></div>
          <div className="flex items-center">
            <div className="rounded-xl p-3 bg-blue-100">
              <MdAccessTime className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 font-medium">
                Rata-rata Durasi
              </p>
              <h3 className="text-3xl font-bold text-gray-800">45m</h3>
            </div>
          </div>
        </Card>

        <Card
          extra="p-5 hover:shadow-lg transition-all overflow-hidden relative border border-gray-100"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-amber-100 rounded-full -m-10 opacity-60"></div>
          <div className="flex items-center">
            <div className="rounded-xl p-3 bg-amber-100">
              <MdHistory className="h-8 w-8 text-amber-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 font-medium">
                Total Sesi Hari Ini
              </p>
              <h3 className="text-3xl font-bold text-gray-800">24</h3>
            </div>
          </div>
        </Card>
      </div>

      {/* Filter and Search Controls */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === "all"
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
          >
            Semua
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === "active"
              ? "bg-green-600 text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
          >
            Aktif
          </button>
          <button
            onClick={() => setFilter("idle")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === "idle"
              ? "bg-yellow-500 text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
          >
            Idle
          </button>
          <button
            onClick={() => setFilter("suspicious")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === "suspicious"
              ? "bg-red-600 text-white shadow-md"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
          >
            Mencurigakan
          </button>
        </div>

        <div className="relative w-full md:w-64">
          <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari sesi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Active Sessions List with Modern Design */}
      <Card extra="p-6 border border-gray-100" data-aos="fade-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Sesi Aktif</h2>
          <div className="text-sm text-gray-500">
            Menampilkan {filteredSessions.length} dari {activeSessions.length} sesi
          </div>
        </div>

        {filteredSessions.length > 0 ? (
          <div className="grid gap-4">
            {filteredSessions.map((session) => (
              <div
                key={session.id}
                className={`border ${session.suspicious ? "border-red-200 bg-red-50" : "border-gray-200"
                  } rounded-xl p-5 hover:shadow-md transition-all`}
                data-aos="fade-up"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center">
                    <div
                      className={`rounded-xl p-3 ${session.suspicious
                        ? "bg-red-100"
                        : session.status === "active"
                          ? "bg-green-100"
                          : "bg-yellow-100"
                        }`}
                    >
                      {getDeviceIcon(session.device)}
                    </div>
                    <div className="ml-4">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-800">{session.user}</h3>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                          {session.role}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {session.browser} • {session.os}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <MdLocationOn className="mr-1" />
                        {session.location} • IP: {session.ip}
                      </div>

                      <div className="mt-2">
                        {getStatusIndicator(session.status, session.suspicious)}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 flex items-center gap-3">
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-medium text-gray-600">
                        Login: {session.loginTime}
                      </span>
                      <span className="text-xs text-gray-500">
                        Aktif: {session.lastActive}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedSession(session)}
                        className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
                        title="Lihat Detail"
                      >
                        <MdInfo />
                      </button>
                      <button
                        onClick={() => endSession(session.id)}
                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                        title="Akhiri Sesi"
                      >
                        <MdClose />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Activity badges */}
                {session.activities && session.activities.length > 0 && (
                  <div className="mt-3 ml-16">
                    <div className="flex flex-wrap gap-2">
                      {session.activities.map((activity, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800"
                        >
                          {activity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <MdInfo className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              Tidak ada sesi ditemukan
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Tidak ada sesi yang sesuai dengan filter yang dipilih.
            </p>
          </div>
        )}
      </Card>

      {/* Session Detail Modal */}
      {selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold text-gray-800">Detail Sesi</h2>
                <button
                  onClick={() => setSelectedSession(null)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <MdClose className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center mb-6">
                <div
                  className={`rounded-xl p-3 ${selectedSession.suspicious
                    ? "bg-red-100"
                    : selectedSession.status === "active"
                      ? "bg-green-100"
                      : "bg-yellow-100"
                    }`}
                >
                  {getDeviceIcon(selectedSession.device)}
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-xl text-gray-800">
                    {selectedSession.user}
                  </h3>
                  <p className="text-gray-600">{selectedSession.role}</p>
                </div>
                <div className="ml-auto">
                  {getStatusIndicator(selectedSession.status, selectedSession.suspicious)}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Informasi Perangkat
                  </h4>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Perangkat</p>
                      <p className="font-medium">{selectedSession.device}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Browser</p>
                      <p className="font-medium">{selectedSession.browser}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Sistem Operasi</p>
                      <p className="font-medium">{selectedSession.os}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Informasi Lokasi
                  </h4>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">IP Address</p>
                      <p className="font-medium">{selectedSession.ip}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Lokasi</p>
                      <p className="font-medium">{selectedSession.location}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Waktu Login</p>
                      <p className="font-medium">{selectedSession.loginTime}</p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedSession.activities && selectedSession.activities.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Aktivitas Terbaru
                  </h4>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <ul className="space-y-3">
                      {selectedSession.activities.map((activity, index) => (
                        <li key={index} className="flex items-start">
                          <span className="bg-indigo-100 p-1 rounded-full mr-2">
                            <MdCheck className="h-4 w-4 text-indigo-600" />
                          </span>
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => {
                    endSession(selectedSession.id);
                    setSelectedSession(null);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-sm"
                >
                  Akhiri Sesi Ini
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionManagement;
