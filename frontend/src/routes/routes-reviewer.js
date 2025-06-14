import React from "react";
// Icon Imports
import {
    MdPerson,
    MdRemove,
    MdExitToApp,
    MdDashboard,
    MdAssignment,
    MdSettings,
    MdNotifications,
    MdAccessTime,
    MdTimeline,
    MdFileDownload,
    MdCalendarToday,
    MdMap,
    MdQueue,
    MdInsertChart,
    MdPersonalVideo,
    MdSchool,
    MdEventAvailable,
    MdEmail,
    MdLock,
    MdList,
    MdDescription,
    MdCompareArrows,
    MdAssessment,
    MdLibraryBooks,
    MdBuild,
    MdHistory,
    MdGroup,
    MdAssignmentTurnedIn,
    MdWarning,
    MdOutlineWatchLater,
    MdFeedback,
    MdSwapHoriz,
    MdOutlineNotificationsActive,
    MdEventNote
} from "react-icons/md";
import Profile from "views/shared/profile";
import Logout from "views/auth/Logout";
import MainDashboard from "views/reviewer/default"; // Temporary component for demonstration
import ActiveSession from "views/reviewer/default/components/ActiveSession";
import ReviewQueueStatus from "views/reviewer/default/components/ReviewQueueStatus";
import ProposalDistributionMap from "views/reviewer/default/components/ProposalDistributionMap";
import UpcomingTask from "views/dosen/default/components/UpcomingTask";
import UpcomingDeadline from "views/reviewer/default/components/UpcomingDeadline";
import PerformaAnalitics from "views/reviewer/default/components/PerformaAnalitics";
import NotificationCenter from "views/reviewer/default/components/NotificationCenter";
import ReviewManagement from "views/reviewer/review-management";
import AssignedProposal from "views/reviewer/review-management/components/AssignedProposal";
import ProgresReports from "views/reviewer/review-management/components/ProgresReports";
import FinalReportsEvaluation from "views/reviewer/review-management/components/FinalReportsEvaluation";
import HistoricalReview from "views/reviewer/review-management/components/HistoricalReview";
import DecisionDocumentation from "views/reviewer/review-management/components/DecisionDocumentation";
import NotificationHub from "views/reviewer/notificationhub";
import ImportantAlert from "views/reviewer/notificationhub/components/ImportantAlert";
import DeadlineReminder from "views/reviewer/notificationhub/components/DeadlineReminder";
import FeedbackNotifications from "views/reviewer/notificationhub/components/FeedbackNotifications";
import CustomAlertSettings from "views/reviewer/notificationhub/components/CustomAlertSettings";
import ActivityTracker from "views/reviewer/activity-tracker";
import RecentActions from "views/reviewer/activity-tracker/components/RecentActions";
import ExportActivity from "views/reviewer/activity-tracker/components/ExportActivity";
import TimelineView from "views/reviewer/activity-tracker/components/TimelineView";

