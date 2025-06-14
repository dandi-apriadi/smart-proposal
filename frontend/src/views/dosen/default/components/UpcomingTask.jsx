import React, { useState, useEffect } from "react";
import {
    MdCalendarToday,
    MdAccessTime,
    MdPriorityHigh,
    MdCheck,
    MdWarning,
    MdInfo,
    MdArrowDropDown,
    MdFilterList,
    MdMoreVert,
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const UpcomingTask = () => {
    // Initialize AOS animation
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    // Dummy tasks data
    const [tasks, setTasks] = useState([
        {
            id: 1,
            title: "Submit Research Proposal",
            dueDate: "2025-04-15",
            status: "pending",
            priority: "high",
            category: "proposal",
            description: "Complete and submit the research proposal for AI implementation",
        },
        {
            id: 2,
            title: "Review Student Proposals",
            dueDate: "2025-04-18",
            status: "in-progress",
            priority: "medium",
            category: "review",
            description: "Review and provide feedback on 5 student proposals",
        },
        {
            id: 3,
            title: "Progress Report Submission",
            dueDate: "2025-04-22",
            status: "pending",
            priority: "high",
            category: "report",
            description: "Submit monthly progress report for the current research project",
        },
        {
            id: 4,
            title: "Faculty Meeting",
            dueDate: "2025-04-25",
            status: "pending",
            priority: "low",
            category: "meeting",
            description: "Attend faculty meeting to discuss proposal formats",
        },
        {
            id: 5,
            title: "Revise Rejected Proposal",
            dueDate: "2025-04-30",
            status: "pending",
            priority: "medium",
            category: "proposal",
            description: "Make revisions based on feedback from the committee",
        },
    ]);

    // Filter states
    const [filter, setFilter] = useState("all");
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    // Format date function
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    // Calculate days remaining
    const getDaysRemaining = (dueDate) => {
        const today = new Date();
        const due = new Date(dueDate);
        const diffTime = due - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return 'Overdue';
        if (diffDays === 0) return 'Due today';
        if (diffDays === 1) return '1 day left';
        return `${diffDays} days left`;
    };

    // Get status color
    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'in-progress': return 'bg-blue-100 text-blue-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    // Get priority icon
    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'high': return <MdPriorityHigh className="text-red-500" />;
            case 'medium': return <MdInfo className="text-orange-500" />;
            case 'low': return <MdInfo className="text-green-500" />;
            default: return <MdInfo className="text-gray-500" />;
        }
    };

    // Filter tasks
    const filteredTasks = filter === 'all'
        ? tasks
        : tasks.filter(task => task.priority === filter || task.status === filter || task.category === filter);

    // Toggle task status
    const toggleTaskStatus = (id) => {
        setTasks(
            tasks.map(task =>
                task.id === id
                    ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
                    : task
            )
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-5" data-aos="fade-up">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Upcoming Tasks</h2>

                {/* Filter dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setShowFilterMenu(!showFilterMenu)}
                        className="flex items-center text-sm bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-2 transition-colors duration-200"
                    >
                        <MdFilterList className="mr-1" />
                        Filter
                        <MdArrowDropDown className="ml-1" />
                    </button>

                    {showFilterMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                            <ul className="py-1">
                                <li onClick={() => { setFilter('all'); setShowFilterMenu(false) }}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    All Tasks
                                </li>
                                <li onClick={() => { setFilter('high'); setShowFilterMenu(false) }}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    High Priority
                                </li>
                                <li onClick={() => { setFilter('proposal'); setShowFilterMenu(false) }}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    Proposals
                                </li>
                                <li onClick={() => { setFilter('report'); setShowFilterMenu(false) }}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    Reports
                                </li>
                                <li onClick={() => { setFilter('pending'); setShowFilterMenu(false) }}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    Pending Tasks
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Tasks List */}
            <div className="space-y-4">
                {filteredTasks.length === 0 ? (
                    <div className="text-center py-10 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">No tasks found</p>
                    </div>
                ) : (
                    filteredTasks.map((task) => (
                        <div
                            key={task.id}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 bg-white"
                            data-aos="fade-up"
                            data-aos-delay={task.id * 50}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex items-start space-x-3">
                                    {/* Checkbox for completion */}
                                    <div
                                        onClick={() => toggleTaskStatus(task.id)}
                                        className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center cursor-pointer ${task.status === 'completed' ? 'bg-green-500 text-white' : 'border border-gray-300 hover:border-green-500'
                                            }`}
                                    >
                                        {task.status === 'completed' && <MdCheck size={16} />}
                                    </div>

                                    {/* Task details */}
                                    <div>
                                        <h3 className={`font-medium ${task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                                            {task.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">{task.description}</p>

                                        {/* Tags and dates */}
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            <span className={`inline-flex items-center text-xs px-2.5 py-0.5 rounded-full ${getStatusColor(task.status)}`}>
                                                {task.status}
                                            </span>

                                            <span className="inline-flex items-center text-xs px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
                                                {task.category}
                                            </span>

                                            <span className="inline-flex items-center text-xs text-gray-500">
                                                <MdCalendarToday className="mr-1" size={14} />
                                                {formatDate(task.dueDate)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Priority and deadline */}
                                <div className="flex flex-col items-end">
                                    <div className="flex items-center mb-2">
                                        {getPriorityIcon(task.priority)}
                                        <span className="text-xs ml-1">{task.priority}</span>
                                    </div>

                                    <span className={`text-xs flex items-center ${getDaysRemaining(task.dueDate) === 'Overdue' ? 'text-red-500' :
                                        getDaysRemaining(task.dueDate) === 'Due today' ? 'text-orange-500' : 'text-gray-500'
                                        }`}>
                                        <MdAccessTime className="mr-1" size={14} />
                                        {getDaysRemaining(task.dueDate)}
                                    </span>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className={`pt-3 mt-3 border-t border-gray-100 flex justify-end ${task.status === 'completed' ? 'opacity-50' : ''}`}>
                                <button className="text-xs text-blue-600 hover:text-blue-800 mr-3">Edit</button>
                                <button className="text-xs text-gray-600 hover:text-gray-800">Details</button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Footer with pagination/view all */}
            <div className="mt-6 flex justify-center">
                <button className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-sm transition-colors duration-200">
                    View All Tasks
                </button>
            </div>
        </div>
    );
};

export default UpcomingTask;
