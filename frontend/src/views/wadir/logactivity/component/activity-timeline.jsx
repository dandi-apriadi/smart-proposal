import React, { useState, useEffect } from 'react';
import {
  MdTimeline,
  MdCheck,
  MdWarning,
  MdError,
  MdPerson,
  MdAccessTime,
  MdCalendarToday,
  MdFilterList,
  MdAutorenew
} from 'react-icons/md';
import Card from 'components/card';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ActivityTimeline = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);

  const [timelineFilter, setTimelineFilter] = useState('today');
  const [activities] = useState([
    {
      id: 1,
      date: '20 Dec 2023',
      events: [
        {
          id: 'evt1',
          time: '10:30',
          title: 'Validasi Proposal Pengadaan',
          description: 'Proposal telah divalidasi oleh sistem ML',
          user: 'System ML',
          type: 'success',
          mlScore: 95,
          details: 'Format dan konten sesuai standar'
        },
        {
          id: 'evt2',
          time: '09:15',
          title: 'Review Manual Proposal',
          description: 'Ditinjau oleh validator',
          user: 'Dr. Ahmad',
          type: 'warning',
          mlScore: 78,
          details: 'Memerlukan revisi minor'
        }
      ]
    },
    {
      id: 2,
      date: '19 Dec 2023',
      events: [
        {
          id: 'evt3',
          time: '15:45',
          title: 'Pengajuan Proposal Baru',
          description: 'Proposal Workshop AI',
          user: 'Prof. Sarah',
          type: 'info',
          mlScore: 88,
          details: 'Menunggu validasi final'
        }
      ]
    }
  ]);

  return (
    <Card extra="p-6" data-aos="fade-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Timeline Aktivitas</h2>
          <p className="text-gray-600">Kronologi validasi dan review proposal</p>
        </div>
        <select
          className="px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
          value={timelineFilter}
          onChange={(e) => setTimelineFilter(e.target.value)}
        >
          <option value="today">Hari Ini</option>
          <option value="week">Minggu Ini</option>
          <option value="month">Bulan Ini</option>
        </select>
      </div>

      {/* Timeline */}
      <div className="relative">
        {activities.map((day, dayIndex) => (
          <div key={day.id} className="mb-8" data-aos="fade-up">
            {/* Date Header */}
            <div className="flex items-center gap-2 mb-4">
              <MdCalendarToday className="text-blue-600" />
              <span className="font-medium text-gray-800">{day.date}</span>
            </div>

            {/* Events */}
            <div className="relative ml-4">
              {day.events.map((event, eventIndex) => (
                <div
                  key={event.id}
                  className="relative pl-6 pb-8 last:pb-0"
                >
                  {/* Timeline Line */}
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200" />

                  {/* Timeline Dot */}
                  <div className={`absolute left-[-5px] top-2 h-2.5 w-2.5 rounded-full ${
                    event.type === 'success' ? 'bg-green-500' :
                    event.type === 'warning' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`} />

                  {/* Event Content */}
                  <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-800">{event.title}</h3>
                      <div className={`px-3 py-1 rounded-full text-xs ${
                        event.mlScore >= 90 ? 'bg-green-100 text-green-800' :
                        event.mlScore >= 75 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        ML Score: {event.mlScore}%
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <MdAccessTime className="h-4 w-4" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <MdPerson className="h-4 w-4" />
                        {event.user}
                      </div>
                    </div>
                    {event.details && (
                      <p className="mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded">
                        {event.details}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {activities.length === 0 && (
        <div className="text-center py-12">
          <MdAutorenew className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900">Tidak ada aktivitas</h3>
          <p className="text-gray-500 mt-1">Timeline akan muncul saat ada aktivitas baru</p>
        </div>
      )}
    </Card>
  );
};

export default ActivityTimeline;
