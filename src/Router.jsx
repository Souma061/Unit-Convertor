import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ConverterDetail from "./pages/ConverterDetail";
import NotFoundPage from "./pages/NotFoundPage";
import ErrorBoundary from "./components/common/ErrorBoundary";

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
        element: <ConverterDetail />,
      },

    ],
  },

 
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
