// IssueCard.jsx
import React from "react";

const IssueCard = ({ issue, onUpdate, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 hover:shadow-xl transition relative">
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{issue.title}</h3>
      <p className="text-gray-600 mb-2">{issue.description}</p>
      <p className="text-gray-500 mb-1">Amount: {issue.amount}</p>
      <p className="text-gray-500 mb-1">
        Status: <span className="capitalize">{issue.status}</span>
      </p>
      <p className="text-gray-400 text-sm mb-3">
        Date: {new Date(issue.date).toLocaleString()}
      </p>
      <div className="flex justify-between gap-2 mt-2">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
          onClick={onUpdate}
        >
          Update
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default IssueCard;
