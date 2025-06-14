import React, { useState, useEffect } from "react";
import {
    MdOutlineCheckCircle,
    MdOutlinePendingActions,
    MdOutlineWarning,
    MdOutlineCancelPresentation,
    MdOutlineHourglassEmpty,
    MdFilterList,
    MdSearch,
    MdOutlineSort,
    MdOutlineInfo,
    MdCalendarToday,
    MdArrowForward,
    MdRefresh,
    MdOutlineVisibility,
} from "react-icons/md";
import Card from "components/card";
import AOS from "aos";
import "aos/dist/aos.css";

const ProposalTracker = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    // Status options for filtering
    const statusOptions = [
        { value: "all", label: "All Proposals" },
        { value: "draft", label: "Draft" },
        { value: "submitted", label: "Submitted" },
        { value: "underReview", label: "Under Review" },
        { value: "approved", label: "Approved" },
        { value: "needsRevision", label: "Needs Revision" },
        { value: "rejected", label: "Rejected" },
        { value: "completed", label: "Completed" },
    ];

    // Dummy data for proposals
    const dummyProposals = [
        {
            id: 1,
            title: "Pengembangan Aplikasi Machine Learning untuk Prediksi Cuaca",
            status: "approved",
            submissionDate: "2025-03-15",
            lastUpdated: "2025-03-28",
            currentStage: 3,
            totalStages: 5,
            deadline: "2025-05-30",
            priority: "high",
        },
        {
            id: 2,
            title: "Penelitian Dampak IoT terhadap Efisiensi Sistem Pendidikan",
            status: "underReview",
            submissionDate: "2025-03-20",
            lastUpdated: "2025-03-25",
            currentStage: 2,
            totalStages: 5,
            deadline: "2025-06-15",
            priority: "medium",
        },
        {
            id: 3,
            title: "Analisis Penerapan Blockchain pada Sistem Keuangan Kampus",
            status: "needsRevision",
            submissionDate: "2025-03-10",
            lastUpdated: "2025-03-22",
            currentStage: 2,
            totalStages: 5,
            deadline: "2025-05-20",
            priority: "high",
        },
        {
            id: 4,
            title: "Studi Kelayakan Implementasi Energi Terbarukan di Kampus",
            status: "draft",
            submissionDate: null,
            lastUpdated: "2025-03-18",
            currentStage: 0,
            totalStages: 5,
            deadline: "2025-07-10",
            priority: "low",
        },
        {
            id: 5,
            title: "Pengembangan Framework Pembelajaran Online Adaptif",
            status: "submitted",
            submissionDate: "2025-03-23",
            lastUpdated: "2025-03-23",
            currentStage: 1,
            totalStages: 5,
            deadline: "2025-06-30",
            priority: "medium",
        },
    ];

    const [proposals, setProposals] = useState(dummyProposals);
    const [filteredProposals, setFilteredProposals] = useState(dummyProposals);
    const [statusFilter, setStatusFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("deadline");
    const [sortOrder, setSortOrder] = useState("asc");
    const [selectedProposal, setSelectedProposal] = useState(null);

    // Filter and sort proposals
    useEffect(() => {
        let result = [...proposals];

        // Apply status filter
        if (statusFilter !== "all") {
            result = result.filter((proposal) => proposal.status === statusFilter);
        }

        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter((proposal) =>
                proposal.title.toLowerCase().includes(query)
            );
        }

        // Apply sorting
        result.sort((a, b) => {
            let comparison = 0;

            if (sortBy === "deadline") {
                comparison = new Date(a.deadline) - new Date(b.deadline);
            } else if (sortBy === "title") {
                comparison = a.title.localeCompare(b.title);
            } else if (sortBy === "status") {
                comparison = a.currentStage - b.currentStage;
            } else if (sortBy === "priority") {
                const priorityMap = { high: 0, medium: 1, low: 2 };
                comparison = priorityMap[a.priority] - priorityMap[b.priority];
            }

            return sortOrder === "asc" ? comparison : -comparison;
        });

        setFilteredProposals(result);
    }, [proposals, statusFilter, searchQuery, sortBy, sortOrder]);

    // Helper function to get status icon
    const getStatusIcon = (status) => {
        switch (status) {
            case "approved":
                return <MdOutlineCheckCircle className="text-green-500 text-xl" />;
            case "underReview":
                return <MdOutlineHourglassEmpty className="text-blue-500 text-xl" />;
            case "submitted":
                return <MdOutlinePendingActions className="text-blue-400 text-xl" />;
            case "needsRevision":
                return <MdOutlineWarning className="text-amber-500 text-xl" />;
            case "rejected":
                return <MdOutlineCancelPresentation className="text-red-500 text-xl" />;
            case "draft":
                return <MdOutlineInfo className="text-gray-500 text-xl" />;
            default:
                return <MdOutlineInfo className="text-gray-400 text-xl" />;
        }
    };

    // Helper function to get status color classes
    const getStatusClasses = (status) => {
        switch (status) {
            case "approved":
                return "bg-green-500 text-white";
            case "underReview":
                return "bg-blue-500 text-white";
            case "submitted":
                return "bg-blue-400 text-white";
            case "needsRevision":
                return "bg-amber-500 text-white";
            case "rejected":
                return "bg-red-500 text-white";
            case "draft":
                return "bg-gray-500 text-white";
            default:
                return "bg-gray-400 text-white";
        }
    };

    // Format status label for display
    const formatStatus = (status) => {
        switch (status) {
            case "underReview":
                return "Under Review";
            case "needsRevision":
                return "Needs Revision";
            default:
                return status.charAt(0).toUpperCase() + status.slice(1);
        }
    };

    // Get priority badge class
    const getPriorityBadgeClass = (priority) => {
        switch (priority) {
            case "high":
                return "bg-red-100 text-red-800";
            case "medium":
                return "bg-amber-100 text-amber-800";
            case "low":
                return "bg-green-100 text-green-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    // Format date for display
    const formatDate = (dateString) => {
        if (!dateString) return "Not submitted";
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Calculate days remaining until deadline
    const getDaysRemaining = (deadline) => {
        const today = new Date();
        const deadlineDate = new Date(deadline);
        const timeDiff = deadlineDate - today;
        const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
        return daysRemaining;
    };

    // Get days remaining class
    const getDaysRemainingClass = (daysRemaining) => {
        if (daysRemaining <= 7) return "text-red-600 font-bold";
        if (daysRemaining <= 14) return "text-amber-600 font-bold";
        return "text-green-600";
    };

    // Get the progress stages for a proposal
    const getProgressStages = (proposal) => {
        const stages = [
            { id: 0, name: "Draft", icon: <MdOutlineInfo /> },
            { id: 1, name: "Submitted", icon: <MdOutlinePendingActions /> },
            { id: 2, name: "Under Review", icon: <MdOutlineHourglassEmpty /> },
            { id: 3, name: "Approved", icon: <MdOutlineCheckCircle /> },
            { id: 4, name: "In Progress", icon: <MdOutlinePendingActions /> },
            { id: 5, name: "Completed", icon: <MdOutlineCheckCircle /> },
        ];

        return stages;
    };

    const handleSortChange = (value) => {
        if (sortBy === value) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(value);
            setSortOrder("asc");
        }
    };

    return (
        <Card extra={"w-full p-4"}>
            <div className="mb-6 w-full" data-aos="fade-up">
                <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                    Proposal Status Tracker
                </h4>
                <p className="mt-1 text-base text-gray-600">
                    Monitor and track all your proposal submissions
                </p>
            </div>

            {/* Filter and Search Bar */}
            <div className="mb-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4" data-aos="fade-up" data-aos-delay="100">
                <div className="flex items-center gap-3 w-full lg:w-auto">
                    <div className="relative w-full lg:w-64">
                        <input
                            type="text"
                            placeholder="Search proposals..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <MdSearch className="absolute left-3 top-2.5 text-gray-500 text-xl" />
                    </div>
                    <div className="relative">
                        <select
                            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            {statusOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <MdFilterList className="absolute right-2 top-2.5 text-gray-500 text-xl pointer-events-none" />
                    </div>
                </div>

                <div className="flex items-center gap-2 w-full lg:w-auto">
                    <button
                        onClick={() => handleSortChange("deadline")}
                        className={`px-3 py-1.5 rounded-md flex items-center text-sm ${sortBy === "deadline" ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-700"
                            } transition duration-300 hover:bg-indigo-50`}
                    >
                        <MdCalendarToday className="mr-1" />
                        Deadline
                        {sortBy === "deadline" && (
                            <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                        )}
                    </button>
                    <button
                        onClick={() => handleSortChange("priority")}
                        className={`px-3 py-1.5 rounded-md flex items-center text-sm ${sortBy === "priority" ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-700"
                            } transition duration-300 hover:bg-indigo-50`}
                    >
                        <MdOutlineSort className="mr-1" />
                        Priority
                        {sortBy === "priority" && (
                            <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                        )}
                    </button>
                    <button
                        onClick={() => handleSortChange("status")}
                        className={`px-3 py-1.5 rounded-md flex items-center text-sm ${sortBy === "status" ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-700"
                            } transition duration-300 hover:bg-indigo-50`}
                    >
                        <MdOutlineInfo className="mr-1" />
                        Status
                        {sortBy === "status" && (
                            <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                        )}
                    </button>
                    <button
                        onClick={() => {
                            setStatusFilter("all");
                            setSearchQuery("");
                            setSortBy("deadline");
                            setSortOrder("asc");
                        }}
                        className="p-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition duration-300"
                        title="Reset filters"
                    >
                        <MdRefresh />
                    </button>
                </div>
            </div>

            {/* Proposals List */}
            <div className="overflow-x-auto" data-aos="fade-up" data-aos-delay="200">
                {filteredProposals.length === 0 ? (
                    <div className="text-center py-8">
                        <div className="mb-4 flex justify-center">
                            <MdOutlineInfo className="text-4xl text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-700">No proposals found</h3>
                        <p className="text-gray-500 mt-1">Try adjusting your search or filter criteria</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-5">
                        {filteredProposals.map((proposal) => (
                            <div
                                key={proposal.id}
                                className="bg-white dark:bg-navy-700 rounded-xl shadow-sm border border-gray-100 dark:border-navy-700 overflow-hidden hover:shadow-md transition duration-300"
                                data-aos="fade-up"
                            >
                                <div className="flex flex-col lg:flex-row">
                                    {/* Status Column */}
                                    <div className="w-full lg:w-1/4 p-5 border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-navy-600 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                {getStatusIcon(proposal.status)}
                                                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusClasses(proposal.status)}`}>
                                                    {formatStatus(proposal.status)}
                                                </span>
                                            </div>
                                            <h3 className="mt-3 text-lg font-semibold text-navy-700 dark:text-white line-clamp-2">
                                                {proposal.title}
                                            </h3>
                                            <div className="mt-2 flex items-center">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityBadgeClass(proposal.priority)}`}>
                                                    {proposal.priority.charAt(0).toUpperCase() + proposal.priority.slice(1)} Priority
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-4 text-sm">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-gray-600 dark:text-gray-400">Submitted:</span>
                                                <span className="font-medium text-navy-700 dark:text-white">
                                                    {formatDate(proposal.submissionDate)}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-gray-600 dark:text-gray-400">Last Updated:</span>
                                                <span className="font-medium text-navy-700 dark:text-white">
                                                    {formatDate(proposal.lastUpdated)}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600 dark:text-gray-400">Deadline:</span>
                                                <span className={`font-medium ${getDaysRemainingClass(getDaysRemaining(proposal.deadline))}`}>
                                                    {formatDate(proposal.deadline)} ({getDaysRemaining(proposal.deadline)} days left)
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress Column */}
                                    <div className="w-full lg:w-3/4 p-5">
                                        <div className="mb-4">
                                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                                Progress Timeline
                                            </h4>
                                            <div className="relative">
                                                <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-200 dark:bg-navy-600"></div>
                                                <ul className="relative flex justify-between">
                                                    {getProgressStages(proposal).map((stage, index) => {
                                                        const isActive = proposal.currentStage >= stage.id;
                                                        const isCurrent = proposal.currentStage === stage.id;
                                                        return (
                                                            <li key={stage.id} className="flex flex-col items-center">
                                                                <div
                                                                    className={`w-9 h-9 rounded-full flex items-center justify-center z-10 
                                    ${isCurrent
                                                                            ? "bg-indigo-500 text-white ring-4 ring-indigo-100 dark:ring-navy-800"
                                                                            : isActive
                                                                                ? "bg-green-500 text-white"
                                                                                : "bg-gray-200 dark:bg-navy-600 text-gray-500 dark:text-gray-400"
                                                                        } transition-all duration-300`}
                                                                >
                                                                    {stage.icon}
                                                                </div>
                                                                <span
                                                                    className={`mt-2 text-xs font-medium 
                                    ${isCurrent
                                                                            ? "text-indigo-600 dark:text-indigo-400"
                                                                            : isActive
                                                                                ? "text-green-600 dark:text-green-400"
                                                                                : "text-gray-500 dark:text-gray-400"
                                                                        }`}
                                                                >
                                                                    {stage.name}
                                                                </span>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                {proposal.status === "needsRevision" ? (
                                                    <div className="flex items-center text-amber-600 dark:text-amber-400">
                                                        <MdOutlineWarning className="mr-1" />
                                                        <span>Revision needed - check feedback in your inbox</span>
                                                    </div>
                                                ) : proposal.status === "approved" ? (
                                                    <div className="flex items-center text-green-600 dark:text-green-400">
                                                        <MdOutlineCheckCircle className="mr-1" />
                                                        <span>Proposal approved - next stage: Implementation</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center">
                                                        <MdOutlineInfo className="mr-1" />
                                                        <span>Current stage: {getProgressStages(proposal)[proposal.currentStage]?.name}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <button
                                                className="mt-3 sm:mt-0 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-md text-sm font-medium flex items-center transition duration-300"
                                                onClick={() => setSelectedProposal(proposal.id === selectedProposal ? null : proposal.id)}
                                            >
                                                <MdOutlineVisibility className="mr-1" />
                                                {selectedProposal === proposal.id ? "Hide Details" : "View Details"}
                                                <MdArrowForward className={`ml-1 transition-transform duration-300 ${selectedProposal === proposal.id ? "rotate-90" : ""}`} />
                                            </button>
                                        </div>

                                        {/* Expanded Details */}
                                        {selectedProposal === proposal.id && (
                                            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-navy-600 text-sm"
                                                data-aos="fade-down" data-aos-duration="300"
                                            >
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="bg-gray-50 dark:bg-navy-800 p-3 rounded-lg">
                                                        <h5 className="font-medium text-navy-700 dark:text-white mb-2">Proposal Details</h5>
                                                        <p className="text-gray-600 dark:text-gray-400 mb-3">
                                                            {proposal.title} is currently in stage {proposal.currentStage + 1} of {proposal.totalStages + 1}.
                                                            {proposal.status === "needsRevision"
                                                                ? " Please check your email for revision requirements."
                                                                : " Continue monitoring for status updates."}
                                                        </p>
                                                        <div className="flex justify-between">
                                                            <span className="text-xs text-gray-500">ID: PROP-{proposal.id.toString().padStart(4, '0')}</span>
                                                            <span className="text-xs text-gray-500">Updated: {formatDate(proposal.lastUpdated)}</span>
                                                        </div>
                                                    </div>

                                                    <div className="bg-gray-50 dark:bg-navy-800 p-3 rounded-lg">
                                                        <h5 className="font-medium text-navy-700 dark:text-white mb-2">Next Steps</h5>
                                                        {proposal.status === "draft" && (
                                                            <p className="text-gray-600 dark:text-gray-400">
                                                                Complete your proposal and submit it before the deadline.
                                                            </p>
                                                        )}
                                                        {proposal.status === "submitted" && (
                                                            <p className="text-gray-600 dark:text-gray-400">
                                                                Your proposal is under initial review. Typically takes 5-7 days.
                                                            </p>
                                                        )}
                                                        {proposal.status === "underReview" && (
                                                            <p className="text-gray-600 dark:text-gray-400">
                                                                Expert reviewers are evaluating your proposal. You'll be notified of results.
                                                            </p>
                                                        )}
                                                        {proposal.status === "approved" && (
                                                            <p className="text-gray-600 dark:text-gray-400">
                                                                Your proposal has been approved! Begin implementation and prepare progress reports.
                                                            </p>
                                                        )}
                                                        {proposal.status === "needsRevision" && (
                                                            <p className="text-gray-600 dark:text-gray-400">
                                                                Make required revisions and resubmit your proposal as soon as possible.
                                                            </p>
                                                        )}
                                                        {proposal.status === "rejected" && (
                                                            <p className="text-gray-600 dark:text-gray-400">
                                                                Unfortunately, your proposal was not accepted. Review feedback for future submissions.
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="mt-4 flex justify-end gap-2">
                                                    <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition duration-300">
                                                        Download PDF
                                                    </button>
                                                    {(proposal.status === "draft" || proposal.status === "needsRevision") && (
                                                        <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition duration-300">
                                                            {proposal.status === "draft" ? "Edit Draft" : "Make Revisions"}
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Card>
    );
};

export default ProposalTracker;
