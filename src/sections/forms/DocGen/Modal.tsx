import React from "react";
import { Button } from "@material-tailwind/react";
import profileLogo from "./images/profile.jpg";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

function Modal() {
  return (
    <div
      className="modal fade"
      id="Modal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="ModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="flex text-lg p-3">
            <p className="modal-title" id="exampleModalLongTitle">
              Share "Untitled document"
            </p>
            <HelpOutlineOutlinedIcon fontSize="small" className="mt-1 ml-44" />
            <SettingsOutlinedIcon fontSize="small" className="mt-1 ml-4" />
          </div>
          <div className="">
            <div className="border-2 m-3 rounded-md p-3">
              <p className="mr-60 text-sm text-gray-700">
                Add people and groups
              </p>
            </div>
            <div className="mr-80 ml-3 text-lg">People with access</div>
            <div className="flex mt-3 mb-3">

              <img src={profileLogo.src} className="cursor-pointer rounded-full h-10 w-10 ml-6 mr-3" alt="profile-logo" />

              <div className="ml-1 mb-2">
                <h2 className="mr-8">ABC (you)</h2>
                <p className="text-xs mr-3 text-gray-600">abc@gmail.com</p>
              </div>

              <p className="ml-60 text-gray-600">Owner</p>
            </div>

            <div className="mr-80 -ml-3 mt-10 text-lg">General access</div>
            <div className="flex mt-3 mb-3">
              <div className="ml-4 rounded-full h-9 w-9 bg-gray-300">
                <LockOutlinedIcon
                  fontSize="small"
                  className="mt-2 text-black"
                />
              </div>
              <div className="ml-3 mb-2">
                <div className="flex">
                  <h2 className="mr-2">Restricted</h2>
                  <ArrowDropDownOutlinedIcon className="icons" />
                </div>
                <p className="text-xs -mt-1 mr-3 text-gray-600">
                  Only people with access can open with this link
                </p>
              </div>
            </div>
          </div>
          <div className="mb-3 mt-8">
            <Button
              variant="text"
              className="border-2 normal-case p-2 border-blue-200 rounded-full mr-64"
              data-dismiss="modal"
              placeholder=""
            >
              <InsertLinkOutlinedIcon color="primary" /> Copy link
            </Button>
            <Button
              variant="text"
              className="border-2 normal-case w-24 text-sm p-2 text-white bg-blue-800 rounded-full"
              data-dismiss="modal"
              placeholder=""
            >
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;