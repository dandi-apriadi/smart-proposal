import React from "react";
// Icon Imports
import {
    MdPerson,
    MdRemove,
    MdExitToApp,
    MdDashboard,
    MdAssignment,
    MdDescription,
    MdCreate,
    MdEdit,
    MdDelete,
    MdGroup,
    MdRuleFolder,
    MdNotifications,
    MdAccessTime,
    MdTimeline,
    MdFileDownload,
    MdAssessment,
    MdAttachFile,
    MdHistory,
    MdBuild,
    MdBookmark,
    MdFeedback,
    MdWarning,
    MdSettingsApplications,
    MdContactSupport,
    MdHelp,
    MdVideoLibrary,
    MdLibraryBooks,
    MdLock,
    MdLink,
    MdVpnKey,
    MdCalendarToday,
    MdMessage,
    MdInsights,
    MdTrackChanges,
    MdEmojiEvents,
    MdErrorOutline,
    MdOutlineWatchLater
} from "react-icons/md";
import Profile from "views/shared/profile";
import Logout from "views/auth/Logout";
import MainDashboard from "views/dosen/default";
import ProposalTracker from "views/dosen/default/components/ProposalTracker";
import SessionTimeline from "views/dosen/default/components/SessionTimeline";
import RecentActivity from "views/dosen/default/components/RecentActivity";
import NotificationCenter from "views/dosen/default/components/NotificationCenter";
import DeadlineAlert from "views/dosen/default/components/DeadlineAlert";
import UpcomingTask from "views/dosen/default/components/UpcomingTask";
import NotificationHub from "views/dosen/notification";
import ProposalWorkspace from "views/dosen/proposal-workspace";
import DeadlineReminder from "views/dosen/notification/components/DeadlineReminder";
import ImportantAlert from "views/dosen/notification/components/ImportantAlert";
import FeedbackNotification from "views/dosen/notification/components/FeedbackNotification";
import AlertSetting from "views/dosen/notification/components/AlertSetting";
import ActivityTracker from "views/dosen/activity";
import TimelineView from "views/dosen/activity/components/TimelineView";
import RecentAction from "views/dosen/activity/components/RecentActions";
import ExportHistory from "views/dosen/activity/components/ExportHistory";
import ProgressReporting from "views/dosen/progres-reporting";
import ProgresTemplate from "views/dosen/progres-reporting/components/ProgresTemplate";
import ProgresVisualization from "views/dosen/progres-reporting/components/ProgresVisualization";
import Attachment from "views/dosen/progres-reporting/components/Attachment";
import ReviewHistory from "views/dosen/progres-reporting/components/ReviewHistory";
import FinalReporting from "views/dosen/final-reporting";
import LaporanAkhirBuilder from "views/dosen/final-reporting/components/LaporanAkhirBUilder";
import SupportingDocumentation from "views/dosen/final-reporting/components/SupportingDocumentation";
import SubmissionStatus from "views/dosen/final-reporting/components/SubmissionStatus";
import FeedbackManagement from "views/dosen/final-reporting/components/FeedbackManagement";
import IssueManagement from "views/dosen/issue-management";
import ResourceCenter from "views/dosen/resource-center";
import DocumentationLibrary from "views/dosen/resource-center/components/DocumentationLibrary";
import FaqDatabase from "views/dosen/resource-center/components/FaqDatabase";
import VideoTutorial from "views/dosen/resource-center/components/VideoTutorial";
import ContactSupport from "views/dosen/resource-center/components/ContactSupport";
const routes = [
    {
        name: "Dashboard",
        layout: "/dosen",
        path: "default",
        icon: <MdDashboard className="h-6 w-6" />,
        component: <MainDashboard />,
    },
    {
        name: "Proposal Status Tracker",
        layout: "/dosen",
        parentPath: "default",
        path: "proposal-status-tracker",
        icon: <MdTrackChanges className="h-6 w-6 ml-10" />,
        component: <ProposalTracker />,
        secondary: true,
    },
    {
        name: "Session Timeline",
        layout: "/dosen",
        parentPath: "default",
        path: "session-timeline",
        icon: <MdTimeline className="h-6 w-6 ml-10" />,
        component: <SessionTimeline />,
        secondary: true,
    },
    {
        name: "Notification Center",
        layout: "/dosen",
        parentPath: "default",
        path: "notification-center",
        icon: <MdNotifications className="h-6 w-6 ml-10" />,
        component: <NotificationCenter />,
        secondary: true,
    },
    {
        name: "Recent Activities",
        layout: "/dosen",
        parentPath: "default",
        path: "recent-activities",
        icon: <MdAccessTime className="h-6 w-6 ml-10" />,
        component: <RecentActivity />,
        secondary: true,
    },
    {
        name: "Deadline Alerts",
        layout: "/dosen",
        parentPath: "default",
        path: "deadline-alerts",
        icon: <MdOutlineWatchLater className="h-6 w-6 ml-10" />,
        component: <DeadlineAlert />,
        secondary: true,
    },
    {
        name: "Upcoming Tasks",
        layout: "/dosen",
        parentPath: "default",
        path: "upcoming-tasks",
        icon: <MdCalendarToday className="h-6 w-6 ml-10" />,
        component: <UpcomingTask />,
        secondary: true,
    },
    {
        name: "Profile Management",
        layout: "/dosen",
        path: "profile",
        icon: <MdPerson className="h-6 w-6" />,
        component: <Profile />,
    },
    {
        name: "Proposal Workspace",
        layout: "/dosen",
        path: "proposal-workspace",
        icon: <MdAssignment className="h-6 w-6" />,
        component: <ProposalWorkspace />,
    },
    {
        name: "Notification Hub",
        layout: "/dosen",
        path: "notification-hub",
        icon: <MdNotifications className="h-6 w-6" />,
        component: <NotificationHub />,
    },
    {
        name: "Important Alerts",
        layout: "/dosen",
        parentPath: "notification-hub",
        path: "important-alerts",
        icon: <MdWarning className="h-6 w-6 ml-10" />,
        component: <ImportantAlert />,
        secondary: true,
    },
    {
        name: "Deadline Reminders",
        layout: "/dosen",
        parentPath: "notification-hub",
        path: "deadline-reminders",
        icon: <MdCalendarToday className="h-6 w-6 ml-10" />,
        component: <DeadlineReminder />,
        secondary: true,
    },
    {
        name: "Feedback Notifications",
        layout: "/dosen",
        parentPath: "notification-hub",
        path: "feedback-notifications",
        icon: <MdFeedback className="h-6 w-6 ml-10" />,
        component: <FeedbackNotification />,
        secondary: true,
    },
    {
        name: "Alert Settings",
        layout: "/dosen",
        parentPath: "notification-hub",
        path: "alert-settings",
        icon: <MdSettingsApplications className="h-6 w-6 ml-10" />,
        component: <AlertSetting />,
        secondary: true,
    },
    {
        name: "Activity Tracker",
        layout: "/dosen",
        path: "activity-tracker",
        icon: <MdAccessTime className="h-6 w-6" />,
        component: <ActivityTracker />,
    },
    {
        name: "Recent Actions",
        layout: "/dosen",
        parentPath: "activity-tracker",
        path: "recent-actions",
        icon: <MdHistory className="h-6 w-6 ml-10" />,
        component: <RecentAction />,
        secondary: true,
    },
    {
        name: "Timeline View",
        layout: "/dosen",
        parentPath: "activity-tracker",
        path: "timeline-view",
        icon: <MdTimeline className="h-6 w-6 ml-10" />,
        component: <TimelineView />,
        secondary: true,
    },
    {
        name: "Export History",
        layout: "/dosen",
        parentPath: "activity-tracker",
        path: "export-history",
        icon: <MdFileDownload className="h-6 w-6 ml-10" />,
        component: <ExportHistory />,
        secondary: true,
    },
    {
        name: "Progress Reporting",
        layout: "/dosen",
        path: "progress-reporting",
        icon: <MdAssessment className="h-6 w-6" />,
        component: <ProgressReporting />,
    },
    {
        name: "Progress Templates",
        layout: "/dosen",
        parentPath: "progress-reporting",
        path: "progress-templates",
        icon: <MdDescription className="h-6 w-6 ml-10" />,
        component: <ProgresTemplate />,
        secondary: true,
    },
    {
        name: "Progress Visualization",
        layout: "/dosen",
        parentPath: "progress-reporting",
        path: "progress-visualization",
        icon: <MdInsights className="h-6 w-6 ml-10" />,
        component: <ProgresVisualization />,
        secondary: true,
    },
    {
        name: "Attachment Management",
        layout: "/dosen",
        parentPath: "progress-reporting",
        path: "attachment-management",
        icon: <MdAttachFile className="h-6 w-6 ml-10" />,
        component: <Attachment />,
        secondary: true,
    },
    {
        name: "Review History",
        layout: "/dosen",
        parentPath: "progress-reporting",
        path: "review-history",
        icon: <MdHistory className="h-6 w-6 ml-10" />,
        component: <ReviewHistory />,
        secondary: true,
    },
    {
        name: "Final Reporting",
        layout: "/dosen",
        path: "final-reporting",
        icon: <MdDescription className="h-6 w-6" />,
        component: <FinalReporting />,
    },
    {
        name: "Laporan Akhir Builder",
        layout: "/dosen",
        parentPath: "final-reporting",
        path: "laporan-akhir-builder",
        icon: <MdCreate className="h-6 w-6 ml-10" />,
        component: <LaporanAkhirBuilder />,
        secondary: true,
    },
    {
        name: "Supporting Documentation",
        layout: "/dosen",
        parentPath: "final-reporting",
        path: "supporting-documentation",
        icon: <MdAttachFile className="h-6 w-6 ml-10" />,
        component: <SupportingDocumentation />,
        secondary: true,
    },
    {
        name: "Submission Status",
        layout: "/dosen",
        parentPath: "final-reporting",
        path: "submission-status",
        icon: <MdAssessment className="h-6 w-6 ml-10" />,
        component: <SubmissionStatus />,
        secondary: true,
    },
    {
        name: "Feedback Management",
        layout: "/dosen",
        parentPath: "final-reporting",
        path: "feedback-management",
        icon: <MdFeedback className="h-6 w-6 ml-10" />,
        component: <FeedbackManagement />,
        secondary: true,
    },
    {
        name: "Issue Management",
        layout: "/dosen",
        path: "issue-management",
        icon: <MdErrorOutline className="h-6 w-6" />,
        component: <IssueManagement />,
    },
    {
        name: "Resource Center",
        layout: "/dosen",
        path: "resource-center",
        icon: <MdHelp className="h-6 w-6" />,
        component: <ResourceCenter />,
    },
    {
        name: "Documentation Library",
        layout: "/dosen",
        parentPath: "resource-center",
        path: "documentation-library",
        icon: <MdLibraryBooks className="h-6 w-6 ml-10" />,
        component: <DocumentationLibrary />,
        secondary: true,
    },
    {
        name: "FAQ Database",
        layout: "/dosen",
        parentPath: "resource-center",
        path: "faq-database",
        icon: <MdHelp className="h-6 w-6 ml-10" />,
        component: <FaqDatabase />,
        secondary: true,
    },
    {
        name: "Video Tutorials",
        layout: "/dosen",
        parentPath: "resource-center",
        path: "video-tutorials",
        icon: <MdVideoLibrary className="h-6 w-6 ml-10" />,
        component: <VideoTutorial />,
        secondary: true,
    },
    {
        name: "Contact Support",
        layout: "/dosen",
        parentPath: "resource-center",
        path: "contact-support",
        icon: <MdContactSupport className="h-6 w-6 ml-10" />,
        component: <ContactSupport />,
        secondary: true,
    },
    {
        name: "Logout",
        layout: "/dosen",
        path: "logout",
        icon: <MdExitToApp className="h-6 w-6" />,
        component: <Logout />,
    },
];

export default routes;