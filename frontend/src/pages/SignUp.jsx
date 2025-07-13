import React, { useState } from 'react';
import { HiArrowLeft } from 'react-icons/hi';
import axios from 'axios';

function SignUp() {
  const [user, setUser] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    phone: '',
    gender: ''
  });

  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const API = 'http://localhost:3000/api/signup';

  const dataSubmit = async (e) => {
    e.preventDefault();

    const userModel = {
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      password: user.password,
      phone: user.phone,
      gender: user.gender
    };

    try {
      await axios.post(API, userModel);
      setMessage('✅ Account created successfully!');
      setUser({
        fname: '',
        lname: '',
        email: '',
        password: '',
        phone: '',
        gender: ''
      });
    } catch (e) {
      console.error(e);
      setError(e.message || 'Something went wrong');
      setMessage('❌ Failed to create account.');
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-blue-700 px-4">
      <div className="absolute top-4 left-4">
        <a href="/">
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-200 transition">
            <HiArrowLeft className="text-black text-xl" />
          </button>
        </a>
      </div>

      <form
        onSubmit={dataSubmit}
        className="flex flex-col items-center w-full max-w-md bg-white rounded-xl border border-blue-400 py-6 px-6"
      >
        <div className="flex gap-2 items-center mb-2">
          <div className="bg-rose-700/90 text-xl font-doto hover:bg-rose-700 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold transition-opacity cursor-pointer">
            H
          </div>
          <div className="hover:bg-blue-700/80 bg-blue-700 font-doto w-10 h-10 text-xl -ml-4 rounded-full flex items-center justify-center text-white font-bold transition-opacity cursor-pointer">
            D
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">Create Account</h2>

        <div className="flex gap-2 w-full">
          <div className="flex flex-col w-1/2">
            <label className="mb-1 text-sm text-gray-700">First Name</label>
            <input
              type="text"
              name="fname"
              value={user.fname}
              onChange={handleChange}
              className="h-10 px-3 ring-2 ring-blue-500 rounded-sm focus:outline-none"
              placeholder="First Name"
              required
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="mb-1 text-sm text-gray-700">Last Name</label>
            <input
              type="text"
              name="lname"
              value={user.lname}
              onChange={handleChange}
              className="h-10 px-3 ring-2 ring-blue-500 rounded-sm focus:outline-none"
              placeholder="Last Name"
              required
            />
          </div>
        </div>

        <div className="w-full mt-4">
          <label className="mb-1 text-sm text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="w-full h-10 px-3 ring-2 ring-blue-500 rounded-sm focus:outline-none"
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div className="w-full mt-4">
          <label className="mb-1 text-sm text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full h-10 px-3 ring-2 ring-blue-500 rounded-sm focus:outline-none"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="w-full mt-4">
          <label className="mb-1 text-sm text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="w-full h-10 px-3 ring-2 ring-blue-500 rounded-sm focus:outline-none"
            placeholder="Create a password"
            required
          />
        </div>

        <div className="w-full mt-4">
          <label className="mb-1 text-sm text-gray-700">Gender</label>
          <select
            name="gender"
            value={user.gender}
            onChange={handleChange}
            className="w-full h-10 px-3 ring-2 ring-blue-500 rounded-sm focus:outline-none"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Register
        </button>

        {message && (
          <p className="mt-4 text-center text-green-700 font-medium">{message}</p>
        )}

        {error && (
          <p className="mt-2 text-center text-red-600 font-medium">{error}</p>
        )}
      </form>
    </div>
  );
}

export default SignUp;
