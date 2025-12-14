
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./common/Footer.jsx";
import Header from "./common/Header.jsx";

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500 ease-in-out bg-linear-to-br from-slate-100 via-white to-slate-200 dark:from-slate-900 dark:via-gray-900 dark:to-slate-900">
      <Header />

      <main className="flex-1 w-full mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 max-w-6xl">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}


