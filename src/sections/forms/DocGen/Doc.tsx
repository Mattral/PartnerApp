import TextEditor from "./TextEditor";
import Modal from "./Modal";
import { Button } from "@material-tailwind/react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import InsertCommentOutlinedIcon from "@mui/icons-material/InsertCommentOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import React from "react";
//import profileLogo from "./images/profile.jpg";
import docLogo from "./images/docs_logo.png";

function Doc() {
  return (
    <div>
      <header className="flex justify-between items-center p-2 pb-1">
        <img src={docLogo.src} className="h-10 w-10" alt="doc-logo" />
        <div className="flex-grow px-2">
          <div className="flex">
            <h1 className="flex text-xl ml-1 text-gray-600">
              {" "}
              Untitled document
            </h1>
            <div className="flex gap-2 ml-4 mt-2">
              <StarBorderOutlinedIcon fontSize="small" />
            </div>
          </div>
          <div className="flex items-center text-sm space-x-1 -ml-1 h-8 text-gray-600">
            <p className="option">File</p>
            <p className="option">View</p>
            <p className="option">Edit</p>
            <p className="option">Insert</p>
          </div>
        </div>{" "}
        <div className="flex gap-8 mr-4">
          <InsertCommentOutlinedIcon className="icons mt-2" />
          <div className="flex">
            <VideocamOutlinedIcon fontSize="large" className="icons" />
            <ArrowDropDownOutlinedIcon className="icons" />
          </div>
        </div>

        <Button
          data-toggle="modal"
          data-target="#Modal"
          className="hidden md:inline-flex h-10 rounded-full bg-[#C2E7FF]"
          placeholder="Enter text"
        >
          <LockOutlinedIcon fontSize="small" className="!-mt-1 text-black" />
          <h1 className="ml-1 -mt-1 text-black text-sm font-normal">SHARE</h1>
        </Button>
        <Modal />
      </header>
      <TextEditor />
    </div>
  );
}

export default Doc;