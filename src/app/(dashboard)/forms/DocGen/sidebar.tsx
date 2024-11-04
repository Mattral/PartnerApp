'use client';
import React from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
function SideBar() {
  return (
    <div className="flex mt-3 flex-col ml-8">
      <div className="mb-11">
        <a href="https://calendar.google.com/calendar">
          <img
            className="h-6 w-6"
            src="https://www.hireauthority.com/wp-content/uploads/2016/12/QOH-Step-1-image.png"
            alt="calender-logo"
          />
        </a>
      </div>
      <div className="mb-11">
        <a href="https://keep.google.com">
          <img
            className="h-6 w-6"
            src="https://aztecexplorers.com/wp-content/uploads/2019/03/qoh-step-2-image.png"
            alt="keep-logo"
          />
        </a>
      </div>
      <div className="mb-11">
        <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.tasks&hl=en&gl=US">
          <img
            className="h-6 w-6"
            src="https://aztecexplorers.com/wp-content/uploads/2019/03/qoh-step-3-image.png"
            alt="tasks-logo"
          />
        </a>
      </div>


      <div className="mb-11">
        <AddOutlinedIcon />
      </div>
      <div>
        <ArrowForwardIosOutlinedIcon fontSize="small" />
      </div>
    </div>
  );
}

export default SideBar;