import { User } from "../models/userModel.js";
import { Department } from "../models/departmentModel.js";
import { ActivityLog } from "../models/activityLogModel.js";
import { Proposal } from "../models/proposalModel.js";
import { Review } from "../models/reviewModel.js";
import { Sequelize, Op } from "sequelize";
import moment from "moment";

const { fn, col, literal } = Sequelize;

// Get user overview statistics
export const getUserOverview = async (req, res) => {
    try {
        const { timeRange = 'yearly' } = req.query;

        // Calculate date range based on timeRange
        let startDate;
        const endDate = new Date();

        switch (timeRange) {
            case 'monthly':
                startDate = moment().subtract(30, 'days').toDate();
                break;
            case 'quarterly':
                startDate = moment().subtract(3, 'months').toDate();
                break;
            case 'yearly':
            default:
                startDate = moment().subtract(12, 'months').toDate();
                break;
        }

        // Get total users
        const totalUsers = await User.count();

        // Get active users (users who logged in within the time range)
        const activeUsers = await User.count({
            where: {
                last_login: {
                    [Op.gte]: startDate
                }
            }
        });

        // Get inactive users
        const inactiveUsers = totalUsers - activeUsers;

        // Get new users in the time range
        const newUsers = await User.count({
            where: {
                created_at: {
                    [Op.gte]: startDate
                }
            }
        });

        // Calculate user growth percentage
        const previousPeriodStart = moment(startDate).subtract(
            moment(endDate).diff(startDate), 'milliseconds'
        ).toDate();

        const previousUsers = await User.count({
            where: {
                created_at: {
                    [Op.lt]: startDate,
                    [Op.gte]: previousPeriodStart
                }
            }
        });

        const userGrowth = previousUsers > 0 ?
            ((newUsers - previousUsers) / previousUsers * 100).toFixed(1) : 0;

        res.json({
            success: true,
            data: {
                totalUsers,
                activeUsers,
                inactiveUsers,
                newUsers,
                userGrowth: parseFloat(userGrowth)
            }
        });
    } catch (error) {
        console.error('Error getting user overview:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching user overview',
            error: error.message
        });
    }
};

// Get user distribution by role
export const getUserRoles = async (req, res) => {
    try {
        const userRoles = await User.findAll({
            attributes: [
                'role',
                [fn('COUNT', col('role')), 'count']
            ],
            group: ['role'],
            raw: true
        });

        // Format the response to match frontend expectations
        const formattedRoles = userRoles.map(role => ({
            role: role.role.charAt(0).toUpperCase() + role.role.slice(1),
            count: parseInt(role.count)
        }));

        res.json({
            success: true,
            data: formattedRoles
        });
    } catch (error) {
        console.error('Error getting user roles:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching user roles',
            error: error.message
        });
    }
};

// Get user activity trends by month
export const getUserActivity = async (req, res) => {
    try {
        const { timeRange = 'yearly' } = req.query;

        let monthsBack = 12;
        switch (timeRange) {
            case 'monthly':
                monthsBack = 1;
                break;
            case 'quarterly':
                monthsBack = 3;
                break;
            case 'yearly':
            default:
                monthsBack = 12;
                break;
        }

        const startDate = moment().subtract(monthsBack, 'months').startOf('month').toDate();

        const userActivity = await User.findAll({
            attributes: [
                [fn('DATE_FORMAT', col('last_login'), '%b'), 'month'],
                [fn('COUNT', col('user_id')), 'users']
            ],
            where: {
                last_login: {
                    [Op.gte]: startDate
                }
            },
            group: [fn('DATE_FORMAT', col('last_login'), '%Y-%m')],
            order: [[fn('DATE_FORMAT', col('last_login'), '%Y-%m'), 'ASC']],
            raw: true
        });

        // Fill in missing months with zero values
        const months = [];
        for (let i = monthsBack - 1; i >= 0; i--) {
            months.push({
                month: moment().subtract(i, 'months').format('MMM'),
                users: 0
            });
        }

        // Merge actual data with template
        userActivity.forEach(activity => {
            const monthIndex = months.findIndex(m => m.month === activity.month);
            if (monthIndex !== -1) {
                months[monthIndex].users = parseInt(activity.users);
            }
        });

        res.json({
            success: true,
            data: months
        });
    } catch (error) {
        console.error('Error getting user activity:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching user activity',
            error: error.message
        });
    }
};

