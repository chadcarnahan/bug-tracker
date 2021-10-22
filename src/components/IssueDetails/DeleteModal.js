import React from "react";
import { useDb } from "../../contexts/DbContext";
import { Button, DialogContent, DialogContentText } from "@mui/material";
import { Dialog, DialogTitle, DialogActions } from "@mui/material";

const CloseModal = ({ open, handleClose, id }) => {
  const { deleteIssue } = useDb();
  const handleSubmit = () => {
    handleClose();
    deleteIssue(id);
  };
  return (
    <Dialog
      style={{ top: "0%" }}
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Are you sure you want to delete this issue?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Deleting this issue will be permanent. Only continue if you are
          certain you want to delete.
        </DialogContentText>
      </DialogContent>
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
