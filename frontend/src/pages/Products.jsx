import React, { useState } from 'react';
import axios from 'axios';

function Products() {
    const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    image: ''
  });

  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name: formData.name,
      quantity: parseInt(formData.quantity),
      image: formData.image
    };

    try {
      await axios.post('http://localhost:3000/api/products', product);
      setMessage('✅ Product added successfully!');
      setFormData({ name: '', quantity: '', image: '' });
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to add product.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          id="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2"
        />

        <input
          type="number"
          id="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2"
        />

        <input
          type="url"
          id="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );

}

export default Products;