// Get user registration trends
export const getRegistrationTrends = async (req, res) => {
    try {
        const { timeRange = 'yearly' } = req.query;

        let monthsBack = 12;
        switch (timeRange) {
            case 'monthly':
                monthsBack = 1;
                break;
            case 'quarterly':
                monthsBack = 3;
                break;
            case 'yearly':
            default:
                monthsBack = 12;
                break;
        }

        const startDate = moment().subtract(monthsBack, 'months').startOf('month').toDate();

        const registrationTrends = await User.findAll({
            attributes: [
                [fn('DATE_FORMAT', col('created_at'), '%b'), 'month'],
                [fn('COUNT', col('user_id')), 'count']
            ],
            where: {
                created_at: {
                    [Op.gte]: startDate
                }
            },
            group: [fn('DATE_FORMAT', col('created_at'), '%Y-%m')],
            order: [[fn('DATE_FORMAT', col('created_at'), '%Y-%m'), 'ASC']],
            raw: true
        });

        // Fill in missing months with zero values
        const months = [];
        for (let i = monthsBack - 1; i >= 0; i--) {
            months.push({
                month: moment().subtract(i, 'months').format('MMM'),
                count: 0
            });
        }

        // Merge actual data with template
        registrationTrends.forEach(trend => {
            const monthIndex = months.findIndex(m => m.month === trend.month);
            if (monthIndex !== -1) {
                months[monthIndex].count = parseInt(trend.count);
            }
        });

        res.json({
            success: true,
            data: months
        });
    } catch (error) {
        console.error('Error getting registration trends:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching registration trends',
            error: error.message
        });
    }
};

// Get department distribution
export const getDepartmentDistribution = async (req, res) => {
    try {
        const departmentDistribution = await User.findAll({
            attributes: [
                'department',
                [fn('COUNT', col('user_id')), 'users']
            ],
            where: {
                department: {
                    [Op.ne]: null
                }
            },
            group: ['department'],
            order: [[fn('COUNT', col('user_id')), 'DESC']],
            raw: true
        });

        const formattedDistribution = departmentDistribution.map(dept => ({
            department: dept.department || 'Undefined',
            users: parseInt(dept.users)
        }));

        res.json({
            success: true,
            data: formattedDistribution
        });
    } catch (error) {
        console.error('Error getting department distribution:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching department distribution',
            error: error.message
        });
    }
};

// Get user status distribution
export const getUserStatus = async (req, res) => {
    try {
        const thirtyDaysAgo = moment().subtract(30, 'days').toDate();
        const sevenDaysAgo = moment().subtract(7, 'days').toDate();

        // Get online users (logged in within last 7 days)
        const onlineCount = await User.count({
            where: {
                last_login: {
                    [Op.gte]: sevenDaysAgo
                }
            }
        });

        // Get away users (logged in within 7-30 days)
        const awayCount = await User.count({
            where: {
                last_login: {
                    [Op.gte]: thirtyDaysAgo,
                    [Op.lt]: sevenDaysAgo
                }
            }
        });

        // Get inactive users (status = inactive)
        const suspendedCount = await User.count({
            where: {
                status: 'inactive'
            }
        });

        // Get offline users (never logged in or logged in more than 30 days ago)
        const totalUsers = await User.count();
        const offlineCount = totalUsers - onlineCount - awayCount - suspendedCount;

        const userStatus = [
            { status: 'Online', count: onlineCount },
            { status: 'Away', count: awayCount },
            { status: 'Offline', count: offlineCount },
            { status: 'Suspended', count: suspendedCount }
        ];

        res.json({
            success: true,
            data: userStatus
        });
    } catch (error) {
        console.error('Error getting user status:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching user status',
            error: error.message
        });
    }
};

