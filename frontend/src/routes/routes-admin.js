import React from "react";
// Admin Imports
import MainDashboard from "views/admin/default";
import Profile from "views/shared/profile";
import Logout from "views/auth/Logout";
import TrainingManagement from "views/admin/training-management";
import Settings from "views/admin/settings";
import ProposalReviews from "views/admin/proposal-management/components/proposalReviews";
import TemplateProposal from "views/admin/proposal-management/components/proposalTemplate";
import SystemOverview from "views/admin/default/components/SystemOverview";
import UserActivityMetrics from "views/admin/default/components/UserActivity";
import ActiveSession from "views/admin/default/components/ActiveSession";
import ProposalStatistics from "views/admin/default/components/ProposalStatistics";
import UserManagement from "views/admin/usermanagement";
import UserAnalisis from "views/admin/usermanagement/components/UserAnalisis";
import AccountSetting from "views/admin/usermanagement/components/AccountSetting";
// Icon Imports
import {
  MdHome,
  MdRemove,
  MdExitToApp,
  MdPerson,
  MdSchool,
  MdAnalytics,
  MdRateReview,
  MdDescription,
  MdSettings,
  MdPeople,
  MdAssignment,
  MdCalendarToday,
  MdMonitor,
  MdNotifications,
  MdTimeline,
  MdAssessment,
  MdStorage,
  MdDashboard,
  MdFolder,
  MdSupervisorAccount,
  MdMonitorHeart,
  MdDataset,
  MdTune,
  MdHistory,
  MdInsights,
  MdMessage,
  MdNotificationsActive,
  MdEmail,
  MdFilterList,
  MdFileDownload,
  MdShowChart,
  MdAttachFile,
  MdSchedule,
  MdBackup,
  MdHealthAndSafety
} from "react-icons/md";
import AddNewUser from "views/admin/usermanagement/components/AddNewUser";
import ProposalManagement from "views/wadir/proposal-management";
import ProposalAnalytics from "views/admin/proposal-management/components/proposalAnalitics";
import Calendar from "views/admin/session-management/components/Calender";
import SessionManagement from "views/admin/session-management";
import CreateNewSession from "views/admin/session-management/components/CreateNewSession";
import SessionAnalytics from "views/admin/session-management/components/SessionAnalitics";
import DataSetManagement from "views/admin/training-management/components/DataSetManagement";
import TrainingHistory from "views/admin/training-management/components/TrainingHistory";
import ModelConfiguration from "views/admin/training-management/components/ModelConfiguration";
import PredictionAnalitics from "views/admin/training-management/components/PredictionAnalitics";
import SystemMonitoring from "views/admin/system-monitoring";
import UserReports from "views/admin/system-monitoring/components/UserReports";
import ActivityLogs from "views/admin/system-monitoring/components/ActivityLogs";
import Notification from "views/admin/notification";
import MessageCenter from "views/admin/notification/components/MessageCenter";
import BulkActions from "views/admin/notification/components/BulkActions";
import GlobalConfiguration from "views/admin/settings/components/GlobalConfiguration";
import BackupAndRecovery from "views/admin/settings/components/BackupAndRecovery";
import SystemHealth from "views/admin/settings/components/SystemHealth";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "System Overview",
    layout: "/admin",
    parentPath: "default",
    path: "system-overview",
    icon: <MdDashboard className="h-6 w-6 ml-10" />,
    component: <SystemOverview />,
    secondary: true,
  },
  {
    name: "Active Session Status",
    layout: "/admin",
    parentPath: "default",
    path: "active-session-status",
    icon: <MdCalendarToday className="h-6 w-6 ml-10" />,
    component: <ActiveSession />,
    secondary: true,
  },
  {
    name: "User Activity Metrics",
    layout: "/admin",
    parentPath: "default",
    path: "user-activity-metrics",
    icon: <MdAnalytics className="h-6 w-6 ml-10" />,
    component: <UserActivityMetrics />,
    secondary: true,
  },
  {
    name: "Proposal Statistics",
    layout: "/admin",
    parentPath: "default",
    path: "proposal-statistics",
    icon: <MdInsights className="h-6 w-6 ml-10" />,
    component: <ProposalStatistics />,
    secondary: true,
  },
  {
    name: "User Management",
    layout: "/admin",
    path: "user-management",
    icon: <MdPeople className="h-6 w-6" />,
    component: <UserManagement />,
  },
  {
    name: "User Analytics",
    layout: "/admin",
    parentPath: "user-management",
    path: "user-analytics",
    icon: <MdAnalytics className="h-6 w-6 ml-10" />,
    component: <UserAnalisis />,
    secondary: true,
  },
  {
    name: "Add New User",
    layout: "/admin",
    parentPath: "user-management",
    path: "add-new-user",
    icon: <MdPeople className="h-6 w-6 ml-10" />,
    component: <AddNewUser />,
    secondary: true,
  },
  {
    name: "Account Actions",
    layout: "/admin",
    parentPath: "user-management",
    path: "account-actions",
    icon: <MdSettings className="h-6 w-6 ml-10" />,
    component: <AccountSetting />,
    secondary: true,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Proposal Management",
    layout: "/admin",
    path: "proposal-management",
    icon: <MdAssignment className="h-6 w-6" />,
    component: <ProposalManagement />,
  },
  {
    name: "Proposal Analytics",
    layout: "/admin",
    parentPath: "proposal-management",
    path: "proposal-analytics",
    icon: <MdInsights className="h-6 w-6 ml-10" />,
    component: <ProposalAnalytics />,
    secondary: true,
  },
  {
    name: "Template Library",
    layout: "/admin",
    parentPath: "proposal-management",
    path: "proposal-template",
    icon: <MdDescription className="h-6 w-6 ml-10" />,
    component: <TemplateProposal />,
    secondary: true,
  },
  {
    name: "Proposal Review Queue",
    layout: "/admin",
    parentPath: "proposal-management",
    path: "proposal-reviews",
    icon: <MdRateReview className="h-6 w-6 ml-10" />,
    component: <ProposalReviews />,
    secondary: true,
  },
  {
    name: "Session Management",
    layout: "/admin",
    path: "session-management",
    icon: <MdCalendarToday className="h-6 w-6" />,
    component: <SessionManagement />,
  },
  {
    name: "Session Calendar",
    layout: "/admin",
    parentPath: "session-management",
    path: "session-calendar",
    icon: <MdCalendarToday className="h-6 w-6 ml-10" />,
    component: <Calendar />,
    secondary: true,
  },
  {
    name: "Session Analytics",
    layout: "/admin",
    parentPath: "session-management",
    path: "session-analytics",
    icon: <MdAnalytics className="h-6 w-6 ml-10" />,
    component: <SessionAnalytics />,
    secondary: true,
  },
  {
    name: "Create New Session",
    layout: "/admin",
    parentPath: "session-management",
    path: "create-session",
    icon: <MdSchedule className="h-6 w-6 ml-10" />,
    component: <CreateNewSession />,
    secondary: true,
  },
  {
    name: "Training Management",
    layout: "/admin",
    path: "training-management",
    icon: <MdSchool className="h-6 w-6" />,
    component: <TrainingManagement />,
  },
  {
    name: "Dataset Management",
    layout: "/admin",
    parentPath: "training-management",
    path: "dataset-management",
    icon: <MdDataset className="h-6 w-6 ml-10" />,
    component: <DataSetManagement />,
    secondary: true,
  },
  {
    name: "Model Configuration",
    layout: "/admin",
    parentPath: "training-management",
    path: "model-configuration",
    icon: <MdTune className="h-6 w-6 ml-10" />,
    component: <ModelConfiguration />,
    secondary: true,
  },
  {
    name: "Training History",
    layout: "/admin",
    parentPath: "training-management",
    path: "training-history",
    icon: <MdHistory className="h-6 w-6 ml-10" />,
    component: <TrainingHistory />,
    secondary: true,
  },
  {
    name: "Prediction Analytics",
    layout: "/admin",
    parentPath: "training-management",
    path: "prediction-analytics",
    icon: <MdInsights className="h-6 w-6 ml-10" />,
    component: <PredictionAnalitics />,
    secondary: true,
  },
  {
    name: "System Monitoring",
    layout: "/admin",
    path: "system-monitoring",
    icon: <MdMonitor className="h-6 w-6" />,
    component: <SystemMonitoring />,
  },
  {
    name: "Activity Logs",
    layout: "/admin",
    parentPath: "system-monitoring",
    path: "activity-logs",
    icon: <MdMonitorHeart className="h-6 w-6 ml-10" />,
    component: <ActivityLogs />,
    secondary: true,
  },
  {
    name: "User Reports",
    layout: "/admin",
    parentPath: "system-monitoring",
    path: "user-reports",
    icon: <MdAssessment className="h-6 w-6 ml-10" />,
    component: <UserReports />,
    secondary: true,
  },
  {
    name: "Notification Center",
    layout: "/admin",
    path: "notification-center",
    icon: <MdNotifications className="h-6 w-6" />,
    component: <Notification />,
  },
  {
    name: "Message Center",
    layout: "/admin",
    parentPath: "notification-center",
    path: "message-center",
    icon: <MdMessage className="h-6 w-6 ml-10" />,
    component: <MessageCenter />,
    secondary: true,
  },
  {
    name: "Bulk Actions",
    layout: "/admin",
    parentPath: "notification-center",
    path: "bulk-actions",
    icon: <MdFilterList className="h-6 w-6 ml-10" />,
    component: <BulkActions />,
    secondary: true,
  },
  {
    name: "Settings",
    layout: "/admin",
    path: "settings",
    icon: <MdSettings className="h-6 w-6" />,
    component: <Settings />,
  },
  {
    name: "Global Configuration",
    layout: "/admin",
    parentPath: "settings",
    path: "global-configuration",
    icon: <MdTune className="h-6 w-6 ml-10" />,
    component: <GlobalConfiguration />,
    secondary: true,
  },
  {
    name: "Backup & Recovery",
    layout: "/admin",
    parentPath: "settings",
    path: "backup-recovery",
    icon: <MdBackup className="h-6 w-6 ml-10" />,
    component: <BackupAndRecovery />,
    secondary: true,
  },
  {
    name: "System Health",
    layout: "/admin",
    parentPath: "settings",
    path: "system-health",
    icon: <MdHealthAndSafety className="h-6 w-6 ml-10" />,
    component: <SystemHealth />,
    secondary: true,
  },
  {
    name: "Logout",
    layout: "/admin",
    path: "logout",
    icon: <MdExitToApp className="h-6 w-6" />,
    component: <Logout />,
  },
];

export default routes;