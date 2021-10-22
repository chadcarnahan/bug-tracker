import React from "react";
import { useDb } from "../../../contexts/DbContext";
import { useAuth } from "../../../contexts/AuthContext";

const HandleAddIssue = ({ values, description }) => {
  const { setToggleIssue, postIssue, setPostSuccessful } = useDb();
  const { currentUser } = useAuth();
  const user = currentUser?.uid;

  const handleSubmit = async () => {
    const { issueType, priority, summary, component } = values;
    const name = "Bisky";
    await postIssue(
      name,
      issueType,
      priority,
      summary,
      component,
      description,
      user
    );
    setPostSuccessful(true);
    setTimeout(() => {
      setPostSuccessful(false);
    }, 2000);
  };

  return (
    <div class="flex justify-end">
      <button
        onClick={() => handleSubmit()}
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
        type="button"
      >
        Submit
      </button>
      <button
        onClick={() => setToggleIssue(false)}
        class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
      >
        Cancel
      </button>
    </div>
  );
};

export default HandleAddIssue;
