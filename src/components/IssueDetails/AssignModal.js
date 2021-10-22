import React, { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import { useDb } from "../../contexts/DbContext";

const style = {
  position: "absolute",
  top: "30%",
  left: "60%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
};

const AssignModal = ({ open, handleClose, postId }) => {
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [assignee, setAssignee] = useState("");
  const [error, setError] = useState(false);

  const { getUsers, userList, assignIssue } = useDb();

  const userSelect = (id) => {
    setError(false);
    setId(id);
  };
  useEffect(() => {
    getUsers();
    setLoading(false);
  }, [getUsers]);

  const handleSubmit = async () => {
    if (id) {
      await assignIssue(id, name, postId);
      handleClose(false);
    } else {
      setError(true);
    }
  };

  if (userList === undefined) {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}></Box>
      </Modal>
    );
  }
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Select User to Assign Issue
          </Typography>
          <div className="mt-4">
            <FormControl
              fullWidth
              error={error}
              helperText="Please Select a User"
            >
              <InputLabel id="issueType-label">Users</InputLabel>
              <Select
                FormHelperText="Please Select a User"
                labelId="issueType-label"
                label="Users"
                id="demo-simple-select"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              >
                {userList.map(({ id, firstName, lastName }) => {
                  return (
                    <MenuItem
                      onClick={() => userSelect(id)}
                      value={`${firstName} ${lastName}`}
                      required
                    >{`${firstName} ${lastName}`}</MenuItem>
                  );
                })}
              </Select>
              <FormHelperText>Select User to Assign Issue</FormHelperText>
            </FormControl>
          </div>
          <div className="flex justify-end space-x-2 mt-2">
            {" "}
            <Button variant="contained" onClick={() => handleSubmit()}>
              Assign
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleClose(false)}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default AssignModal;
