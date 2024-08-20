import React from "react";

const ErrorPage = ({ message }) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-red-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">
          Something went wrong!
        </h1>
        <p className="text-xl text-red-500 mt-4">{message}</p>
      </div>
    </div>
  );
};

export default ErrorPage;
