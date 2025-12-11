import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/common/ErrorBoundary.jsx";
import Loading from "./components/common/Loading.jsx";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// Lazy load the wrapper instead of the detail page directly
const ConverterDetailWrapper = lazy(() => import("./pages/ConverterDetailWrapper.jsx"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <Layout />
      </ErrorBoundary>
    ),
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "converter/:id",
        element: (
          <Suspense fallback={<div className="p-8 flex justify-center"><Loading /></div>}>
            <ConverterDetailWrapper />
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
