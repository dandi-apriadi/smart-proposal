import React from "react";
import ProposalManagement from "views/wadir/proposal-management";
// Icon Imports
import {
    MdPerson,
    MdRemove,
    MdHome,
    MdExitToApp,
    MdDescription,
    MdAssignment,
    MdCalendarToday,
    MdSummarize,
    MdNotifications,
    MdHistory,
    MdAnalytics,
    MdBookmarks,
    MdList,
    MdRateReview,
    MdDelete,
    MdAssessment,
    MdPlayArrow,
    MdSchedule,
    MdPeople,
    MdUpload,
    MdCheck,
    MdLocalOffer,
    MdDoneAll,
    MdTimeline,
    MdRuleFolder,
    MdSettings,
    MdWarning,
    MdOutlineLogout,
    MdOutlineNotifications,
    MdRecentActors,
    MdStackedBarChart,
    MdEventNote,
    MdLibraryBooks,
    MdArticle,
    MdOutlineAnalytics,
    MdEditDocument,
    MdOutlineInsertDriveFile,
    MdAccessTime
} from "react-icons/md";
import Profile from "views/shared/profile";
import Logout from "views/auth/Logout";
import Dashboard from "views/wadir/dasboard";
import JadwalSaatini from "views/wadir/dasboard/components/jadwalsaatini";
import ProposalSummary from "views/wadir/dasboard/components/proposalsumarry";
import LaporanSummary from "views/wadir/dasboard/components/laporansummary";
import NotificationsSummary from "views/wadir/dasboard/components/notificationssummary";
import LogActivitySummary from "views/wadir/dasboard/components/logactsummary";
import ProposalAnalisis from "views/wadir/proposal-management/components/proposal-analisis";
import TemplateManagement from "views/wadir/proposal-management/components/template-management";
import ProposalList from "views/wadir/proposal-management/components/proposal-list";
import DetailReviewKelayakan from "views/wadir/proposal-management/components/detail-review-kelayakan";

import LaporanManagement from "views/wadir/laporan-management";
import SessionManagement from "views/wadir/sesion";
import NotificationManagement from "views/wadir/notification";
import ImportAlerts from "views/wadir/notification/component/import-alerts";
import LaporanAnalisis from "views/wadir/laporan-management/component/laporan-analisis";
import ListLaporanKemajuan from "views/wadir/laporan-management/component/list-laporan";
import LaporanAkhir from "views/wadir/laporan-management/component/list-laporan-akhir";
import ReviewLaporan from "views/wadir/laporan-management/component/review-laporan";
import HasilLaporanAkhir from "views/wadir/laporan-management/component/hasil-laporan-akhir";
import SessionAnalisis from "views/wadir/sesion-management/component/session-analisis";
import AddSession from "views/wadir/sesion-management/component/add-session";
import DetailSession from "views/wadir/sesion-management/component/detail-session";
import StartSession from "views/wadir/sesion-management/component/start-session";
import JadwalManagement from "views/wadir/sesion-management/component/jadwal-management";
import PanitiaManagement from "views/wadir/sesion-management/component/panitia-management";
import ProposalUploadControls from "views/wadir/sesion-management/component/proposal-upload-control";
import LaporanKemajuanSession from "views/wadir/sesion-management/component/laporan-kemajuan-session";
import ReviewKelayakanSession from "views/wadir/sesion-management/component/review-kelayakan-session";
import NotificationSettings from "views/wadir/notification/component/notification-settings";
import LogActivity from "views/wadir/logactivity";
import RecentActions from "views/wadir/logactivity/component/recent-actions";
import ActivityTimeline from "views/wadir/logactivity/component/activity-timeline";
import LaporanAkhirSession from "views/wadir/sesion-management/component/LaporanAkhirSession";
import ReviewAkhir from "views/wadir/sesion-management/component/ReviewAkhir";
import CloseSession from "views/wadir/sesion-management/component/CloseSession";
import SessionHistory from "views/wadir/sesion-management/component/SessionHistory";
import SessionResult from "views/wadir/sesion-management/component/SessionResult";



