"use client";
import Button from '@mui/material/Button';
import React, { useState } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import SunEditor styles
import { Box, Typography } from '@mui/material'; // Import Box and Typography from MUI for styling

const Editor = () => {
  const [content, setContent] = useState<string>("");

  const handleChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleSave = () => {
    console.log("Content saved:", content);
    // Send content to API or store it in a database
  };

  return (
    <div>
      {/* Flex container for header and button */}
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>Name of the document will show up here!</Typography>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </Box>

      {/* SunEditor Component */}
      <SunEditor
        placeholder={"Write here..."}  // Updated placeholder text
        setContents={content}
        onChange={handleChange}
        setOptions={{
          minHeight: "480px", // Set height
          height: 'auto',
          buttonList: [
            ["undo", "redo", "font", "fontSize","fullScreen"], // Undo, redo, font, font size
            ["bold", "underline", "italic", "strike", "subscript", "superscript"], // Text styles
            ["fontColor", "hiliteColor","paragraphStyle","textStyle","imageGallery"], // Text color and highlight
            ["align", "list", "lineHeight", "indent", "outdent"], // Alignment, list, indent
            ["table", "horizontalRule", "link", "image","audio","video"], // Table, horizontal rule, link, image
            ["removeFormat","save", "preview", "print"], // Remove format
            ["dir", "dir_ltr", "dir_rtl"],
          ],
        }}
      />
    </div>
  );
};

export default Editor;




/*
//https://github.com/mkhstar/suneditor-react?tab=readme-ov-file

"use client"
import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

// Dynamically import SunEditor and disable SSR
const SunEditor = dynamic(() => import('suneditor-react'), {
  ssr: false, // Disable SSR for this component
});

// Custom language object (English in this case)
const customLang = {
  code: 'en',
  toolbar: {
    default: 'Default',
    save: 'Save',
    font: 'Font',
    formats: 'Formats',
    fontSize: 'Size',
    bold: 'Bold',
    underline: 'Underline',
    italic: 'Italic',
    strike: 'Strike',
    subscript: 'Subscript',
    superscript: 'Superscript',
    removeFormat: 'Remove Format',
    fontColor: 'Font Color',
    hiliteColor: 'Highlight Color',
    indent: 'Indent',
    outdent: 'Outdent',
    align: 'Align',
    alignLeft: 'Align left',
    alignRight: 'Align right',
    alignCenter: 'Align center',
    alignJustify: 'Align justify',
    list: 'List',
    orderList: 'Ordered list',
    unorderList: 'Unordered list',
    horizontalRule: 'Horizontal line',
    hr_solid: 'Solid',
    hr_dotted: 'Dotted',
    hr_dashed: 'Dashed',
    table: 'Table',
    link: 'Link',
    math: 'Math',
    image: 'Image',
    video: 'Video',
    audio: 'Audio',
    fullScreen: 'Full screen',
    showBlocks: 'Show blocks',
    codeView: 'Code view',
    undo: 'Undo',
    redo: 'Redo',
    preview: 'Preview',
    print: 'Print',
    tag_p: 'Paragraph',
    tag_div: 'Normal (DIV)',
    tag_h: 'Header',
    tag_blockquote: 'Quote',
    tag_pre: 'Code',
    template: 'Template',
    lineHeight: 'Line height',
    paragraphStyle: 'Paragraph style',
    textStyle: 'Text style',
    imageGallery: 'Image gallery',
    dir_ltr: 'Left to right',
    dir_rtl: 'Right to left',
    mention: 'Mention',
  },
  dialogBox: {
    linkBox: {
      title: 'Insert Link',
      url: 'URL to link',
      text: 'Text to display',
      newWindowCheck: 'Open in new window',
      downloadLinkCheck: 'Download link',
      bookmark: 'Bookmark',
    },
    mathBox: {
      title: 'Math',
      inputLabel: 'Mathematical Notation',
      fontSizeLabel: 'Font Size',
      previewLabel: 'Preview',
    },
    imageBox: {
      title: 'Insert image',
      file: 'Select from files',
      url: 'Image URL',
      altText: 'Alternative text',
    },
    videoBox: {
      title: 'Insert Video',
      file: 'Select from files',
      url: 'Media embed URL, YouTube/Vimeo',
    },
    audioBox: {
      title: 'Insert Audio',
      file: 'Select from files',
      url: 'Audio URL',
    },
  },
  controller: {
    edit: 'Edit',
    unlink: 'Unlink',
    remove: 'Remove',
    insertRowAbove: 'Insert row above',
    insertRowBelow: 'Insert row below',
    deleteRow: 'Delete row',
    insertColumnBefore: 'Insert column before',
    insertColumnAfter: 'Insert column after',
    deleteColumn: 'Delete column',
    fixedColumnWidth: 'Fixed column width',
    resize100: 'Resize 100%',
    resize75: 'Resize 75%',
    resize50: 'Resize 50%',
    resize25: 'Resize 25%',
    autoSize: 'Auto size',
    mirrorHorizontal: 'Mirror, Horizontal',
    mirrorVertical: 'Mirror, Vertical',
    rotateLeft: 'Rotate left',
    rotateRight: 'Rotate right',
    maxSize: 'Max size',
    minSize: 'Min size',
    tableHeader: 'Table header',
    mergeCells: 'Merge cells',
    splitCells: 'Split Cells',
    HorizontalSplit: 'Horizontal split',
    VerticalSplit: 'Vertical split',
  },
  menu: {
    spaced: 'Spaced',
    bordered: 'Bordered',
    neon: 'Neon',
    translucent: 'Translucent',
    shadow: 'Shadow',
    code: 'Code',
  },
};

const MyComponent: React.FC = () => {
  // Memoize the language object to avoid unnecessary re-renders
  const lang = useMemo(() => customLang, []);

  // SunEditor options object
  const editorOptions = useMemo(() => ({
    height: '400px',
    buttonList: [
      ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
      ['fontColor', 'hiliteColor', 'textStyle'],
      ['undo', 'redo', 'save', 'preview'],
    ],
  }), [lang]);

  return (
    <div>
      <p> My Other Contents </p>
      <SunEditor setOptions={editorOptions} />
    </div>
  );
};

export default MyComponent;

*/