import { useState } from 'react';

export const useBudgetManagement = () => {
    const [timeFilter, setTimeFilter] = useState("yearly");
    const [isLoading, setIsLoading] = useState(false);

    // Dummy data for Budget Management
    const budgetStats = {
        totalBudget: 3500000000,
        budgetTrend: 4.8,
        allocationUsed: 2750000000,
        allocationUsedTrend: 5.2,
        remainingBudget: 750000000,
        remainingBudgetTrend: -8.3,
        allocationRate: 78.57
    };

    const handleRefresh = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    return {
        timeFilter,
        setTimeFilter,
        isLoading,
        budgetStats,
        handleRefresh
    };
};