const routes = [
    {
        name: "Dashboard",
        layout: "/wadir",
        path: "default",
        icon: <MdHome className="h-6 w-6" />,
        component: <Dashboard />,
    },
    {
        name: "Jadwal Saat Ini",
        layout: "/wadir",
        parentPath: "default",
        path: "jadwalsaatini",
        icon: <MdCalendarToday className="h-6 w-6 ml-10" />,
        component: <JadwalSaatini />,
        secondary: true,
    },
    {
        name: "Proposal Summary",
        layout: "/wadir",
        parentPath: "default",
        path: "proposalsumarry",
        icon: <MdSummarize className="h-6 w-6 ml-10" />,
        component: <ProposalSummary />,
        secondary: true,
    },
    {
        name: "Laporan Summary",
        layout: "/wadir",
        parentPath: "default",
        path: "laporansummary",
        icon: <MdArticle className="h-6 w-6 ml-10" />,
        component: <LaporanSummary />,
        secondary: true,
    },
    {
        name: "Notification Summary",
        layout: "/wadir",
        parentPath: "default",
        path: "notificationssummary",
        icon: <MdNotifications className="h-6 w-6 ml-10" />,
        component: <NotificationsSummary />,
        secondary: true,
    },
    {
        name: "Log Activity Summary",
        layout: "/wadir",
        parentPath: "default",
        path: "logactsummary",
        icon: <MdHistory className="h-6 w-6 ml-10" />,
        component: <LogActivitySummary />,
        secondary: true,
    },
    {
        name: "Proposal Management",
        layout: "/wadir",
        path: "proposal-management",
        icon: <MdAssignment className="h-6 w-6" />,
        component: <ProposalManagement />,
    },
    {
        name: "Proposal Analisis",
        layout: "/wadir",
        parentPath: "proposal-management",
        path: "proposal-analisis",
        icon: <MdAnalytics className="h-6 w-6 ml-10" />,
        component: <ProposalAnalisis />,
        secondary: true,
    },
    {
        name: "Template Management",
        layout: "/wadir",
        parentPath: "proposal-management",
        path: "template-management",
        icon: <MdBookmarks className="h-6 w-6 ml-10" />,
        component: <TemplateManagement />,
        secondary: true,
    },
    {
        name: "Proposal List",
        layout: "/wadir",
        parentPath: "proposal-management",
        path: "proposal-list",
        icon: <MdList className="h-6 w-6 ml-10" />,
        component: <ProposalList />,
        secondary: true,
    },
    {
        name: "Detail/Review Kelayakan",
        layout: "/wadir",
        parentPath: "proposal-management",
        path: "detail-review-kelayakan",
        icon: <MdRateReview className="h-6 w-6 ml-10" />,
        component: <DetailReviewKelayakan />,
        makro: true,
        secondary: true,
    },
    // */ {
    // name: "Delete Proposal",
    //  layout: "/wadir",
    //  parentPath: "proposal-management",
    // path: "delete-proposal",
    // icon: <MdDelete className="h-6 w-6 ml-10" />,
    // component: <DeleteProposal />,
    // makro: true,
    // secondary: true,
    // } 
    {
        name: "Laporan Management",
        layout: "/wadir",
        path: "laporan-management",
        icon: <MdOutlineInsertDriveFile className="h-6 w-6" />,
        component: <LaporanManagement />,
    },
    {
        name: "Laporan Analisis",
        layout: "/wadir",
        parentPath: "laporan-management",
        path: "laporan-analisis",
        icon: <MdOutlineAnalytics className="h-6 w-6 ml-10" />,
        component: <LaporanAnalisis />,
        secondary: true,
    },
    {
        name: "List Laporan Kemajuan",
        layout: "/wadir",
        parentPath: "laporan-management",
        path: "list-laporan",
        icon: <MdEventNote className="h-6 w-6 ml-10" />,
        component: <ListLaporanKemajuan />,
        secondary: true,
    },
    {
        name: "List Laporan Akhir",
        layout: "/wadir",
        parentPath: "laporan-management",
        path: "list-laporan-akhir",
        icon: <MdLibraryBooks className="h-6 w-6 ml-10" />,
        component: <LaporanAkhir />,
        secondary: true,
    },
    {
        name: "Review Laporan",
        layout: "/wadir",
        parentPath: "laporan-management",
        path: "review-laporan",
        icon: <MdEditDocument className="h-6 w-6 ml-10" />,
        component: <ReviewLaporan />,
        makro: true,
        secondary: true,
    },
    {
        name: "Hasil Laporan Akhir",
        layout: "/wadir",
        parentPath: "laporan-management",
        path: "hasil-laporan-akhir",
        icon: <MdAssessment className="h-6 w-6 ml-10" />,
        component: <HasilLaporanAkhir />,
        secondary: true,
    },
    {
        name: "Session Management",
        layout: "/wadir",
        path: "sesion-management",
        icon: <MdCalendarToday className="h-6 w-6" />,
        component: <SessionManagement />,
    },
    {
        name: "Session Analisis",
        layout: "/wadir",
        parentPath: "sesion-management",
        path: "session-analisis",
        icon: <MdStackedBarChart className="h-6 w-6 ml-10" />,
        component: <SessionAnalisis />,
        secondary: true,
    },
    {
        name: "Add Session",
        layout: "/wadir",
        parentPath: "sesion-management",
        path: "add-session",
        icon: <MdSchedule className="h-6 w-6 ml-10" />,
        component: <AddSession />,
        secondary: true,
    },
    {
        name: "Session Detail",
        layout: "/wadir",
        parentPath: "sesion-management",
        path: "detail-session",
        icon: <MdRemove className="h-6 w-6 ml-10" />,
        component: <DetailSession />,
        makro: true,
        secondary: true,
    },
    {
        name: "Start Session",
        layout: "/wadir",
        parentPath: "sesion-management",
        path: "start-session",
        icon: <MdPlayArrow className="h-6 w-6 ml-10" />,
        component: <StartSession />,
        makro: true,
        secondary: true,
    },
    {
        name: "Jadwal Management",
        layout: "/wadir",
        parentPath: "sesion-management",
        path: "jadwal-management",
        icon: <MdSchedule className="h-6 w-6 ml-10" />,
        component: <JadwalManagement />,
        makro: true,
        secondary: true,
    },
    {
        name: "Panitia/Reviewer Management",
        layout: "/wadir",
        parentPath: "sesion-management",
        path: "panitia-management",
        icon: <MdPeople className="h-6 w-6 ml-10" />,
        component: <PanitiaManagement />,
        makro: true,
        secondary: true,
    },
    {
        name: "Proposal Upload Controls",
        layout: "/wadir",
        parentPath: "sesion-management",
        path: "proposal-upload-controls",
        icon: <MdUpload className="h-6 w-6 ml-10" />,
        component: <ProposalUploadControls />,
        makro: true,
        secondary: true,
    },
    {
        name: "Review Kelayakan Session",
        layout: "/wadir",
        parentPath: "sesion-management",
        path: "review-kelayakan-session",
        icon: <MdCheck className="h-6 w-6 ml-10" />,
        component: <ReviewKelayakanSession />,
        makro: true,
        secondary: true,
    },
    {
        name: "Laporan Kemajuan Session",
        layout: "/wadir",
        parentPath: "sesion-management",
        path: "laporan-kemajuan-session",
        icon: <MdDescription className="h-6 w-6 ml-10" />,
        component: <LaporanKemajuanSession />,
        makro: true,
        secondary: true,
    },
    {
        name: "Laporan Akhir Session",
        layout: "/wadir",
        parentPath: "sesion-management",
        path: "final-reports/:sessionId",
        icon: <MdLocalOffer className="h-6 w-6 ml-10" />,
        component: <LaporanAkhirSession />,
        makro: true,
        secondary: true,
    },
    {
        name: "Review Akhir",
        layout: "/wadir",
        parentPath: "sesion-management",
        path: "final-review/:sessionId",
        icon: <MdDoneAll className="h-6 w-6 ml-10" />,
        component: <ReviewAkhir />,
        makro: true,
        secondary: true,
    },
    {
        name: "Close Session",
        layout: "/wadir",
        parentPath: "sesion-management",
        path: "close-session/:sessionId",
        icon: <MdOutlineLogout className="h-6 w-6 ml-10" />,
        component: <CloseSession />,
        makro: true,
        secondary: true,
    },
    {
        name: "Session History",
        layout: "/wadir",
        parentPath: "sesion-management",
        path: "session-history",
        icon: <MdTimeline className="h-6 w-6 ml-10" />,
        component: <SessionHistory />,
        secondary: true,
    },
    {
        name: "Session Rules",
        layout: "/wadir",
        parentPath: "sesion-management",
        path: "session-rules",
        icon: <MdRuleFolder className="h-6 w-6 ml-10" />,
        component: <SessionResult />,
        secondary: true,
    },
    {
        name: "Profile",
        layout: "/wadir",
        path: "profile",
        icon: <MdPerson className="h-6 w-6" />,
        component: <Profile />,
    },
    {
        name: "Notification",
        layout: "/wadir",
        path: "notification",
        icon: <MdOutlineNotifications className="h-6 w-6" />,
        component: <NotificationManagement />,
    },
    {
        name: "Important Alerts",
        layout: "/wadir",
        parentPath: "notification",
        path: "import-alerts",
        icon: <MdWarning className="h-6 w-6 ml-10" />,
        component: <ImportAlerts />,
        secondary: true,
    },
    {
        name: "Notification Settings",
        layout: "/wadir",
        parentPath: "notification",
        path: "notification-settings",
        icon: <MdSettings className="h-6 w-6 ml-10" />,
        component: <NotificationSettings />,
        secondary: true,
    },
    {
        name: "Log Activity",
        layout: "/wadir",
        path: "logactivity",
        icon: <MdAccessTime className="h-6 w-6" />,
        component: <LogActivity />,
    },
    {
        name: "Recent Actions",
        layout: "/wadir",
        parentPath: "logactivity",
        path: "recent-actions",
        icon: <MdRecentActors className="h-6 w-6 ml-10" />,
        component: <RecentActions />,
        secondary: true,
    },
    {
        name: "Activity Timeline",
        layout: "/wadir",
        parentPath: "logactivity",
        path: "activity-timeline",
        icon: <MdTimeline className="h-6 w-6 ml-10" />,
        component: <ActivityTimeline />,
        secondary: true,
    },
    {
        name: "Logout",
        layout: "/wadir",
        path: "logout",
        icon: <MdExitToApp className="h-6 w-6" />,
        component: <Logout />,
    },
];

export default routes;