import React from "react";
import { Zoom } from "react-awesome-reveal";

const IssueCard = ({ issue, onUpdate, onDelete }) => {
  return (
    <Zoom>
      <div className="bg-white shadow-md rounded-lg p-5 hover:shadow-xl transition-shadow duration-300 relative flex flex-col justify-between">
        {issue.image && (
          <img
            src={issue.image}
            alt={issue.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}

        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">{issue.title}</h3>
          <p className="text-gray-600 mb-2 line-clamp-3">{issue.description}</p>
          <p className="text-gray-500 mb-1">Amount: {issue.amount}</p>
          <p className="text-gray-500 mb-1">
            Status: <span className="capitalize">{issue.status}</span>
          </p>
          <p className="text-gray-400 text-sm">{new Date(issue.date).toLocaleString()}</p>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            className="bg-green-400 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
            onClick={onUpdate}
          >
            Update
          </button>
          <button
            type="button"
            className="bg-green-800 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </Zoom>
  );
};

export default IssueCard;
//