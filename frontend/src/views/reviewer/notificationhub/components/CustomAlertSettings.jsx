import React, { useState } from 'react';
import {
    HiOutlineBell, HiOutlineMail, HiOutlineChat, HiOutlineClipboardCheck,
    HiOutlineChatAlt, HiOutlineDocumentReport, HiOutlineSave,
    HiOutlineRefresh, HiOutlineArrowLeft
} from 'react-icons/hi';

const CustomAlertSettings = () => {
    // State for notification settings
    const [settings, setSettings] = useState({
        proposals: {
            email: true,
            push: false,
            frequency: 'immediate'
        },
        comments: {
            email: true,
            push: true,
            frequency: 'daily'
        },
        reviews: {
            email: true,
            push: true,
            frequency: 'immediate'
        },
        system: {
            email: false,
            push: true,
            frequency: 'weekly'
        },
        reports: {
            email: true,
            push: false,
            frequency: 'daily'
        }
    });

    const handleToggleChange = (category, type) => {
        setSettings({
            ...settings,
            [category]: {
                ...settings[category],
                [type]: !settings[category][type]
            }
        });
    };

    const handleFrequencyChange = (category, value) => {
        setSettings({
            ...settings,
            [category]: {
                ...settings[category],
                frequency: value
            }
        });
    };

    const saveSettings = () => {
        // API call to save settings would go here
        console.log('Saving settings:', settings);
        // Show success notification
    };

    const resetSettings = () => {
        // Reset to default settings
        console.log('Reset settings');
    };

    // Category icons mapping
    const categoryIcons = {
        proposals: <HiOutlineClipboardCheck className="text-blue-500 w-5 h-5" />,
        comments: <HiOutlineChatAlt className="text-blue-500 w-5 h-5" />,
        reviews: <HiOutlineDocumentReport className="text-blue-500 w-5 h-5" />,
        system: <HiOutlineBell className="text-blue-500 w-5 h-5" />,
        reports: <HiOutlineDocumentReport className="text-blue-500 w-5 h-5" />
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex items-center mb-6">
                <button className="mr-3 p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <HiOutlineArrowLeft className="w-5 h-5" />
                </button>
                <h1 className="text-2xl md:text-3xl font-bold">Notification Settings</h1>
            </div>

            <p className="text-gray-600 mb-6">
                Configure how and when you want to receive notifications about proposals, reviews, and system updates.
            </p>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <div className="mb-6">
                    <div className="flex flex-wrap items-center gap-4">
                        <h2 className="text-lg font-medium">All Notifications</h2>
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={Object.values(settings).some(s => s.email || s.push)}
                                onChange={() => {
                                    const allEnabled = Object.values(settings).every(s => s.email && s.push);
                                    const newValue = !allEnabled;
                                    const newSettings = { ...settings };

                                    Object.keys(newSettings).forEach(key => {
                                        newSettings[key].email = newValue;
                                        newSettings[key].push = newValue;
                                    });

                                    setSettings(newSettings);
                                }}
                            />
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            <span className="ms-3">Toggle all notifications</span>
                        </label>
                    </div>
                </div>

                <hr className="my-6 border-gray-200" />

                {Object.entries(settings).map(([category, options]) => (
                    <div key={category} className="mb-8">
                        <div className="flex flex-col md:flex-row md:gap-6">
                            <div className="mb-4 md:mb-0 md:w-1/3 flex items-center">
                                <div className="flex items-center">
                                    {categoryIcons[category]}
                                    <h3 className="ml-2 text-lg capitalize">{category} Notifications</h3>
                                </div>
                            </div>

                            <div className="md:w-2/3">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={options.email}
                                            onChange={() => handleToggleChange(category, 'email')}
                                        />
                                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        <span className="ms-3 flex items-center">
                                            <HiOutlineMail className="mr-1 w-4 h-4" />
                                            Email
                                        </span>
                                    </label>

                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            checked={options.push}
                                            onChange={() => handleToggleChange(category, 'push')}
                                        />
                                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        <span className="ms-3 flex items-center">
                                            <HiOutlineChat className="mr-1 w-4 h-4" />
                                            Push
                                        </span>
                                    </label>

                                    <div className="relative">
                                        <select
                                            className="block w-full rounded-md border-gray-300 bg-white py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            value={options.frequency}
                                            onChange={(e) => handleFrequencyChange(category, e.target.value)}
                                        >
                                            <option value="immediate">Immediate</option>
                                            <option value="daily">Daily Digest</option>
                                            <option value="weekly">Weekly Digest</option>
                                        </select>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3z" clipRule="evenodd" />
                                                <path fillRule="evenodd" d="M10 17a.75.75 0 01-.55-.24l-3.25-3.5a.75.75 0 111.1-1.02L10 15.148l2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5A.75.75 0 0110 17z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {category !== Object.keys(settings).slice(-1)[0] && (
                            <hr className="my-6 border-gray-200" />
                        )}
                    </div>
                ))}
            </div>

            <div className="flex justify-end gap-4">
                <button
                    className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    onClick={resetSettings}
                >
                    <HiOutlineRefresh className="mr-2 w-5 h-5" />
                    Reset to Default
                </button>
                <button
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    onClick={saveSettings}
                >
                    <HiOutlineSave className="mr-2 w-5 h-5" />
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default CustomAlertSettings;
