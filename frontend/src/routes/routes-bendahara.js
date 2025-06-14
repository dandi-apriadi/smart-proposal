import React from "react";
// Shared Imports
import Profile from "views/shared/profile";
import Logout from "views/auth/Logout";

// Bendahara-specific Imports
import BendaharaDashboard from "views/bendahara/default";
import FundingManagement from "views/bendahara/funding-management";
import ReportVerification from "views/bendahara/report-verification";
import BudgetManagement from "views/bendahara/budget-management";
import TgrManagement from "views/bendahara/tgr-management";
import FinancialReports from "views/bendahara/financial-reports";
import NotificationHub from "views/bendahara/notification-hub";
import ActivityTracker from "views/bendahara/activity-tracker";

// Dashboard Components
import FundingSummary from "views/bendahara/default/components/FundingSummary";
import PendingProposals from "views/bendahara/default/components/PendingProposals";
import CurrentFinancialReports from "views/bendahara/default/components/CurrentFinancialReports";
import DisbursementStatus from "views/bendahara/default/components/DisbursementStatus";

// Funding Management Components
import ApprovedProposalsList from "views/bendahara/funding-management/components/ApprovedProposalsList";
import FundDisbursement from "views/bendahara/funding-management/components/FundDisbursement";
import PaymentHistory from "views/bendahara/funding-management/components/PaymentHistory";
import DisbursementSchedule from "views/bendahara/funding-management/components/DisbursementSchedule";
import ProposalFinancialReports from "views/bendahara/funding-management/components/ProposalFinancialReports";

// Report Verification Components
import FinancialProgressReports from "views/bendahara/report-verification/components/FinancialProgressReports";
import FundUtilizationReports from "views/bendahara/report-verification/components/FundUtilizationReports";
import ExpenseVerification from "views/bendahara/report-verification/components/ExpenseVerification";
import FinalFinancialValidation from "views/bendahara/report-verification/components/FinalFinancialValidation";
import TgrStatusVerification from "views/bendahara/report-verification/components/TgrStatusVerification";

// Budget Management Components
import SessionAllocation from "views/bendahara/budget-management/components/SessionAllocation";
import FundMonitoring from "views/bendahara/budget-management/components/FundMonitoring";
import BudgetDistribution from "views/bendahara/budget-management/components/BudgetDistribution";
import RemainingBudget from "views/bendahara/budget-management/components/RemainingBudget";
import BudgetRealization from "views/bendahara/budget-management/components/BudgetRealization";

// TGR Management Components
import TgrList from "views/bendahara/tgr-management/components/TgrList";
import TgrClearanceProcess from "views/bendahara/tgr-management/components/TgrClearanceProcess";
import TgrHistory from "views/bendahara/tgr-management/components/TgrHistory";
import TgrNotifications from "views/bendahara/tgr-management/components/TgrNotifications";
import TgrClearanceValidation from "views/bendahara/tgr-management/components/TgrClearanceValidation";

// Financial Reports Components
import MonthlyFinancialReports from "views/bendahara/financial-reports/components/MonthlyFinancialReports";
import SessionFinancialReports from "views/bendahara/financial-reports/components/SessionFinancialReports";
import ExportFinancialReports from "views/bendahara/financial-reports/components/ExportFinancialReports";
import AuditReports from "views/bendahara/financial-reports/components/AuditReports";
import FundUtilizationAnalysis from "views/bendahara/financial-reports/components/FundUtilizationAnalysis";

// Profile Components
import ProfileInfo from "views/bendahara/profile-management/components/ProfileInfo";
import AccountSettings from "views/bendahara/profile-management/components/AccountSettings";
import AccountSecurity from "views/bendahara/profile-management/components/AccountSecurity";
import NotificationPreferences from "views/bendahara/profile-management/components/NotificationPreferences";

// Notification Components
import DisbursementNotifications from "views/bendahara/notification-hub/components/DisbursementNotifications";
import DeadlineReminders from "views/bendahara/notification-hub/components/DeadlineReminders";
import VerificationRequests from "views/bendahara/notification-hub/components/VerificationRequests";
import ReportsRequiringAction from "views/bendahara/notification-hub/components/ReportsRequiringAction";

// Activity Tracker Components
import RecentActivities from "views/bendahara/activity-tracker/components/RecentActivities";
import TransactionHistory from "views/bendahara/activity-tracker/components/TransactionHistory";
import ExportActivityHistory from "views/bendahara/activity-tracker/components/ExportActivityHistory";