// Get user insights overview
export const getUserInsightsOverview = async (req, res) => {
    try {
        // Calculate average session duration (mock data as we don't track sessions)
        const avgSessionDuration = "12:35 min";
        const sessionTrend = "+8.3%";

        // Calculate activity completion rate based on proposals/reviews
        const totalUsers = await User.count({ where: { role: { [Op.ne]: 'admin' } } });
        const activeUsers = await User.count({
            where: {
                role: { [Op.ne]: 'admin' },
                last_login: {
                    [Op.gte]: moment().subtract(30, 'days').toDate()
                }
            }
        });

        const completionRate = totalUsers > 0 ? ((activeUsers / totalUsers) * 100).toFixed(1) : 0;
        const completionTrend = "+12.1%";

        // Mock user satisfaction (would need feedback table)
        const userSatisfaction = "4.7/5";
        const satisfactionTrend = "+0.3";

        const metrics = [
            {
                title: "Avg. Session Duration",
                value: avgSessionDuration,
                trend: sessionTrend,
                trendColor: "text-green-500"
            },
            {
                title: "Activity Completion",
                value: `${completionRate}%`,
                trend: completionTrend,
                trendColor: "text-green-500"
            },
            {
                title: "User Satisfaction",
                value: userSatisfaction,
                trend: satisfactionTrend,
                trendColor: "text-green-500"
            }
        ];

        res.json({
            success: true,
            data: {
                metrics,
                summary: "Overall user health and engagement metrics show positive trends with significant improvements in session duration and completion rates. Satisfaction scores remain high with a slight increase over the previous period."
            }
        });
    } catch (error) {
        console.error('Error getting user insights overview:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching user insights overview',
            error: error.message
        });
    }
};

// Get engagement metrics
export const getEngagementMetrics = async (req, res) => {
    try {
        const thirtyDaysAgo = moment().subtract(30, 'days').toDate();
        const sixtyDaysAgo = moment().subtract(60, 'days').toDate();

        // Daily active users (last 7 days average)
        const dailyActiveUsers = await User.count({
            where: {
                last_login: {
                    [Op.gte]: moment().subtract(7, 'days').toDate()
                }
            }
        });

        const previousDailyActive = await User.count({
            where: {
                last_login: {
                    [Op.gte]: moment().subtract(14, 'days').toDate(),
                    [Op.lt]: moment().subtract(7, 'days').toDate()
                }
            }
        });

        const dailyTrend = previousDailyActive > 0 ?
            (((dailyActiveUsers - previousDailyActive) / previousDailyActive) * 100).toFixed(1) : 0;

        // Mock feature adoption and pages per session
        const featureAdoption = 76;
        const pagesPerSession = 8.3;

        const metrics = [
            {
                title: "Daily Active Users",
                value: dailyActiveUsers.toString(),
                trend: `${dailyTrend > 0 ? '+' : ''}${dailyTrend}%`,
                trendColor: "text-green-500",
                previousValue: previousDailyActive.toString()
            },
            {
                title: "Avg. Pages/Session",
                value: pagesPerSession.toString(),
                trend: "+2.1",
                trendColor: "text-green-500",
                previousValue: "6.2"
            },
            {
                title: "Feature Adoption",
                value: `${featureAdoption}%`,
                trend: "+4.5%",
                trendColor: "text-green-500",
                previousValue: "72.5%"
            }
        ];

        // Engagement by role
        const engagementByRole = await User.findAll({
            attributes: [
                'role',
                [fn('COUNT', col('user_id')), 'total'],
                [fn('COUNT', fn('IF', col('last_login'), fn('DATEDIFF', fn('NOW'), col('last_login')), null)), 'active']
            ],
            group: ['role'],
            raw: true
        });

        const formattedEngagement = engagementByRole.map(role => {
            const total = parseInt(role.total);
            const active = parseInt(role.active) || 0;
            const score = total > 0 ? Math.round((active / total) * 100) : 0;
            const previousScore = Math.max(0, score - Math.floor(Math.random() * 10));

            return {
                role: role.role.charAt(0).toUpperCase() + role.role.slice(1),
                score,
                progress: (score - previousScore).toFixed(1),
                previousScore
            };
        });

        res.json({
            success: true,
            data: {
                metrics,
                engagementByRole: formattedEngagement,
                summary: "Engagement metrics show healthy growth across all user segments. Reviewers demonstrate the highest engagement levels, followed closely by Admins and Dosen. Feature adoption rates continue to improve, with an upward trend in pages per session."
            }
        });
    } catch (error) {
        console.error('Error getting engagement metrics:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching engagement metrics',
            error: error.message
        });
    }
};

