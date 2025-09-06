import React, { useState } from 'react';
import { HiArrowLeft } from 'react-icons/hi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    img: null, // file object
    gender: '',
    age: ''
  });

  const [error, setError] = useState({});
  const [message, setMessage] = useState('');
  const API = 'http://localhost:3000/api/v1/auth/signup';

  // ✅ Password validator
  const validatePassword = (password) => {
    const minLength = /.{6,}/;
    const hasNumber = /\d/;
    if (!minLength.test(password)) {
      return 'Password must be at least 6 characters long';
    }
    if (!hasNumber.test(password)) {
      return 'Password must contain at least one number';
    }
    return '';
  };

  // ✅ Email validator
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Enter a valid email (e.g. user@example.com)';
    }
    return '';
  };

  const dataSubmit = async (e) => {
    e.preventDefault();

    let validationErrors = {};

    const emailError = validateEmail(user.email);
    if (emailError) validationErrors.email = emailError;

    if (!/^\d+$/.test(user.phone)) {
      validationErrors.phone = 'Phone number should contain only digits';
    }

    const passwordError = validatePassword(user.password);
    if (passwordError) {
      validationErrors.password = passwordError;
    }

    if (user.password !== user.confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    setError({});

    // ✅ Build FormData instead of JSON
    const formData = new FormData();
    formData.append('fname', user.fname);
    formData.append('lname', user.lname);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('phone', user.phone);
    formData.append('gender', user.gender);
    formData.append('age', user.age);
    formData.append('profileImg', user.img); // must match backend multer field

    try {
      await axios.post(API, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage('✅ Account created successfully!');
      navigate('/signin/', { replace: true });
      setUser({
        fname: '',
        lname: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        img: null,
        gender: '',
        age: ''
      });
    } catch (e) {
      console.error(e);
      setError({ api: e.response?.data?.message || e.message || 'Something went wrong' });
      setMessage('❌ Failed to create account.');
    }
  };

  const handleChange = (e) => {
    if (e.target.name === 'phone') {
      setUser({ ...user, phone: e.target.value.replace(/\D/g, '') });
    } else if (e.target.name === 'profileImg') {
      setUser({ ...user, img: e.target.files[0] }); // store file object
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
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
        method="post"
        encType="multipart/form-data"
        onSubmit={dataSubmit}
        className="flex flex-col items-center w-full max-w-md bg-white rounded-xl border border-blue-400 py-6 px-6"
      >
        {/* Logo */}
        <div className="flex gap-2 items-center mb-2">
          <div className="bg-rose-700/90 text-xl font-doto w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
            H
          </div>
          <div className="bg-blue-700 font-doto w-10 h-10 text-xl -ml-4 rounded-full flex items-center justify-center text-white font-bold">
            D
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">Create Account</h2>

        {/* Name */}
        <div className="flex gap-2 w-full">
          <div className="flex flex-col w-1/2">
            <label className="mb-1 text-sm text-gray-700">First Name</label>
            <input type="text" name="fname" value={user.fname} onChange={handleChange} className="h-10 px-3 ring-2 ring-blue-500 rounded-sm focus:outline-none" placeholder="First Name" required />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="mb-1 text-sm text-gray-700">Last Name</label>
            <input type="text" name="lname" value={user.lname} onChange={handleChange} className="h-10 px-3 ring-2 ring-blue-500 rounded-sm focus:outline-none" placeholder="Last Name" required />
          </div>
        </div>

        {/* Image Upload */}
        <div className="w-full mt-4">
          <label className="mb-1 text-sm text-gray-700">Upload Image</label>
          <input type="file" name="profileImg" onChange={handleChange} className="w-full h-10 p-1.5 ring-2 bg-blue-100 ring-blue-500 rounded-sm focus:outline-none" required />
        </div>

        {/* Phone */}
        <div className="w-full mt-4">
          <label className="mb-1 text-sm text-gray-700">Phone Number</label>
          <input type="tel" name="phone" value={user.phone} onChange={handleChange} className="w-full h-10 px-3 ring-2 ring-blue-500 rounded-sm focus:outline-none" placeholder="Enter your phone number" required />
          {error.phone && <p className="text-red-600 text-sm">{error.phone}</p>}
        </div>

        {/* Email */}
        <div className="w-full mt-4">
          <label className="mb-1 text-sm text-gray-700">Email</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} className="w-full h-10 px-3 ring-2 ring-blue-500 rounded-sm focus:outline-none" placeholder="Enter your email" required />
          {error.email && <p className="text-red-600 text-sm">{error.email}</p>}
        </div>

        {/* Password */}
        <div className="w-full mt-4">
          <label className="mb-1 text-sm text-gray-700">Password</label>
          <input type="password" name="password" value={user.password} onChange={handleChange} className="w-full h-10 px-3 ring-2 ring-blue-500 rounded-sm focus:outline-none" placeholder="Create a password" required />
          {error.password && <p className="text-red-600 text-sm">{error.password}</p>}
        </div>

        {/* Confirm Password */}
        <div className="w-full mt-4">
          <label className="mb-1 text-sm text-gray-700">Confirm Password</label>
          <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={handleChange} className="w-full h-10 px-3 ring-2 ring-blue-500 rounded-sm focus:outline-none" placeholder="Re-enter your password" required />
          {error.confirmPassword && <p className="text-red-600 text-sm">{error.confirmPassword}</p>}
        </div>

        {/* Age */}
        <div className="w-full mt-4">
          <label className="mb-1 text-sm text-gray-700">Age</label>
          <input type="number" name="age" value={user.age} onChange={handleChange} className="w-full h-10 px-3 ring-2 ring-blue-500 rounded-sm focus:outline-none" placeholder="Enter your age" min="1" max="120" required />
        </div>

        {/* Gender */}
        <div className="w-full mt-4">
          <label className="mb-1 text-sm text-gray-700">Gender</label>
          <select name="gender" value={user.gender} onChange={handleChange} className="w-full h-10 px-3 ring-2 ring-blue-500 rounded-sm focus:outline-none" required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button type="submit" className="mt-6 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
          Register
        </button>

        {message && <p className="mt-4 text-center text-green-700 font-medium">{message}</p>}
        {error.api && <p className="mt-2 text-center text-red-600 font-medium">{error.api}</p>}
      </form>
    </div>
  );
}

export default SignUp;
