import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  MdAssignment,
  MdTimeline,
  MdNotifications,
  MdHistory,
  MdWarning,
  MdEvent,
  MdCheckCircle,
  MdHourglassEmpty,
  MdCancel,
  MdAccessTime
} from "react-icons/md";
import Card from "components/card";
import AOS from "aos";
import "aos/dist/aos.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [date, setDate] = useState(new Date());

  // Mock data - in real implementation, this would come from Redux/API
  const [proposalData, setProposalData] = useState({
    active: 1,
    draft: 2,
    completed: 5,
    rejected: 1
  });

  const [activities, setActivities] = useState([
    { id: 1, action: "Proposal disetujui", date: "2025-04-15 09:30", status: "success" },
    { id: 2, action: "Feedback diterima dari reviewer", date: "2025-04-13 14:20", status: "info" },
    { id: 3, action: "Laporan kemajuan diunggah", date: "2025-04-10 11:45", status: "success" },
    { id: 4, action: "Revisi proposal diminta", date: "2025-04-08 16:30", status: "warning" },
    { id: 5, action: "Proposal baru diajukan", date: "2025-04-05 10:15", status: "success" },
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, message: "Tenggat laporan kemajuan 5 hari lagi", type: "deadline", date: "2025-04-20" },
    { id: 2, message: "Feedback baru untuk proposal 'Analisis Machine Learning'", type: "feedback", date: "2025-04-16" },
    { id: 3, message: "Proposal Anda telah disetujui", type: "success", date: "2025-04-15" },
    { id: 4, message: "Sesi pelatihan tentang format proposal akan datang", type: "info", date: "2025-04-25" },
  ]);

  const [tasks, setTasks] = useState([
    { id: 1, title: "Unggah laporan kemajuan", deadline: "2025-04-20", status: "pending" },
    { id: 2, title: "Revisi proposal", deadline: "2025-04-18", status: "in-progress" },
    { id: 3, title: "Meeting dengan Tim Peneliti", deadline: "2025-04-17", status: "pending" },
    { id: 4, title: "Persiapan data untuk ML model", deadline: "2025-04-25", status: "not-started" },
  ]);

  const sessionTimelineData = {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    datasets: [
      {
        label: "Session Timeline",
        data: [0, 30, 60, 80, 65, 30, 100],
        borderColor: "#4318FF",
        backgroundColor: "rgba(67, 24, 255, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const proposalStatusData = {
    labels: ["Aktif", "Draft", "Selesai", "Ditolak"],
    datasets: [
      {
        data: [proposalData.active, proposalData.draft, proposalData.completed, proposalData.rejected],
        backgroundColor: ["#4318FF", "#FFB547", "#05CD99", "#EE5D50"],
        borderWidth: 0,
      },
    ],
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out',
    });
  }, []);

  return (
    <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2">
      {/* Welcome Card - Full Width */}
      <div className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-2" data-aos="fade-down">
        <Card extra="pb-7 p-[20px]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h4 className="text-xl font-bold text-navy-700 dark:text-white mb-1">
                Selamat Datang, {user?.name || "Dosen"}
              </h4>
              <p className="text-base text-gray-600">
                Dashboard Dosen | Sistem Validasi Proposal Pengadaan Kegiatan
              </p>
            </div>
            <div className="mt-4 md:mt-0 bg-navy-700 text-white px-4 py-2 rounded-lg">
              <p className="text-sm">Session Aktif: <span className="font-bold">2025-1</span></p>
              <p className="text-xs mt-1">Tenggat Proposal: 15 Mei 2025</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Proposal Status Tracker */}
      <div className="col-span-1" data-aos="fade-up" data-aos-delay="100">
        <Card extra="pb-7 p-[20px]">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-lg font-bold text-navy-700 dark:text-white">
              <MdAssignment className="inline-block mr-2 text-navy-700 dark:text-white" size={22} />
              Status Proposal
            </h5>
          </div>
          <div className="h-[220px] flex items-center justify-center">
            <Doughnut
              data={proposalStatusData}
              options={{
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      boxWidth: 12,
                      padding: 15
                    }
                  }
                },
                cutout: '70%',
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="flex items-center">
              <MdCheckCircle className="text-[#05CD99] mr-2" size={20} />
              <span className="text-sm">Aktif: {proposalData.active}</span>
            </div>
            <div className="flex items-center">
              <MdHourglassEmpty className="text-[#FFB547] mr-2" size={20} />
              <span className="text-sm">Draft: {proposalData.draft}</span>
            </div>
            <div className="flex items-center">
              <MdCheckCircle className="text-[#4318FF] mr-2" size={20} />
              <span className="text-sm">Selesai: {proposalData.completed}</span>
            </div>
            <div className="flex items-center">
              <MdCancel className="text-[#EE5D50] mr-2" size={20} />
              <span className="text-sm">Ditolak: {proposalData.rejected}</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Session Timeline Visualization */}
      <div className="col-span-1" data-aos="fade-up" data-aos-delay="200">
        <Card extra="pb-7 p-[20px]">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-lg font-bold text-navy-700 dark:text-white">
              <MdTimeline className="inline-block mr-2 text-navy-700 dark:text-white" size={22} />
              Timeline Session
            </h5>
          </div>
          <div className="h-[220px]">
            <Line
              data={sessionTimelineData}
              options={{
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                      display: true,
                      drawBorder: false
                    }
                  },
                  x: {
                    grid: {
                      display: false,
                      drawBorder: false
                    }
                  }
                },
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-1 text-center">
            <div className="p-1 bg-gray-100 rounded-lg">
              <p className="text-xs font-bold">Proposal</p>
              <p className="text-xs text-gray-600">15 Mei</p>
            </div>
            <div className="p-1 bg-gray-100 rounded-lg">
              <p className="text-xs font-bold">Review</p>
              <p className="text-xs text-gray-600">15 Jun</p>
            </div>
            <div className="p-1 bg-gray-100 rounded-lg">
              <p className="text-xs font-bold">Laporan</p>
              <p className="text-xs text-gray-600">15 Agt</p>
            </div>
            <div className="p-1 bg-gray-100 rounded-lg">
              <p className="text-xs font-bold">Final</p>
              <p className="text-xs text-gray-600">15 Okt</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Warning & Deadline Alerts */}
      <div className="col-span-1" data-aos="fade-up" data-aos-delay="300">
        <Card extra="pb-7 p-[20px]">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-lg font-bold text-navy-700 dark:text-white">
              <MdWarning className="inline-block mr-2 text-navy-700 dark:text-white" size={22} />
              Peringatan & Tenggat
            </h5>
          </div>
          <div className="flex flex-col gap-3 h-[280px] overflow-y-auto pr-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg transition-all duration-300 hover:translate-x-1 cursor-pointer
                  ${notification.type === 'deadline' ? 'bg-orange-100 border-l-4 border-orange-500' :
                    notification.type === 'feedback' ? 'bg-blue-100 border-l-4 border-blue-500' :
                      notification.type === 'success' ? 'bg-green-100 border-l-4 border-green-500' :
                        'bg-indigo-100 border-l-4 border-indigo-500'}`}
              >
                <div className="flex justify-between items-start">
                  <p className={`text-sm font-medium
                    ${notification.type === 'deadline' ? 'text-orange-700' :
                      notification.type === 'feedback' ? 'text-blue-700' :
                        notification.type === 'success' ? 'text-green-700' :
                          'text-indigo-700'}`}>
                    {notification.message}
                  </p>
                </div>
                <div className="mt-2 flex items-center">
                  <MdAccessTime className="text-gray-500 mr-1" size={14} />
                  <span className="text-xs text-gray-500">{notification.date}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activities Feed */}
      <div className="col-span-1" data-aos="fade-up" data-aos-delay="400">
        <Card extra="pb-7 p-[20px]">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-lg font-bold text-navy-700 dark:text-white">
              <MdHistory className="inline-block mr-2 text-navy-700 dark:text-white" size={22} />
              Aktivitas Terbaru
            </h5>
          </div>
          <div className="flex flex-col gap-3 h-[280px] overflow-y-auto pr-2">
            {activities.map((activity, index) => (
              <div key={activity.id} className="relative">
                {index !== activities.length - 1 && (
                  <div className="absolute left-[15px] top-6 h-full w-0.5 bg-gray-200 z-0"></div>
                )}
                <div className="flex items-start z-10 relative">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 
                    ${activity.status === 'success' ? 'bg-green-100 text-green-600' :
                      activity.status === 'warning' ? 'bg-orange-100 text-orange-600' :
                        'bg-blue-100 text-blue-600'}`}>
                    {activity.status === 'success' ? (
                      <MdCheckCircle size={18} />
                    ) : activity.status === 'warning' ? (
                      <MdWarning size={18} />
                    ) : (
                      <MdNotifications size={18} />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-navy-700 dark:text-white">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-center">
            <button className="text-sm text-blue-500 font-medium">Lihat Semua Aktivitas</button>
          </div>
        </Card>
      </div>

      {/* Upcoming Tasks Calendar */}
      <div className="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-2" data-aos="fade-up" data-aos-delay="500">
        <Card extra="pb-7 p-[20px]">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-lg font-bold text-navy-700 dark:text-white">
              <MdEvent className="inline-block mr-2 text-navy-700 dark:text-white" size={22} />
              Tugas Mendatang
            </h5>
          </div>
          <div className="mb-4">
            <Calendar
              onChange={setDate}
              value={date}
              className="rounded-lg border-none shadow-none text-sm"
              tileClassName={({ date }) => {
                // Check if this date has a task
                const hasTask = tasks.some(task => {
                  const taskDate = new Date(task.deadline);
                  return (
                    date.getDate() === taskDate.getDate() &&
                    date.getMonth() === taskDate.getMonth() &&
                    date.getFullYear() === taskDate.getFullYear()
                  );
                });
                return hasTask ? 'bg-blue-100 text-blue-800 rounded-circle' : null;
              }}
            />
          </div>
          <div className="mt-3">
            <h6 className="text-sm font-medium text-navy-700 dark:text-white mb-2">Tugas Terdekat:</h6>
            <div className="max-h-[120px] overflow-y-auto">
              {tasks
                .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
                .slice(0, 3)
                .map((task) => (
                  <div key={task.id} className="flex items-center justify-between mb-2 p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className={`h-2 w-2 rounded-full mr-2 
                        ${task.status === 'in-progress' ? 'bg-orange-500' :
                          task.status === 'pending' ? 'bg-blue-500' :
                            'bg-gray-400'}`}>
                      </div>
                      <p className="text-sm text-gray-700">{task.title}</p>
                    </div>
                    <p className="text-xs text-gray-500">{task.deadline}</p>
                  </div>
                ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
