import React from "react";
import "react-quill/dist/quill.snow.css"; // ES6
import { Modal, Box, Grid, Typography } from "@mui/material";
import AddIssueForm from "./AddIssueForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "60%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};

const Issue = ({ open }) => {
  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute bg-white w-full h-full p-8 sm:w-8/12 lg:w-7/12 xl:w-6/12 sm:h-auto sm:translate-x-1/2 sm:left-1/4 sm:top-3">
          <Typography variant="h6" component="h2">
            Add Issue
          </Typography>
          <AddIssueForm />
        </div>
      </Modal>
    </>
  );
};

export default Issue;
