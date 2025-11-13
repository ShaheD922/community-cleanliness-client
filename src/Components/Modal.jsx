import React, { useEffect, useState } from "react";
import "animate.css";

const Modal = ({ type, issue, formData, setFormData, onClose, onUpdate, onDelete }) => {
  const [animateOut, setAnimateOut] = useState(false);

  // Lock background scroll (and Swiper scroll)
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden"; // disable background scroll

    return () => {
      document.body.style.overflow = originalStyle; // restore on close
    };
  }, []);

  const handleClose = () => {
    setAnimateOut(true);
    setTimeout(() => {
      onClose();
      setAnimateOut(false);
    }, 300);
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onWheel={(e) => e.stopPropagation()} // Prevent background scroll
    >
      {/* Backdrop with blur effect */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-all duration-300"
        onClick={handleClose}
      ></div>

      {/* Modal content */}
      <div
        className={`relative bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md p-6 overflow-auto max-h-[90vh] z-[10000] animate__animated ${
          animateOut
            ? type === "update"
              ? "animate__fadeOutUp"
              : "animate__fadeOutDown"
            : type === "update"
            ? "animate__fadeInDown"
            : "animate__fadeInUp"
        }`}
        onWheel={(e) => e.stopPropagation()}
      >
        {/* Update Modal */}
        {type === "update" && (
          <>
            <h3 className="text-2xl font-bold mb-4 text-gray-800 text-center">
              Update Issue
            </h3>
            <input
              type="text"
              placeholder="Title"
              className="border w-full mb-3 p-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <input
              type="number"
              placeholder="Amount"
              className="border w-full mb-3 p-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />
            <textarea
              placeholder="Description"
              className="border w-full mb-3 p-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <select
              className="border w-full mb-4 p-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="ongoing">Ongoing</option>
              <option value="ended">Ended</option>
            </select>
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                onClick={onUpdate}
              >
                Save
              </button>
            </div>
          </>
        )}

        {/* Delete Modal */}
        {type === "delete" && (
          <>
            <h3 className="text-2xl font-bold mb-3 text-center text-gray-800">
              Confirm Delete
            </h3>
            <p className="mb-4 text-center text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-red-600">
                "{issue.title}"
              </span>
              ?
            </p>
            <div className="flex justify-center gap-3">
              <button
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                onClick={onDelete}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
