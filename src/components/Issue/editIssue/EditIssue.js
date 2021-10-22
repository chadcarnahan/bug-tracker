import React from "react";
import EditIssueForm from "./EditIssueForm";
const EditIssue = () => {
  return (
    <div className="relative">
      <div className="w-full h-screen flex relative sm:absolute bg-black bg-opacity-20 justify-center z-40">
        <div className="w-full h-auto sm:h-auto sm:max-w-xl sm:mx-3  bg-white shadow-md rounded pb-4 md:mb-6 space-y-4 content-center sm:mt-5 text-gray-700 ">
          <div className="px-4 w-full bg-gray-100 flex items-center h-12">
            <h1 className="px-4 sm:px-0 text-gray-700  text-xl font-medium  ">
              Edit issue{" "}
            </h1>
          </div>
          <div className="px-8">
            <EditIssueForm type="edit" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditIssue;
