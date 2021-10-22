import React from "react";
import { useDb } from "../../contexts/DbContext";
const ButtonDetails = ({ text, color, type }) => {
  const {} = useDb();
  return (
    <>
      {type === "edit" ? (
        <button
          onClick={() => console.log("beep")}
          className={`bg-transparent text-xs hover:bg-${color}-500 text-${color}-700 py-2 px-4 font-semibold hover:text-white border border-${color}-500 hover:border-transparent rounded`}
        >
          {text}
        </button>
      ) : (
        <></>
      )}
    </>
  );
};

export default ButtonDetails;
