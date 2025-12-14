import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // ❗ FIXED name
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-900 border border-red-700 rounded-lg p-6 m-4">
          <h2 className="text-lg font-bold text-red-100 mb-2">
            Something went wrong.
          </h2>

          <p className="text-red-200 text-sm">
            {this.state.error?.message || "An unexpected error occurred."}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded transition"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}


