'use client';
import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import SideBar from "./sidebar";

function TextEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  return (
    <div className="flex bg-[#F8F9FA] min-h-screen pb-4">
      <div className="ml-4">
        <Editor
          editorState={editorState}
          placeholder="Type sth to insert"
          onEditorStateChange={onEditorStateChange}
          toolbarClassName="flex !gap-6 !p-1 !rounded-full !bg-[#edf2fa] sticky top-0 z-50 !justify-center mx-auto"
          editorClassName="mt-6 p-10 bg-white shadow-lg max-w-5xl mx-auto mb-12 border !h-screen"
        />
      </div>
      <SideBar />

    </div>
  );
}

export default TextEditor;