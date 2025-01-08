//https://github.com/mkhstar/suneditor-react?tab=readme-ov-file
"use client"

import React from 'react';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import { buttonList } from "suneditor-react";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const MyComponent = props => {
  return (
    <div>
      <SunEditor name="my-editor" height="1000px" />
    </div>
  );
};
export default MyComponent;