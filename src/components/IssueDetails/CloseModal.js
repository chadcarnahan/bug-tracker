import React from "react";
import { useDb } from "../../contexts/DbContext";
import { Button } from "@mui/material";
import { Dialog, DialogTitle, DialogActions } from "@mui/material";

const CloseModal = ({ open, handleClose, id }) => {
  const { closeIssue } = useDb();
  const handleSubmit = () => {
    handleClose(false);
    closeIssue(id);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Are you sure you want to close this issue?"}
      </DialogTitle>

      <DialogActions>
        <Button onClick={() => handleSubmit()} color="error">
          Continue
        </Button>
        <Button autoFocus onClick={() => handleClose(false)}>
          Go Back
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CloseModal;
