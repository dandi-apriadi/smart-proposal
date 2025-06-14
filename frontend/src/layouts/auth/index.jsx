import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import routes from "../../routes/routes-auth.js";
import Navbar from "components/navbarhome";
import { useEffect, useState } from "react";
import { FiBookOpen } from "react-icons/fi"; // Import icon for consistency

export default function Auth() {
  const [page, setPage] = useState("");
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname.split("/").pop();
    const currentRoute = routes.find(
      (route) => route.layout === "/auth" && route.path === currentPath
    );

    if (currentRoute) {
      setPage(currentRoute.name);
      // Update document title to match the accounting theme
      document.title = `${currentRoute.name}`;
    } else {
      // Handle cases where route might not be found, e.g., redirect to homepage
      const isAuthBase = location.pathname === '/auth' || location.pathname === '/auth/';
      if (isAuthBase) {
        document.title = ""; // Default title for base auth path
      }
    }
  }, [location.pathname]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/auth") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };

  return (
    // Simplified main container, removed dark mode
    <div className="min-h-screen w-full bg-gray-50"> {/* Consistent light background */}
      <Navbar /> {/* Navbar remains fixed at the top */}
      <main className="pt-16"> {/* Add padding top equal to navbar height */}
        {/* Simplified content area - SignIn now controls its own layout */}
        <div className="mx-auto w-full">
          <Routes>
            {getRoutes(routes)}
            {/* Redirect base /auth path to a default page, e.g., sign-in or homepage */}
            <Route
              path="/"
              // Redirecting to sign-in as homepage might not be under /auth layout
              element={<Navigate to="/auth/sign-in" replace />}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
}
