import React, { useState } from 'react';
import { HiArrowLeft } from "react-icons/hi";
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const API = 'http://localhost:3000/api/v1/auth/signin'; 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(API, formData, {
  withCredentials: true
});

      setMessage('✅ Login successful!');
      setError('');
      navigate('/profile', { replace: true });
   
    } catch (err) {
      setError('❌ Invalid email or password.');
      setMessage('');
    }
  };

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

      {/* Login Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full max-w-md bg-white rounded-xl border border-blue-400 py-6 px-6"
      >
        {/* Logo + Sign In */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-2 items-center">
            <div className="bg-rose-700/90 text-xl font-doto hover:bg-rose-700 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
              H
            </div>
            <div className="hover:bg-blue-700/80 font-doto bg-blue-700 w-10 h-10 text-xl -ml-4 rounded-full flex items-center justify-center text-white font-bold">
              D
            </div>
          </div>
          <span className="text-xl font-semibold">Sign In</span>
        </div>

        {/* Email */}
        <div className="flex flex-col w-full mt-8">
          <label className="mb-1 text-sm text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full h-10 px-3 rounded-sm ring-2 ring-blue-500 focus:outline-none"
            placeholder="Enter your email..."
            required
          />
        </div>

        {/* Password */}
        <div className="flex flex-col w-full mt-4">
          <label className="mb-1 text-sm text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full h-10 px-3 rounded-sm ring-2 ring-blue-500 focus:outline-none"
            placeholder="Enter your password..."
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-6 w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition"
        >
          Login
        </button>

        {/* Feedback */}
        {message && (
          <p className="mt-4 text-green-700 text-center">{message}</p>
        )}
        {error && (
          <p className="mt-2 text-red-600 text-center">{error}</p>
        )}

        {/* Forgot Password */}
        <div className="w-full mt-2 flex justify-end">
          <a href="/forgot-pass" className="text-sm text-blue-600 hover:underline">
            Forgot Password?
          </a>
        </div>

        {/* Create Account */}
        <div className="w-full mt-4 flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <a href="/signup/">
            <button type="button" className="px-4 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700 transition">
              Create Account
            </button>
          </a>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
      </form>
    </div>
  );
}

export default Login;
