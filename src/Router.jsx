import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/common/ErrorBoundary";
import Loading from "./components/common/Loading";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";

// Lazy load the heaviest page
const ConverterDetail = lazy(() => import("./pages/ConverterDetail"));

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
