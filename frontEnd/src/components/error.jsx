import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-4xl font-bold text-red-500 mb-4">Oops!</div>
      <div className="text-lg text-gray-700 mb-8">
        Something went wrong. Please try again later.
      </div>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Refresh Page
      </button>
    </div>
  );
};

export default ErrorPage;
