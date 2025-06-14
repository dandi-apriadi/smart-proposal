import React, { useState, useEffect } from "react";
import {
    MdCloudUpload,
    MdDelete,
    MdEdit,
    MdInfo,
    MdSearch,
    MdFilterList,
    MdInsertChart,
    MdCompareArrows,
    MdDateRange,
    MdFileDownload,
    MdRefresh,
    MdWarning,
    MdAddCircle
} from "react-icons/md";

const DataSetManagement = () => {
    // State for managing datasets
    const [datasets, setDatasets] = useState([]);
    const [filteredDatasets, setFilteredDatasets] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");
    const [isUploading, setIsUploading] = useState(false);
    const [activeDataset, setActiveDataset] = useState(null);
    const [showStatsModal, setShowStatsModal] = useState(false);

    // Dummy data for demonstration
    useEffect(() => {
        const dummyData = [
            {
                id: 1,
                name: "Approved Proposals 2023",
                type: "training",
                size: "245 MB",
                records: 578,
                dateAdded: "2023-12-15",
                lastUsed: "2024-03-10",
                accuracy: 92.5,
                version: "1.3",
                status: "active",
                description: "Dataset containing approved proposals from 2023 academic year"
            },
            {
                id: 2,
                name: "Rejected Proposals 2023",
                type: "training",
                size: "189 MB",
                records: 412,
                dateAdded: "2023-12-18",
                lastUsed: "2024-03-10",
                accuracy: 88.7,
                version: "1.2",
                status: "active",
                description: "Dataset containing rejected proposals from 2023 academic year"
            },
            {
                id: 3,
                name: "Validation Set 2024",
                type: "validation",
                size: "84 MB",
                records: 150,
                dateAdded: "2024-01-20",
                lastUsed: "2024-03-15",
                accuracy: 90.2,
                version: "1.0",
                status: "active",
                description: "Dataset used for validating model performance"
            },
            {
                id: 4,
                name: "Test Proposals Q1 2024",
                type: "testing",
                size: "56 MB",
                records: 120,
                dateAdded: "2024-04-05",
                lastUsed: "2024-04-10",
                accuracy: 91.8,
                version: "1.0",
                status: "active",
                description: "Dataset for testing model against Q1 2024 proposals"
            },
            {
                id: 5,
                name: "Legacy Data 2022",
                type: "training",
                size: "320 MB",
                records: 743,
                dateAdded: "2022-12-10",
                lastUsed: "2023-11-05",
                accuracy: 85.3,
                version: "2.1",
                status: "archived",
                description: "Historical dataset from 2022 for reference purposes"
            }
        ];

        setDatasets(dummyData);
        setFilteredDatasets(dummyData);
    }, []);

    // Filter datasets based on search term and filter type
    useEffect(() => {
        let filtered = datasets;

        if (searchTerm) {
            filtered = filtered.filter(
                dataset =>
                    dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    dataset.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filterType !== "all") {
            filtered = filtered.filter(dataset => dataset.type === filterType);
        }

        setFilteredDatasets(filtered);
    }, [searchTerm, filterType, datasets]);

    // Stats summary calculation
    const statsSummary = {
        totalDatasets: datasets.length,
        totalRecords: datasets.reduce((sum, dataset) => sum + dataset.records, 0),
        totalSize: datasets.reduce(
            (sum, dataset) => sum + parseFloat(dataset.size),
            0
        ).toFixed(2),
        avgAccuracy: (
            datasets.reduce((sum, dataset) => sum + dataset.accuracy, 0) /
            datasets.length
        ).toFixed(1),
        datasetTypes: {
            training: datasets.filter(ds => ds.type === "training").length,
            testing: datasets.filter(ds => ds.type === "testing").length,
            validation: datasets.filter(ds => ds.type === "validation").length
        }
    };

    // Handle file drop for upload
    const handleDrop = event => {
        event.preventDefault();
        event.stopPropagation();
        setIsUploading(false);
        // In a real application, you would process the files here
        alert("Files would be processed for upload");
    };

    // Handle dataset details view
    const handleViewDetails = dataset => {
        setActiveDataset(dataset);
        setShowStatsModal(true);
    };

    return (
        <div className="w-full px-4" data-aos="fade-up" data-aos-duration="800">
            {/* Header section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Dataset Management</h1>
                    <p className="text-gray-600 mt-1">
                        Manage training, testing, and validation datasets for proposal validation model
                    </p>
                </div>
                <div className="mt-4 md:mt-0">
                    <button
                        className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300 shadow-md"
                        onClick={() => alert("Add new dataset functionality would go here")}
                    >
                        <MdAddCircle className="mr-2" size={20} />
                        <span>Add New Dataset</span>
                    </button>
                </div>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div
                    className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-500 text-sm">Total Datasets</p>
                            <h3 className="text-2xl font-bold">{statsSummary.totalDatasets}</h3>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-full">
                            <MdInsertChart size={24} className="text-blue-500" />
                        </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                        {statsSummary.datasetTypes.training} training,
                        {statsSummary.datasetTypes.testing} testing,
                        {statsSummary.datasetTypes.validation} validation
                    </div>
                </div>

                <div
                    className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-500"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-500 text-sm">Total Records</p>
                            <h3 className="text-2xl font-bold">{statsSummary.totalRecords.toLocaleString()}</h3>
                        </div>
                        <div className="p-3 bg-green-100 rounded-full">
                            <MdFileDownload size={24} className="text-green-500" />
                        </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                        Across all datasets
                    </div>
                </div>

                <div
                    className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-500"
                    data-aos="fade-up"
                    data-aos-delay="300"
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-500 text-sm">Total Size</p>
                            <h3 className="text-2xl font-bold">{statsSummary.totalSize} MB</h3>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-full">
                            <MdCompareArrows size={24} className="text-purple-500" />
                        </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                        Storage utilized by datasets
                    </div>
                </div>

                <div
                    className="bg-white rounded-lg shadow-md p-4 border-l-4 border-orange-500"
                    data-aos="fade-up"
                    data-aos-delay="400"
                >
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-500 text-sm">Average Accuracy</p>
                            <h3 className="text-2xl font-bold">{statsSummary.avgAccuracy}%</h3>
                        </div>
                        <div className="p-3 bg-orange-100 rounded-full">
                            <MdInfo size={24} className="text-orange-500" />
                        </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                        Based on model performance
                    </div>
                </div>
            </div>

            {/* Upload zone */}
            <div
                className="mb-6 bg-white rounded-lg shadow-md p-6"
                data-aos="fade-up"
                data-aos-delay="500"
            >
                <h2 className="text-lg font-semibold mb-4">Upload New Dataset</h2>

                <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${isUploading ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                        }`}
                    onDragOver={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsUploading(true);
                    }}
                    onDragLeave={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsUploading(false);
                    }}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById("fileInput").click()}
                >
                    <input
                        id="fileInput"
                        type="file"
                        className="hidden"
                        multiple
                        onChange={(e) => alert(`Selected ${e.target.files.length} files`)}
                    />
                    <MdCloudUpload className="mx-auto text-gray-400 text-5xl mb-4" />
                    <p className="text-gray-600 mb-2">
                        Drag and drop dataset files here, or click to browse
                    </p>
                    <p className="text-gray-500 text-sm">
                        Supported formats: CSV, JSON, Excel (.xlsx, .xls)
                    </p>
                </div>
            </div>

            {/* Search and filter */}
            <div className="mb-6 flex flex-col md:flex-row gap-4">
                <div className="flex-grow relative">
                    <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Search datasets by name or description..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center">
                    <label className="mr-2 text-gray-600">Filter by:</label>
                    <select
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="all">All Types</option>
                        <option value="training">Training</option>
                        <option value="testing">Testing</option>
                        <option value="validation">Validation</option>
                    </select>
                </div>
            </div>

            {/* Dataset list */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden" data-aos="fade-up" data-aos-delay="600">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Type
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Size
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Records
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Added
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredDatasets.length > 0 ? (
                                filteredDatasets.map((dataset) => (
                                    <tr key={dataset.id} className="hover:bg-gray-50 transition-colors duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{dataset.name}</div>
                                                    <div className="text-sm text-gray-500">{dataset.description.substring(0, 50)}...</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${dataset.type === 'training' ? 'bg-green-100 text-green-800' :
                                                    dataset.type === 'testing' ? 'bg-blue-100 text-blue-800' :
                                                        'bg-purple-100 text-purple-800'}`}>
                                                {dataset.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {dataset.size}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {dataset.records.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(dataset.dateAdded).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${dataset.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                {dataset.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleViewDetails(dataset)}
                                                className="text-indigo-600 hover:text-indigo-900 mr-3"
                                            >
                                                <MdInfo size={20} />
                                            </button>
                                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                                                <MdEdit size={20} />
                                            </button>
                                            <button className="text-red-600 hover:text-red-900">
                                                <MdDelete size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                                        <div className="flex flex-col items-center py-6">
                                            <MdWarning size={36} className="text-gray-400 mb-2" />
                                            <p>No datasets found matching your criteria.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Dataset detail modal */}
            {showStatsModal && activeDataset && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto" data-aos="zoom-in" data-aos-duration="300">
                        <div className="flex justify-between items-center border-b p-4">
                            <h3 className="text-xl font-bold text-gray-800">Dataset Details</h3>
                            <button
                                onClick={() => setShowStatsModal(false)}
                                className="text-gray-600 hover:text-gray-900"
                            >
                                ×
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-md font-semibold mb-4 text-gray-700 border-b pb-2">Basic Information</h4>

                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-sm text-gray-500">Name</p>
                                            <p className="font-medium">{activeDataset.name}</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500">Description</p>
                                            <p>{activeDataset.description}</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Type</p>
                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${activeDataset.type === 'training' ? 'bg-green-100 text-green-800' :
                                                        activeDataset.type === 'testing' ? 'bg-blue-100 text-blue-800' :
                                                            'bg-purple-100 text-purple-800'}`}>
                                                    {activeDataset.type}
                                                </span>
                                            </div>

                                            <div>
                                                <p className="text-sm text-gray-500">Status</p>
                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${activeDataset.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                    {activeDataset.status}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Size</p>
                                                <p>{activeDataset.size}</p>
                                            </div>

                                            <div>
                                                <p className="text-sm text-gray-500">Records</p>
                                                <p>{activeDataset.records.toLocaleString()}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-500">Date Added</p>
                                                <p>{new Date(activeDataset.dateAdded).toLocaleDateString()}</p>
                                            </div>

                                            <div>
                                                <p className="text-sm text-gray-500">Last Used</p>
                                                <p>{new Date(activeDataset.lastUsed).toLocaleDateString()}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500">Version</p>
                                            <p>{activeDataset.version}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-md font-semibold mb-4 text-gray-700 border-b pb-2">Performance Metrics</h4>

                                    {/* This would contain charts in a real implementation */}
                                    <div className="bg-gray-50 p-4 rounded-lg h-64 flex items-center justify-center">
                                        <p className="text-gray-500 text-center">
                                            Performance visualization would appear here showing accuracy metrics, confusion matrix, and feature importance.
                                        </p>
                                    </div>

                                    <div className="mt-6">
                                        <h4 className="text-md font-semibold mb-4 text-gray-700 border-b pb-2">Actions</h4>

                                        <div className="flex flex-wrap gap-2">
                                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
                                                <MdFileDownload className="mr-1" /> Download
                                            </button>

                                            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center">
                                                <MdRefresh className="mr-1" /> Retrain Model
                                            </button>

                                            <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center">
                                                <MdEdit className="mr-1" /> Edit Metadata
                                            </button>

                                            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center">
                                                <MdDelete className="mr-1" /> Delete Dataset
                                            </button>
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

export default DataSetManagement;
