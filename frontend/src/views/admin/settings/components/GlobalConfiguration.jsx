import React, { useState } from "react";
import { MdSave, MdRefresh, MdHelpOutline, MdNotifications, MdSecurity, MdColorLens, MdStorage, MdOutlineSettingsSuggest, MdPeople, MdEmail, MdAccessTime } from "react-icons/md";
import { ThemeProvider, Card, CardBody, CardHeader, Switch } from "@material-tailwind/react";

const GlobalConfiguration = () => {
    // States for different configuration settings
    const [generalSettings, setGeneralSettings] = useState({
        systemName: "ProposalCek System",
        maintenanceMode: false,
        debugMode: false,
        defaultLanguage: "id",
    });

    const [securitySettings, setSecuritySettings] = useState({
        passwordExpiration: 90,
        twoFactorAuth: true,
        sessionTimeout: 30,
        loginAttempts: 5,
    });

    const [notificationSettings, setNotificationSettings] = useState({
        emailNotifications: true,
        smsNotifications: false,
        systemAlerts: true,
        deadlineReminders: true,
    });

    const [appearanceSettings, setAppearanceSettings] = useState({
        darkMode: false,
        highContrast: false,
        animationsEnabled: true,
        compactView: false,
    });

    const [storageSettings, setStorageSettings] = useState({
        maxFileSize: 10,
        allowedFileTypes: ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx",
        autoDeleteDrafts: 30,
        backupFrequency: "daily",
    });

    // Handler for saving all settings
    const handleSaveSettings = () => {
        // Here would be API calls to save the settings
        alert("Settings saved successfully!");
    };

    // Handler for resetting all settings
    const handleResetSettings = () => {
        if (window.confirm("Are you sure you want to reset all settings to default?")) {
            // Reset logic would go here
            alert("Settings reset to default values");
        }
    };

    // Function to handle general settings changes
    const handleGeneralChange = (e) => {
        const { name, value, type, checked } = e.target;
        setGeneralSettings({
            ...generalSettings,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Custom tooltip component to replace Material Tailwind's Tooltip
    const CustomTooltip = ({ content, children }) => {
        const [showTooltip, setShowTooltip] = useState(false);

        return (
            <div className="relative inline-block">
                <div
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                >
                    {children}
                </div>
                {showTooltip && (
                    <div className="absolute z-50 p-2 text-xs text-white bg-gray-800 rounded shadow-lg -mt-1 -ml-1 w-60 transform -translate-x-1/2 left-1/2 -bottom-10">
                        {content}
                    </div>
                )}
            </div>
        );
    };

    // Helper function for rendering a configuration card
    const ConfigCard = ({ title, icon, children }) => (
        <Card className="mb-6 overflow-hidden">
            <CardHeader
                color="blue"
                className="flex items-center p-4 mb-2"
                floated={false}
                shadow={false}
            >
                <div className="mr-2 flex items-center justify-center rounded-full bg-white/20 p-2">
                    {icon}
                </div>
                <h4 className="text-lg font-semibold text-white">{title}</h4>
            </CardHeader>
            <CardBody className="p-4">
                {children}
            </CardBody>
        </Card>
    );

    return (
        <ThemeProvider>
            <div className="global-configuration" data-aos="fade-up">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        Global Configuration
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                        Manage system-wide settings and preferences
                    </p>
                </div>

                <div className="flex flex-wrap justify-between mb-6">
                    <button
                        onClick={handleSaveSettings}
                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-200"
                    >
                        <MdSave className="text-lg" /> Save All Settings
                    </button>
                    <button
                        onClick={handleResetSettings}
                        className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all duration-200"
                    >
                        <MdRefresh className="text-lg" /> Reset to Defaults
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* General Settings */}
                    <ConfigCard title="General Settings" icon={<MdOutlineSettingsSuggest size={24} />}>
                        <div className="space-y-4">
                            <div className="form-group">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    System Name
                                </label>
                                <input
                                    type="text"
                                    name="systemName"
                                    value={generalSettings.systemName}
                                    onChange={handleGeneralChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                                        Maintenance Mode
                                    </span>
                                    <CustomTooltip content="Enable during system maintenance. All users except admins will be unable to access the system.">
                                        <MdHelpOutline className="text-gray-500 cursor-help" />
                                    </CustomTooltip>
                                </div>
                                <Switch
                                    color="blue"
                                    checked={generalSettings.maintenanceMode}
                                    onChange={() =>
                                        setGeneralSettings({
                                            ...generalSettings,
                                            maintenanceMode: !generalSettings.maintenanceMode,
                                        })
                                    }
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                                        Debug Mode
                                    </span>
                                    <CustomTooltip content="Enable detailed error messages and logging for troubleshooting.">
                                        <MdHelpOutline className="text-gray-500 cursor-help" />
                                    </CustomTooltip>
                                </div>
                                <Switch
                                    color="blue"
                                    checked={generalSettings.debugMode}
                                    onChange={() =>
                                        setGeneralSettings({
                                            ...generalSettings,
                                            debugMode: !generalSettings.debugMode,
                                        })
                                    }
                                />
                            </div>

                            <div className="form-group">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Default Language
                                </label>
                                <select
                                    name="defaultLanguage"
                                    value={generalSettings.defaultLanguage}
                                    onChange={handleGeneralChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="id">Bahasa Indonesia</option>
                                    <option value="en">English</option>
                                </select>
                            </div>
                        </div>
                    </ConfigCard>

                    {/* Security Settings */}
                    <ConfigCard title="Security Settings" icon={<MdSecurity size={24} />}>
                        <div className="space-y-4">
                            <div className="form-group">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Password Expiration (days)
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    max="365"
                                    value={securitySettings.passwordExpiration}
                                    onChange={(e) =>
                                        setSecuritySettings({
                                            ...securitySettings,
                                            passwordExpiration: parseInt(e.target.value),
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                                        Two-Factor Authentication
                                    </span>
                                    <CustomTooltip content="Require two-factor authentication for all users">
                                        <MdHelpOutline className="text-gray-500 cursor-help" />
                                    </CustomTooltip>
                                </div>
                                <Switch
                                    color="blue"
                                    checked={securitySettings.twoFactorAuth}
                                    onChange={() =>
                                        setSecuritySettings({
                                            ...securitySettings,
                                            twoFactorAuth: !securitySettings.twoFactorAuth,
                                        })
                                    }
                                />
                            </div>

                            <div className="form-group">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Session Timeout (minutes)
                                </label>
                                <input
                                    type="number"
                                    min="5"
                                    max="240"
                                    value={securitySettings.sessionTimeout}
                                    onChange={(e) =>
                                        setSecuritySettings({
                                            ...securitySettings,
                                            sessionTimeout: parseInt(e.target.value),
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="form-group">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Maximum Login Attempts
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    value={securitySettings.loginAttempts}
                                    onChange={(e) =>
                                        setSecuritySettings({
                                            ...securitySettings,
                                            loginAttempts: parseInt(e.target.value),
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </ConfigCard>

                    {/* Notification Settings */}
                    <ConfigCard title="Notification Settings" icon={<MdNotifications size={24} />}>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                                        Email Notifications
                                    </span>
                                </div>
                                <Switch
                                    color="blue"
                                    checked={notificationSettings.emailNotifications}
                                    onChange={() =>
                                        setNotificationSettings({
                                            ...notificationSettings,
                                            emailNotifications: !notificationSettings.emailNotifications,
                                        })
                                    }
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                                        SMS Notifications
                                    </span>
                                </div>
                                <Switch
                                    color="blue"
                                    checked={notificationSettings.smsNotifications}
                                    onChange={() =>
                                        setNotificationSettings({
                                            ...notificationSettings,
                                            smsNotifications: !notificationSettings.smsNotifications,
                                        })
                                    }
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                                        System Alerts
                                    </span>
                                    <CustomTooltip content="Show system alerts and notifications in the user interface">
                                        <MdHelpOutline className="text-gray-500 cursor-help" />
                                    </CustomTooltip>
                                </div>
                                <Switch
                                    color="blue"
                                    checked={notificationSettings.systemAlerts}
                                    onChange={() =>
                                        setNotificationSettings({
                                            ...notificationSettings,
                                            systemAlerts: !notificationSettings.systemAlerts,
                                        })
                                    }
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                                        Deadline Reminders
                                    </span>
                                    <CustomTooltip content="Send reminder notifications before important deadlines">
                                        <MdHelpOutline className="text-gray-500 cursor-help" />
                                    </CustomTooltip>
                                </div>
                                <Switch
                                    color="blue"
                                    checked={notificationSettings.deadlineReminders}
                                    onChange={() =>
                                        setNotificationSettings({
                                            ...notificationSettings,
                                            deadlineReminders: !notificationSettings.deadlineReminders,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </ConfigCard>

                    {/* Storage Settings */}
                    <ConfigCard title="Storage Settings" icon={<MdStorage size={24} />}>
                        <div className="space-y-4">
                            <div className="form-group">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Maximum File Size (MB)
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="50"
                                    value={storageSettings.maxFileSize}
                                    onChange={(e) =>
                                        setStorageSettings({
                                            ...storageSettings,
                                            maxFileSize: parseInt(e.target.value),
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="form-group">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Allowed File Types
                                </label>
                                <input
                                    type="text"
                                    value={storageSettings.allowedFileTypes}
                                    onChange={(e) =>
                                        setStorageSettings({
                                            ...storageSettings,
                                            allowedFileTypes: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Comma-separated list of file extensions (.pdf, .doc, etc.)
                                </p>
                            </div>

                            <div className="form-group">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Auto-Delete Drafts After (days)
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="365"
                                    value={storageSettings.autoDeleteDrafts}
                                    onChange={(e) =>
                                        setStorageSettings({
                                            ...storageSettings,
                                            autoDeleteDrafts: parseInt(e.target.value),
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Set to 0 to disable auto-deletion
                                </p>
                            </div>

                            <div className="form-group">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Backup Frequency
                                </label>
                                <select
                                    value={storageSettings.backupFrequency}
                                    onChange={(e) =>
                                        setStorageSettings({
                                            ...storageSettings,
                                            backupFrequency: e.target.value,
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="hourly">Hourly</option>
                                    <option value="daily">Daily</option>
                                    <option value="weekly">Weekly</option>
                                    <option value="monthly">Monthly</option>
                                </select>
                            </div>
                        </div>
                    </ConfigCard>

                    {/* Appearance Settings */}
                    <ConfigCard title="Appearance Settings" icon={<MdColorLens size={24} />}>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                                        Dark Mode
                                    </span>
                                </div>
                                <Switch
                                    color="blue"
                                    checked={appearanceSettings.darkMode}
                                    onChange={() =>
                                        setAppearanceSettings({
                                            ...appearanceSettings,
                                            darkMode: !appearanceSettings.darkMode,
                                        })
                                    }
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                                        High Contrast Mode
                                    </span>
                                    <CustomTooltip content="Improve visibility for users with visual impairments">
                                        <MdHelpOutline className="text-gray-500 cursor-help" />
                                    </CustomTooltip>
                                </div>
                                <Switch
                                    color="blue"
                                    checked={appearanceSettings.highContrast}
                                    onChange={() =>
                                        setAppearanceSettings({
                                            ...appearanceSettings,
                                            highContrast: !appearanceSettings.highContrast,
                                        })
                                    }
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                                        Enable Animations
                                    </span>
                                </div>
                                <Switch
                                    color="blue"
                                    checked={appearanceSettings.animationsEnabled}
                                    onChange={() =>
                                        setAppearanceSettings({
                                            ...appearanceSettings,
                                            animationsEnabled: !appearanceSettings.animationsEnabled,
                                        })
                                    }
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                                        Compact View
                                    </span>
                                    <CustomTooltip content="Reduce padding and spacing for denser UI layout">
                                        <MdHelpOutline className="text-gray-500 cursor-help" />
                                    </CustomTooltip>
                                </div>
                                <Switch
                                    color="blue"
                                    checked={appearanceSettings.compactView}
                                    onChange={() =>
                                        setAppearanceSettings({
                                            ...appearanceSettings,
                                            compactView: !appearanceSettings.compactView,
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </ConfigCard>

                    {/* User Defaults */}
                    <ConfigCard title="User Defaults" icon={<MdPeople size={24} />}>
                        <div className="space-y-4">
                            <div className="form-group">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Default User Role
                                </label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option>Dosen</option>
                                    <option>Wadir</option>
                                    <option>Reviewer</option>
                                    <option>Admin</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Default User Status
                                </label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option>Active</option>
                                    <option>Pending Approval</option>
                                    <option>Inactive</option>
                                </select>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                                        Auto-Approve New Users
                                    </span>
                                </div>
                                <Switch color="blue" />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                                        Email Verification Required
                                    </span>
                                </div>
                                <Switch color="blue" defaultChecked />
                            </div>
                        </div>
                    </ConfigCard>
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="text-blue-700 dark:text-blue-400 font-medium mb-2">System Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                            <p className="text-gray-500 dark:text-gray-400 text-sm">System Version</p>
                            <p className="text-gray-800 dark:text-gray-200 font-semibold">v1.0.0</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Last Update</p>
                            <p className="text-gray-800 dark:text-gray-200 font-semibold">April 25, 2025</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                            <p className="text-gray-500 dark:text-gray-400 text-sm">Database Version</p>
                            <p className="text-gray-800 dark:text-gray-200 font-semibold">MariaDB 10.6.12</p>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default GlobalConfiguration;