const routes = [
    {
        name: "Dashboard",
        layout: "/reviewer",
        path: "default",
        icon: <MdDashboard className="h-6 w-6" />,
        component: <MainDashboard />,
    },
    {
        name: "Active Session Overview",
        layout: "/reviewer",
        parentPath: "default",
        path: "active-session-overview",
        icon: <MdEventNote className="h-6 w-6 ml-10" />,
        component: <ActiveSession />,
        secondary: true,
    },
    {
        name: "Review Queue Status",
        layout: "/reviewer",
        parentPath: "default",
        path: "review-queue-status",
        icon: <MdQueue className="h-6 w-6 ml-10" />,
        component: <ReviewQueueStatus />,
        secondary: true,
    },
    {
        name: "Proposal Distribution Map",
        layout: "/reviewer",
        parentPath: "default",
        path: "proposal-distribution-map",
        icon: <MdMap className="h-6 w-6 ml-10" />,
        component: <ProposalDistributionMap />,
        secondary: true,
    },
    {
        name: "Upcoming Deadlines",
        layout: "/reviewer",
        parentPath: "default",
        path: "upcoming-deadlines",
        icon: <MdOutlineWatchLater className="h-6 w-6 ml-10" />,
        component: <UpcomingDeadline />,
        secondary: true,
    },
    {
        name: "Notification Center",
        layout: "/reviewer",
        parentPath: "default",
        path: "notification-center",
        icon: <MdNotifications className="h-6 w-6 ml-10" />,
        component: <NotificationCenter />,
        secondary: true,
    },
    {
        name: "Performance Analytics",
        layout: "/reviewer",
        parentPath: "default",
        path: "performance-analytics",
        icon: <MdInsertChart className="h-6 w-6 ml-10" />,
        component: <PerformaAnalitics />,
        secondary: true,
    },
    {
        name: "Profile & Settings",
        layout: "/reviewer",
        path: "profile",
        icon: <MdPerson className="h-6 w-6" />,
        component: <Profile />,
    },
    {
        name: "Review Management",
        layout: "/reviewer",
        path: "review-management",
        icon: <MdAssignment className="h-6 w-6" />,
        component: <ReviewManagement />,
    },
    {
        name: "Assigned Proposals Queue",
        layout: "/reviewer",
        parentPath: "review-management",
        path: "assigned-proposals",
        icon: <MdList className="h-6 w-6 ml-10" />,
        component: <AssignedProposal />,
        secondary: true,
    },
    {
        name: "Progress Reports Review Panel",
        layout: "/reviewer",
        parentPath: "review-management",
        path: "progress-reports-review",
        icon: <MdAssessment className="h-6 w-6 ml-10" />,
        component: <ProgresReports />,
        secondary: true,
    },
    {
        name: "Final Reports Evaluation",
        layout: "/reviewer",
        parentPath: "review-management",
        path: "final-reports-evaluation",
        icon: <MdLibraryBooks className="h-6 w-6 ml-10" />,
        component: <FinalReportsEvaluation />,
        secondary: true,
    },
    {
        name: "Historical Reviews Archive",
        layout: "/reviewer",
        parentPath: "review-management",
        path: "historical-reviews",
        icon: <MdHistory className="h-6 w-6 ml-10" />,
        component: <HistoricalReview />,
        secondary: true,
    },
    {
        name: "Decision Documentation",
        layout: "/reviewer",
        parentPath: "review-management",
        path: "decision-documentation",
        icon: <MdAssignmentTurnedIn className="h-6 w-6 ml-10" />,
        component: <DecisionDocumentation />,
        secondary: true,
    },
    {
        name: "Notification Hub",
        layout: "/reviewer",
        path: "notification-hub",
        icon: <MdNotifications className="h-6 w-6" />,
        component: <NotificationHub />,
    },
    {
        name: "Important Alerts",
        layout: "/reviewer",
        parentPath: "notification-hub",
        path: "important-alerts",
        icon: <MdWarning className="h-6 w-6 ml-10" />,
        component: <ImportantAlert />,
        secondary: true,
    },
    {
        name: "Deadline Reminders",
        layout: "/reviewer",
        parentPath: "notification-hub",
        path: "deadline-reminders",
        icon: <MdCalendarToday className="h-6 w-6 ml-10" />,
        component: <DeadlineReminder />,
        secondary: true,
    },
    {
        name: "Feedback Notifications",
        layout: "/reviewer",
        parentPath: "notification-hub",
        path: "feedback-notifications",
        icon: <MdFeedback className="h-6 w-6 ml-10" />,
        component: <FeedbackNotifications />,
        secondary: true,
    },
    {
        name: "Custom Alert Settings",
        layout: "/reviewer",
        parentPath: "notification-hub",
        path: "custom-alert-settings",
        icon: <MdOutlineNotificationsActive className="h-6 w-6 ml-10" />,
        component: <CustomAlertSettings />,
        secondary: true,
    },
    {
        name: "Activity Tracker",
        layout: "/reviewer",
        path: "activity-tracker",
        icon: <MdAccessTime className="h-6 w-6" />,
        component: <ActivityTracker />,
    },
    {
        name: "Recent Actions",
        layout: "/reviewer",
        parentPath: "activity-tracker",
        path: "recent-actions",
        icon: <MdHistory className="h-6 w-6 ml-10" />,
        component: <RecentActions />,
        secondary: true,
    },
    {
        name: "Timeline View",
        layout: "/reviewer",
        parentPath: "activity-tracker",
        path: "timeline-view",
        icon: <MdTimeline className="h-6 w-6 ml-10" />,
        component: <TimelineView />,
        secondary: true,
    },
    {
        name: "Export Activity History",
        layout: "/reviewer",
        parentPath: "activity-tracker",
        path: "export-activity-history",
        icon: <MdFileDownload className="h-6 w-6 ml-10" />,
        component: <ExportActivity />,
        secondary: true,
    },
    {
        name: "Logout",
        layout: "/reviewer",
        path: "logout",
        icon: <MdExitToApp className="h-6 w-6" />,
        component: <Logout />,
    },
];

export default routes;