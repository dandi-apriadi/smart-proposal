import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiX, FiHome, FiMenu, FiPieChart, FiFileText, FiSettings, FiUsers, FiDollarSign, FiLogOut, FiGrid, FiClipboard, FiCheckSquare, FiBarChart2, FiCpu, FiBriefcase } from 'react-icons/fi';
import { HiOutlineClipboardDocumentCheck } from 'react-icons/hi2';
import { TbBrain, TbClipboardCheck } from 'react-icons/tb';
import { useSelector, useDispatch } from "react-redux";
import { getMe, logoutUser, reset } from "../../store/slices/authSlice";
import "./style.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, baseURL } = useSelector((state) => state.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const toggleMobileMenu = (e) => {
    e?.stopPropagation();
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await dispatch(getMe()).unwrap();
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      dispatch(reset());
      navigate('/auth/sign-in');
    } catch (error) {
      console.error('Logout failed:', error.message);
    }
  };

  useEffect(() => {
    const closeDropdowns = (e) => {
      if (!e.target.closest('.mobile-menu-container') && !e.target.closest('.menu-button')) {
      }
    };

    document.addEventListener('click', closeDropdowns);
    return () => document.removeEventListener('click', closeDropdowns);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target) &&
        !e.target.closest('.menu-button')) {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = '';
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  const basePath = user ? (user.role === 'admin' ? '/admin' : '/customer') : '/auth';

  return (
    <>
      {/* Redesigned background elements with more professional look */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Premium gradient background with subtle blue tones - changed to match Polimando theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-50/90 to-blue-50/90"></div>

        {/* Abstract geometric elements for visual interest */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="opacity-[0.03] w-full h-full">
            <path fill="#003d7c" d="M39.9,-65.7C51.5,-56.3,60.8,-45.2,65.8,-32.8C70.8,-20.3,71.6,-6.4,70.3,7.7C69,21.8,65.6,36,56.7,45.7C47.8,55.4,33.3,60.6,19.4,64.1C5.5,67.6,-7.8,69.3,-22.4,67.6C-37,65.9,-52.9,60.9,-61.3,50.2C-69.8,39.5,-70.7,23.2,-70.3,7.9C-69.9,-7.4,-68.1,-21.6,-61.3,-32.9C-54.5,-44.1,-42.8,-52.3,-30.6,-61.2C-18.3,-70.1,-5.4,-79.6,7.3,-80.5C20,-81.3,28.3,-75.1,39.9,-65.7Z" transform="translate(100 100)" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="opacity-[0.03] w-full h-full">
            <path fill="#003d7c" d="M45.3,-76.2C56.9,-67.2,62.5,-50.3,71.7,-34.8C80.9,-19.3,93.6,-5.2,93.1,8.6C92.6,22.4,78.9,35.8,66.1,46.5C53.2,57.1,41.2,65,28.3,70.7C15.4,76.4,1.5,79.9,-14.6,79.6C-30.7,79.3,-48.9,75.2,-58.3,63.6C-67.7,52,-68.4,33,-72.6,15.4C-76.9,-2.2,-84.8,-18.5,-81.6,-32.3C-78.4,-46.1,-64.1,-57.4,-49.2,-65.2C-34.3,-73,-17.1,-77.4,0.2,-77.7C17.5,-78,35.1,-74.3,45.3,-76.2Z" transform="translate(100 100)" />
          </svg>
        </div>

        {/* Refined geometric patterns */}
        <div className="absolute top-0 left-0 w-full h-screen opacity-[0.02]"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, #003d7c, #003d7c 1px, transparent 1px, transparent 20px),
                             repeating-linear-gradient(90deg, #003d7c, #003d7c 1px, transparent 1px, transparent 20px)`,
            backgroundSize: '20px 20px'
          }}>
        </div>

        {/* Enhanced floating elements - changed colors to blue */}
        <div className="absolute top-40 left-[5%] w-56 h-56 bg-blue-700/5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-blue-500/5 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute -bottom-32 left-[25%] w-96 h-96 bg-blue-600/5 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>

        {/* Subtle accent elements */}
        <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-blue-400/20 rounded-full hidden md:block"></div>
        <div className="absolute top-1/3 left-1/3 w-5 h-5 bg-blue-400/10 rounded-full hidden md:block"></div>
        <div className="absolute bottom-1/4 right-1/3 w-4 h-4 bg-blue-400/15 rounded-full hidden md:block"></div>

        {/* Decorative lines */}
        <div className="absolute top-0 right-20 h-40 w-px bg-gradient-to-b from-transparent via-blue-200/20 to-transparent hidden lg:block"></div>
        <div className="absolute bottom-20 left-1/4 h-px w-40 bg-gradient-to-r from-transparent via-blue-200/20 to-transparent hidden lg:block"></div>

        {/* Enhanced wave pattern */}
        <svg className="absolute left-0 bottom-0 w-full opacity-[0.07]"
          viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
          <path fill="#003d7c" d="M0,128L48,144C96,160,192,192,288,186.7C384,181,480,139,576,138.7C672,139,768,181,864,181.3C960,181,1056,139,1152,133.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* Improved navbar with increased transparency */}
      <nav className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b 
        bg-white/20 backdrop-blur-lg shadow-sm border-blue-100/30">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          {/* Additional subtle glass effect background */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-b-lg"></div>

          <div className="flex items-center justify-between h-16 relative">
            {/* Brand/Logo Section */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center group">
                {/* Enhanced Logo with Combined Elements */}
                <div className="relative w-10 h-10 flex items-center justify-center">
                  {/* Background Layers */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-blue-500/15 to-blue-700/10 rounded-xl group-hover:from-blue-600/15 group-hover:via-blue-500/20 group-hover:to-blue-700/15 transition-all duration-300 transform group-hover:scale-105"></div>

                  {/* Border Effect */}
                  <div className="absolute inset-0 rounded-xl border border-blue-500/20 group-hover:border-blue-500/30 transition-colors duration-300"></div>

                  {/* Subtle Pattern */}
                  <div className="absolute inset-0 opacity-10 rounded-xl overflow-hidden">
                    <div className="w-full h-full" style={{
                      backgroundImage: "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
                      backgroundSize: "8px 8px"
                    }}></div>
                  </div>

                  {/* Main Icon - Document with AI Circuit Pattern */}
                  <div className="relative flex items-center justify-center">
                    <div className="absolute text-blue-600/30 transform scale-[1.8]">
                      <TbClipboardCheck className="w-4 h-4" />
                    </div>
                    <div className="absolute text-blue-600/40 transform translate-x-[1px] translate-y-[1px]">
                      <TbBrain className="w-4 h-4" />
                    </div>
                    <HiOutlineClipboardDocumentCheck className="w-5 h-5 text-blue-700 relative z-10" />
                  </div>

                  {/* Accent Elements */}
                  <div className="absolute top-0 right-0 w-2 h-2 bg-blue-600/20 rounded-full transform -translate-x-[2px] -translate-y-[2px]"></div>
                  <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-blue-700/20 rounded-full transform translate-x-[2px] translate-y-[2px]"></div>

                  {/* Animated Pulse Effect */}
                  <div className="absolute inset-0 bg-blue-500/5 rounded-xl animate-pulse"></div>
                </div>

                {/* App Name */}
                <div className="ml-2 flex flex-col">
                  <span className="text-lg font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-600 group-hover:opacity-80 transition-opacity duration-300 leading-none">
                    Smart<span className="text-blue-800">Proposal</span>
                  </span>
                  <span className="text-[10px] text-blue-500/80 font-medium tracking-tight">
                    AI-powered validation
                  </span>
                </div>
              </Link>
            </div>

            {/* Center: Navigation Links */}
            <div className="hidden lg:flex flex-grow items-center justify-center">
              {user && (
                <div className="flex items-baseline space-x-6 text-gray-700">
                  <Link to={`${basePath}/dashboard`}
                    className="px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 flex items-center gap-2">
                    <FiGrid className="w-4 h-4" /> Dashboard
                  </Link>

                  <Link to={`${basePath}/proposals`}
                    className="px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 flex items-center gap-2">
                    <FiClipboard className="w-4 h-4" /> Proposals
                  </Link>

                  <Link to={`${basePath}/reports`}
                    className="px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 flex items-center gap-2">
                    <FiBarChart2 className="w-4 h-4" /> Analytics
                  </Link>

                  {user?.role === 'admin' && (
                    <Link to={`${basePath}/settings`}
                      className="px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 flex items-center gap-2">
                      <FiSettings className="w-4 h-4" /> Settings
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Right Side: Authentication/Actions */}
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <button onClick={handleLogout}
                    title="Logout"
                    className="hidden lg:flex items-center px-4 py-2 rounded-xl text-sm font-medium text-gray-700 hover:text-red-600 border border-transparent hover:border-red-100 hover:bg-red-50 transition-all duration-200 gap-2">
                    <FiLogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              ) : (
                <div className="hidden lg:flex items-center">
                  <Link to="/auth/sign-in"
                    className="px-5 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-blue-700 to-blue-600 text-white hover:shadow-md transition-all duration-200">
                    Sign In
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200 menu-button"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Updated to match the new blue theme */}
      <div
        ref={mobileMenuRef}
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out lg:hidden mobile-menu-container
                    ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
                    bg-white/40 backdrop-blur-xl shadow-xl`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-blue-100">
            <Link to="/" className="flex items-center" onClick={handleMobileMenuClose}>
              {/* Enhanced Mobile Logo (Same as Desktop) */}
              <div className="relative w-10 h-10 flex items-center justify-center">
                {/* Background Layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-blue-500/15 to-blue-700/10 rounded-xl"></div>

                {/* Border Effect */}
                <div className="absolute inset-0 rounded-xl border border-blue-500/20"></div>

                {/* Subtle Pattern */}
                <div className="absolute inset-0 opacity-10 rounded-xl overflow-hidden">
                  <div className="w-full h-full" style={{
                    backgroundImage: "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
                    backgroundSize: "8px 8px"
                  }}></div>
                </div>

                {/* Main Icon - Document with AI Circuit Pattern */}
                <div className="relative flex items-center justify-center">
                  <div className="absolute text-blue-600/30 transform scale-[1.8]">
                    <TbClipboardCheck className="w-4 h-4" />
                  </div>
                  <div className="absolute text-blue-600/40 transform translate-x-[1px] translate-y-[1px]">
                    <TbBrain className="w-4 h-4" />
                  </div>
                  <HiOutlineClipboardDocumentCheck className="w-5 h-5 text-blue-700 relative z-10" />
                </div>

                {/* Accent Elements */}
                <div className="absolute top-0 right-0 w-2 h-2 bg-blue-600/20 rounded-full transform -translate-x-[2px] -translate-y-[2px]"></div>
                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-blue-700/20 rounded-full transform translate-x-[2px] translate-y-[2px]"></div>

                {/* Animated Pulse Effect */}
                <div className="absolute inset-0 bg-blue-500/5 rounded-xl animate-pulse"></div>
              </div>

              {/* App Name */}
              <div className="ml-2 flex flex-col">
                <span className="text-lg font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-600 leading-none">
                  Smart<span className="text-blue-800">Proposal</span>
                </span>
                <span className="text-[10px] text-blue-500/80 font-medium tracking-tight">
                  AI-powered validation
                </span>
              </div>
            </Link>

            <button onClick={handleMobileMenuClose} className="p-2 rounded-lg text-gray-600 hover:text-blue-700 hover:bg-blue-50">
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu Content - Updated menu items to match proposal system */}
          <div className="flex-grow overflow-y-auto py-6 px-6">
            {user ? (
              <div className="space-y-4">
                <Link to={`${basePath}/dashboard`} onClick={handleMobileMenuClose}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200">
                  <FiGrid className="w-5 h-5" /> Dashboard
                </Link>

                <Link to={`${basePath}/proposals`} onClick={handleMobileMenuClose}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200">
                  <FiClipboard className="w-5 h-5" /> Proposals
                </Link>

                <Link to={`${basePath}/analytics`} onClick={handleMobileMenuClose}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200">
                  <FiBarChart2 className="w-5 h-5" /> Analytics
                </Link>

                {user?.role === 'admin' && (
                  <Link to={`${basePath}/settings`} onClick={handleMobileMenuClose}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50 transition-all duration-200">
                    <FiSettings className="w-5 h-5" /> Settings
                  </Link>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 space-y-6">
                <div className="w-20 h-20 bg-blue-600/10 rounded-2xl flex items-center justify-center">
                  <FiCheckSquare className="w-10 h-10 text-blue-700" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">SmartProposal</h3>
                  <p className="text-gray-500 text-sm">ML-powered proposal format checking</p>
                </div>
                <Link to="/auth/sign-in" onClick={handleMobileMenuClose}
                  className="w-full max-w-xs py-3 px-6 text-center bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-xl shadow-md font-medium">
                  Sign In
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Footer */}
          {user && (
            <div className="p-6 border-t border-blue-100">
              <button onClick={() => { handleLogout(); handleMobileMenuClose(); }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-base font-medium text-red-600 hover:bg-red-50 border border-red-100 transition-all duration-200">
                <FiLogOut className="w-5 h-5" /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Padding for content below navbar */}
      <div className="pt-16"></div>

      {/* Enhanced animation keyframes */}
      <style jsx="true">{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(20px, -10px) scale(1.05); }
          66% { transform: translate(-10px, 15px) scale(0.98); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 25s infinite alternate;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-6000 {
          animation-delay: 6s;
        }
      `}</style>
    </>
  );
};

export default Navbar;