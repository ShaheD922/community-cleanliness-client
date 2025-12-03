import React, { useEffect, useState } from "react";
import "animate.css";

const Modal = ({ type, issue, formData, setFormData, onClose, onUpdate, onDelete }) => {
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden"; 
    return () => {
      document.body.style.overflow = originalStyle; 
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
      onWheel={(e) => e.stopPropagation()}
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-all duration-300"
        onClick={handleClose}
      ></div>

     
      <div
        className={`relative bg-white dark:bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-2xl dark:shadow-gray-900 w-full max-w-md p-6 overflow-auto max-h-[90vh] z-[10000] animate__animated ${
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
        {type === "update" && (
          <>
            <h3 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
              Update Issue
            </h3>
            <input
              type="text"
              placeholder="Title"
              className="border w-full mb-3 p-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <input
              type="number"
              placeholder="Amount"
              className="border w-full mb-3 p-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />
            <textarea
              placeholder="Description"
              className="border w-full mb-3 p-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <select
              className="border w-full mb-4 p-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="ongoing">Ongoing</option>
              <option value="ended">Ended</option>
            </select>
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition"
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

        {type === "delete" && (
          <>
            <h3 className="text-2xl font-bold mb-3 text-center text-gray-800 dark:text-gray-100">
              Confirm Delete
            </h3>
            <p className="mb-4 text-center text-gray-600 dark:text-gray-300">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-red-600 dark:text-red-400">
                "{issue.title}"
              </span>
              ?
            </p>
            <div className="flex justify-center gap-3">
              <button
                className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 dark:hover:bg-red-500 transition"
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
