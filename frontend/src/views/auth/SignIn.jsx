import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, reset } from "../../store/slices/authSlice";
import { FiBookOpen, FiLogIn, FiUser, FiLock, FiAward, FiCalendar, FiUsers } from "react-icons/fi";
import Swal from 'sweetalert2';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);
  // Handle authentication state
  useEffect(() => {
    // Check if login was successful and user exists
    if (isSuccess && user) {
      const userData = user;
      let route;
      // Navigate based on specific role
      switch (userData.role) {
        case "admin":
          route = "/admin/default";
          break;
        case "kajur":
          route = "/kajur/default";
          break;
        case "wadir":
          route = "/wadir/default";
          break;
        case "dosen":
          route = "/dosen/default";
          break;
        case "bendahara":
          route = "/bendahara/default";
          break;
        case "reviewer":
          route = "/reviewer/default";
          break;
        default:
          route = "/auth/sign-in";
      }
      console.log("User logged in:", userData);
      navigate(route);
      dispatch(reset()); // Reset state after navigation
    }

    if (isError) {
      dispatch(reset()); // Reset state after error
    }
  }, [isSuccess, isError, user, message, navigate, dispatch]);

  const handleAuth = async (e) => {
    e.preventDefault();

    // Form validation
    if (!email.trim() || !password.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill in all fields',
        timer: 2000,
        timerProgressBar: true,
        customClass: {
          popup: 'rounded-xl'
        }
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Email',
        text: 'Please enter a valid email address',
        timer: 2000,
        timerProgressBar: true,
        customClass: {
          popup: 'rounded-xl'
        }
      });
      return;
    }

    try {
      await dispatch(loginUser({ email: email.trim(), password: password.trim() })).unwrap();
    } catch (error) {
      console.error('Login error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error?.message || 'Invalid credentials',
        confirmButtonColor: '#003d7c',
        timer: 3000,
        timerProgressBar: true,
        customClass: {
          popup: 'rounded-xl'
        }
      });
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50 backdrop-blur-sm">
        <div className="relative p-8 rounded-xl bg-white shadow-2xl">
          <div className="w-16 h-16 border-4 border-blue-700 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-center text-gray-600 font-medium">Signing in...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center px-4 py-10 bg-gradient-to-br from-gray-50 via-gray-50 to-blue-50 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Wave Pattern */}
        <svg className="absolute left-0 bottom-0 w-full opacity-10"
          viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
          <path fill="#003d7c" d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,229.3C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>

        {/* Floating Shapes */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-700/10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-red-600/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-yellow-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjAyMDIwIiBzdHJva2Utd2lkdGg9IjEuNSI+PHBhdGggZD0ibTI2IDI2djM0TTI2IDI2aDM0Ii8+PHBhdGggZD0ibTI2IDI2IDM0IDM0TTAgMjZoMjZNMjYgMHYyNk0wIDYwaDYwVjAgMHY2MEgwWiIvPjwvZz48L3N2Zz4=')]"></div>
      </div>

      {/* Main Container with Glass Effect */}
      <div className="container max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-stretch bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">

          {/* Left Section: Branding & Information */}
          <div className="lg:w-5/12 py-10 px-8 lg:px-12 bg-gradient-to-br from-blue-800 to-blue-700 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"></path>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)"></rect>
              </svg>
            </div>

            {/* Logo & Branding */}
            <div className="relative flex flex-col h-full justify-between">
              <div className="mb-10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg p-2 mr-3">
                    <FiBookOpen className="w-full h-full" />
                  </div>
                  <h1 className="text-2xl font-bold tracking-tight">POLIMANDO</h1>
                </div>
                <h2 className="text-3xl font-bold mb-2">Campus Information System</h2>
                <p className="text-white/80 text-lg mb-6">Politeknik Negeri Manado - Excellence in Education and Technology</p>

                {/* Feature Icons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <FiCalendar className="w-8 h-8 mb-2" />
                    <span className="text-sm font-medium">Academic Calendar</span>
                  </div>
                  <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <FiUsers className="w-8 h-8 mb-2" />
                    <span className="text-sm font-medium">Student Portal</span>
                  </div>
                  <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <FiAward className="w-8 h-8 mb-2" />
                    <span className="text-sm font-medium">Learning Management</span>
                  </div>
                </div>
              </div>

              {/* Footer Info */}
              <div className="mt-auto">
                <div className="border-t border-white/20 pt-4 text-sm">
                  <p>&copy; 2025 Politeknik Negeri Manado. All rights reserved.</p>
                  <p className="text-white/70 text-xs mt-1">Jl. Raya Politeknik, Buha, Manado, Sulawesi Utara</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: Login Form */}
          <div className="lg:w-7/12 p-8 md:p-12 flex items-center">
            <div className="w-full max-w-md mx-auto">
              <div className="text-center mb-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Selamat Datang</h3>
                <p className="text-gray-600">Silakan masuk untuk melanjutkan</p>
              </div>

              <form onSubmit={handleAuth} className="space-y-6">
                {/* Email Field - Using only placeholder, no label */}
                <div className="relative">
                  {/* Input Icon */}
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10">
                    <FiUser className="w-5 h-5" />
                  </div>

                  {/* Input field with placeholder only */}
                  <input
                    className={`block w-full px-12 py-4 bg-gray-50 border-2 rounded-xl text-gray-800 transition-all duration-200
                      ${(emailFocused || email)
                        ? 'border-blue-700 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                      focus:outline-none focus:ring-2 focus:ring-blue-700/20 focus:border-blue-700
                    `}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    id="email-input"
                    placeholder="Email Address"
                  />

                  {/* Active input highlight/indicator */}
                  <div
                    className={`absolute bottom-0 left-3 right-3 h-0.5 bg-blue-700 rounded-full transform origin-left transition-transform duration-300 ease-out
                      ${(emailFocused) ? 'scale-x-100' : 'scale-x-0'}
                    `}
                  ></div>
                </div>

                {/* Password Field - Using only placeholder, no label */}
                <div className="relative">
                  {/* Input Icon */}
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10">
                    <FiLock className="w-5 h-5" />
                  </div>

                  {/* Input field with placeholder only */}
                  <input
                    className={`block w-full px-12 py-4 bg-gray-50 border-2 rounded-xl text-gray-800 transition-all duration-200
                      ${(passwordFocused || password)
                        ? 'border-blue-700 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                      focus:outline-none focus:ring-2 focus:ring-blue-700/20 focus:border-blue-700
                    `}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    id="password-input"
                    placeholder="Password"
                  />

                  {/* Active input highlight/indicator */}
                  <div
                    className={`absolute bottom-0 left-3 right-3 h-0.5 bg-blue-700 rounded-full transform origin-left transition-transform duration-300 ease-out
                      ${(passwordFocused) ? 'scale-x-100' : 'scale-x-0'}
                    `}
                  ></div>
                </div>

                {/* Submit Button - Enhanced with larger size and better hover effect */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-blue-800 to-blue-700 text-white rounded-xl font-medium text-base
                    transition-all duration-300 shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-600
                    focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 disabled:opacity-70 relative overflow-hidden group"
                    disabled={isLoading}
                  >
                    {/* Animated highlight effect */}
                    <span className="absolute right-full w-12 h-full bg-white/20 skew-x-12 transition-all duration-1000 group-hover:right-0 ease-in-out"></span>

                    <div className="relative flex items-center justify-center">
                      <FiLogIn className="mr-2 h-5 w-5" />
                      <span>Masuk</span>
                    </div>
                  </button>
                </div>
              </form>

              {/* Extra Info */}
              <div className="mt-8 text-center text-gray-500 text-sm">
                <p>Dengan masuk, Anda menyetujui syarat dan ketentuan yang berlaku.</p>
                <p className="mt-6 text-xs">Butuh bantuan? Hubungi admin sistem</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add animation keyframes for the blob animation */}
      <style jsx="true">{`
        @keyframes blob {
          0% { transform: scale(1); }
          33% { transform: scale(1.1); }
          66% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default SignIn;