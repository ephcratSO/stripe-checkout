import { useRouter } from "next/router";
import React from "react";

const SuccessPage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-green-500 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
      <h1 className="text-3xl font-bold text-green-700">Payment Successful!</h1>
      <p className="mt-3 text-lg text-green-600">
        Your transaction has been completed successfully. An email receipt has
        been sent to your address.
      </p>
      <button
        className="mt-8 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300"
        onClick={() => router.push("/")}
      >
        Go to Home
      </button>
    </div>
  );
};

export default SuccessPage;
