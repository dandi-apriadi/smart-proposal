import React, { useState } from "react";
import {
    MdOutlineFileUpload,
    MdOutlineAssignment,
    MdOutlineFactCheck,
    MdOutlineDescription,
    MdOutlineTaskAlt,
    MdOutlineHourglassTop,
    MdOutlineMoreTime,
    MdOutlineCalendarToday,
    MdInfoOutline,
    MdOutlineWarning,
} from "react-icons/md";
import Card from "components/card";

const SessionTimeline = () => {
    // Dummy data for timeline stages
    const [timelineStages, setTimelineStages] = useState([
        {
            id: 1,
            title: "Submission Open",
            date: "10 May 2025",
            dueDate: "10 May 2025",
            description: "Proposal submission window opens",
            icon: <MdOutlineFileUpload className="text-white text-xl" />,
            status: "completed", // completed, current, upcoming, delayed
        },
        {
            id: 2,
            title: "Submission Deadline",
            date: "25 May 2025",
            dueDate: "25 May 2025",
            description: "Last day to submit proposals",
            icon: <MdOutlineHourglassTop className="text-white text-xl" />,
            status: "completed",
        },
        {
            id: 3,
            title: "Eligibility Review",
            date: "26 May - 5 Jun 2025",
            dueDate: "5 Jun 2025",
            description: "Preliminary review of proposal eligibility",
            icon: <MdOutlineFactCheck className="text-white text-xl" />,
            status: "current",
        },
        {
            id: 4,
            title: "Progress Report",
            date: "20 Jun 2025",
            dueDate: "20 Jun 2025",
            description: "Submit interim progress report",
            icon: <MdOutlineDescription className="text-white text-xl" />,
            status: "upcoming",
        },
        {
            id: 5,
            title: "Final Report",
            date: "15 Jul 2025",
            dueDate: "15 Jul 2025",
            description: "Submit final report and deliverables",
            icon: <MdOutlineTaskAlt className="text-white text-xl" />,
            status: "upcoming",
        },
    ]);

    // Active session information
    const activeSession = {
        name: "Research Proposal Session 2025",
        startDate: "10 May 2025",
        endDate: "30 Jul 2025",
        status: "active",
        description: "Annual research proposal submission for faculty members.",
        note: "Only one proposal can be active per session."
    };

    // Get status color based on stage status
    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
                return "bg-green-500";
            case "current":
                return "bg-blue-500";
            case "upcoming":
                return "bg-gray-400";
            case "delayed":
                return "bg-yellow-500";
            default:
                return "bg-gray-400";
        }
    };

    // Get status text based on stage status
    const getStatusText = (status) => {
        switch (status) {
            case "completed":
                return "Completed";
            case "current":
                return "In Progress";
            case "upcoming":
                return "Upcoming";
            case "delayed":
                return "Delayed";
            default:
                return "Pending";
        }
    };

    // For mobile view, show selected stage details
    const [selectedStage, setSelectedStage] = useState(null);

    return (
        <Card extra="w-full h-full p-4" data-aos="fade-up">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                        Session Timeline
                    </h4>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {activeSession.name}
                    </p>
                </div>
                <div className="flex items-center bg-gray-50 dark:bg-navy-800 rounded-lg px-3 py-1">
                    <MdOutlineCalendarToday className="mr-1 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {activeSession.startDate} - {activeSession.endDate}
                    </span>
                </div>
            </div>

            {/* Legend */}
            <div className="mb-4 flex flex-wrap gap-3" data-aos="fade-up" data-aos-delay="100">
                <div className="flex items-center">
                    <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Completed</span>
                </div>
                <div className="flex items-center">
                    <div className="mr-2 h-3 w-3 rounded-full bg-blue-500"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">In Progress</span>
                </div>
                <div className="flex items-center">
                    <div className="mr-2 h-3 w-3 rounded-full bg-gray-400"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Upcoming</span>
                </div>
                <div className="flex items-center">
                    <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500"></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Delayed</span>
                </div>
            </div>

            {/* Desktop Timeline View */}
            <div className="hidden md:block">
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-5 top-0 h-full w-1 bg-gray-200 dark:bg-navy-700"></div>

                    {/* Timeline stages */}
                    <div className="timeline-container">
                        {timelineStages.map((stage, index) => (
                            <div
                                key={stage.id}
                                className="relative mb-8 ml-5 pl-8"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                {/* Timeline dot */}
                                <div
                                    className={`absolute -left-5 flex h-10 w-10 items-center justify-center rounded-full ${getStatusColor(
                                        stage.status
                                    )} shadow-lg transition-transform duration-300 hover:scale-110`}
                                >
                                    {stage.icon}
                                </div>

                                {/* Content */}
                                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-all duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-navy-800">
                                    <div className="mb-2 flex items-center justify-between">
                                        <h5 className="text-lg font-bold text-navy-700 dark:text-white">
                                            {stage.title}
                                        </h5>
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium text-white ${getStatusColor(
                                                stage.status
                                            )}`}
                                        >
                                            {getStatusText(stage.status)}
                                        </span>
                                    </div>
                                    <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">
                                        {stage.description}
                                    </p>
                                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                        <MdOutlineCalendarToday className="mr-1" />
                                        {stage.date}
                                    </div>
                                    {stage.status === "current" && (
                                        <div className="mt-2 flex items-center text-xs text-blue-500">
                                            <MdOutlineMoreTime className="mr-1" />
                                            Due: {stage.dueDate}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile Timeline View */}
            <div className="block md:hidden">
                <div className="mb-4 flex overflow-x-auto pb-2" data-aos="fade-up" data-aos-delay="100">
                    {timelineStages.map((stage, index) => (
                        <div
                            key={stage.id}
                            className={`mr-2 flex min-w-[100px] flex-col items-center rounded-lg p-3 transition-all ${selectedStage === stage.id
                                    ? "bg-gray-100 dark:bg-navy-900"
                                    : ""
                                }`}
                            onClick={() => setSelectedStage(stage.id)}
                        >
                            <div
                                className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full ${getStatusColor(
                                    stage.status
                                )}`}
                            >
                                {stage.icon}
                            </div>
                            <p className="text-center text-xs font-medium dark:text-white">{stage.title}</p>
                            <span className="text-center text-xs text-gray-500 dark:text-gray-400">
                                {stage.date.split(" - ")[0]}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Selected stage details */}
                {selectedStage && (
                    <div
                        className="mt-4 rounded-lg border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-navy-800"
                        data-aos="fade-up"
                        data-aos-delay="200"
                    >
                        {timelineStages
                            .filter((stage) => stage.id === selectedStage)
                            .map((stage) => (
                                <div key={stage.id}>
                                    <div className="mb-2 flex items-center justify-between">
                                        <h5 className="text-lg font-bold text-navy-700 dark:text-white">
                                            {stage.title}
                                        </h5>
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium text-white ${getStatusColor(
                                                stage.status
                                            )}`}
                                        >
                                            {getStatusText(stage.status)}
                                        </span>
                                    </div>
                                    <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">
                                        {stage.description}
                                    </p>
                                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                        <MdOutlineCalendarToday className="mr-1" />
                                        {stage.date}
                                    </div>
                                    {stage.status === "current" && (
                                        <div className="mt-2 flex items-center text-xs text-blue-500">
                                            <MdOutlineMoreTime className="mr-1" />
                                            Due: {stage.dueDate}
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>
                )}
            </div>

            {/* Session Info Card */}
            <div
                className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-navy-900"
                data-aos="fade-up"
                data-aos-delay="300"
            >
                <div className="flex items-start">
                    <MdInfoOutline className="mr-2 mt-1 text-blue-500" />
                    <div>
                        <h6 className="text-sm font-bold text-navy-700 dark:text-white">
                            Session Information
                        </h6>
                        <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                            {activeSession.description}
                        </p>
                        <div className="mt-2 flex items-center text-xs text-orange-500">
                            <MdOutlineWarning className="mr-1" />
                            <span>{activeSession.note}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default SessionTimeline;
