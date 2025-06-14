import React, { useState, useEffect } from 'react';
import {
  MdToday,
  MdSchedule,
  MdAdd,
  MdEdit,
  MdDelete,
  MdAccessTime,
  MdPeople,
  MdCalendarToday
} from 'react-icons/md';
import Card from 'components/card';
import AOS from 'aos';
import 'aos/dist/aos.css';

const JadwalManagement = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  const [schedules] = useState([
    {
      id: 1,
      title: "Validasi Proposal Pengembangan AI Campus",
      date: "2025-04-15",
      time: "09:00",
      duration: "120",
      participants: 18,
      status: "upcoming",
      department: "Teknik Informatika",
      priority: "high"
    },
    {
      id: 2,
      title: "Review Proposal Riset Kolaboratif",
      date: "2025-04-18",
      time: "13:30",
      duration: "90",
      participants: 12,
      status: "upcoming",
      department: "Penelitian",
      priority: "medium"
    },
    {
      id: 3,
      title: "Evaluasi Proposal Pertukaran Mahasiswa",
      date: "2025-03-28",
      time: "14:00",
      duration: "120",
      participants: 10,
      status: "completed",
      department: "Kemahasiswaan",
      priority: "medium"
    },
    {
      id: 4,
      title: "Validasi Alokasi Dana Pengembangan",
      date: "2025-04-10",
      time: "10:00",
      duration: "60",
      participants: 8,
      status: "ongoing",
      department: "Keuangan",
      priority: "high"
    },
    {
      id: 5,
      title: "Rapat Pengembangan Kurikulum",
      date: "2025-04-22",
      time: "13:00",
      duration: "90",
      participants: 14,
      status: "upcoming",
      department: "Akademik",
      priority: "medium"
    },
    {
      id: 6,
      title: "Validasi Anggaran Penelitian",
      date: "2025-04-25",
      time: "10:30",
      duration: "120",
      participants: 9,
      status: "upcoming",
      department: "Penelitian",
      priority: "high"
    }
  ]);

  const [selectedDate, setSelectedDate] = useState(new Date("2025-04-15"));
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentMonth, setCurrentMonth] = useState(new Date("2025-04-01"));

  // Calendar data generation
  const generateCalendarData = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    // First day of the month (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Last day of the month (28-31)
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

    // Last day of previous month
    const lastDayOfPrevMonth = new Date(year, month, 0).getDate();

    const days = [];

    // Add days from previous month
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, lastDayOfPrevMonth - i),
        isCurrentMonth: false,
        isSelected: false,
        hasEvent: false
      });
    }

    // Add days from current month
    const eventDates = schedules.map(schedule => schedule.date.substring(8, 10));

    for (let i = 1; i <= lastDayOfMonth; i++) {
      const currentDate = new Date(year, month, i);
      const dayString = i.toString().padStart(2, '0');
      const formattedDate = `${year}-${(month + 1).toString().padStart(2, '0')}-${dayString}`;

      days.push({
        date: currentDate,
        isCurrentMonth: true,
        isSelected: i === selectedDate.getDate() &&
          month === selectedDate.getMonth() &&
          year === selectedDate.getFullYear(),
        hasEvent: schedules.some(schedule => schedule.date === formattedDate)
      });
    }

    // Add days from next month to complete calendar grid (42 days total for 6 weeks)
    const daysNeeded = 42 - days.length;
    for (let i = 1; i <= daysNeeded; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        isSelected: false,
        hasEvent: false
      });
    }

    return days;
  };

  const calendarDays = generateCalendarData(currentMonth);
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  const goToPrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const selectDate = (date) => {
    setSelectedDate(date);
    // You could also filter schedules for the selected date here
  };

  const getEventCountForDate = (date) => {
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return schedules.filter(schedule => schedule.date === formattedDate).length;
  };

  const filteredSchedules = schedules.filter(schedule =>
    filterStatus === "all" || schedule.status === filterStatus
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'upcoming': return 'Akan Datang';
      case 'ongoing': return 'Sedang Berlangsung';
      case 'completed': return 'Selesai';
      default: return status;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-700 border border-red-200';
      case 'medium': return 'bg-orange-50 text-orange-700 border border-orange-200';
      case 'low': return 'bg-blue-50 text-blue-700 border border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-6 shadow-lg text-white" data-aos="fade-down">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Manajemen Jadwal</h1>
            <p className="opacity-90">Kelola jadwal sesi validasi proposal semester genap 2025</p>
          </div>
          <button className="px-5 py-2.5 bg-white text-indigo-700 rounded-lg hover:bg-indigo-50 transition-all flex items-center gap-2 font-medium shadow-sm">
            <MdAdd className="h-5 w-5" />
            Tambah Jadwal
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <Card extra="p-6" data-aos="fade-right">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">Kalender</h2>
            <div className="flex items-center space-x-2">
              <button onClick={goToPrevMonth} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-sm font-medium">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </span>
              <button onClick={goToNextMonth} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            {/* Days of week headers */}
            <div className="grid grid-cols-7 border-b">
              {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day, index) => (
                <div key={index} className="py-2 text-center text-xs font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1 p-2">
              {calendarDays.map((day, index) => {
                const eventCount = getEventCountForDate(day.date);
                return (
                  <div
                    key={index}
                    onClick={() => selectDate(day.date)}
                    className={`
                      relative h-10 flex flex-col items-center justify-center rounded-lg cursor-pointer
                      ${!day.isCurrentMonth ? 'text-gray-400' : 'text-gray-800'}
                      ${day.isSelected ? 'bg-indigo-600 text-white' : day.hasEvent ? 'bg-indigo-100' : 'hover:bg-gray-100'}
                    `}
                  >
                    <span className={`text-sm ${day.isSelected ? 'font-bold' : ''}`}>
                      {day.date.getDate()}
                    </span>
                    {eventCount > 0 && !day.isSelected && (
                      <div className="absolute bottom-1 w-4 h-1 rounded-full bg-indigo-500"></div>
                    )}
                    {eventCount > 0 && day.isSelected && (
                      <div className="absolute bottom-1 w-4 h-1 rounded-full bg-white"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Today's Events Summary */}
          {selectedDate && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h3 className="text-sm font-bold text-gray-700 mb-2">
                {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
              </h3>

              {(() => {
                const formattedSelectedDate = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, '0')}-${selectedDate.getDate().toString().padStart(2, '0')}`;
                const dayEvents = schedules.filter(schedule => schedule.date === formattedSelectedDate);

                if (dayEvents.length === 0) {
                  return (
                    <p className="text-sm text-gray-500">Tidak ada jadwal untuk hari ini</p>
                  );
                }

                return dayEvents.map(event => (
                  <div key={event.id} className="p-2 my-1 bg-indigo-50 rounded-lg border border-indigo-100">
                    <p className="text-xs font-medium text-gray-800">{event.title}</p>
                    <div className="flex justify-between items-center mt-1 text-xs text-gray-600">
                      <span>{event.time}</span>
                      <span className={`px-1.5 py-0.5 rounded text-xs ${getStatusColor(event.status)}`}>
                        {getStatusText(event.status)}
                      </span>
                    </div>
                  </div>
                ));
              })()}
            </div>
          )}
        </Card>

        {/* Schedule List */}
        <div className="lg:col-span-2 space-y-4" data-aos="fade-left">
          <Card extra="p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Jadwal Sesi</h2>
            <div className="space-y-4">
              {filteredSchedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className="p-4 bg-white border rounded-lg hover:shadow-md transition-all"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-800">{schedule.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(schedule.status)}`}>
                          {getStatusText(schedule.status)}
                        </span>
                      </div>
                      <div className="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MdAccessTime className="h-4 w-4" />
                          {schedule.time} ({schedule.duration} min)
                        </div>
                        <div className="flex items-center gap-1">
                          <MdPeople className="h-4 w-4" />
                          {schedule.participants} peserta
                        </div>
                        <div className="flex items-center gap-1">
                          <MdToday className="h-4 w-4" />
                          {schedule.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-blue-600">
                        <MdEdit className="h-5 w-5" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-red-600">
                        <MdDelete className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className={`mt-2 rounded-lg p-2 text-xs ${getPriorityBadge(schedule.priority)}`}>
                    {schedule.priority.charAt(0).toUpperCase() + schedule.priority.slice(1)} Priority
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card extra="p-6" data-aos="fade-up">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Aksi Cepat</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-all flex items-center gap-3">
                <MdSchedule className="h-6 w-6 text-purple-600" />
                <span className="text-purple-800">Jadwalkan Sesi Baru</span>
              </button>
              <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all flex items-center gap-3">
                <MdToday className="h-6 w-6 text-blue-600" />
                <span className="text-blue-800">Lihat Semua Jadwal</span>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JadwalManagement;
