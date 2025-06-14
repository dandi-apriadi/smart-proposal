import React, { useState, useEffect } from "react";
import {
    MdInbox,
    MdSend,
    MdDelete,
    MdSearch,
    MdNotifications,
    MdRefresh,
    MdFilterList,
    MdEmail,
    MdPerson,
    MdPeople,
    MdWarning,
    MdInfo,
    MdError,
    MdCheckCircle,
    MdStar,
    MdStarBorder,
    MdAttachFile,
    MdClose,
    MdArchive,
    MdReply,
    MdForward,
    MdAdd,
    MdMoreVert,
    MdMarkEmailRead,
    MdMarkEmailUnread
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
import Card from "components/card";

// Dummy data for demonstration
const dummyMessages = [
    {
        id: 1,
        from: {
            id: "USR001",
            name: "Dr. Ahmad",
            avatar: "/img/avatars/avatar1.png",
            role: "Professor"
        },
        to: [
            {
                id: "ADM001",
                name: "Admin",
                role: "System Administrator"
            }
        ],
        subject: "Proposal Upload Issue",
        content: "I'm having trouble uploading my proposal to the system. The upload process keeps failing at 80%. Could you please look into this issue? I need to submit before the deadline tomorrow.",
        date: "2025-04-15T14:30:00",
        isRead: false,
        isStarred: true,
        hasAttachments: true,
        attachments: [
            { name: "Error_Screenshot.png", size: "1.2 MB", type: "image/png" }
        ],
        labels: ["urgent", "technical"],
        type: "direct",
        status: "unresolved"
    },
    {
        id: 2,
        from: {
            id: "SYS001",
            name: "System Notification",
            avatar: "/img/system-logo.png",
            role: "Automated Alert"
        },
        to: [
            {
                id: "ADM001",
                name: "Admin",
                role: "System Administrator"
            }
        ],
        subject: "Database Backup Completed",
        content: "The daily database backup has been completed successfully. All proposal data has been securely stored in the backup server.",
        date: "2025-04-15T03:00:00",
        isRead: true,
        isStarred: false,
        hasAttachments: false,
        attachments: [],
        labels: ["system", "automated"],
        type: "system",
        status: "completed"
    },
    {
        id: 3,
        from: {
            id: "USR045",
            name: "Prof. Susan",
            avatar: "/img/avatars/avatar3.png",
            role: "Department Head"
        },
        to: [
            {
                id: "ADM001",
                name: "Admin",
                role: "System Administrator"
            }
        ],
        subject: "Need Access for New Reviewers",
        content: "We have five new faculty members who will be serving as reviewers for the upcoming proposal session. I need to get them access to the system as soon as possible. Their details are attached in the spreadsheet.",
        date: "2025-04-14T10:15:00",
        isRead: true,
        isStarred: true,
        hasAttachments: true,
        attachments: [
            { name: "New_Reviewers.xlsx", size: "45 KB", type: "application/xlsx" }
        ],
        labels: ["access", "important"],
        type: "direct",
        status: "pending"
    },
    {
        id: 4,
        from: {
            id: "SYS001",
            name: "System Warning",
            avatar: "/img/system-logo.png",
            role: "Automated Alert"
        },
        to: [
            {
                id: "ADM001",
                name: "Admin",
                role: "System Administrator"
            }
        ],
        subject: "High Server Load Detected",
        content: "The system has detected unusually high server load in the past hour. This might affect system performance. Please check the server monitoring panel for more details.",
        date: "2025-04-14T08:30:00",
        isRead: false,
        isStarred: false,
        hasAttachments: false,
        attachments: [],
        labels: ["warning", "system"],
        type: "alert",
        status: "unresolved"
    },
    {
        id: 5,
        from: {
            id: "USR112",
            name: "Reviewer Kim",
            avatar: "/img/avatars/avatar5.png",
            role: "Reviewer"
        },
        to: [
            {
                id: "ADM001",
                name: "Admin",
                role: "System Administrator"
            }
        ],
        subject: "Review Dashboard Navigation Issues",
        content: "I've noticed that the navigation in the review dashboard is confusing. The proposal sorting doesn't work correctly, and I can't find where to submit my completed reviews easily. Could you please provide some guidance or consider improving the UI?",
        date: "2025-04-13T15:45:00",
        isRead: true,
        isStarred: false,
        hasAttachments: false,
        attachments: [],
        labels: ["ui", "feedback"],
        type: "direct",
        status: "pending"
    },
    {
        id: 6,
        from: {
            id: "USR078",
            name: "Dr. Carlos",
            avatar: "/img/avatars/avatar6.png",
            role: "Professor"
        },
        to: [
            {
                id: "ADM001",
                name: "Admin",
                role: "System Administrator"
            }
        ],
        subject: "Account Password Reset",
        content: "I've forgotten my password and need a reset. I tried using the forgot password function, but I'm not receiving the reset email. Could you please help me reset my account password manually?",
        date: "2025-04-13T11:20:00",
        isRead: true,
        isStarred: false,
        hasAttachments: false,
        attachments: [],
        labels: ["account", "support"],
        type: "direct",
        status: "resolved"
    },
    {
        id: 7,
        from: {
            id: "SYS001",
            name: "Session Notification",
            avatar: "/img/system-logo.png",
            role: "Automated Alert"
        },
        to: [
            {
                id: "ADM001",
                name: "Admin",
                role: "System Administrator"
            }
        ],
        subject: "New Proposal Session Starting Tomorrow",
        content: "This is a reminder that the Spring 2025 Proposal Session will be starting tomorrow at 8:00 AM. All system checks have been completed, and the platform is ready for submissions.",
        date: "2025-04-12T09:00:00",
        isRead: true,
        isStarred: true,
        hasAttachments: false,
        attachments: [],
        labels: ["session", "important"],
        type: "system",
        status: "completed"
    },
    {
        id: 8,
        from: {
            id: "USR132",
            name: "Dean Roberts",
            avatar: "/img/avatars/avatar8.png",
            role: "Dean"
        },
        to: [
            {
                id: "ADM001",
                name: "Admin",
                role: "System Administrator"
            }
        ],
        subject: "Requesting Export of All Proposal Data",
        content: "For our upcoming accreditation review, I need a comprehensive export of all proposal data from the past three years. Can you generate this report for me in Excel format? We need detailed statistics on submissions, approvals, and rejections by department.",
        date: "2025-04-11T16:10:00",
        isRead: false,
        isStarred: true,
        hasAttachments: false,
        attachments: [],
        labels: ["data", "important"],
        type: "direct",
        status: "pending"
    }
];

const MessageCenter = () => {
    const [messages, setMessages] = useState(dummyMessages);
    const [filteredMessages, setFilteredMessages] = useState(dummyMessages);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [showMessageDetail, setShowMessageDetail] = useState(false);
    const [showComposeModal, setShowComposeModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [selectedStatus, setSelectedStatus] = useState("all");

    // For compose modal
    const [composeData, setComposeData] = useState({
        to: "",
        subject: "",
        message: "",
        attachments: []
    });

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    useEffect(() => {
        // Filter messages based on selected filters and search term
        let result = [...messages];

        if (searchTerm) {
            result = result.filter(
                (message) =>
                    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    message.from.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    message.content.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedFilter !== "all") {
            switch (selectedFilter) {
                case "unread":
                    result = result.filter((message) => !message.isRead);
                    break;
                case "starred":
                    result = result.filter((message) => message.isStarred);
                    break;
                case "attachments":
                    result = result.filter((message) => message.hasAttachments);
                    break;
                case "direct":
                case "system":
                case "alert":
                    result = result.filter((message) => message.type === selectedFilter);
                    break;
                default:
                    break;
            }
        }

        if (selectedStatus !== "all") {
            result = result.filter((message) => message.status === selectedStatus);
        }

        setFilteredMessages(result);
    }, [searchTerm, selectedFilter, selectedStatus, messages]);

    const handleMessageClick = (message) => {
        // Mark as read when opened
        if (!message.isRead) {
            const updatedMessages = messages.map((msg) =>
                msg.id === message.id ? { ...msg, isRead: true } : msg
            );
            setMessages(updatedMessages);
        }

        setSelectedMessage(message);
        setShowMessageDetail(true);
    };

    const handleStarMessage = (e, messageId) => {
        e.stopPropagation();
        const updatedMessages = messages.map((message) =>
            message.id === messageId
                ? { ...message, isStarred: !message.isStarred }
                : message
        );
        setMessages(updatedMessages);
    };

    const handleMarkAsRead = (e, messageId, isRead) => {
        e.stopPropagation();
        const updatedMessages = messages.map((message) =>
            message.id === messageId
                ? { ...message, isRead: !isRead }
                : message
        );
        setMessages(updatedMessages);
    };

    const handleDeleteMessage = (e, messageId) => {
        e.stopPropagation();
        const updatedMessages = messages.filter((message) => message.id !== messageId);
        setMessages(updatedMessages);

        if (selectedMessage && selectedMessage.id === messageId) {
            setSelectedMessage(null);
            setShowMessageDetail(false);
        }
    };

    const handleComposeSubmit = (e) => {
        e.preventDefault();
        // In a real app, this would send the message via API
        console.log("Message sent:", composeData);
        setShowComposeModal(false);
        // Reset form
        setComposeData({
            to: "",
            subject: "",
            message: "",
            attachments: []
        });
    };

    const getMessageTypeIcon = (type) => {
        switch (type) {
            case "direct":
                return <MdPerson className="text-blue-500" />;
            case "system":
                return <MdInfo className="text-green-500" />;
            case "alert":
                return <MdWarning className="text-orange-500" />;
            default:
                return <MdEmail className="text-gray-500" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "unresolved":
                return "text-red-500 bg-red-100";
            case "pending":
                return "text-yellow-500 bg-yellow-100";
            case "resolved":
            case "completed":
                return "text-green-500 bg-green-100";
            default:
                return "text-gray-500 bg-gray-100";
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);

        // Today
        if (date.toDateString() === now.toDateString()) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        // Yesterday
        else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        }
        // This year
        else if (date.getFullYear() === now.getFullYear()) {
            return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
        }
        // Different year
        else {
            return date.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
        }
    };

    return (
        <div className="mt-3">
            {/* Header and Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div data-aos="fade-right">
                    <h4 className="text-xl font-bold text-navy-700">Message Center</h4>
                    <p className="text-gray-600 mt-1">Manage all system messages and notifications</p>
                </div>
                <div className="flex space-x-2 mt-3 sm:mt-0" data-aos="fade-left">
                    <button
                        className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition duration-200 flex items-center"
                        onClick={() => setShowComposeModal(true)}
                    >
                        <MdAdd className="mr-1" /> New Message
                    </button>
                    <button
                        className="rounded-lg border border-gray-300 px-3 py-2 text-gray-600 hover:bg-gray-100 transition duration-200"
                        onClick={() => setFilteredMessages(messages)}
                    >
                        <MdRefresh />
                    </button>
                </div>
            </div>

            {/* Message Center Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
                {/* Filters Sidebar */}
                <div className="lg:col-span-1">
                    <Card extra="p-4" data-aos="fade-right">
                        <div className="mb-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search messages..."
                                    className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <MdSearch className="absolute left-3 top-2.5 text-lg text-gray-500" />
                            </div>
                        </div>

                        <div className="mb-6">
                            <h5 className="text-sm font-semibold text-gray-700 mb-2">Message Filters</h5>
                            <ul className="space-y-1">
                                <li
                                    className={`flex items-center px-3 py-2 rounded-lg cursor-pointer ${selectedFilter === "all" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
                                        }`}
                                    onClick={() => setSelectedFilter("all")}
                                >
                                    <MdInbox className="mr-2" /> All Messages
                                    <span className="ml-auto bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                                        {messages.length}
                                    </span>
                                </li>
                                <li
                                    className={`flex items-center px-3 py-2 rounded-lg cursor-pointer ${selectedFilter === "unread" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
                                        }`}
                                    onClick={() => setSelectedFilter("unread")}
                                >
                                    <MdMarkEmailUnread className="mr-2" /> Unread
                                    <span className="ml-auto bg-blue-200 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                                        {messages.filter(m => !m.isRead).length}
                                    </span>
                                </li>
                                <li
                                    className={`flex items-center px-3 py-2 rounded-lg cursor-pointer ${selectedFilter === "starred" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
                                        }`}
                                    onClick={() => setSelectedFilter("starred")}
                                >
                                    <MdStar className="mr-2" /> Starred
                                    <span className="ml-auto bg-yellow-200 text-yellow-700 text-xs px-2 py-0.5 rounded-full">
                                        {messages.filter(m => m.isStarred).length}
                                    </span>
                                </li>
                                <li
                                    className={`flex items-center px-3 py-2 rounded-lg cursor-pointer ${selectedFilter === "direct" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
                                        }`}
                                    onClick={() => setSelectedFilter("direct")}
                                >
                                    <MdPerson className="mr-2" /> Direct Messages
                                    <span className="ml-auto bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                                        {messages.filter(m => m.type === "direct").length}
                                    </span>
                                </li>
                                <li
                                    className={`flex items-center px-3 py-2 rounded-lg cursor-pointer ${selectedFilter === "system" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
                                        }`}
                                    onClick={() => setSelectedFilter("system")}
                                >
                                    <MdInfo className="mr-2" /> System Messages
                                    <span className="ml-auto bg-green-200 text-green-700 text-xs px-2 py-0.5 rounded-full">
                                        {messages.filter(m => m.type === "system").length}
                                    </span>
                                </li>
                                <li
                                    className={`flex items-center px-3 py-2 rounded-lg cursor-pointer ${selectedFilter === "alert" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
                                        }`}
                                    onClick={() => setSelectedFilter("alert")}
                                >
                                    <MdWarning className="mr-2" /> Alerts
                                    <span className="ml-auto bg-orange-200 text-orange-700 text-xs px-2 py-0.5 rounded-full">
                                        {messages.filter(m => m.type === "alert").length}
                                    </span>
                                </li>
                                <li
                                    className={`flex items-center px-3 py-2 rounded-lg cursor-pointer ${selectedFilter === "attachments" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
                                        }`}
                                    onClick={() => setSelectedFilter("attachments")}
                                >
                                    <MdAttachFile className="mr-2" /> With Attachments
                                    <span className="ml-auto bg-purple-200 text-purple-700 text-xs px-2 py-0.5 rounded-full">
                                        {messages.filter(m => m.hasAttachments).length}
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="text-sm font-semibold text-gray-700 mb-2">Status</h5>
                            <ul className="space-y-1">
                                <li
                                    className={`flex items-center px-3 py-2 rounded-lg cursor-pointer ${selectedStatus === "all" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
                                        }`}
                                    onClick={() => setSelectedStatus("all")}
                                >
                                    <MdFilterList className="mr-2" /> All Statuses
                                </li>
                                <li
                                    className={`flex items-center px-3 py-2 rounded-lg cursor-pointer ${selectedStatus === "unresolved" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
                                        }`}
                                    onClick={() => setSelectedStatus("unresolved")}
                                >
                                    <MdError className="mr-2 text-red-500" /> Unresolved
                                    <span className="ml-auto bg-red-200 text-red-700 text-xs px-2 py-0.5 rounded-full">
                                        {messages.filter(m => m.status === "unresolved").length}
                                    </span>
                                </li>
                                <li
                                    className={`flex items-center px-3 py-2 rounded-lg cursor-pointer ${selectedStatus === "pending" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
                                        }`}
                                    onClick={() => setSelectedStatus("pending")}
                                >
                                    <MdInfo className="mr-2 text-yellow-500" /> Pending
                                    <span className="ml-auto bg-yellow-200 text-yellow-700 text-xs px-2 py-0.5 rounded-full">
                                        {messages.filter(m => m.status === "pending").length}
                                    </span>
                                </li>
                                <li
                                    className={`flex items-center px-3 py-2 rounded-lg cursor-pointer ${selectedStatus === "resolved" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
                                        }`}
                                    onClick={() => setSelectedStatus("resolved")}
                                >
                                    <MdCheckCircle className="mr-2 text-green-500" /> Resolved
                                    <span className="ml-auto bg-green-200 text-green-700 text-xs px-2 py-0.5 rounded-full">
                                        {messages.filter(m => m.status === "resolved").length}
                                    </span>
                                </li>
                                <li
                                    className={`flex items-center px-3 py-2 rounded-lg cursor-pointer ${selectedStatus === "completed" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
                                        }`}
                                    onClick={() => setSelectedStatus("completed")}
                                >
                                    <MdCheckCircle className="mr-2 text-green-500" /> Completed
                                    <span className="ml-auto bg-green-200 text-green-700 text-xs px-2 py-0.5 rounded-full">
                                        {messages.filter(m => m.status === "completed").length}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </Card>
                </div>

                {/* Message List and Detail View */}
                <div className={`lg:col-span-${showMessageDetail ? '1' : '3'}`}>
                    <Card extra="p-0 overflow-hidden" data-aos="fade-up">
                        <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                            <h5 className="font-medium text-navy-700">Messages ({filteredMessages.length})</h5>
                            <div className="flex space-x-1">
                                <button className="p-1.5 rounded-full hover:bg-gray-200">
                                    <MdRefresh />
                                </button>
                                <button className="p-1.5 rounded-full hover:bg-gray-200">
                                    <MdMoreVert />
                                </button>
                            </div>
                        </div>

                        <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 300px)" }}>
                            {filteredMessages.length > 0 ? (
                                filteredMessages.map((message, index) => (
                                    <div
                                        key={message.id}
                                        className={`border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${!message.isRead ? "bg-blue-50" : ""
                                            }`}
                                        onClick={() => handleMessageClick(message)}
                                        data-aos="fade-up"
                                        data-aos-delay={index * 50}
                                    >
                                        <div className="p-4">
                                            <div className="flex items-start justify-between mb-1">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 rounded-full overflow-hidden mr-3 bg-gray-200 flex items-center justify-center">
                                                        {message.from.avatar ? (
                                                            <img src={message.from.avatar} alt={message.from.name} />
                                                        ) : (
                                                            <MdPerson size={24} className="text-gray-500" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className={`font-medium ${!message.isRead ? "font-bold" : ""}`}>
                                                            {message.from.name}
                                                        </p>
                                                        <p className="text-xs text-gray-500">{message.from.role}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <span className="text-xs text-gray-500">{formatDate(message.date)}</span>
                                                    <button
                                                        className="p-1 rounded-full hover:bg-gray-200"
                                                        onClick={(e) => handleStarMessage(e, message.id)}
                                                    >
                                                        {message.isStarred ? (
                                                            <MdStar className="text-yellow-500" />
                                                        ) : (
                                                            <MdStarBorder className="text-gray-400" />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="pl-13">
                                                <p className={`font-medium ${!message.isRead ? "font-bold" : ""}`}>
                                                    {message.subject}
                                                </p>
                                                <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                                                    {message.content}
                                                </p>

                                                <div className="flex justify-between items-center mt-2">
                                                    <div className="flex space-x-2">
                                                        {getMessageTypeIcon(message.type)}
                                                        {message.hasAttachments && (
                                                            <MdAttachFile className="text-gray-500" />
                                                        )}
                                                        {message.labels.map((label, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700"
                                                            >
                                                                {label}
                                                            </span>
                                                        ))}
                                                        <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(message.status)}`}>
                                                            {message.status}
                                                        </span>
                                                    </div>

                                                    <div className="flex space-x-1">
                                                        <button
                                                            className="p-1 rounded-full hover:bg-gray-200"
                                                            onClick={(e) => handleMarkAsRead(e, message.id, message.isRead)}
                                                        >
                                                            {message.isRead ? (
                                                                <MdMarkEmailUnread className="text-gray-500" />
                                                            ) : (
                                                                <MdMarkEmailRead className="text-blue-500" />
                                                            )}
                                                        </button>
                                                        <button
                                                            className="p-1 rounded-full hover:bg-gray-200"
                                                            onClick={(e) => handleDeleteMessage(e, message.id)}
                                                        >
                                                            <MdDelete className="text-red-500" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="py-10 text-center text-gray-500">
                                    <MdInbox className="mx-auto text-4xl mb-3" />
                                    <p>No messages found</p>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>

                {/* Message Detail View */}
                {showMessageDetail && (
                    <div className="lg:col-span-2" data-aos="fade-left">
                        <Card extra="p-0 overflow-hidden">
                            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                                <h5 className="font-medium text-navy-700">Message Details</h5>
                                <button
                                    className="p-1.5 rounded-full hover:bg-gray-200"
                                    onClick={() => setShowMessageDetail(false)}
                                >
                                    <MdClose />
                                </button>
                            </div>

                            {selectedMessage && (
                                <div className="p-6 overflow-y-auto" style={{ maxHeight: "calc(100vh - 300px)" }}>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex">
                                            <div className="h-12 w-12 rounded-full overflow-hidden mr-4 bg-gray-200 flex items-center justify-center">
                                                {selectedMessage.from.avatar ? (
                                                    <img src={selectedMessage.from.avatar} alt={selectedMessage.from.name} />
                                                ) : (
                                                    <MdPerson size={30} className="text-gray-500" />
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold">{selectedMessage.from.name}</h3>
                                                <p className="text-sm text-gray-600">{selectedMessage.from.role}</p>
                                                <p className="text-xs text-gray-500">To: {selectedMessage.to.map(t => t.name).join(", ")}</p>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {new Date(selectedMessage.date).toLocaleString([], {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <h2 className="text-xl font-bold mb-4">{selectedMessage.subject}</h2>
                                        <div className="text-gray-800 whitespace-pre-line">
                                            {selectedMessage.content}
                                        </div>
                                    </div>

                                    {selectedMessage.hasAttachments && (
                                        <div className="mt-6 border-t border-gray-200 pt-4">
                                            <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments ({selectedMessage.attachments.length})</h4>
                                            <div className="space-y-2">
                                                {selectedMessage.attachments.map((attachment, idx) => (
                                                    <div key={idx} className="flex items-center p-3 border border-gray-200 rounded-lg">
                                                        <MdAttachFile className="text-gray-500 mr-2" />
                                                        <div>
                                                            <p className="text-sm font-medium">{attachment.name}</p>
                                                            <p className="text-xs text-gray-500">{attachment.size}</p>
                                                        </div>
                                                        <button className="ml-auto px-3 py-1 text-xs text-blue-600 hover:text-blue-800">
                                                            Download
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="mt-6 flex items-center space-x-2">
                                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(selectedMessage.status)}`}>
                                            {selectedMessage.status}
                                        </span>
                                        {selectedMessage.labels.map((label, idx) => (
                                            <span
                                                key={idx}
                                                className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700"
                                            >
                                                {label}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-8 border-t border-gray-200 pt-6 flex space-x-2">
                                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center">
                                            <MdReply className="mr-1" /> Reply
                                        </button>
                                        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center">
                                            <MdForward className="mr-1" /> Forward
                                        </button>
                                        <button className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 flex items-center ml-auto">
                                            <MdDelete className="mr-1" /> Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </Card>
                    </div>
                )}
            </div>

            {/* Compose Message Modal */}
            {showComposeModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setShowComposeModal(false)}>
                    <div
                        className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6"
                        onClick={(e) => e.stopPropagation()}
                        data-aos="zoom-in"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-navy-700">Compose New Message</h3>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => setShowComposeModal(false)}
                            >
                                <MdClose />
                            </button>
                        </div>

                        <form onSubmit={handleComposeSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2">To:</label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Recipients (use comma to separate multiple recipients)"
                                    value={composeData.to}
                                    onChange={(e) => setComposeData({ ...composeData, to: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2">Subject:</label>
                                <input
                                    type="text"
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Message subject"
                                    value={composeData.subject}
                                    onChange={(e) => setComposeData({ ...composeData, subject: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2">Message:</label>
                                <textarea
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your message here..."
                                    rows={8}
                                    value={composeData.message}
                                    onChange={(e) => setComposeData({ ...composeData, message: e.target.value })}
                                    required
                                ></textarea>
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-medium mb-2">Attachments:</label>
                                <div className="flex items-center space-x-2">
                                    <button
                                        type="button"
                                        className="px-4 py-2 border border-gray-300 rounded-lg flex items-center text-gray-700 hover:bg-gray-100"
                                    >
                                        <MdAttachFile className="mr-1" /> Add Files
                                    </button>
                                    <p className="text-sm text-gray-500">No files selected</p>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 mt-6">
                                <button
                                    type="button"
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                                    onClick={() => setShowComposeModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessageCenter;
