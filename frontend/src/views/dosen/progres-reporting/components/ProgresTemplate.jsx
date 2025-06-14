import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { MdCloudUpload, MdDelete, MdHistory, MdDownload, MdCheckCircle, MdWarning, MdInfo, MdAttachFile } from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ProgresTemplate = ({ proposalId }) => {
    // Initialize AOS animation library
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    // States for form data
    const [formData, setFormData] = useState({
        title: '',
        progressPercentage: 0,
        achievedMilestones: '',
        challenges: '',
        nextSteps: '',
        budgetUsage: '',
        additionalNotes: '',
    });

    // State for attachments
    const [attachments, setAttachments] = useState([]);

    // Dummy data for review history
    const reviewHistory = [
        {
            id: 1,
            date: '2025-06-15',
            reviewer: 'Dr. Ahmad Sudrajat',
            status: 'approved',
            comments: 'Excellent progress. Continue with the implementation phase as planned.',
        },
        {
            id: 2,
            date: '2025-05-01',
            reviewer: 'Prof. Lina Wati',
            status: 'revision',
            comments: 'Please provide more details on the challenges faced and how you plan to overcome them.',
        },
    ];

    // Dummy data for current progress
    const currentProgress = {
        proposalTitle: 'Perancangan Sistem Validasi Format Proposal Berbasis Machine Learning',
        startDate: '2025-04-01',
        endDate: '2025-10-31',
        currentStage: 'Implementation',
        overallProgress: 45,
        nextDeadline: '2025-08-15',
        remainingDays: 28,
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle file upload
    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        const newAttachments = files.map(file => ({
            id: Date.now() + Math.random().toString(36).substring(2, 9),
            name: file.name,
            size: file.size,
            type: file.type,
            uploadDate: new Date().toISOString(),
        }));

        setAttachments([...attachments, ...newAttachments]);
    };

    // Handle file deletion
    const handleFileDelete = (id) => {
        setAttachments(attachments.filter(file => file.id !== id));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would normally connect to your API to submit the report
        console.log('Submitting progress report:', { formData, attachments });
        alert('Progress report submitted successfully!');
    };

    // Get status color
    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'text-green-600';
            case 'revision': return 'text-amber-600';
            case 'rejected': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };

    // Get status icon
    const getStatusIcon = (status) => {
        switch (status) {
            case 'approved': return <MdCheckCircle className="inline mr-1" />;
            case 'revision': return <MdWarning className="inline mr-1" />;
            case 'rejected': return <MdInfo className="inline mr-1" />;
            default: return null;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-7xl mx-auto">
            {/* Header with Progress Overview */}
            <div className="mb-8" data-aos="fade-up">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Progress Report Template</h1>
                <p className="text-gray-600">Track and report the progress of your research proposal</p>

                <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <h2 className="text-lg font-semibold text-blue-800">{currentProgress.proposalTitle}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                        <div>
                            <p className="text-sm text-gray-500">Period</p>
                            <p className="text-gray-700">{currentProgress.startDate} to {currentProgress.endDate}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Current Stage</p>
                            <p className="text-gray-700">{currentProgress.currentStage}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Next Deadline</p>
                            <p className="font-medium text-red-600">{currentProgress.nextDeadline} ({currentProgress.remainingDays} days left)</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Visualization */}
            <div className="mb-8" data-aos="fade-up" data-aos-delay="100">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Overall Progress</h2>

                <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                        className="bg-blue-600 h-4 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${currentProgress.overallProgress}%` }}
                    ></div>
                </div>

                <div className="flex justify-between mt-1">
                    <span className="text-sm text-gray-600">0%</span>
                    <span className="text-sm font-medium text-blue-700">{currentProgress.overallProgress}% Complete</span>
                    <span className="text-sm text-gray-600">100%</span>
                </div>

                {/* Timeline Steps */}
                <div className="mt-6 relative">
                    <div className="absolute left-0 top-0 w-full h-1 bg-gray-200 rounded"></div>
                    <div className="flex justify-between relative">
                        <div className={`flex flex-col items-center ${currentProgress.overallProgress >= 0 ? 'text-blue-600' : 'text-gray-400'}`}>
                            <div className={`w-4 h-4 rounded-full mb-1 ${currentProgress.overallProgress >= 0 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                            <span className="text-xs">Planning</span>
                        </div>
                        <div className={`flex flex-col items-center ${currentProgress.overallProgress >= 25 ? 'text-blue-600' : 'text-gray-400'}`}>
                            <div className={`w-4 h-4 rounded-full mb-1 ${currentProgress.overallProgress >= 25 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                            <span className="text-xs">Implementation</span>
                        </div>
                        <div className={`flex flex-col items-center ${currentProgress.overallProgress >= 50 ? 'text-blue-600' : 'text-gray-400'}`}>
                            <div className={`w-4 h-4 rounded-full mb-1 ${currentProgress.overallProgress >= 50 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                            <span className="text-xs">Testing</span>
                        </div>
                        <div className={`flex flex-col items-center ${currentProgress.overallProgress >= 75 ? 'text-blue-600' : 'text-gray-400'}`}>
                            <div className={`w-4 h-4 rounded-full mb-1 ${currentProgress.overallProgress >= 75 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                            <span className="text-xs">Review</span>
                        </div>
                        <div className={`flex flex-col items-center ${currentProgress.overallProgress >= 100 ? 'text-blue-600' : 'text-gray-400'}`}>
                            <div className={`w-4 h-4 rounded-full mb-1 ${currentProgress.overallProgress >= 100 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                            <span className="text-xs">Completion</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Report Form */}
            <form onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Report Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Progress Report Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter a title for this progress report"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="progressPercentage" className="block text-sm font-medium text-gray-700 mb-1">
                            Progress Percentage ({formData.progressPercentage}%)
                        </label>
                        <input
                            type="range"
                            id="progressPercentage"
                            name="progressPercentage"
                            min="0"
                            max="100"
                            value={formData.progressPercentage}
                            onChange={handleInputChange}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            required
                        />
                    </div>
                </div>

                <div className="mb-6">
                    <label htmlFor="achievedMilestones" className="block text-sm font-medium text-gray-700 mb-1">
                        Achieved Milestones
                    </label>
                    <textarea
                        id="achievedMilestones"
                        name="achievedMilestones"
                        rows="3"
                        value={formData.achievedMilestones}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Describe what milestones or objectives you've achieved in this period"
                        required
                    ></textarea>
                </div>

                <div className="mb-6">
                    <label htmlFor="challenges" className="block text-sm font-medium text-gray-700 mb-1">
                        Challenges Faced
                    </label>
                    <textarea
                        id="challenges"
                        name="challenges"
                        rows="3"
                        value={formData.challenges}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Describe any challenges or obstacles you've encountered"
                    ></textarea>
                </div>

                <div className="mb-6">
                    <label htmlFor="nextSteps" className="block text-sm font-medium text-gray-700 mb-1">
                        Next Steps
                    </label>
                    <textarea
                        id="nextSteps"
                        name="nextSteps"
                        rows="3"
                        value={formData.nextSteps}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Outline your planned next steps and upcoming milestones"
                        required
                    ></textarea>
                </div>

                <div className="mb-6">
                    <label htmlFor="budgetUsage" className="block text-sm font-medium text-gray-700 mb-1">
                        Budget Usage Status
                    </label>
                    <textarea
                        id="budgetUsage"
                        name="budgetUsage"
                        rows="2"
                        value={formData.budgetUsage}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Summarize your budget usage and any financial considerations"
                    ></textarea>
                </div>

                <div className="mb-8">
                    <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1">
                        Additional Notes
                    </label>
                    <textarea
                        id="additionalNotes"
                        name="additionalNotes"
                        rows="2"
                        value={formData.additionalNotes}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Any additional information or notes you'd like to include"
                    ></textarea>
                </div>

                {/* Attachment Management */}
                <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200" data-aos="fade-up" data-aos-delay="300">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Attachment Management</h2>

                    {/* File Upload Area */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Supporting Documents</label>
                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <MdCloudUpload className="w-10 h-10 mb-3 text-gray-400" />
                                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500">PDF, DOCX, XLSX, JPG, PNG (MAX. 10MB each)</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" multiple onChange={handleFileUpload} />
                            </label>
                        </div>
                    </div>

                    {/* Attached Files List */}
                    {attachments.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-md font-medium text-gray-700 mb-2">Attached Files ({attachments.length})</h3>
                            <ul className="divide-y divide-gray-200">
                                {attachments.map(file => (
                                    <li key={file.id} className="py-3 flex justify-between items-center">
                                        <div className="flex items-center">
                                            <MdAttachFile className="text-gray-500 mr-2" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-800">{file.name}</p>
                                                <p className="text-xs text-gray-500">
                                                    {(file.size / 1024).toFixed(2)} KB • Uploaded {new Date(file.uploadDate).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                type="button"
                                                className="p-1 text-blue-600 hover:text-blue-800"
                                                title="Download file"
                                            >
                                                <MdDownload />
                                            </button>
                                            <button
                                                type="button"
                                                className="p-1 text-red-600 hover:text-red-800"
                                                onClick={() => handleFileDelete(file.id)}
                                                title="Delete file"
                                            >
                                                <MdDelete />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Review History */}
                {reviewHistory.length > 0 && (
                    <div className="mb-8" data-aos="fade-up" data-aos-delay="400">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Review History</h2>
                            <button type="button" className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
                                <MdHistory className="mr-1" /> View Full History
                            </button>
                        </div>

                        <div className="space-y-4">
                            {reviewHistory.map(review => (
                                <div key={review.id} className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm text-gray-500">{review.date}</p>
                                            <p className="font-medium">{review.reviewer}</p>
                                        </div>
                                        <span className={`text-sm font-medium ${getStatusColor(review.status)}`}>
                                            {getStatusIcon(review.status)} {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-gray-600">{review.comments}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Submit Buttons */}
                <div className="flex justify-end space-x-3" data-aos="fade-up" data-aos-delay="500">
                    <button
                        type="button"
                        className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Save as Draft
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Submit Report
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProgresTemplate;
