import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const API = "http://localhost:3000/api/products";

  const getData = async () => {
    try {
      
      const response = await axios.get(API);
      console.log("Response:", response); 
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Axios error:", error); 
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return (
      <div role="status">
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 ... [SVG path shortened for brevity] ..." fill="currentFill" />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        <svg className="shrink-0 inline w-4 h-4 me-3" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 ... [path shortened] ..." />
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">Danger alert!</span> Change a few things up and try submitting again.
        </div>
      </div>
    );
  }

  return (
    <>
      {data.map((post) => (
        <a
          key={post._id}
          href="#"
          className="block max-w-sm p-6 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {post.name}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {post.quantity}
          </p>
        </a>
      ))}
    </>
  );
}

export default Profile;
