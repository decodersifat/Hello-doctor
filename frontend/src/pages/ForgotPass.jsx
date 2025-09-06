import React from 'react'
import { HiArrowLeft } from "react-icons/hi";


function ForgotPass() {
    return (
        <div className="relative w-full min-h-screen flex items-center justify-center bg-blue-700 px-4">
            {/* Back Button */}
            <div className="absolute top-4 left-4">
                <a href="/">
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-200 transition">
                        <HiArrowLeft className="text-black text-xl" />
                    </button>
                </a>
            </div>

            <div className="flex flex-col items-center w-full max-w-md bg-white rounded-xl border border-blue-400 py-6 px-6">
                {/* Title */}
                <h2 className="text-xl font-semibold mb-2">Forgot Password</h2>
                <p className="text-sm text-gray-600 mb-6 text-center">
                    Enter your email to receive password reset instructions.
                </p>

                {/* Email Input */}
                <div className="w-full">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full h-10 px-3 ring-2 ring-blue-500 rounded-sm focus:outline-none"
                    />
                </div>

                {/* Reset Button */}
                <button className="mt-6 w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition">
                    Send Reset Link
                </button>
            </div>
        </div>
    );
};

export default ForgotPass;