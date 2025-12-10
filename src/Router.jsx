import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/common/ErrorBoundary.jsx";
import Loading from "./components/common/Loading.jsx";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// Lazy load the heaviest page
const ConverterDetail = lazy(() => import("./pages/ConverterDetail.jsx"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <Layout />
      </ErrorBoundary>
    ),
    errorElement: <NotFoundPage />, // Route-level error fallback
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "converter/:id",
        element: (
          <Suspense fallback={<div className="p-8 flex justify-center"><Loading /></div>}>
            <ConverterDetail />
          </Suspense>
        ),
      },

    ],
  },


  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
