
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./common/Footer";
import Header from "./common/Header";

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      <main className="flex-1 w-full mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 max-w-6xl">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
