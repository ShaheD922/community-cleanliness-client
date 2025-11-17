import React from "react";
import { Zoom } from "react-awesome-reveal";

const IssueCard = ({ issue, onUpdate, onDelete }) => {
  return (
    <Zoom>
      <div className="bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-700 rounded-lg p-5 hover:shadow-xl transition-shadow duration-300 relative flex flex-col justify-between text-gray-800 dark:text-gray-200">
        {issue.image && (
          <img
            src={issue.image}
            alt={issue.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}

        <div>
          <h3 className="text-xl font-semibold mb-2">{issue.title}</h3>
          <p className="mb-2 line-clamp-3 text-gray-600 dark:text-gray-300">
            {issue.description}
          </p>
          <p className="mb-1 text-gray-500 dark:text-gray-400">Amount: {issue.amount}</p>
          <p className="mb-1 text-gray-500 dark:text-gray-400">
            Status: <span className="capitalize">{issue.status}</span>
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            {new Date(issue.date).toLocaleString()}
          </p>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            className="bg-green-400 dark:bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors duration-300"
            onClick={onUpdate}
          >
            Update
          </button>
          <button
            type="button"
            className="bg-green-800 dark:bg-green-700 text-white px-4 py-2 rounded hover:bg-red-600 dark:hover:bg-red-500 transition-colors duration-300"
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
