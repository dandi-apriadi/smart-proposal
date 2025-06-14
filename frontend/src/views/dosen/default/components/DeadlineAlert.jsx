import React, { useState, useEffect } from "react";
import {
    MdAccessTime,
    MdWarning,
    MdErrorOutline,
    MdCheckCircle,
    MdClose,
    MdChevronRight,
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const DeadlineAlert = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    // Dummy data based on database structure
    const [deadlines, setDeadlines] = useState([
        {
            id: 1,
            title: "Proposal Submission",
            description: "Deadline for submitting your research proposal",
            date: new Date("2025-05-15T23:59:59Z"),
            type: "proposal",
            dismissed: false,
        },
        {
            id: 2,
            title: "Progress Report",
            description: "Submit your mid-term progress report",
            date: new Date("2025-08-15T23:59:59Z"),
            type: "progress",
            dismissed: false,
        },
        {
            id: 3,
            title: "Final Report",
            description: "Final research report submission deadline",
            date: new Date("2025-10-15T23:59:59Z"),
            type: "final",
            dismissed: false,
        },
    ]);

    // Calculate days remaining
    const calculateDaysRemaining = (deadlineDate) => {
        const today = new Date();
        const diffTime = deadlineDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    // Determine urgency level
    const getUrgencyLevel = (daysRemaining) => {
        if (daysRemaining < 0) return "overdue";
        if (daysRemaining <= 3) return "critical";
        if (daysRemaining <= 7) return "urgent";
        if (daysRemaining <= 14) return "approaching";
        return "normal";
    };

    // Dismiss a deadline alert
    const dismissAlert = (id) => {
        setDeadlines(deadlines.map(deadline =>
            deadline.id === id ? { ...deadline, dismissed: true } : deadline
        ));
    };

    // Get icon based on urgency
    const getIcon = (urgency) => {
        switch (urgency) {
            case "overdue":
                return <MdErrorOutline className="text-2xl text-red-600" />;
            case "critical":
                return <MdWarning className="text-2xl text-orange-500" />;
            case "urgent":
                return <MdWarning className="text-2xl text-amber-400" />;
            case "approaching":
                return <MdAccessTime className="text-2xl text-blue-500" />;
            default:
                return <MdAccessTime className="text-2xl text-green-500" />;
        }
    };

    // Get background color based on urgency
    const getBackgroundColor = (urgency) => {
        switch (urgency) {
            case "overdue":
                return "bg-red-50 border-l-4 border-red-500";
            case "critical":
                return "bg-orange-50 border-l-4 border-orange-500";
            case "urgent":
                return "bg-amber-50 border-l-4 border-amber-400";
            case "approaching":
                return "bg-blue-50 border-l-4 border-blue-500";
            default:
                return "bg-green-50 border-l-4 border-green-500";
        }
    };

    // Format date for display
    const formatDate = (date) => {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    // Filter out dismissed alerts
    const activeDeadlines = deadlines.filter(deadline => !deadline.dismissed);

    return (
        <div className="w-full rounded-xl shadow-md bg-white p-5 mb-5">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">Deadline Alerts</h2>
                <span className="text-sm text-gray-500">{activeDeadlines.length} active alerts</span>
            </div>

            {activeDeadlines.length === 0 ? (
                <div
                    className="flex flex-col items-center justify-center p-6 text-center text-gray-500"
                    data-aos="fade-up"
                >
                    <MdCheckCircle className="text-4xl text-green-500 mb-2" />
                    <p>You're all caught up! No upcoming deadlines.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {activeDeadlines.map((deadline) => {
                        const daysRemaining = calculateDaysRemaining(deadline.date);
                        const urgency = getUrgencyLevel(daysRemaining);
                        const bgColor = getBackgroundColor(urgency);

                        return (
                            <div
                                key={deadline.id}
                                className={`rounded-lg p-4 relative transition-all duration-200 hover:shadow-md ${bgColor}`}
                                data-aos="fade-up"
                                data-aos-delay={deadline.id * 100}
                            >
                                <button
                                    onClick={() => dismissAlert(deadline.id)}
                                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                                    aria-label="Dismiss alert"
                                >
                                    <MdClose />
                                </button>

                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 mt-1">
                                        {getIcon(urgency)}
                                    </div>

                                    <div className="flex-grow">
                                        <h3 className="font-semibold text-gray-800">{deadline.title}</h3>
                                        <p className="text-sm text-gray-600 mb-1">{deadline.description}</p>

                                        <div className="flex justify-between items-center mt-2">
                                            <span className="text-xs font-medium">
                                                Due: {formatDate(deadline.date)}
                                            </span>

                                            <span className={`text-xs px-2 py-1 rounded-full ${urgency === "overdue" ? "bg-red-200 text-red-800" :
                                                urgency === "critical" ? "bg-orange-200 text-orange-800" :
                                                    urgency === "urgent" ? "bg-amber-200 text-amber-800" :
                                                        urgency === "approaching" ? "bg-blue-200 text-blue-800" :
                                                            "bg-green-200 text-green-800"
                                                }`}>
                                                {daysRemaining < 0
                                                    ? "Overdue"
                                                    : daysRemaining === 0
                                                        ? "Due today"
                                                        : daysRemaining === 1
                                                            ? "1 day left"
                                                            : `${daysRemaining} days left`
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className="flex items-center text-xs font-medium mt-2 text-indigo-600 hover:text-indigo-800 transition-colors"
                                >
                                    View details <MdChevronRight className="ml-1" />
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}

            {activeDeadlines.length > 0 && (
                <div className="mt-3 flex justify-end">
                    <button
                        className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                    >
                        View all deadlines <MdChevronRight className="ml-1" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default DeadlineAlert;
