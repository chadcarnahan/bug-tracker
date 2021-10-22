import React, { useState } from "react";
import { Link } from "react-router-dom";
import "react-quill/dist/quill.snow.css"; // ES6
import { useDb } from "../../../contexts/DbContext";
import { useAuth } from "../../../contexts/AuthContext";

const HandleEditIssue = ({ values, description }) => {
  const { showDetails, updateIssues } = useDb();
  const {
    id,
    name,
    status,
    date,
    closingComment,
    assignedTo,
    assignedId,
    user,
  } = showDetails;

  const handleSubmit = async () => {
    const { issueType, priority, summary, component } = values;
    await updateIssues(
      id,
      name,
      issueType,
      priority,
      summary,
      component,
      description,
      status,
      date,
      closingComment,
      assignedTo,
      assignedId,
      user
    );
  };
  return (
    <div>
      <div class="flex justify-end">
        <button
          onClick={() => handleSubmit()}
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
          type="button"
        >
          Submit
        </button>
        <Link to={"/"}>
          <button
            class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Cancel
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HandleEditIssue;
