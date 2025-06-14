import React, { useState, useEffect, useRef } from 'react';
import {
    MdCloudUpload,
    MdDelete,
    MdDownload,
    MdInsertDriveFile,
    MdPictureAsPdf,
    MdImage,
    MdDescription,
    MdAttachFile,
    MdClose,
    MdInfo,
    MdCheckCircle
} from 'react-icons/md';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Attachment = ({ proposalId, attachmentType = "progress-report" }) => {
    // Initialize AOS animation library
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    // State management
    const [files, setFiles] = useState([]);
    const [dragActive, setDragActive] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({});
    const [selectedFile, setSelectedFile] = useState(null);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [filterType, setFilterType] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const fileInputRef = useRef(null);

    // Dummy data for attachments
    useEffect(() => {
        // This would be replaced with an API call to get actual attachments
        const dummyFiles = [
            {
                id: '1',
                name: 'Progress_Report_April_2025.pdf',
                type: 'application/pdf',
                size: 2457600, // in bytes
                uploadDate: '2025-04-15T10:30:00Z',
                uploadedBy: 'Dr. Budi Santoso',
                description: 'Monthly progress report for the research project',
                status: 'approved',
                thumbnail: null,
                tags: ['report', 'monthly', 'progress']
            },
            {
                id: '2',
                name: 'Data_Analysis_Results.xlsx',
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                size: 1548800, // in bytes
                uploadDate: '2025-04-10T14:45:00Z',
                uploadedBy: 'Dr. Budi Santoso',
                description: 'Raw data and analysis results from the initial phase',
                status: 'pending',
                thumbnail: null,
                tags: ['data', 'analysis', 'results']
            },
            {
                id: '3',
                name: 'Implementation_Photos.jpg',
                type: 'image/jpeg',
                size: 3568900, // in bytes
                uploadDate: '2025-04-12T09:15:00Z',
                uploadedBy: 'Dr. Budi Santoso',
                description: 'Photos documenting the implementation phase',
                status: 'approved',
                thumbnail: null,
                tags: ['photos', 'implementation', 'documentation']
            },
            {
                id: '4',
                name: 'Budget_Allocation.docx',
                type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                size: 854600, // in bytes
                uploadDate: '2025-04-08T11:20:00Z',
                uploadedBy: 'Dr. Budi Santoso',
                description: 'Detailed budget allocation for research activities',
                status: 'rejected',
                thumbnail: null,
                tags: ['budget', 'finance', 'allocation']
            },
            {
                id: '5',
                name: 'Survey_Results.pptx',
                type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                size: 2145700, // in bytes
                uploadDate: '2025-04-05T16:50:00Z',
                uploadedBy: 'Dr. Budi Santoso',
                description: 'Presentation of survey results and analysis',
                status: 'pending',
                thumbnail: null,
                tags: ['survey', 'results', 'presentation']
            }
        ];

        setFiles(dummyFiles);
    }, []);

    // Calculate total storage used
    const totalStorage = files.reduce((acc, file) => acc + file.size, 0);
    const storageLimit = 1024 * 1024 * 100; // 100MB limit
    const storagePercentage = (totalStorage / storageLimit) * 100;

    // Handle file browsing
    const handleFileInput = (e) => {
        handleFiles(Array.from(e.target.files));
    };

    // Handle drag events
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    // Handle drop events
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(Array.from(e.dataTransfer.files));
        }
    };

    // Process files
    const handleFiles = (selectedFiles) => {
        // Simulate file upload process
        selectedFiles.forEach(file => {
            const fileId = Date.now() + Math.random().toString(36).substring(2, 9);

            // Set initial progress
            setUploadProgress(prev => ({
                ...prev,
                [fileId]: 0
            }));

            // Simulate progress updates
            const interval = setInterval(() => {
                setUploadProgress(prev => {
                    const currentProgress = prev[fileId] || 0;
                    const newProgress = currentProgress + 10;

                    if (newProgress >= 100) {
                        clearInterval(interval);
                        // Add file to list after "upload" is complete
                        setFiles(prevFiles => [
                            ...prevFiles,
                            {
                                id: fileId,
                                name: file.name,
                                type: file.type,
                                size: file.size,
                                uploadDate: new Date().toISOString(),
                                uploadedBy: 'Dr. Budi Santoso', // This would come from user context in a real app
                                description: '',
                                status: 'pending',
                                thumbnail: null,
                                tags: []
                            }
                        ]);

                        // Remove from progress tracking
                        const newProgress = { ...prev };
                        delete newProgress[fileId];
                        return newProgress;
                    }

                    return {
                        ...prev,
                        [fileId]: newProgress
                    };
                });
            }, 300);
        });
    };

    // Handle file deletion
    const handleDelete = (fileId) => {
        setFiles(files.filter(file => file.id !== fileId));
        // This would include an API call in a real application
    };

    // Get file icon based on type
    const getFileIcon = (fileType) => {
        if (fileType.includes('pdf')) {
            return <MdPictureAsPdf className="text-red-500" size={24} />;
        } else if (fileType.includes('image')) {
            return <MdImage className="text-blue-500" size={24} />;
        } else if (fileType.includes('word') || fileType.includes('document')) {
            return <MdDescription className="text-blue-700" size={24} />;
        } else if (fileType.includes('sheet') || fileType.includes('excel')) {
            return <MdInsertDriveFile className="text-green-600" size={24} />;
        } else if (fileType.includes('presentation') || fileType.includes('powerpoint')) {
            return <MdInsertDriveFile className="text-orange-500" size={24} />;
        } else {
            return <MdAttachFile className="text-gray-500" size={24} />;
        }
    };

    // Get file size in readable format
    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    // Get status color
    const getStatusColor = (status) => {
        switch (status) {
            case 'approved':
                return 'text-green-600 bg-green-100';
            case 'rejected':
                return 'text-red-600 bg-red-100';
            case 'pending':
                return 'text-amber-600 bg-amber-100';
            default:
                return 'text-gray-600 bg-gray-100';
        }
    };

    // Filter files based on search and type filter
    const filteredFiles = files.filter(file => {
        const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            file.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            file.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesFilter = filterType === 'all' ||
            (filterType === 'image' && file.type.includes('image')) ||
            (filterType === 'document' && (file.type.includes('pdf') || file.type.includes('doc'))) ||
            (filterType === 'spreadsheet' && file.type.includes('sheet')) ||
            (filterType === 'presentation' && file.type.includes('presentation')) ||
            (filterType === 'approved' && file.status === 'approved') ||
            (filterType === 'pending' && file.status === 'pending') ||
            (filterType === 'rejected' && file.status === 'rejected');

        return matchesSearch && matchesFilter;
    });

    // Handle file view/preview
    const handleFileView = (file) => {
        setSelectedFile(file);
        // In a real app, you might fetch the file content from the server here
    };

    // Close file preview
    const closeFilePreview = () => {
        setSelectedFile(null);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6" data-aos="fade-up">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Attachment Management</h2>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                        aria-label="Grid view"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                        aria-label="List view"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Storage usage indicator */}
            <div className="mb-6 bg-blue-50 p-4 rounded-lg" data-aos="fade-up" data-aos-delay="100">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Storage Used</span>
                    <span className="text-sm font-medium text-blue-700">{formatFileSize(totalStorage)} / {formatFileSize(storageLimit)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className={`h-2.5 rounded-full ${storagePercentage > 90 ? 'bg-red-600' : storagePercentage > 70 ? 'bg-amber-500' : 'bg-blue-600'}`}
                        style={{ width: `${storagePercentage}%` }}
                    ></div>
                </div>
            </div>

            {/* Search and filter bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6" data-aos="fade-up" data-aos-delay="150">
                <div className="flex-grow">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="search"
                            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search by filename, description or tag..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    <option value="all">All Files</option>
                    <option value="image">Images</option>
                    <option value="document">Documents</option>
                    <option value="spreadsheet">Spreadsheets</option>
                    <option value="presentation">Presentations</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>

            {/* File upload area */}
            <div
                className={`mb-6 p-6 border-2 border-dashed rounded-lg ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'}`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                data-aos="fade-up"
                data-aos-delay="200"
            >
                <div className="flex flex-col items-center justify-center">
                    <MdCloudUpload className="w-12 h-12 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                        Supported formats: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, JPG, PNG, GIF
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        Maximum file size: 10 MB
                    </p>
                    <button
                        onClick={() => fileInputRef.current.click()}
                        className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Select Files
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        multiple
                        onChange={handleFileInput}
                    />
                </div>
            </div>

            {/* Upload progress */}
            {Object.keys(uploadProgress).length > 0 && (
                <div className="mb-6 space-y-4" data-aos="fade-up" data-aos-delay="250">
                    <h3 className="text-lg font-medium text-gray-700">Uploading...</h3>
                    {Object.entries(uploadProgress).map(([fileId, progress]) => (
                        <div key={fileId} className="bg-gray-100 p-3 rounded-lg">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>Uploading...</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <div
                                    className="bg-blue-600 h-2.5 rounded-full"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* File Listing */}
            {filteredFiles.length > 0 ? (
                <div data-aos="fade-up" data-aos-delay="300">
                    <h3 className="text-lg font-medium text-gray-700 mb-3">
                        Attached Files ({filteredFiles.length})
                    </h3>

                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredFiles.map(file => (
                                <div
                                    key={file.id}
                                    className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                                >
                                    <div
                                        className="p-4 cursor-pointer"
                                        onClick={() => handleFileView(file)}
                                    >
                                        <div className="flex items-center justify-center h-32 bg-gray-50 rounded-t-lg mb-3">
                                            {file.type.includes('image') ? (
                                                <img
                                                    src={`https://placehold.co/500x400/e2e8f0/1e293b?text=${file.name.substring(0, 20)}`}
                                                    alt={file.name}
                                                    className="h-full object-cover rounded-t-lg"
                                                />
                                            ) : (
                                                <div className="text-center">
                                                    {getFileIcon(file.type)}
                                                    <p className="text-sm text-gray-500 mt-2 truncate max-w-[180px]">{file.name.split('.').pop().toUpperCase()}</p>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-800 truncate">{file.name}</h4>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {formatFileSize(file.size)} • {new Date(file.uploadDate).toLocaleDateString()}
                                            </p>
                                            <p className="text-xs text-gray-600 mt-1 truncate">{file.description || 'No description'}</p>
                                            <div className="mt-2 flex items-center">
                                                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(file.status)}`}>
                                                    {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-4 py-2 bg-gray-50 rounded-b-lg flex justify-end space-x-2 border-t">
                                        <button
                                            className="p-1 text-blue-600 hover:text-blue-800"
                                            title="Download file"
                                        >
                                            <MdDownload size={18} />
                                        </button>
                                        <button
                                            className="p-1 text-red-600 hover:text-red-800"
                                            onClick={() => handleDelete(file.id)}
                                            title="Delete file"
                                        >
                                            <MdDelete size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            File
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Size
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Upload Date
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredFiles.map(file => (
                                        <tr key={file.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {getFileIcon(file.type)}
                                                    <div className="ml-3">
                                                        <div
                                                            className="text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-600"
                                                            onClick={() => handleFileView(file)}
                                                        >
                                                            {file.name}
                                                        </div>
                                                        <div className="text-xs text-gray-500">{file.description || 'No description'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatFileSize(file.size)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {new Date(file.uploadDate).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(file.status)}`}>
                                                    {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <button
                                                        className="text-blue-600 hover:text-blue-800"
                                                        title="Download file"
                                                    >
                                                        <MdDownload size={18} />
                                                    </button>
                                                    <button
                                                        className="text-red-600 hover:text-red-800"
                                                        onClick={() => handleDelete(file.id)}
                                                        title="Delete file"
                                                    >
                                                        <MdDelete size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg" data-aos="fade-up" data-aos-delay="300">
                    <MdInfo className="w-10 h-10 mx-auto mb-3 text-gray-400" />
                    <p className="text-gray-500">No files found{searchQuery ? ' matching your search' : ''}</p>
                    <button
                        onClick={() => {
                            setSearchQuery('');
                            setFilterType('all');
                        }}
                        className="mt-2 text-blue-600 hover:underline"
                    >
                        Clear filters
                    </button>
                </div>
            )}

            {/* File Preview Modal */}
            {selectedFile && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
                        <div className="p-4 border-b flex justify-between items-center">
                            <h3 className="text-lg font-medium text-gray-800">File Preview</h3>
                            <button
                                onClick={closeFilePreview}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <MdClose size={24} />
                            </button>
                        </div>
                        <div className="p-4 flex-grow overflow-auto">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="md:w-1/3">
                                    <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center h-48">
                                        {selectedFile.type.includes('image') ? (
                                            <img
                                                src={`https://placehold.co/500x400/e2e8f0/1e293b?text=${selectedFile.name.substring(0, 20)}`}
                                                alt={selectedFile.name}
                                                className="max-h-full max-w-full object-contain"
                                            />
                                        ) : (
                                            <div className="text-center">
                                                {getFileIcon(selectedFile.type)}
                                                <p className="text-lg font-medium text-gray-700 mt-2">
                                                    {selectedFile.name.split('.').pop().toUpperCase()}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-4">
                                        <h4 className="font-medium text-gray-800">{selectedFile.name}</h4>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {formatFileSize(selectedFile.size)} • {new Date(selectedFile.uploadDate).toLocaleDateString()}
                                        </p>
                                        <div className="mt-2">
                                            <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(selectedFile.status)}`}>
                                                {selectedFile.status.charAt(0).toUpperCase() + selectedFile.status.slice(1)}
                                            </span>
                                        </div>
                                        <div className="mt-4 flex space-x-2">
                                            <button
                                                className="px-3 py-1.5 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 flex items-center"
                                                title="Download file"
                                            >
                                                <MdDownload size={16} className="mr-1" /> Download
                                            </button>
                                            <button
                                                className="px-3 py-1.5 text-sm text-white bg-red-600 rounded hover:bg-red-700 flex items-center"
                                                onClick={() => {
                                                    handleDelete(selectedFile.id);
                                                    closeFilePreview();
                                                }}
                                                title="Delete file"
                                            >
                                                <MdDelete size={16} className="mr-1" /> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-2/3">
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                        <textarea
                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                            rows="3"
                                            placeholder="Add a description for this file..."
                                            value={selectedFile.description}
                                            readOnly
                                        ></textarea>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">File Details</label>
                                        <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-500">Uploaded by</span>
                                                <span className="text-sm text-gray-800">{selectedFile.uploadedBy}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-500">Upload date</span>
                                                <span className="text-sm text-gray-800">{new Date(selectedFile.uploadDate).toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-500">File size</span>
                                                <span className="text-sm text-gray-800">{formatFileSize(selectedFile.size)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-500">File type</span>
                                                <span className="text-sm text-gray-800">{selectedFile.type}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedFile.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                            {selectedFile.tags.length === 0 && (
                                                <span className="text-sm text-gray-500">No tags added</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Attachment;
