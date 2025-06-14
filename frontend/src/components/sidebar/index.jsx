import React, { useMemo, useState, useEffect } from 'react';
import { HiX } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineSwitchRight } from "react-icons/md";
import { useNavigate, useLocation } from 'react-router-dom';
import Links from "./components/Links";
import SidebarCard from "components/sidebar/components/SidebarCard";
import routesAdmin from "../../routes/routes-admin.js";
import routesBendahara from "../../routes/routes-bendahara.js";
import routesDosen from "../../routes/routes-dosen.js";
import routesReviewer from "../../routes/routes-reviewer.js";
import routesWadir from "../../routes/routes-wadir.js";
import { useSelector } from "react-redux";
import proposalLogo from "../../assets/img/profile/poli.png";
import proposalGedung from "../../assets/img/profile/gedung.png";

const Sidebar = ({ open, onClose }) => {
  const { user } = useSelector((state) => state.auth);
  const [reviewerMode, setReviewerMode] = useState(true); // true = reviewer mode, false = dosen mode
  const navigate = useNavigate();
  const location = useLocation();

  // Determine mode based on current path when component mounts
  useEffect(() => {
    const currentPath = location.pathname;
    if (user?.role === 'reviewer') {
      // If on a dosen path, set to dosen mode
      if (currentPath.startsWith('/dosen')) {
        setReviewerMode(false);
      }
      // If on a reviewer path, set to reviewer mode
      else if (currentPath.startsWith('/reviewer')) {
        setReviewerMode(true);
      }
    }
  }, [location.pathname, user?.role]);

  // Use useMemo to only recalculate routes when user role or reviewer mode changes
  const routes = useMemo(() => {
    const roleRoutes = {
      'admin': routesAdmin,
      'wadir': routesWadir,
      'dosen': routesDosen,
      'bendahara': routesBendahara,
      'reviewer': reviewerMode ? routesReviewer : routesDosen
    };
    return roleRoutes[user?.role] || routesWadir;
  }, [user?.role, reviewerMode]);

  // Modern color scheme based on role with cohesive blue theme - improved consistency
  const roleColorScheme = useMemo(() => {
    const schemes = {
      'admin': {
        bg: 'bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-700',
        text: 'text-white dark:text-white',
        accent: 'bg-blue-600 dark:bg-blue-700',
        gradient: 'from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-700',
        border: 'border-blue-500/50 dark:border-blue-400/30',
        shadow: 'shadow-lg shadow-blue-500/20 dark:shadow-blue-800/20',
        hoverBg: 'hover:bg-blue-50 dark:hover:bg-navy-700',
        activeBg: 'bg-blue-50 dark:bg-navy-700',
        activeText: 'text-blue-700 dark:text-blue-400'
      },
      'wadir': {
        bg: 'bg-gradient-to-r from-blue-400 to-cyan-500 dark:from-blue-500 dark:to-cyan-600',
        text: 'text-white dark:text-white',
        accent: 'bg-blue-500 dark:bg-blue-600',
        gradient: 'from-blue-400 to-cyan-500 dark:from-blue-500 dark:to-cyan-600',
        border: 'border-blue-400/50 dark:border-blue-300/30',
        shadow: 'shadow-lg shadow-blue-400/20 dark:shadow-blue-700/20',
        hoverBg: 'hover:bg-blue-50 dark:hover:bg-navy-700',
        activeBg: 'bg-blue-50 dark:bg-navy-700',
        activeText: 'text-cyan-700 dark:text-cyan-400'
      },
      'dosen': {
        bg: 'bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-indigo-600 dark:to-blue-600',
        text: 'text-white dark:text-white',
        accent: 'bg-indigo-500 dark:bg-indigo-600',
        gradient: 'from-indigo-500 to-blue-500 dark:from-indigo-600 dark:to-blue-600',
        border: 'border-indigo-500/50 dark:border-indigo-400/30',
        shadow: 'shadow-lg shadow-indigo-500/20 dark:shadow-indigo-800/20',
        hoverBg: 'hover:bg-indigo-50 dark:hover:bg-navy-700',
        activeBg: 'bg-indigo-50 dark:bg-navy-700',
        activeText: 'text-indigo-700 dark:text-indigo-400'
      },
      'reviewer': {
        bg: 'bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-600 dark:to-red-600',
        text: 'text-white dark:text-white',
        accent: 'bg-orange-600 dark:bg-orange-700',
        gradient: 'from-orange-500 to-red-500 dark:from-orange-600 dark:to-red-600',
        border: 'border-orange-500/50 dark:border-orange-400/30',
        shadow: 'shadow-lg shadow-orange-500/20 dark:shadow-orange-800/20',
        hoverBg: 'hover:bg-orange-50 dark:hover:bg-navy-700',
        activeBg: 'bg-orange-50 dark:bg-navy-700',
        activeText: 'text-orange-700 dark:text-orange-400'
      }
    };
    return schemes[user?.role] || schemes.wadir;
  }, [user?.role]);

  // Unified toggle mode function with navigation and state update
  const toggleMode = () => {
    // Prevent toggle if already in progress (optional - add state if needed)
    const targetRole = reviewerMode ? 'dosen' : 'reviewer';

    // Navigate first to avoid potential state sync issues
    navigate(`/${targetRole}/default`);

    // Then update state
    setReviewerMode(!reviewerMode);

    // Close sidebar on mobile
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  // Modified single switch button component - only shown for reviewer role
  const ModeSwitchButton = () => {
    if (user?.role !== 'reviewer') return null;

    const currentMode = reviewerMode;
    const buttonLabel = currentMode ? 'Switch to Dosen Mode' : 'Switch to Reviewer Mode';

    return (
      <div className="px-3 mt-4 mb-2">
        <button
          onClick={toggleMode}
          className={`
            w-full py-2.5 px-4 rounded-lg 
            transition-all duration-200 
            flex items-center justify-between
            ${currentMode
              ? 'bg-gradient-to-r from-orange-500/90 to-red-500/90 text-white'
              : 'bg-gradient-to-r from-indigo-500/90 to-blue-500/90 text-white'
            }
            hover:shadow-md
          `}
        >
          <span className="font-medium">{currentMode ? 'Reviewer Mode' : 'Dosen Mode'}</span>
          <div className="bg-white/20 rounded-md p-1">
            <MdOutlineSwitchRight className={`h-5 w-5 text-white transition-transform ${currentMode ? '' : 'rotate-180'}`} />
          </div>
        </button>
      </div>
    );
  };

  return (
    <div
      className={`
        sm:none duration-300 linear fixed
        h-full w-72 flex flex-col
        bg-white dark:!bg-navy-800
        shadow-xl shadow-gray-300/20 dark:shadow-white/5
        transition-all dark:text-white
        md:!z-50 lg:!z-50 xl:!z-0
        rounded-r-xl
        ${open ? "translate-x-0" : "-translate-x-96"}
      `}
    >
      {/* Close Button */}
      <button
        className={`
          absolute top-4 right-4 cursor-pointer xl:hidden 
          ${roleColorScheme.bg} p-1.5 rounded-full 
          transition-all duration-200 ${roleColorScheme.shadow}
        `}
        onClick={onClose}
        aria-label="Close Sidebar"
      >
        <HiX className="h-4 w-4 text-white" />
      </button>

      {/* Enhanced Logo Header Section with Background Image */}
      <div className="mt-5 mx-auto w-full px-4">
        <div className={`
          relative overflow-hidden
          ${roleColorScheme.shadow}
          w-full rounded-xl py-6 text-center
          bg-white dark:bg-navy-900
        `}>
          {/* Background Overlay with Role-based Color */}
          <div className={`absolute inset-0 ${roleColorScheme.bg} opacity-90`}></div>

          {/* Background Image with Parallax Effect - Using Building Image */}
          <div className="absolute inset-0 opacity-20 bg-cover bg-center"
            style={{
              backgroundImage: `url(${proposalGedung})`,
              transform: 'scale(1.1)',
              backgroundPosition: 'center'
            }}>
          </div>

          {/* Logo and Text Content - Improved Text Visibility */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="h-16 w-16 mb-2 rounded-full overflow-hidden border-2 border-white shadow-md">
              <img
                src={proposalLogo}
                alt="Smart Proposal Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-1 bg-black/20 backdrop-blur-sm px-4 py-1 rounded-lg">
              <h1 className="font-poppins text-[30px] font-bold text-white leading-tight tracking-wide drop-shadow-md">
                Smart<span className="font-medium">Proposal</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* User Profile Section - Improved */}
      <div className="px-4 py-5 mx-2 mt-4 bg-gray-50 dark:bg-navy-900/40 rounded-xl">
        <div className="flex items-center">
          <div className={`w-14 h-14 rounded-full overflow-hidden ${roleColorScheme.shadow} flex items-center justify-center ${roleColorScheme.bg}`}>
            <FaUserCircle className="h-9 w-9 text-white" />
          </div>
          <div className="ml-3 flex-1">
            <h4 className="font-bold text-gray-800 dark:text-white truncate">{user?.fullname || 'User'}</h4>
            {user?.role && (
              <div className="flex items-center mt-1">
                <span className={`
                  text-xs px-3 py-1 rounded-full font-medium capitalize
                  ${roleColorScheme.bg} ${roleColorScheme.text}
                  ${roleColorScheme.shadow}
                `}>
                  {user.role === 'reviewer' && !reviewerMode ? 'dosen' : user.role}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Clean Divider */}
      <div className="px-6 mt-5 mb-2">
        <div className={`h-0.5 w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-700 rounded-full`}></div>
      </div>

      {/* Single Mode Switch Button - Placed before navigation */}
      <ModeSwitchButton />

      {/* Navigation Links */}
      <nav className="flex-1 px-3 pt-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-navy-600 scrollbar-track-transparent">
        <ul className="w-full space-y-1.5 pb-4">
          <Links routes={routes} />
        </ul>
      </nav>

    </div>
  );
};

export default Sidebar;
