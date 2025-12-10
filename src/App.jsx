import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import SplashScreen from "./components/common/SplashScreen";
import { ThemeProvider } from "./context/ThemeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <HelmetProvider>
      <ThemeProvider>
        {loading ? (
          <SplashScreen onFinish={() => setLoading(false)} />
        ) : (
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        )}
      </ThemeProvider>
    </HelmetProvider>
  );
}
