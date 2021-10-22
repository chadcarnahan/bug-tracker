import React, { useState } from "react";
import ReactQuill from "react-quill";
import HandleAddIssue from "./HandleAddIssue";
import {
  Box,
  FormHelperText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";

const AddIssueForm = () => {
  const [description, setDescription] = useState("");
  const [values, setValues] = useState({
    issueType: "",
    priority: "",
    summary: "",
    component: "",
  });

  const handleDescription = (content, delta, html, editor) => {
    setDescription(editor.getHTML());
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      className="flex justify-center"
    >
      <div className="flex flex-col space-y-4 w-full mt-1">
        <FormControl>
          <InputLabel id="issueType-label">Type</InputLabel>
          <Select
            labelId="issueType-label"
            id="demo-simple-select"
            value={values.issueType}
            label="Type"
            onChange={handleChange("issueType")}
          >
            <MenuItem value={"Bug"}>Bug</MenuItem>
          </Select>
          <FormHelperText>Select Issue Type</FormHelperText>
        </FormControl>
        <FormControl>
          <InputLabel id="issueType-label">Priority</InputLabel>
          <Select
            labelId="issueType-label"
            id="demo-simple-select"
            value={values.priority}
            label="Priority"
            onChange={handleChange("priority")}
          >
            <MenuItem value={"Low"}>Low</MenuItem>
            <MenuItem value={"Medium"}>Medium</MenuItem>
            <MenuItem value={"Large"}>Large</MenuItem>
          </Select>
          <FormHelperText>Select Priority Level</FormHelperText>
        </FormControl>
        <FormControl>
          <TextField
            id="outlined-helperText"
            helperText="Enter Component Effected"
            placeholder="Component"
            value={values.component}
            onChange={handleChange("component")}
          />
        </FormControl>

        <FormControl>
          <TextField
            id="outlined-helperText"
            helperText="Enter Summary of Issue"
            value={values.summary}
            placeholder="Summary"
            onChange={handleChange("summary")}
          />
        </FormControl>

        <div>
          <InputLabel sx={{ ml: 1 }} id="issueType-label">
            Description
          </InputLabel>
          <ReactQuill
            className="pb-1"
            onChange={handleDescription}
            value={description || ""}
          />
          <FormHelperText sx={{ ml: 2, mt: 0 }}>
            Carefully describe issue and provide all relevant information.
          </FormHelperText>
        </div>

        <HandleAddIssue values={values} description={description} />
      </div>
    </Box>
  );
};

export default AddIssueForm;
