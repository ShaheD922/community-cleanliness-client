// Modal.jsx
import React, { useState } from "react";
import "animate.css";

const Modal = ({ type, issue, formData, setFormData, onClose, onUpdate, onDelete }) => {
  const [animateOut, setAnimateOut] = useState(false);

  const handleClose = () => {
    setAnimateOut(true);
    setTimeout(() => {
      onClose();
      setAnimateOut(false);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-auto">
      {/* Blur Background only */}
      <div className="absolute inset-0 backdrop-blur-sm"></div>

      {/* Modal Content */}
      {type === "update" && (
        <div
          className={`relative bg-white rounded-lg p-6 w-full max-w-md shadow-xl animate__animated ${
            animateOut ? "animate__fadeOutUp" : "animate__fadeInDown"
          }`}
        >
          <h3 className="text-xl font-bold mb-4">Update Issue</h3>
          <input
            type="text"
            placeholder="Title"
            className="border w-full mb-3 p-2 rounded"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount"
            className="border w-full mb-3 p-2 rounded"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          />
          <textarea
            placeholder="Description"
            className="border w-full mb-3 p-2 rounded"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <select
            className="border w-full mb-4 p-2 rounded"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="ongoing">Ongoing</option>
            <option value="ended">Ended</option>
          </select>
          <div className="flex justify-end gap-3">
            <button
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              onClick={onUpdate}
            >
              Save
            </button>
          </div>
        </div>
      )}

      {type === "delete" && (
        <div
          className={`relative bg-white rounded-lg p-6 w-full max-w-sm shadow-xl animate__animated ${
            animateOut ? "animate__fadeOutDown" : "animate__fadeInUp"
          }`}
        >
          <h3 className="text-xl font-bold mb-3">Confirm Delete</h3>
          <p className="mb-4">Are you sure you want to delete "{issue.title}"?</p>
          <div className="flex justify-end gap-3">
            <button
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
