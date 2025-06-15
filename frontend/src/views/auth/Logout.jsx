import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser, reset, clearAuth } from "../../store/slices/authSlice";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hasLoggedOut, setHasLoggedOut] = useState(false);
  const { logoutSuccess, isError, message, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    // Only dispatch logout once
    if (!hasLoggedOut) {
      console.log('Initiating logout...');
      dispatch(logoutUser());
      setHasLoggedOut(true);
    }
  }, [dispatch, hasLoggedOut]);

  // Handle logout result
  useEffect(() => {
    if (hasLoggedOut && logoutSuccess) {
      console.log('Logout successful, clearing auth and navigating...');

      // Clear all auth state
      dispatch(clearAuth());

      // Navigate to login page
      setTimeout(() => {
        navigate("/auth/sign-in", { replace: true });
      }, 1000);
    }

    if (hasLoggedOut && isError) {
      console.error('Logout failed:', message);
      // Still navigate to login even if logout fails
      setTimeout(() => {
        dispatch(clearAuth());
        navigate("/auth/sign-in", { replace: true });
      }, 1000);
    }
  }, [hasLoggedOut, logoutSuccess, isError, message, dispatch, navigate]);

  return (
    <div className="mt-16 flex h-full w-full items-center justify-center">
      <div className="text-center">
        <div className="mb-4">
          <div className="w-16 h-16 border-4 border-blue-700 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
        {isError ? (
          <p className="text-red-500">Logout failed: {message}</p>
        ) : (
          <p className="text-navy-700 dark:text-white">Logging out...</p>
        )}
      </div>
    </div>
  );
}
