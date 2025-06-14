import React, { useEffect } from "react";
// Import custom hook and data
import { useBudgetManagement } from "./hooks/useBudgetManagement";
import { budgetModules } from "./data/budgetModules";
import { featureDetails } from "./data/featureDetails";
import { monthlyBudgetData, facultyBudgetData } from "./data/chartData";

// Import components
import BudgetHero from "./components/BudgetHero";
import BudgetFilterControls from "./components/BudgetFilterControls";
import BudgetStatsCards from "./components/BudgetStatsCards";
import BudgetCharts from "./components/BudgetCharts";
import BudgetModules from "./components/BudgetModules";
import BudgetTrendChart from "./components/BudgetTrendChart";

// Import AOS for animations
import AOS from "aos";
import "aos/dist/aos.css";

const BudgetManagement = () => {
    // Use the custom hook to manage state
    const {
        timeFilter,
        setTimeFilter,
        isLoading,
        budgetStats,
        handleRefresh
    } = useBudgetManagement();

    useEffect(() => {
        AOS.init({
            duration: 700,
            easing: 'ease-out-cubic',
            once: true
        });
    }, []);

    return (
        <div className="pt-5">
            {/* Hero Section */}
            <BudgetHero budgetStats={budgetStats} />

            {/* Filter Controls */}
            <BudgetFilterControls
                timeFilter={timeFilter}
                setTimeFilter={setTimeFilter}
                handleRefresh={handleRefresh}
                isLoading={isLoading}
            />

            {/* Stats Cards */}
            <BudgetStatsCards budgetStats={budgetStats} />

            {/* Charts */}
            <BudgetCharts monthlyBudgetData={monthlyBudgetData} facultyBudgetData={facultyBudgetData} />

            {/* Budget Modules with Modal Details */}
            <BudgetModules
                budgetModules={budgetModules}
                featureDetails={featureDetails}
            />

            {/* Budget Trends Chart */}
            <BudgetTrendChart monthlyBudgetData={monthlyBudgetData} />

            {/* Add CSS animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default BudgetManagement;
