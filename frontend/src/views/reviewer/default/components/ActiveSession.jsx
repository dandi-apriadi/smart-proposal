import React, { useState, useEffect } from 'react';
import { MdAssignment, MdSchedule, MdOutlineWarning, MdOutlineCheckCircle, MdTimeline, MdCalendarToday, MdAccessTime, MdPerson, MdArrowForward } from 'react-icons/md';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const ActiveSession = () => {
    const navigate = useNavigate();
    const [activeSession, setActiveSession] = useState({
        id: 'S2025-001',
        name: 'Penelitian Internal Semester Ganjil 2025',
        status: 'Active',
        startDate: '15 April 2025',
        endDate: '30 June 2025',
        currentPhase: 'Review Process',
        phaseEndDate: '10 May 2025',
        progress: 65,
        totalProposals: 42,
        assignedToMe: 12,
        reviewedByMe: 8,
        pendingReview: 4,
        urgentReviews: 2,
        activity: [
            { date: '1 May', count: 5 },
            { date: '2 May', count: 7 },
            { date: '3 May', count: 4 },
            { date: '4 May', count: 9 },
            { date: '5 May', count: 11 },
            { date: '6 May', count: 8 },
            { date: '7 May', count: 10 },
        ],
        timeline: [
            { phase: 'Submission', status: 'completed', date: '15 Apr - 30 Apr' },
            { phase: 'Review', status: 'current', date: '1 May - 10 May' },
            { phase: 'Revisions', status: 'upcoming', date: '11 May - 25 May' },
            { phase: 'Final Approval', status: 'upcoming', date: '26 May - 10 Jun' },
            { phase: 'Implementation', status: 'upcoming', date: '11 Jun - 30 Jun' },
        ]
    });

    // Time remaining calculation
    const [timeRemaining, setTimeRemaining] = useState({
        days: 0,
        hours: 0,
        minutes: 0
    });

    useEffect(() => {
        // Calculate time remaining (dummy calculation for demo)
        setTimeRemaining({
            days: 3,
            hours: 14,
            minutes: 35
        });
    }, []);

    return (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            {/* Session Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <div className="flex items-center">
                        <h2 className="text-2xl font-bold text-gray-800">{activeSession.name}</h2>
                        <span className="ml-3 px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                            {activeSession.status}
                        </span>
                    </div>
                    <p className="text-gray-600 mt-1">ID: {activeSession.id}</p>
                </div>

                <div className="mt-4 md:mt-0 flex items-center">
                    <MdCalendarToday className="text-gray-500 mr-2" />
                    <span className="text-gray-700">{activeSession.startDate} - {activeSession.endDate}</span>
                </div>
            </div>

            {/* Current Phase Banner */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-semibold text-blue-800">Current Phase: {activeSession.currentPhase}</h3>
                    <p className="text-blue-600">Ends on {activeSession.phaseEndDate}</p>
                </div>
                <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                    <MdAccessTime className="text-orange-500 mr-2" />
                    <div>
                        <p className="text-sm text-gray-500">Time Remaining:</p>
                        <p className="font-bold text-gray-800">{timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m</p>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Total Proposals</p>
                            <h4 className="text-2xl font-bold text-gray-800">{activeSession.totalProposals}</h4>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-full">
                            <MdAssignment className="text-blue-600 text-xl" />
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Assigned to Me</p>
                            <h4 className="text-2xl font-bold text-gray-800">{activeSession.assignedToMe}</h4>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-full">
                            <MdPerson className="text-purple-600 text-xl" />
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Reviewed</p>
                            <h4 className="text-2xl font-bold text-gray-800">{activeSession.reviewedByMe}</h4>
                        </div>
                        <div className="bg-green-100 p-3 rounded-full">
                            <MdOutlineCheckCircle className="text-green-600 text-xl" />
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Pending Review</p>
                            <h4 className="text-2xl font-bold text-gray-800">{activeSession.pendingReview}</h4>
                            {activeSession.urgentReviews > 0 && (
                                <div className="flex items-center mt-1 text-orange-500 text-sm">
                                    <MdOutlineWarning className="mr-1" />
                                    <span>{activeSession.urgentReviews} urgent</span>
                                </div>
                            )}
                        </div>
                        <div className="bg-orange-100 p-3 rounded-full">
                            <MdSchedule className="text-orange-600 text-xl" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress and Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 mb-6">
                {/* Overall Progress */}
                <div className="lg:col-span-2 bg-gray-50 p-4 rounded-lg flex flex-col items-center justify-center">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Overall Progress</h3>
                    <div className="w-32 h-32">
                        <CircularProgressbar
                            value={activeSession.progress}
                            text={`${activeSession.progress}%`}
                            styles={buildStyles({
                                textSize: '16px',
                                pathColor: '#4f46e5',
                                textColor: '#4f46e5',
                                trailColor: '#e0e0e0',
                            })}
                        />
                    </div>
                    <p className="text-sm text-gray-600 mt-4">Session is on track</p>
                </div>

                {/* Activity Chart */}
                <div className="lg:col-span-5 bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Review Activity</h3>
                    <div className="h-60">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={activeSession.activity}>
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="count" stroke="#4f46e5" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Timeline Section */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                    <MdTimeline className="mr-2 text-indigo-600" />
                    Session Timeline
                </h3>
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>

                    {/* Timeline items */}
                    <div className="space-y-6 pl-12 relative">
                        {activeSession.timeline.map((item, index) => (
                            <div key={index} className="relative">
                                {/* Timeline dot */}
                                <div className={`absolute -left-12 mt-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${item.status === 'completed' ? 'bg-green-500 border-green-600' :
                                        item.status === 'current' ? 'bg-blue-500 border-blue-600 animate-pulse' :
                                            'bg-white border-gray-300'}`}>
                                    {item.status === 'completed' && <MdOutlineCheckCircle className="text-white text-xs" />}
                                </div>

                                {/* Content */}
                                <div className={`p-3 rounded-lg
                  ${item.status === 'completed' ? 'bg-green-50' :
                                        item.status === 'current' ? 'bg-blue-50 border-2 border-blue-200' :
                                            'bg-gray-50'}`}>
                                    <div className="flex justify-between items-center">
                                        <h4 className={`font-medium
                      ${item.status === 'completed' ? 'text-green-700' :
                                                item.status === 'current' ? 'text-blue-700' :
                                                    'text-gray-700'}`}>
                                            {item.phase}
                                        </h4>
                                        <span className="text-sm text-gray-500">{item.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 justify-end">
                <button
                    onClick={() => navigate('/reviewer/assigned-proposals')}
                    className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    View My Assigned Proposals
                    <MdArrowForward className="ml-2" />
                </button>

                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Session Details
                </button>
            </div>
        </div>
    );
};

export default ActiveSession;
