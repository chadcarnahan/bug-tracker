import React, { useState } from "react";
import ButtonDetails from "../small-components/ButtonDetails";
import { useDb } from "../../contexts/DbContext";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import CloseModal from "./CloseModal";
import OpenModal from "./OpenModal";
import DeleteModal from "./DeleteModal";
import AssignModal from "./AssignModal";

const IssueDetails = () => {
  const [openCloseModal, setOpenCloseModal] = useState(false);
  const [showOpenModal, setShowOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const { showDetails, setShowDetails } = useDb();
  const {
    issueType,
    id,
    priority,
    component,
    summary,
    date,
    status,
    name,
    description,
    assignedTo,
  } = showDetails;
  const handleOpenCloseIssue = () => {
    if (status === "Closed") {
      setShowOpenModal(true);
    } else {
      setOpenCloseModal(true);
    }
  };

  console.log(status);
  return (
    <div className="relative w-full">
      <CloseModal
        open={openCloseModal}
        id={id}
        handleClose={setOpenCloseModal}
      />

      <OpenModal open={showOpenModal} id={id} handleClose={setShowOpenModal} />

      <DeleteModal
        open={openDeleteModal}
        id={id}
        handleClose={setOpenDeleteModal}
      />
      {openAssignModal && (
        <AssignModal
          open={openAssignModal}
          handleClose={setOpenAssignModal}
          postId={id}
        />
      )}

      <div className="w-full h-screen flex absolute bg-black bg-opacity-20 justify-center z-10">
        <div className="w-full h-auto sm:max-w-xl sm:mx-3  bg-white shadow-md rounded pb-6 md:mb-6 space-y-4 content-center sm:mt-5 text-gray-700">
          <div className="w-full bg-gray-200 flex items-center h-12 px-8 shadow-md">
            <h1 className="px-4 sm:px-0 text-gray-700  text-xl font-medium  ">
              {summary}
            </h1>
          </div>

          <div className="px-6 sm:px-8 flex-col items-center justify-center sm:justify-evenly">
            <div className="flex mt-4 sm:mt-8 px-2 sm:px-12 ">
              <div className="flex w-full justify-center sm:justify-between space-x-2 ">
                <Link to={`/issue/${showDetails.id}`}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "gray", color: "#FFFFFF" }}
                  >
                    Edit
                  </Button>
                </Link>

                <Button
                  onClick={() => setOpenAssignModal(true)}
                  color="primary"
                  variant="contained"
                >
                  {" "}
                  Assign
                </Button>

                <Button
                  onClick={() => handleOpenCloseIssue()}
                  variant="contained"
                  color="success"
                >
                  {" "}
                  {status === "Closed" ? "Open Issue" : "Close Issue"}
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setOpenDeleteModal(true)}
                >
                  {" "}
                  Delete
                </Button>
              </div>
            </div>
            <div className="flex mt-8 sm:mt-10 px-4 sm:px-12">
              <div className="flex flex-col space-y-4 mr-10 sm:mr-40">
                <div className="flex">
                  <p>Type:</p>
                  <p>{issueType}</p>
                </div>
                <div className="flex">
                  <p>Priority:</p>
                  <p>{priority}</p>
                </div>
                <div className="flex">
                  <p>Component:</p>
                  <p>{component}</p>
                </div>
                <div className="flex">
                  <p>Project:</p>
                </div>
                <div className="flex">
                  <p>Severity:</p>
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                <div className="flex">
                  <p>Status:</p>
                  <p>{status}</p>
                </div>
                <div className="flex-col">
                  <p>Assignee:</p>
                  <p>{assignedTo}</p>
                </div>
                <div className="flex">
                  <p>Reporter:</p>
                  <p>{name}</p>
                </div>
                <div className="flex">
                  <p>Created on:</p>
                </div>
              </div>
            </div>
            <div className="mt-6 sm:mt-10 px-4 sm:px-12">
              <h1 className="font-semibold">Bug Description:</h1>
              <div>{ReactHtmlParser(description)}</div>
            </div>
            <div className="mt-4 sm:mt-10 flex justify-end px-2 sm:px-12">
              <Button
                variant="contained"
                onClick={() => setShowDetails(false)}
                color="error"
              >
                Close{" "}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
