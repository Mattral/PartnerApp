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
  Box
} from '@mui/material';
import {
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  ClearAll as ClearAllIcon,
  Send as SendIcon,
  QuestionMark as QuestionMarkIcon
} from '@mui/icons-material';
import { useSearchParams } from "next/navigation";
import axios from 'axios';

type Option = {
  label: string;
  value: string;
};

type Question = {
  dtvp_code: string;
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
          const { dtvp_code, question: questionText, type, options, guideText } = question;
          const answer = formData[dtvp_code];

          const isAnswered = answer !== undefined &&
            (type !== 'checkbox' ? answer !== '' : answer.length > 0);

          return (
            <div key={`${dtvp_code}-${index}`} style={{ marginBottom: '20px' }}>
              {/* Question Header */}
              <Typography variant="h6" gutterBottom>
                <span style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                  {isAnswered ? <CheckCircleIcon color="primary" /> : <RadioButtonUncheckedIcon />}
                </span>
                {questionText}
              </Typography>

              {/* Guide Text */}
              {guideText && (
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {guideText}
                </Typography>
              )}

              {/* DTVP Code */}
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {dtvp_code}
              </Typography>

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
                  variant="outlined"
                  color="primary"
                  onClick={handleClear}
                  startIcon={<ClearAllIcon />}
                >
                  Clear All
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleQuestionSubmit(dtvp_code)}
                  startIcon={<SendIcon />}
                  disabled={!isAnswered}
                >
                  Submit This Question
                </Button>
              </Stack>

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