// Icon Imports
import {
  MdHome,
  MdOutlinePending,
  MdAttachMoney,
  MdOutlineAttachMoney,
  MdPerson,
  MdExitToApp,
  MdAssessment,
  MdVerifiedUser,
  MdReceipt,
  MdAccountBalance,
  MdPayment,
  MdHistory,
  MdSchedule,
  MdDescription,
  MdMonetizationOn,
  MdMoneyOff,
  MdReceiptLong,
  MdVerified,
  MdPieChart,
  MdOutlineTextSnippet,
  MdOutlineBadge,
  MdStackedLineChart,
  MdSettings,
  MdLock,
  MdNotifications,
  MdOutlineDashboard,
  MdTimeline,
  MdFileDownload,
  MdSecurity,
  MdList,
  MdEditDocument,
  MdContactMail,
  MdAnalytics,
  MdAssignmentTurnedIn,
  MdOutlineAssignmentLate,
  MdWarning,
  MdReportProblem,
  MdFactCheck,
  MdOutlineNotificationsActive,
  MdCalendarToday
} from "react-icons/md";

const routes = [
  {
    name: "Dashboard",
    layout: "/bendahara",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <BendaharaDashboard />,
  },
  {
    name: "Ringkasan Pembiayaan",
    layout: "/bendahara",
    parentPath: "default",
    path: "funding-summary",
    icon: <MdOutlineDashboard className="h-6 w-6 ml-10" />,
    component: <FundingSummary />,
    secondary: true,
  },
  {
    name: "Proposal Menunggu Pembiayaan",
    layout: "/bendahara",
    parentPath: "default",
    path: "pending-proposals",
    icon: <MdOutlinePending className="h-6 w-6 ml-10" />,
    component: <PendingProposals />,
    secondary: true,
  },
  {
    name: "Laporan Keuangan Terkini",
    layout: "/bendahara",
    parentPath: "default",
    path: "current-financial-reports",
    icon: <MdReceipt className="h-6 w-6 ml-10" />,
    component: <CurrentFinancialReports />,
    secondary: true,
  },
  {
    name: "Status Pencairan Dana",
    layout: "/bendahara",
    parentPath: "default",
    path: "disbursement-status",
    icon: <MdAttachMoney className="h-6 w-6 ml-10" />,
    component: <DisbursementStatus />,
    secondary: true,
  },
  {
    name: "Manajemen Pembiayaan",
    layout: "/bendahara",
    path: "funding-management",
    icon: <MdPayment className="h-6 w-6" />,
    component: <FundingManagement />,
  },
  {
    name: "Daftar Proposal Disetujui",
    layout: "/bendahara",
    parentPath: "funding-management",
    path: "approved-proposals",
    icon: <MdList className="h-6 w-6 ml-10" />,
    component: <ApprovedProposalsList />,
    secondary: true,
  },
  {
    name: "Pencairan Dana",
    layout: "/bendahara",
    parentPath: "funding-management",
    path: "fund-disbursement",
    icon: <MdOutlineAttachMoney className="h-6 w-6 ml-10" />,
    component: <FundDisbursement />,
    secondary: true,
  },
  {
    name: "Riwayat Pembayaran",
    layout: "/bendahara",
    parentPath: "funding-management",
    path: "payment-history",
    icon: <MdHistory className="h-6 w-6 ml-10" />,
    component: <PaymentHistory />,
    secondary: true,
  },
  {
    name: "Jadwal Pencairan",
    layout: "/bendahara",
    parentPath: "funding-management",
    path: "disbursement-schedule",
    icon: <MdCalendarToday className="h-6 w-6 ml-10" />,
    component: <DisbursementSchedule />,
    secondary: true,
  },
  {
    name: "Laporan Keuangan per Proposal",
    layout: "/bendahara",
    parentPath: "funding-management",
    path: "proposal-financial-reports",
    icon: <MdDescription className="h-6 w-6 ml-10" />,
    component: <ProposalFinancialReports />,
    secondary: true,
  },
  {
    name: "Verifikasi Laporan",
    layout: "/bendahara",
    path: "report-verification",
    icon: <MdVerifiedUser className="h-6 w-6" />,
    component: <ReportVerification />,
  },
  {
    name: "Laporan Kemajuan Keuangan",
    layout: "/bendahara",
    parentPath: "report-verification",
    path: "financial-progress-reports",
    icon: <MdAssessment className="h-6 w-6 ml-10" />,
    component: <FinancialProgressReports />,
    secondary: true,
  },
  {
    name: "Laporan Penggunaan Dana",
    layout: "/bendahara",
    parentPath: "report-verification",
    path: "fund-utilization-reports",
    icon: <MdMonetizationOn className="h-6 w-6 ml-10" />,
    component: <FundUtilizationReports />,
    secondary: true,
  },
  {
    name: "Verifikasi Bukti Pengeluaran",
    layout: "/bendahara",
    parentPath: "report-verification",
    path: "expense-verification",
    icon: <MdReceiptLong className="h-6 w-6 ml-10" />,
    component: <ExpenseVerification />,
    secondary: true,
  },
  {
    name: "Validasi Laporan Akhir Keuangan",
    layout: "/bendahara",
    parentPath: "report-verification",
    path: "final-financial-validation",
    icon: <MdVerified className="h-6 w-6 ml-10" />,
    component: <FinalFinancialValidation />,
    secondary: true,
  },
  {
    name: "Status Bebas TGR",
    layout: "/bendahara",
    parentPath: "report-verification",
    path: "tgr-status-verification",
    icon: <MdFactCheck className="h-6 w-6 ml-10" />,
    component: <TgrStatusVerification />,
    secondary: true,
  },
  {
    name: "Manajemen Anggaran",
    layout: "/bendahara",
    path: "budget-management",
    icon: <MdAccountBalance className="h-6 w-6" />,
    component: <BudgetManagement />,
  },
  {
    name: "Alokasi Dana per Sesi",
    layout: "/bendahara",
    parentPath: "budget-management",
    path: "session-allocation",
    icon: <MdOutlineTextSnippet className="h-6 w-6 ml-10" />,
    component: <SessionAllocation />,
    secondary: true,
  },
  {
    name: "Monitoring Penggunaan Dana",
    layout: "/bendahara",
    parentPath: "budget-management",
    path: "fund-monitoring",
    icon: <MdAnalytics className="h-6 w-6 ml-10" />,
    component: <FundMonitoring />,
    secondary: true,
  },
  {
    name: "Distribusi Anggaran",
    layout: "/bendahara",
    parentPath: "budget-management",
    path: "budget-distribution",
    icon: <MdPieChart className="h-6 w-6 ml-10" />,
    component: <BudgetDistribution />,
    secondary: true,
  },
  {
    name: "Sisa Anggaran",
    layout: "/bendahara",
    parentPath: "budget-management",
    path: "remaining-budget",
    icon: <MdMoneyOff className="h-6 w-6 ml-10" />,
    component: <RemainingBudget />,
    secondary: true,
  },
  {
    name: "Laporan Realisasi Anggaran",
    layout: "/bendahara",
    parentPath: "budget-management",
    path: "budget-realization",
    icon: <MdStackedLineChart className="h-6 w-6 ml-10" />,
    component: <BudgetRealization />,
    secondary: true,
  },
  {
    name: "TGR Management",
    layout: "/bendahara",
    path: "tgr-management",
    icon: <MdWarning className="h-6 w-6" />,
    component: <TgrManagement />,
  },
  {
    name: "Daftar Penelitian dengan TGR",
    layout: "/bendahara",
    parentPath: "tgr-management",
    path: "tgr-list",
    icon: <MdOutlineAssignmentLate className="h-6 w-6 ml-10" />,
    component: <TgrList />,
    secondary: true,
  },
  {
    name: "Proses Bebas TGR",
    layout: "/bendahara",
    parentPath: "tgr-management",
    path: "tgr-clearance-process",
    icon: <MdAssignmentTurnedIn className="h-6 w-6 ml-10" />,
    component: <TgrClearanceProcess />,
    secondary: true,
  },
  {
    name: "Riwayat TGR",
    layout: "/bendahara",
    parentPath: "tgr-management",
    path: "tgr-history",
    icon: <MdHistory className="h-6 w-6 ml-10" />,
    component: <TgrHistory />,
    secondary: true,
  },
  {
    name: "Notifikasi TGR",
    layout: "/bendahara",
    parentPath: "tgr-management",
    path: "tgr-notifications",
    icon: <MdOutlineNotificationsActive className="h-6 w-6 ml-10" />,
    component: <TgrNotifications />,
    secondary: true,
  },
  {
    name: "Validasi Bebas TGR",
    layout: "/bendahara",
    parentPath: "tgr-management",
    path: "tgr-clearance-validation",
    icon: <MdVerified className="h-6 w-6 ml-10" />,
    component: <TgrClearanceValidation />,
    secondary: true,
  },
  {
    name: "Laporan Keuangan",
    layout: "/bendahara",
    path: "financial-reports",
    icon: <MdAssessment className="h-6 w-6" />,
    component: <FinancialReports />,
  },
  {
    name: "Laporan Keuangan Bulanan",
    layout: "/bendahara",
    parentPath: "financial-reports",
    path: "monthly-financial-reports",
    icon: <MdCalendarToday className="h-6 w-6 ml-10" />,
    component: <MonthlyFinancialReports />,
    secondary: true,
  },
  {
    name: "Laporan Keuangan per Sesi",
    layout: "/bendahara",
    parentPath: "financial-reports",
    path: "session-financial-reports",
    icon: <MdOutlineTextSnippet className="h-6 w-6 ml-10" />,
    component: <SessionFinancialReports />,
    secondary: true,
  },
  {
    name: "Ekspor Laporan Keuangan",
    layout: "/bendahara",
    parentPath: "financial-reports",
    path: "export-financial-reports",
    icon: <MdFileDownload className="h-6 w-6 ml-10" />,
    component: <ExportFinancialReports />,
    secondary: true,
  },
  {
    name: "Laporan Audit Keuangan",
    layout: "/bendahara",
    parentPath: "financial-reports",
    path: "audit-reports",
    icon: <MdSecurity className="h-6 w-6 ml-10" />,
    component: <AuditReports />,
    secondary: true,
  },
  {
    name: "Analisis Penggunaan Dana",
    layout: "/bendahara",
    parentPath: "financial-reports",
    path: "fund-utilization-analysis",
    icon: <MdAnalytics className="h-6 w-6 ml-10" />,
    component: <FundUtilizationAnalysis />,
    secondary: true,
  },
  {
    name: "Profile Management",
    layout: "/bendahara",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
  {
    name: "Informasi Profil",
    layout: "/bendahara",
    parentPath: "profile",
    path: "profile-info",
    icon: <MdOutlineBadge className="h-6 w-6 ml-10" />,
    component: <ProfileInfo />,
    secondary: true,
  },
  {
    name: "Pengaturan Akun",
    layout: "/bendahara",
    parentPath: "profile",
    path: "account-settings",
    icon: <MdSettings className="h-6 w-6 ml-10" />,
    component: <AccountSettings />,
    secondary: true,
  },
  {
    name: "Keamanan Akun",
    layout: "/bendahara",
    parentPath: "profile",
    path: "account-security",
    icon: <MdLock className="h-6 w-6 ml-10" />,
    component: <AccountSecurity />,
    secondary: true,
  },
  {
    name: "Preferensi Notifikasi",
    layout: "/bendahara",
    parentPath: "profile",
    path: "notification-preferences",
    icon: <MdNotifications className="h-6 w-6 ml-10" />,
    component: <NotificationPreferences />,
    secondary: true,
  },
  {
    name: "Notification Hub",
    layout: "/bendahara",
    path: "notification-hub",
    icon: <MdNotifications className="h-6 w-6" />,
    component: <NotificationHub />,
  },
  {
    name: "Pemberitahuan Pencairan",
    layout: "/bendahara",
    parentPath: "notification-hub",
    path: "disbursement-notifications",
    icon: <MdAttachMoney className="h-6 w-6 ml-10" />,
    component: <DisbursementNotifications />,
    secondary: true,
  },
  {
    name: "Pengingat Tenggat Waktu",
    layout: "/bendahara",
    parentPath: "notification-hub",
    path: "deadline-reminders",
    icon: <MdCalendarToday className="h-6 w-6 ml-10" />,
    component: <DeadlineReminders />,
    secondary: true,
  },
  {
    name: "Permintaan Verifikasi",
    layout: "/bendahara",
    parentPath: "notification-hub",
    path: "verification-requests",
    icon: <MdOutlineNotificationsActive className="h-6 w-6 ml-10" />,
    component: <VerificationRequests />,
    secondary: true,
  },
  {
    name: "Laporan Memerlukan Tindakan",
    layout: "/bendahara",
    parentPath: "notification-hub",
    path: "reports-requiring-action",
    icon: <MdReportProblem className="h-6 w-6 ml-10" />,
    component: <ReportsRequiringAction />,
    secondary: true,
  },
  {
    name: "Activity Tracker",
    layout: "/bendahara",
    path: "activity-tracker",
    icon: <MdTimeline className="h-6 w-6" />,
    component: <ActivityTracker />,
  },
  {
    name: "Aktivitas Terbaru",
    layout: "/bendahara",
    parentPath: "activity-tracker",
    path: "recent-activities",
    icon: <MdHistory className="h-6 w-6 ml-10" />,
    component: <RecentActivities />,
    secondary: true,
  },
  {
    name: "Riwayat Transaksi",
    layout: "/bendahara",
    parentPath: "activity-tracker",
    path: "transaction-history",
    icon: <MdReceiptLong className="h-6 w-6 ml-10" />,
    component: <TransactionHistory />,
    secondary: true,
  },
  {
    name: "Ekspor Riwayat Aktivitas",
    layout: "/bendahara",
    parentPath: "activity-tracker",
    path: "export-activity-history",
    icon: <MdFileDownload className="h-6 w-6 ml-10" />,
    component: <ExportActivityHistory />,
    secondary: true,
  },
  {
    name: "Logout",
    layout: "/bendahara",
    path: "logout",
    icon: <MdExitToApp className="h-6 w-6" />,
    component: <Logout />,
  },
];

export default routes;