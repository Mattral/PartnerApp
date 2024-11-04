'use client';
import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import profileLogo from "./images/profile.jpg";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import Image from "next/image";

function Modal() {
  const [question, setQuestion] = useState(1); // Track which question to display
  const [selectedOption, setSelectedOption] = useState(null); // Track the selected option

  const handleNextQuestion = () => {
    setQuestion((prevQuestion) => prevQuestion + 1);
    setSelectedOption(null); // Reset selection for the next question
  };

  const handlePreviousQuestion = () => {
    if (question > 1) {
      setQuestion((prevQuestion) => prevQuestion - 1);
      setSelectedOption(null); // Reset selection for the previous question
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

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
            {question === 1 ? (
              <p className="modal-title" id="exampleModalLongTitle">
                Are you a Company or an Individual?
              </p>
            ) : (
              <p className="modal-title" id="exampleModalLongTitle">
                Is this a legal document?
              </p>
            )}
            <HelpOutlineOutlinedIcon fontSize="small" className="mt-1 ml-auto" />
            <SettingsOutlinedIcon fontSize="small" className="mt-1 ml-4" />
          </div>
          <div className="p-3">
            {question === 1 ? (
              <div className="flex justify-around mb-4">
                <Button
                  variant="outlined"
                  className={`border-2 w-40 text-sm p-2 rounded-full ${selectedOption === 'Company' ? 'bg-blue-500 text-white' : ''}`}
                  onClick={() => handleOptionSelect('Company')}
                  placeholder="Button"
                >
                  Company
                </Button>
                <Button
                  variant="outlined"
                  className={`border-2 w-40 text-sm p-2 rounded-full ${selectedOption === 'Individual' ? 'bg-blue-500 text-white' : ''}`}
                  onClick={() => handleOptionSelect('Individual')}
                  placeholder="Button"
                >
                  Individual
                </Button>
              </div>
            ) : (
              <div className="flex justify-around mb-4">
                <Button
                  variant="outlined"
                  className={`border-2 w-40 text-sm p-2 rounded-full ${selectedOption === 'Yes' ? 'bg-blue-500 text-white' : ''}`}
                  onClick={() => handleOptionSelect('Yes')}
                  placeholder="Button"
                >
                  Yes
                </Button>
                <Button
                  variant="outlined"
                  className={`border-2 w-40 text-sm p-2 rounded-full ${selectedOption === 'No' ? 'bg-blue-500 text-white' : ''}`}
                  onClick={() => handleOptionSelect('No')}
                  placeholder="Button"
                >
                  No
                </Button>
              </div>
            )}

            <div className="border-2 m-3 rounded-md p-3">
              <p className="text-sm text-gray-700">Add Question</p>
            </div>

            <div className="text-lg mb-2">People with access</div>
            <div className="flex items-center mb-3">
              <Image
                src={profileLogo.src}
                className="cursor-pointer rounded-full h-10 w-10 mr-3"
                alt="profile-logo"
              />
              <div className="flex-grow">
                <h2>ABC (you)</h2>
                <p className="text-xs text-gray-600">abc@gmail.com</p>
              </div>
              <p className="text-gray-600">Owner</p>
            </div>

            <div className="text-lg mb-2">General access</div>
            <div className="flex items-center mb-3">
              <div className="rounded-full h-9 w-9 bg-gray-300 flex items-center justify-center">
                <LockOutlinedIcon fontSize="small" className="text-black" />
              </div>
              <div className="ml-3">
                <div className="flex items-center">
                  <h2 className="mr-2">Restricted</h2>
                  <ArrowDropDownOutlinedIcon />
                </div>
                <p className="text-xs text-gray-600">
                  Only people with access can open with this link
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between p-3">
            <Button
              variant="text"
              className="border-2 normal-case p-2 border-blue-200 rounded-full"
              placeholder="Button"
              data-dismiss="modal"
            >
              <InsertLinkOutlinedIcon color="primary" /> Copy link
            </Button>
            <Button
              variant="text"
              className="border-2 normal-case w-24 text-sm p-2 text-white bg-blue-800 rounded-full"
              onClick={handlePreviousQuestion}
              placeholder="Button"
            >
              Previous Question
            </Button>
            <Button
              variant="text"
              className="border-2 normal-case w-24 text-sm p-2 text-white bg-blue-800 rounded-full"
              onClick={handleNextQuestion}
              placeholder="Button"
            >
              Next Question
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

/*
'use client';
import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import profileLogo from "./images/profile.jpg";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import Image from "next/image";

function Modal() {
  const [question, setQuestion] = useState(1); // Track which question to display

  const handleNextQuestion = () => {
    setQuestion((prevQuestion) => prevQuestion + 1);
  };

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
            {question === 1 ? (
              <p className="modal-title" id="exampleModalLongTitle">
                Are you a Company or an Individual?
              </p>
            ) : (
              <p className="modal-title" id="exampleModalLongTitle">
                Is this a legal document?
              </p>
            )}
            <HelpOutlineOutlinedIcon fontSize="small" className="mt-1 ml-auto" />
            <SettingsOutlinedIcon fontSize="small" className="mt-1 ml-4" />
          </div>
          <div className="p-3">
            {question === 1 ? (
              <div className="flex justify-around mb-4">
                <Button
                  variant="outlined"
                  className="border-2 w-40 text-sm p-2 rounded-full"
                  placeholder="Button"
                >
                  Company
                </Button>
                <Button
                  variant="outlined"
                  className="border-2 w-40 text-sm p-2 rounded-full"
                  placeholder="Button"
                >
                  Individual
                </Button>
              </div>
            ) : (
              <div className="flex justify-around mb-4">
                <Button
                  variant="outlined"
                  className="border-2 w-40 text-sm p-2 rounded-full"
                  placeholder="Button"
                >
                  Yes
                </Button>
                <Button
                  variant="outlined"
                  className="border-2 w-40 text-sm p-2 rounded-full"
                  placeholder="Button"
                >
                  No
                </Button>
              </div>
            )}

            <div className="border-2 m-3 rounded-md p-3">
              <p className="text-sm text-gray-700">Add Questions</p>
            </div>

            <div className="text-lg mb-2">People with access</div>
            <div className="flex items-center mb-3">
              <Image
                src={profileLogo.src}
                className="cursor-pointer rounded-full h-10 w-10 mr-3"
                alt="profile-logo"
              />
              <div className="flex-grow">
                <h2>ABC (you)</h2>
                <p className="text-xs text-gray-600">abc@gmail.com</p>
              </div>
              <p className="text-gray-600">Owner</p>
            </div>

            <div className="text-lg mb-2">General access</div>
            <div className="flex items-center mb-3">
              <div className="rounded-full h-9 w-9 bg-gray-300 flex items-center justify-center">
                <LockOutlinedIcon fontSize="small" className="text-black" />
              </div>
              <div className="ml-3">
                <div className="flex items-center">
                  <h2 className="mr-2">Restricted</h2>
                  <ArrowDropDownOutlinedIcon />
                </div>
                <p className="text-xs text-gray-600">
                  Only people with access can open with this link
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between p-3">
            <Button
              variant="text"
              className="border-2 normal-case p-2 border-blue-200 rounded-full"
              placeholder="Button"
              data-dismiss="modal"
            >
              <InsertLinkOutlinedIcon color="primary" /> Copy link
            </Button>
            <Button
              variant="text"
              className="border-2 normal-case w-24 text-sm p-2 text-white bg-blue-800 rounded-full"
              onClick={handleNextQuestion}
              placeholder="Button"
            >
              Previous Question
            </Button>
            <Button
              variant="text"
              className="border-2 normal-case w-24 text-sm p-2 text-white bg-blue-800 rounded-full"
              onClick={handleNextQuestion}
              placeholder="Button"
            >
              Next Question
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

*/


/*
'use client';
import React from "react";
import { Button } from "@material-tailwind/react";
import profileLogo from "./images/profile.jpg";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import Image from "next/image";

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
              Are you Company or an Individual?
            </p>
            <HelpOutlineOutlinedIcon fontSize="small" className="mt-1 ml-44" />
            <SettingsOutlinedIcon fontSize="small" className="mt-1 ml-4" />
          </div>
          <div className="">
            <div className="border-2 m-3 rounded-md p-3">
              <p className="mr-60 text-sm text-gray-700">
                Add Qestions
              </p>
            </div>
            <div className="mr-80 ml-3 text-lg">People with access</div>
            <div className="flex mt-3 mb-3">

              <Image src={profileLogo.src} className="cursor-pointer rounded-full h-10 w-10 ml-6 mr-3" alt="profile-logo" />

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
              Next Question
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
*/
