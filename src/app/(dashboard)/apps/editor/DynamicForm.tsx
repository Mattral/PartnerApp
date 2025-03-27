"use client";
import React, { useState } from 'react';
import {
  TextField,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
  Divider,
  Button,
  Stack,
  Typography,
  LinearProgress,
  InputAdornment,
  Box,
  Card
} from '@mui/material';
import {
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  ClearAll as ClearAllIcon,
  Send as SendIcon,
  QuestionMark as QuestionMarkIcon
} from '@mui/icons-material';
import {
  ErrorOutline as ErrorOutlineIcon,
  CheckCircleOutline as CheckCircleOutlineIcon
} from '@mui/icons-material';
import InfoIcon from '@mui/icons-material/Info';

import { useSearchParams } from "next/navigation";
import axios from 'axios';

type Option = {
  label: string;
  value: string;
};

type Question = {
  dtvp_code: string;
  dtvp_name: string;
  dtvp_answerIsRequired: any;
  question: string;
  type: 'text' | 'number' | 'select' | 'checkbox';
  options?: Option[];
  guideText?: string;
};

interface DynamicFormProps {
  questions: Question[];
}

const DynamicForm: React.FC<DynamicFormProps> = ({ questions }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const searchParams = useSearchParams();
  const dt_code = searchParams.get("dt_code");
  const dtv_code = searchParams.get("dtv_code");
  const [dtvp_name] = useState("Username");  // Example dtvp_name, this can be dynamic

  const handleSearchText = (variableName: string) => {
    // Remove any existing $ or {} from the variable name if accidentally included
    const cleanVariableName = variableName.replace(/^\$|\{|\}/g, '');
    // Create the exact search pattern for ${VariableName}
    const searchText = `\\$\\{${cleanVariableName}\\}`;
    
    removeHighlight();
    
    const sunEditors = document.querySelectorAll('.sun-editor-editable');
    let found = false;
  
    sunEditors.forEach((editor) => {
      if (searchExactPatternInSunEditor(editor as HTMLElement, searchText)) {
        found = true;
      }
    });
  
    if (found) {
      console.log("not found");
      //alert(`Found: \${${cleanVariableName}}`);
    } else {
      console.log("not found");
    }
  };
  const searchExactPatternInSunEditor = (editor: HTMLElement, exactPattern: string): boolean => {
    const editorContent = editor.textContent || ''; // Use textContent to ignore HTML tags
    const regex = new RegExp(exactPattern);
    
    if (regex.test(editorContent)) {
      highlightExactMatchInSunEditor(editor, exactPattern);
      return true;
    }
    return false;
  };

  const highlightExactMatchInSunEditor = (editor: HTMLElement, exactPattern: string) => {
    const range = document.createRange();
    const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT);
    const regex = new RegExp(exactPattern);
    
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const text = node.nodeValue || '';
      const match = regex.exec(text);
      
      if (match) {
        range.setStart(node, match.index);
        range.setEnd(node, match.index + match[0].length);
        
        const span = document.createElement('span');
        span.style.backgroundColor = 'yellow';
        span.style.border = '1px solid orange';
        range.surroundContents(span);
        break; // Only highlight first occurrence
      }
    }
  };
  const removeHighlight = () => {
    document.querySelectorAll('.sun-editor-editable > span[style*="background-color: yellow"]').forEach(el => {
      const parent = el.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(el.textContent || ''), el);
      }
    });
  };

  


  const handleInputChange = (dtvp_code: string, value: any) => {
    if (Array.isArray(value)) {
      // For checkbox, join the array into a comma-separated string
      value = value.join(', ');
    }
    setFormData(prev => ({
      ...prev,
      [dtvp_code]: value
    }));
  };


  const handleClear = () => {
    setFormData({});
  };

  // Handle individual question submission
  const handleQuestionSubmit = async (dtvp_code: string) => {
    // Retrieve the savedContent from localStorage
    const savedContent = localStorage.getItem('extractedHtml');
    if (!savedContent) {
      console.error('No content found in localStorage for "extractedHtml".');
      return;
    }

    // Retrieve the answer for the current question
    const answer = formData[dtvp_code];
    if (!answer) {
      console.error('No answer found for the given dtvp_code.');
      return;
    }

    console.log('Question Submitted:', {
      dtvp_code,
      answer,
    });

    if (!dt_code || !dtv_code) {
      console.error('Missing dt_code or dtv_code from the URL.');
      return;
    }

    // Construct the API URL dynamically
    const url = `https://lawonearth.co.nz/api/partner/placeholder-answers/submit/${dtv_code}/${dtvp_code}`;

    // Prepare the payload for the API request
    const payload = {
      dpa_value: answer,          // Use the form data value for the answer
      document: savedContent,     // Use the content saved in localStorage
      document_1: '',             // Always an empty value
      strict_mode: 0,             // Always set to 0
    };

    // Set the request headers
    const headers = {
      'COMPANY-CODE': 'MC-9E234746-3738-4E49-A7FA-27E3998A68E9',
      'FRONTEND-KEY': 'XXX',      // Replace with the actual frontend key
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',  // Set content type to JSON for the request
    };

    try {
      // Send the POST request using axios
      const response = await axios.post(url, payload, { headers });

      // Check if the response was successful
      if (response.status === 200 && response.data) {
        const updatedDocument = response.data.data.primaryData.updatedDocument;

        // Update the localStorage with the updatedDocument
        if (updatedDocument) {
          localStorage.setItem('extractedHtml', updatedDocument);
          console.log('Local storage updated with the new extractedHtml.');
        } else {
          console.error('No updated document found in API response.');
        }
      } else {
        console.error('Failed to submit data:', response.statusText);
      }
    } catch (error) {
      console.error('Error while submitting data:', error);
    }
  };

  // Handle form-wide submission (kept for backward compatibility)
  const handleFormSubmit = () => {
    console.log('All Answers:', formData);
  };

  const calculateCompletionPercentage = () => {
    const totalQuestions = questions.length;
    const completedQuestions = questions.filter(q => {
      const answer = formData[q.dtvp_code];
      if (q.type === 'checkbox') {
        return answer && answer.length > 0;
      }
      return answer !== undefined && answer !== '';
    }).length;
    return (completedQuestions / totalQuestions) * 100;
  };

  const completionPercentage = calculateCompletionPercentage();
  const completedQuestions = questions.filter(q => {
    const answer = formData[q.dtvp_code];
    if (q.type === 'checkbox') {
      return answer && answer.length > 0;
    }
    return answer !== undefined && answer !== '';
  }).length;

  return (
    <div style={{ width: '100%', padding: '20px' }}>
      {/* Progress Bar Container */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        backgroundColor: 'white',
        padding: '10px 0',
        borderBottom: '1px solid #ccc',
      }}>
        <LinearProgress
          variant="determinate"
          value={completionPercentage}
          sx={{ marginBottom: '10px' }}
        />
        <Typography variant="body2" align="center">
          {completedQuestions} out of {questions.length} completed
        </Typography>
      </div>

      {/* Form Container with Scrollable Content */}
      <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
        {questions.map((question, index) => {
          const { dtvp_answerIsRequired, dtvp_name, dtvp_code, question: questionText, type, options, guideText } = question;
          const answer = formData[dtvp_code];

          const isAnswered = answer !== undefined &&
            (type !== 'checkbox' ? answer !== '' : answer.length > 0);

          return (
            <div key={`${dtvp_code}-${index}`} style={{ marginBottom: '20px' }}>
              <Card sx={{ p: 2, boxShadow: 2, borderRadius: 2, transition: 'transform 0.3s ease', '&:hover': { transform: 'scale(1.01)' } }}>
              {/* Question Header */}
              <Typography
                variant="h5"
                gutterBottom
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '5px' }} // Column layout for the two lines
              >
                {/* Question text and answer icon in one line */}
                <div style={{ display: 'flex', alignItems: 'center', width: '100%', marginTop: '5px' }}>
                <span style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                  {isAnswered ? <CheckCircleIcon color="primary" /> : <RadioButtonUncheckedIcon />}
                </span>
                  <span style={{ flexGrow: 1, marginRight: '8px' }}>
                    {questionText}
                  </span>
                </div>

                {/* Display required/optional status with icons on a new line */}
                <span
                  style={{
                    fontSize: '14px',
                    verticalAlign: 'middle',
                    marginTop: '4px',
                    display: 'inline-flex', // Change to inline-flex to allow alignment
                    justifyContent: 'center', // Center the content horizontally
                    alignItems: 'center', // Center the content vertically
                  }}
                >
                  {dtvp_answerIsRequired ? (
                    <>
                      {/* Red color when answered, green when not */}
                      <span
                        style={{
                          color: isAnswered ? 'green' : 'red',
                          alignItems: 'center',
                          marginLeft: '1px',
                          marginRight: '4px'
                        }}
                      >
                        {isAnswered ? <CheckCircleOutlineIcon fontSize="small" /> : <ErrorOutlineIcon fontSize="small" />}
                      </span>
                      <span style={{ color: isAnswered ? 'green' : 'red' }}>
                        Required
                      </span>
                      <span
                        style={{ cursor: 'pointer', color: 'blue' }}
                        onClick={() => handleSearchText(`$${dtvp_name}`)} // Trigger search when clicked
                      >
                         | {`$\{${dtvp_name}\}`}
                      </span>
                    </>
                  ) : (
                    <>
                      <span
                        style={{
                          color: 'gray',
                          alignItems: 'center',
                          marginLeft: '1px',
                          marginRight: '4px'
                        }}
                      >
                        <InfoIcon fontSize="small" />
                      </span>
                      <span style={{ color: isAnswered ? 'green' : 'gray' }}>
                        Optional
                      </span>
                      <span
                        style={{ cursor: 'pointer', color: 'blue' }}
                        onClick={() => handleSearchText(`$${dtvp_name}`)} // Trigger search when clicked
                      >
                         {'\u00A0\u00A0\u00A0| '} {`$\{${dtvp_name}\}`}
                      </span>
                    </>
                  )}
                </span>
              </Typography>


              {/* Guide Text */}
              {guideText && (
                <Typography
                  variant="body1" // A slightly larger variant
                  color="textSecondary"
                  gutterBottom
                  style={{ fontSize: '1rem', fontWeight: '400' }} // Custom font size and weight
                >
                  hint: {guideText}
                </Typography>
              )}

              {/* Input Fields */}
              {type === 'text' && (
                <TextField
                  fullWidth
                  label="Enter Text"
                  value={answer || ''}
                  onChange={(e) => handleInputChange(dtvp_code, e.target.value)}
                  variant="outlined"
                  size="small"
                  margin="normal"
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><EditIcon /></InputAdornment>,
                  }}
                />
              )}

              {type === 'number' && (
                <TextField
                  fullWidth
                  label="Enter Number"
                  type="number"
                  value={answer || ''}
                  onChange={(e) => handleInputChange(dtvp_code, e.target.value)}
                  variant="outlined"
                  size="small"
                  margin="normal"
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><EditIcon /></InputAdornment>,
                  }}
                />
              )}

              {type === 'select' && options && (
                <FormControl fullWidth variant="outlined" size="small" margin="normal">
                  <InputLabel>{questionText}</InputLabel>
                  <Select
                    value={answer || ''}
                    onChange={(e) => handleInputChange(dtvp_code, e.target.value)}
                    label={questionText}
                  >
                    {options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {type === 'checkbox' && options && (
                <FormControl fullWidth variant="outlined" size="small" margin="normal">
                  <InputLabel>{questionText}</InputLabel>
                  <Select
                    multiple
                    value={Array.isArray(answer) ? answer : (answer ? answer.split(', ') : [])} // Ensure the value is an array
                    onChange={(e) => handleInputChange(dtvp_code, e.target.value)} // Update formData with selected values
                    renderValue={(selected) => {
                      // Ensure 'selected' is an array before joining
                      const selectedArray = Array.isArray(selected) ? selected : selected.split(', ');
                      return selectedArray.join(', '); // Display selected options as a comma-separated string
                    }}
                    label={questionText}
                  >
                    {options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        <Checkbox checked={answer?.split(', ').includes(option.value)} />
                        <ListItemText primary={option.label} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {/* Action Buttons */}
              <Stack direction="row" spacing={2} justifyContent="center" marginTop={2}>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleQuestionSubmit(dtvp_code)}
                  startIcon={<SendIcon />}
                  disabled={!isAnswered}
                >
                  Submit 
                </Button>
              </Stack>
              </Card>

              {/* Form-wide submit button at the bottom */}
              {index === questions.length - 1 && (
                <Box mt={4} display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={handleFormSubmit}
                    startIcon={<SendIcon />}
                  >
                    Submit All Answers
                  </Button>
                </Box>
              )}

              <Divider style={{ marginTop: '20px', marginBottom: '20px' }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DynamicForm;


 /*
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {dtvp_code}
              </Typography>
              */