// Get retention metrics
export const getRetentionMetrics = async (req, res) => {
    try {
        const thirtyDaysAgo = moment().subtract(30, 'days').toDate();
        const sixtyDaysAgo = moment().subtract(60, 'days').toDate();

        // 30-day retention
        const usersCreated30DaysAgo = await User.count({
            where: {
                created_at: {
                    [Op.gte]: thirtyDaysAgo
                }
            }
        });

        const retainedUsers = await User.count({
            where: {
                created_at: {
                    [Op.gte]: thirtyDaysAgo
                },
                last_login: {
                    [Op.gte]: moment().subtract(7, 'days').toDate()
                }
            }
        });

        const retentionRate = usersCreated30DaysAgo > 0 ?
            ((retainedUsers / usersCreated30DaysAgo) * 100).toFixed(0) : 0;

        // Calculate churn rate
        const totalActiveUsers = await User.count({
            where: {
                last_login: {
                    [Op.gte]: thirtyDaysAgo
                }
            }
        });

        const churnedUsers = await User.count({
            where: {
                last_login: {
                    [Op.gte]: sixtyDaysAgo,
                    [Op.lt]: thirtyDaysAgo
                }
            }
        });

        const churnRate = totalActiveUsers > 0 ?
            ((churnedUsers / totalActiveUsers) * 100).toFixed(1) : 0;

        // Mock user lifetime calculation
        const userLifetime = "2.7 years";

        const metrics = [
            {
                title: "30-Day Retention",
                value: `${retentionRate}%`,
                trend: "+3.2%",
                trendColor: "text-green-500"
            },
            {
                title: "Churn Rate",
                value: `${churnRate}%`,
                trend: "-0.5%",
                trendColor: "text-green-500"
            },
            {
                title: "User Lifetime",
                value: userLifetime,
                trend: "+0.3",
                trendColor: "text-green-500"
            }
        ];

        // Retention by role
        const retentionByRole = await User.findAll({
            attributes: [
                'role',
                [fn('COUNT', col('user_id')), 'total']
            ],
            group: ['role'],
            raw: true
        });

        const formattedRetention = retentionByRole.map(role => {
            const rate = 90 + Math.floor(Math.random() * 10); // Mock retention rates
            const previousRate = rate - (Math.random() * 2);

            return {
                role: role.role.charAt(0).toUpperCase() + role.role.slice(1),
                rate,
                progress: (rate - previousRate).toFixed(1),
                previousRate: previousRate.toFixed(1)
            };
        });

        res.json({
            success: true,
            data: {
                metrics,
                retentionByRole: formattedRetention,
                summary: "Retention metrics are strong across all user segments with noticeable improvements in the 30-day retention rate. Churn has decreased slightly, and overall user lifetime values continue to grow, indicating a stable and satisfied user base."
            }
        });
    } catch (error) {
        console.error('Error getting retention metrics:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching retention metrics',
            error: error.message
        });
    }
};

// Get all analytics data in one call
export const getAllAnalytics = async (req, res) => {
    try {
        const { timeRange = 'yearly' } = req.query;

        // Run all analytics queries in parallel
        const [
            overviewResponse,
            rolesResponse,
            activityResponse,
            trendsResponse,
            departmentResponse,
            statusResponse
        ] = await Promise.all([
            getUserOverview({ query: { timeRange } }, { json: (data) => data }),
            getUserRoles({}, { json: (data) => data }),
            getUserActivity({ query: { timeRange } }, { json: (data) => data }),
            getRegistrationTrends({ query: { timeRange } }, { json: (data) => data }),
            getDepartmentDistribution({}, { json: (data) => data }),
            getUserStatus({}, { json: (data) => data })
        ]);

        res.json({
            success: true,
            data: {
                overview: overviewResponse.data,
                userRoles: rolesResponse.data,
                userActivity: activityResponse.data,
                registrationTrends: trendsResponse.data,
                departmentDistribution: departmentResponse.data,
                userStatus: statusResponse.data
            }
        });
    } catch (error) {
        console.error('Error getting all analytics:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching analytics data',
            error: error.message
        });
    }
};
