import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    MdAssignment, MdDescription, MdBatchPrediction,
    MdAssessment, MdGrading, MdHistory, MdGroups,
    MdDocumentScanner, MdSearch, MdFilterList, MdCheck,
    MdClose, MdWarning, MdPending, MdArrowForward
} from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";

const ReviewManagement = () => {
    const dispatch = useDispatch();
    const { baseURL } = useSelector((state) => state.auth);
    const [activeTab, setActiveTab] = useState("assigned");
    const [loading, setLoading] = useState(false);

    // Initialize AOS animation library
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    // Dummy data for the dashboard
    const statistics = {
        assigned: 12,
        completed: 8,
        pending: 4,
        urgent: 2,
        averageReviewTime: "1.5 days",
        currentSession: "Session 2025-1",
    };

    const dummyProposals = [
        {
            id: 1,
            title: "Pengembangan Sistem Pendeteksi Kebakaran Hutan Berbasis IoT",
            author: "Dr. Budi Santoso",
            department: "Teknik Informatika",
            submitDate: "2025-04-10",
            deadline: "2025-04-25",
            status: "pending",
            priority: "high",
        },
        {
            id: 2,
            title: "Analisis Metode Pembelajaran Jarak Jauh pada Pendidikan Vokasi",
            author: "Prof. Dewi Lestari",
            department: "Pendidikan Teknologi",
            submitDate: "2025-04-08",
            deadline: "2025-04-23",
            status: "in-progress",
            priority: "medium",
        },
        {
            id: 3,
            title: "Implementasi Blockchain untuk Keamanan Data Akademik",
            author: "Dr. Ahmad Hidayat",
            department: "Teknik Komputer",
            submitDate: "2025-04-05",
            deadline: "2025-04-20",
            status: "completed",
            priority: "normal",
        },
        {
            id: 4,
            title: "Optimasi Efisiensi Energi pada Bangunan Kampus",
            author: "Dr. Rini Wijaya",
            department: "Teknik Sipil",
            submitDate: "2025-04-12",
            deadline: "2025-04-27",
            status: "pending",
            priority: "medium",
        },
        {
            id: 5,
            title: "Analisis Kualitas Air di Sekitar Kawasan Industri Manado",
            author: "Prof. Surya Darma",
            department: "Teknik Lingkungan",
            submitDate: "2025-04-03",
            deadline: "2025-04-18",
            status: "completed",
            priority: "high",
        },
    ];

    const templates = [
        { id: 1, name: "Template Evaluasi Penelitian Dasar", category: "Research", downloadCount: 45 },
        { id: 2, name: "Rubrik Penilaian Proposal Pengabdian", category: "Community Service", downloadCount: 38 },
        { id: 3, name: "Form Evaluasi Kelayakan Anggaran", category: "Financial", downloadCount: 27 },
    ];

    const progressReports = [
        { id: 101, proposalId: 1, title: "Laporan Kemajuan Sistem IoT", submitDate: "2025-06-15", status: "pending" },
        { id: 102, proposalId: 3, title: "Laporan Kemajuan Implementasi Blockchain", submitDate: "2025-06-12", status: "reviewed" },
    ];

    const finalReports = [
        { id: 201, proposalId: 5, title: "Laporan Akhir Analisis Kualitas Air", submitDate: "2025-09-25", status: "pending" },
    ];

    const historicalReviews = [
        { id: 301, title: "Pengembangan Smart Campus", author: "Dr. Leo Martono", session: "Session 2024-2", reviewDate: "2024-11-15", decision: "approved" },
        { id: 302, title: "Analisis Big Data untuk Prediksi Kelulusan", author: "Prof. Nina Hartati", session: "Session 2024-2", reviewDate: "2024-11-10", decision: "rejected" },
    ];

    // Status color mapping
    const getStatusColor = (status) => {
        switch (status) {
            case "completed":
            case "reviewed":
            case "approved": return "text-green-600 bg-green-100";
            case "pending": return "text-yellow-600 bg-yellow-100";
            case "in-progress": return "text-blue-600 bg-blue-100";
            case "rejected": return "text-red-600 bg-red-100";
            default: return "text-gray-600 bg-gray-100";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "completed":
            case "reviewed":
            case "approved": return <MdCheck className="text-green-600" />;
            case "pending": return <MdPending className="text-yellow-600" />;
            case "in-progress": return <MdPending className="text-blue-600" />;
            case "rejected": return <MdClose className="text-red-600" />;
            default: return <MdWarning className="text-gray-600" />;
        }
    };

    // Filter options
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterPriority, setFilterPriority] = useState("all");

    // Filter proposals based on search and filters
    const filteredProposals = dummyProposals.filter(proposal => {
        const matchesSearch = proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            proposal.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === "all" || proposal.status === filterStatus;
        const matchesPriority = filterPriority === "all" || proposal.priority === filterPriority;

        return matchesSearch && matchesStatus && matchesPriority;
    });

    return (
        <div className=" mx-auto px-4 py-6">
            {/* Header with statistics */}
            <div className="mb-8" data-aos="fade-down">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Review Management</h1>
                <p className="text-gray-600 mb-6">Manage your proposal reviews for {statistics.currentSession}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
                        <p className="text-gray-500 text-sm">Assigned Proposals</p>
                        <p className="text-2xl font-bold">{statistics.assigned}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500">
                        <p className="text-gray-500 text-sm">Completed Reviews</p>
                        <p className="text-2xl font-bold">{statistics.completed}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500">
                        <p className="text-gray-500 text-sm">Pending Reviews</p>
                        <p className="text-2xl font-bold">{statistics.pending}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500">
                        <p className="text-gray-500 text-sm">Urgent</p>
                        <p className="text-2xl font-bold">{statistics.urgent}</p>
                    </div>
                </div>
            </div>

            {/* Tabs navigation */}
            <div className="mb-6 border-b border-gray-200" data-aos="fade-up">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
                    <li className="mr-2">
                        <button
                            onClick={() => setActiveTab("assigned")}
                            className={`inline-flex items-center p-4 border-b-2 rounded-t-lg ${activeTab === "assigned"
                                ? "text-blue-600 border-blue-600"
                                : "border-transparent hover:text-gray-600 hover:border-gray-300"
                                }`}
                        >
                            <MdAssignment className="mr-2" /> Assigned Proposals
                        </button>
                    </li>
                    <li className="mr-2">
                        <button
                            onClick={() => setActiveTab("templates")}
                            className={`inline-flex items-center p-4 border-b-2 rounded-t-lg ${activeTab === "templates"
                                ? "text-blue-600 border-blue-600"
                                : "border-transparent hover:text-gray-600 hover:border-gray-300"
                                }`}
                        >
                            <MdDescription className="mr-2" /> Templates & Rubrics
                        </button>
                    </li>
                    <li className="mr-2">
                        <button
                            onClick={() => setActiveTab("batch")}
                            className={`inline-flex items-center p-4 border-b-2 rounded-t-lg ${activeTab === "batch"
                                ? "text-blue-600 border-blue-600"
                                : "border-transparent hover:text-gray-600 hover:border-gray-300"
                                }`}
                        >
                            <MdBatchPrediction className="mr-2" /> Batch Review
                        </button>
                    </li>
                    <li className="mr-2">
                        <button
                            onClick={() => setActiveTab("progress")}
                            className={`inline-flex items-center p-4 border-b-2 rounded-t-lg ${activeTab === "progress"
                                ? "text-blue-600 border-blue-600"
                                : "border-transparent hover:text-gray-600 hover:border-gray-300"
                                }`}
                        >
                            <MdAssessment className="mr-2" /> Progress Reports
                        </button>
                    </li>
                    <li className="mr-2">
                        <button
                            onClick={() => setActiveTab("final")}
                            className={`inline-flex items-center p-4 border-b-2 rounded-t-lg ${activeTab === "final"
                                ? "text-blue-600 border-blue-600"
                                : "border-transparent hover:text-gray-600 hover:border-gray-300"
                                }`}
                        >
                            <MdGrading className="mr-2" /> Final Reports
                        </button>
                    </li>
                    <li className="mr-2">
                        <button
                            onClick={() => setActiveTab("history")}
                            className={`inline-flex items-center p-4 border-b-2 rounded-t-lg ${activeTab === "history"
                                ? "text-blue-600 border-blue-600"
                                : "border-transparent hover:text-gray-600 hover:border-gray-300"
                                }`}
                        >
                            <MdHistory className="mr-2" /> History
                        </button>
                    </li>
                    <li className="mr-2">
                        <button
                            onClick={() => setActiveTab("collaboration")}
                            className={`inline-flex items-center p-4 border-b-2 rounded-t-lg ${activeTab === "collaboration"
                                ? "text-blue-600 border-blue-600"
                                : "border-transparent hover:text-gray-600 hover:border-gray-300"
                                }`}
                        >
                            <MdGroups className="mr-2" /> Collaboration
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setActiveTab("decisions")}
                            className={`inline-flex items-center p-4 border-b-2 rounded-t-lg ${activeTab === "decisions"
                                ? "text-blue-600 border-blue-600"
                                : "border-transparent hover:text-gray-600 hover:border-gray-300"
                                }`}
                        >
                            <MdDocumentScanner className="mr-2" /> Decisions
                        </button>
                    </li>
                </ul>
            </div>

            {/* Tab content */}
            <div className="bg-white rounded-lg shadow-md p-6" data-aos="fade-up">
                {/* Assigned Proposals Queue */}
                {activeTab === "assigned" && (
                    <div>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                            <h2 className="text-xl font-semibold mb-4 md:mb-0">Assigned Proposals Queue</h2>

                            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search proposals..."
                                        className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <MdSearch className="absolute left-3 top-2.5 text-gray-400 text-xl" />
                                </div>

                                <select
                                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                    <option value="all">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>

                                <select
                                    className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={filterPriority}
                                    onChange={(e) => setFilterPriority(e.target.value)}
                                >
                                    <option value="all">All Priorities</option>
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="normal">Normal</option>
                                </select>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredProposals.map((proposal) => (
                                        <tr key={proposal.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{proposal.title}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{proposal.author}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{proposal.department}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{proposal.submitDate}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{proposal.deadline}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(proposal.status)}`}>
                                                    {getStatusIcon(proposal.status)}
                                                    <span className="ml-1 capitalize">{proposal.status.replace('-', ' ')}</span>
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${proposal.priority === "high" ? "bg-red-100 text-red-800" :
                                                    proposal.priority === "medium" ? "bg-yellow-100 text-yellow-800" :
                                                        "bg-blue-100 text-blue-800"
                                                    }`}>
                                                    {proposal.priority}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button className="text-blue-600 hover:text-blue-900 flex items-center">
                                                    Review <MdArrowForward className="ml-1" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {filteredProposals.length === 0 && (
                                <div className="text-center py-10">
                                    <p className="text-gray-500">No proposals match your search criteria</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Templates & Rubrics */}
                {activeTab === "templates" && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">Review Templates & Rubrics</h2>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                                Create New Template
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {templates.map(template => (
                                <div key={template.id} className="bg-gray-50 rounded-lg p-5 hover:shadow-md transition">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-medium text-lg">{template.name}</h3>
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{template.category}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">Downloaded {template.downloadCount} times</p>
                                    <div className="mt-4 flex justify-between">
                                        <button className="text-blue-600 text-sm hover:underline">Preview</button>
                                        <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition">
                                            Download
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Batch Review Tools */}
                {activeTab === "batch" && (
                    <div>
                        <h2 className="text-xl font-semibold mb-6">Batch Review Tools</h2>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                            <p className="text-blue-700">
                                Batch review allows you to efficiently review multiple proposals with similar characteristics at once.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="border rounded-lg p-6">
                                <h3 className="text-lg font-medium mb-4">Create Batch</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Batch Name</label>
                                        <input type="text" className="w-full border rounded-lg p-2" placeholder="Enter batch name" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Filter Criteria</label>
                                        <select className="w-full border rounded-lg p-2">
                                            <option>By Department</option>
                                            <option>By Submission Date</option>
                                            <option>By Research Category</option>
                                        </select>
                                    </div>
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full">
                                        Create Batch
                                    </button>
                                </div>
                            </div>

                            <div className="border rounded-lg p-6">
                                <h3 className="text-lg font-medium mb-4">Recent Batches</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                        <span>Teknik Informatika Proposals</span>
                                        <span className="text-sm text-gray-500">8 proposals</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                        <span>April Submissions</span>
                                        <span className="text-sm text-gray-500">12 proposals</span>
                                    </div>
                                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                        <span>High Priority Reviews</span>
                                        <span className="text-sm text-gray-500">4 proposals</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-lg font-medium mb-4">Batch Analysis</h3>
                        <div className="bg-white border rounded-lg overflow-hidden">
                            <div className="px-6 py-4 border-b">
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <MdAssessment />
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium">Review Quality Check</h4>
                                        <p className="text-sm text-gray-500">Compare review consistency across similar proposals</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                                    <p className="text-gray-500">Batch analysis visualization will appear here</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Progress Reports Review Panel */}
                {activeTab === "progress" && (
                    <div>
                        <h2 className="text-xl font-semibold mb-6">Progress Reports Review Panel</h2>

                        {progressReports.length > 0 ? (
                            <div className="space-y-4">
                                {progressReports.map(report => (
                                    <div key={report.id} className="border rounded-lg p-6 hover:shadow-md transition">
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-medium text-lg">{report.title}</h3>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                                                {getStatusIcon(report.status)}
                                                <span className="ml-1 capitalize">{report.status}</span>
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-2">Submitted on: {report.submitDate}</p>

                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex space-x-3">
                                                <button className="text-blue-600 hover:underline text-sm flex items-center">
                                                    <MdDescription className="mr-1" /> View Report
                                                </button>
                                                <button className="text-blue-600 hover:underline text-sm flex items-center">
                                                    <MdAssignment className="mr-1" /> View Original Proposal
                                                </button>
                                            </div>

                                            {report.status === "pending" && (
                                                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                                                    Review Now
                                                </button>
                                            )}

                                            {report.status === "reviewed" && (
                                                <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded hover:bg-gray-200 transition">
                                                    View Feedback
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10 bg-gray-50 rounded-lg">
                                <p className="text-gray-500">No progress reports pending review</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Final Reports Evaluation */}
                {activeTab === "final" && (
                    <div>
                        <h2 className="text-xl font-semibold mb-6">Final Reports Evaluation</h2>

                        {finalReports.length > 0 ? (
                            <div className="space-y-4">
                                {finalReports.map(report => (
                                    <div key={report.id} className="border rounded-lg p-6 hover:shadow-md transition">
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-medium text-lg">{report.title}</h3>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                                                {getStatusIcon(report.status)}
                                                <span className="ml-1 capitalize">{report.status}</span>
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-2">Submitted on: {report.submitDate}</p>

                                        <div className="mt-6">
                                            <h4 className="font-medium mb-2">Evaluation Criteria</h4>
                                            <div className="space-y-2">
                                                <div className="flex items-center">
                                                    <input type="checkbox" className="mr-2" id="criteria1" />
                                                    <label htmlFor="criteria1" className="text-sm">Research objectives have been achieved</label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input type="checkbox" className="mr-2" id="criteria2" />
                                                    <label htmlFor="criteria2" className="text-sm">Methodology appropriately implemented</label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input type="checkbox" className="mr-2" id="criteria3" />
                                                    <label htmlFor="criteria3" className="text-sm">Results clearly presented and analyzed</label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input type="checkbox" className="mr-2" id="criteria4" />
                                                    <label htmlFor="criteria4" className="text-sm">Budget utilization appropriate</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex space-x-3">
                                                <button className="text-blue-600 hover:underline text-sm flex items-center">
                                                    <MdDescription className="mr-1" /> View Report
                                                </button>
                                                <button className="text-blue-600 hover:underline text-sm flex items-center">
                                                    <MdHistory className="mr-1" /> View Progress History
                                                </button>
                                            </div>

                                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                                                Complete Evaluation
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-10 bg-gray-50 rounded-lg">
                                <p className="text-gray-500">No final reports pending evaluation</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Historical Reviews Archive */}
                {activeTab === "history" && (
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-semibold">Historical Reviews Archive</h2>

                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search history..."
                                    className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                                />
                                <MdSearch className="absolute left-3 top-2.5 text-gray-400 text-xl" />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Proposal Title</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Decision</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {historicalReviews.map((review) => (
                                        <tr key={review.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{review.title}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{review.author}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{review.session}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500">{review.reviewDate}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(review.decision)}`}>
                                                    {getStatusIcon(review.decision)}
                                                    <span className="ml-1 capitalize">{review.decision}</span>
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button className="text-blue-600 hover:text-blue-900">View Details</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-6 flex justify-between items-center">
                            <p className="text-sm text-gray-500">Showing {historicalReviews.length} of {historicalReviews.length} reviews</p>

                            <div className="flex space-x-2">
                                <button className="px-3 py-1 border rounded bg-gray-50">Previous</button>
                                <button className="px-3 py-1 border rounded bg-white">1</button>
                                <button className="px-3 py-1 border rounded bg-gray-50">Next</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Collaborative Assessment Tools */}
                {activeTab === "collaboration" && (
                    <div>
                        <h2 className="text-xl font-semibold mb-6">Collaborative Assessment Tools</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="border rounded-lg p-6">
                                <h3 className="text-lg font-medium mb-4">Active Collaborations</h3>

                                <div className="space-y-4">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-medium">IoT Research Evaluation Team</h4>
                                                <p className="text-sm text-gray-500 mt-1">3 members • 2 proposals</p>
                                            </div>
                                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
                                        </div>
                                        <div className="mt-4 flex justify-end">
                                            <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition">
                                                Join Session
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-medium">Environmental Research Group</h4>
                                                <p className="text-sm text-gray-500 mt-1">4 members • 5 proposals</p>
                                            </div>
                                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
                                        </div>
                                        <div className="mt-4 flex justify-end">
                                            <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition">
                                                Join Session
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border rounded-lg p-6">
                                <h3 className="text-lg font-medium mb-4">Create New Collaboration</h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Collaboration Name</label>
                                        <input type="text" className="w-full border rounded-lg p-2" placeholder="Enter team name" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea className="w-full border rounded-lg p-2" rows="2" placeholder="Describe the purpose of this collaboration"></textarea>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Invite Reviewers</label>
                                        <select className="w-full border rounded-lg p-2" multiple>
                                            <option>Dr. Anwar Ibrahim</option>
                                            <option>Prof. Maria Putri</option>
                                            <option>Dr. Ahmad Rizki</option>
                                            <option>Prof. Dewi Lestari</option>
                                        </select>
                                        <p className="text-xs text-gray-500 mt-1">Hold Ctrl to select multiple reviewers</p>
                                    </div>

                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full">
                                        Create Collaboration
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="border rounded-lg p-6">
                            <h3 className="text-lg font-medium mb-4">Collaboration Tools</h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 text-center">
                                    <MdGroups className="mx-auto text-3xl text-blue-600 mb-2" />
                                    <h4 className="font-medium mb-1">Group Video Meeting</h4>
                                    <p className="text-sm text-gray-600">Schedule or join video discussions</p>
                                </div>

                                <div className="p-4 bg-purple-50 rounded-lg border border-purple-100 text-center">
                                    <MdDescription className="mx-auto text-3xl text-purple-600 mb-2" />
                                    <h4 className="font-medium mb-1">Shared Documents</h4>
                                    <p className="text-sm text-gray-600">Collaborate on evaluation documents</p>
                                </div>

                                <div className="p-4 bg-green-50 rounded-lg border border-green-100 text-center">
                                    <MdAssessment className="mx-auto text-3xl text-green-600 mb-2" />
                                    <h4 className="font-medium mb-1">Decision Board</h4>
                                    <p className="text-sm text-gray-600">Track group decisions and voting</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Decision Documentation */}
                {activeTab === "decisions" && (
                    <div>
                        <h2 className="text-xl font-semibold mb-6">Decision Documentation</h2>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                            <p className="text-blue-700">
                                Document your evaluation decisions and rationale. This creates a transparent record for future reference.
                            </p>
                        </div>

                        <div className="border rounded-lg mb-6">
                            <div className="p-4 border-b bg-gray-50">
                                <h3 className="font-medium">Recent Decisions</h3>
                            </div>

                            <div className="p-4">
                                <div className="space-y-4">
                                    <div className="p-4 border rounded-lg hover:shadow-sm transition">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-medium">Implementasi Blockchain untuk Keamanan Data Akademik</h4>
                                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Approved</span>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">Decision made on: 2025-04-18</p>
                                        <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
                                            <p className="italic">
                                                "This proposal demonstrates innovative approaches to enhance academic data security. The methodology is sound and budget allocation is appropriate."
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-4 border rounded-lg hover:shadow-sm transition">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-medium">Analisis Big Data untuk Prediksi Kelulusan</h4>
                                            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Rejected</span>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">Decision made on: 2025-04-15</p>
                                        <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
                                            <p className="italic">
                                                "While the research topic is relevant, the proposal lacks detailed methodology and the data collection approach raises privacy concerns. Budget allocation for software appears excessive."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="border rounded-lg">
                            <div className="p-4 border-b bg-gray-50">
                                <h3 className="font-medium">Create New Decision Document</h3>
                            </div>

                            <div className="p-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Select Proposal</label>
                                        <select className="w-full border rounded-lg p-2">
                                            <option>-- Select a proposal --</option>
                                            <option>Pengembangan Sistem Pendeteksi Kebakaran Hutan Berbasis IoT</option>
                                            <option>Analisis Metode Pembelajaran Jarak Jauh pada Pendidikan Vokasi</option>
                                            <option>Optimasi Efisiensi Energi pada Bangunan Kampus</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Decision</label>
                                        <div className="flex space-x-4">
                                            <div className="flex items-center">
                                                <input type="radio" id="approve" name="decision" className="mr-2" />
                                                <label htmlFor="approve">Approve</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input type="radio" id="revise" name="decision" className="mr-2" />
                                                <label htmlFor="revise">Request Revision</label>
                                            </div>
                                            <div className="flex items-center">
                                                <input type="radio" id="reject" name="decision" className="mr-2" />
                                                <label htmlFor="reject">Reject</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Rationale</label>
                                        <textarea className="w-full border rounded-lg p-2" rows="4" placeholder="Provide detailed reasoning for your decision..."></textarea>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Recommendations (if any)</label>
                                        <textarea className="w-full border rounded-lg p-2" rows="3" placeholder="Provide suggestions for improvement..."></textarea>
                                    </div>

                                    <div className="flex justify-end space-x-3">
                                        <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition">
                                            Save as Draft
                                        </button>
                                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                                            Submit Decision
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewManagement;
