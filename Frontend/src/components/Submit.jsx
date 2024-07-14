import React from "react";
import { CircularProgress } from "@mui/material";

const Submit = ({ loading, title, onclick, bgColor, color }) => {
  return (
    <div>
      <button
        type="submit"
        disabled={loading ? true : false}
        className={`w-full font-[g-medium] flex justify-center bg-black tracking-wide capitalize mt-5 py-3 px-10 rounded text-white cursor-pointer hover:bg-[#313030]`}
        onClick={onclick}
      >
        {loading ? <CircularProgress color="inherit" /> : title}
      </button>
    </div>
  );
};

export default Submit;
