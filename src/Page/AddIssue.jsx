import React, { useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const AddIssue = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.email) return alert("User email not found!");

    const newIssue = {
      title,
      category,
      location,
      description,
      image,
      amount,
      status: "ongoing",
      date: new Date(),
      email: user.email.toLowerCase(),
    };

    const res = await fetch("http://localhost:5000/models", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newIssue),
    });

    const data = await res.json();
    if (data.insertedId) {
      toast.success("Issue added successfully!");
      navigate("/my-issues");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-lg shadow transition-colors duration-500">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-700 dark:text-green-600">
        Add Issue
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Issue Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="border p-2 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="border p-2 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-500"
        >
          <option value="">Select Category</option>
          <option value="Road Cleanliness">Garbage</option>
          <option value="Public Parks">Illegal Construction</option>
          <option value="Garbage Management">Broken Public Property</option>
          <option value="Drainage Problem">Road Damage</option>
        </select>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="border p-2 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-500"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="border p-2 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-500"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
          className="border p-2 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-500"
        />
        <input
          type="text"
          placeholder="Suggested Fix Budget (Amount)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="border p-2 rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors duration-500"
        />
        <input
          type="email"
          value={user?.email || ""}
          readOnly
          className="border p-2 rounded border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-500"
        />
        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700 transition-all duration-300"
        >
          Add Issue
        </button>
      </form>
    </div>
  );
};

export default AddIssue;
