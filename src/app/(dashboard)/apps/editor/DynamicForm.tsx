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
  InputAdornment
} from '@mui/material';
import {
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  ClearAll as ClearAllIcon,
  Send as SendIcon,
  QuestionMark as QuestionMarkIcon
} from '@mui/icons-material';

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

  const handleInputChange = (dtvp_code: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [dtvp_code]: value
    }));
  };

  const handleClear = () => {
    setFormData({});
  };

  // Handle individual question submission
  const handleQuestionSubmit = (dtvp_code: string) => {
    const answer = formData[dtvp_code];
    console.log('Question Submitted:', {
      dtvp_code,
      answer
    });
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
                    value={answer || []}
                    onChange={(e) => handleInputChange(dtvp_code, e.target.value)}
                    renderValue={(selected) => selected.join(', ')}
                    label={questionText}
                  >
                    {options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        <Checkbox checked={answer?.includes(option.value)} />
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

/*
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
  InputAdornment
} from '@mui/material';
import {
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  ClearAll as ClearAllIcon,
  Send as SendIcon,
  QuestionMark as QuestionMarkIcon
} from '@mui/icons-material';

// Types for the form data
type Option = {
  label: string;
  value: string;
};

type Question = {
  dtvp_code: string;
  question: string;
  type: 'text' | 'number' | 'select' | 'checkbox';
  options?: Option[]; // Options for select/checkbox
  guideText?: string; // Human guide/explanation for the question
};

interface DynamicFormProps {
  questions: Question[];
}

const DynamicForm: React.FC<DynamicFormProps> = ({ questions }) => {
  const [formData, setFormData] = useState<any>({});

  const handleInputChange = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleClear = () => {
    setFormData({});
  };

  const handleSubmit = () => {
    // Handle form submission (e.g., send data to an API)
    console.log('Form Submitted:', formData);
  };

  // Calculate the completion percentage based on user input
  const calculateCompletionPercentage = () => {
    const totalQuestions = questions.length;
    const completedQuestions = questions.filter((question, index) => {
      const fieldName = `question-${index}`;
      const answer = formData[fieldName];
      if (question.type === 'checkbox') {
        // Check if any checkbox is selected
        return answer && answer.length > 0;
      }
      return answer && answer !== ''; // Ensure text or number input is not empty
    }).length;
    return (completedQuestions / totalQuestions) * 100;
  };

  const completionPercentage = calculateCompletionPercentage();
  const completedQuestions = questions.filter((question, index) => {
    const fieldName = `question-${index}`;
    const answer = formData[fieldName];
    if (question.type === 'checkbox') {
      // Check if any checkbox is selected
      return answer && answer.length > 0;
    }
    return answer && answer !== ''; // Ensure text or number input is not empty
  }).length;

  return (
    <div style={{ width: '100%', padding: '20px' }}>
      {/* Progress Bar Container /}
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

      {/* Form Container with Scrollable Content /}
      <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
        {questions.map((question, index) => {
          const { question: questionText, type, options, guideText, dtvp_code} = question;
          const fieldName = `question-${index}`;

          const isAnswered = formData[fieldName] && formData[fieldName] !== '' &&
            (question.type !== 'checkbox' || formData[fieldName].length > 0);

          return (
            <div key={index} style={{ marginBottom: '20px' }}>
              {/* Display the question as a header with done/undone icon /}
              <Typography variant="h6" gutterBottom>
                <span style={{ marginRight: '8px', verticalAlign: 'middle' }}>
                  {isAnswered ? <CheckCircleIcon color="primary" /> : <RadioButtonUncheckedIcon />}
                </span>
                {questionText}
              </Typography>

              {/* Display the human guide text (explanation) /}
              {guideText && (
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {guideText}
                </Typography>
              )}

              {/* Display the human guide text (explanation) /}
              {dtvp_code && (
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {dtvp_code}
                </Typography>
              )}

              {/* Render the input fields based on the type /}
              {type === 'text' && (
                <TextField
                  fullWidth
                  label="Enter Text"
                  value={formData[fieldName] || ''}
                  onChange={(e) => handleInputChange(fieldName, e.target.value)}
                  variant="outlined"
                  size="small"
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EditIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}

              {type === 'number' && (
                <TextField
                  fullWidth
                  label="Enter Number"
                  type="number"
                  value={formData[fieldName] || ''}
                  onChange={(e) => handleInputChange(fieldName, e.target.value)}
                  variant="outlined"
                  size="small"
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EditIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              )}

              {type === 'select' && options && (
                <FormControl fullWidth variant="outlined" size="small" margin="normal">
                  <InputLabel>{questionText}</InputLabel>
                  <Select
                    value={formData[fieldName] || ''}
                    onChange={(e) => handleInputChange(fieldName, e.target.value)}
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
                    value={formData[fieldName] || []}
                    onChange={(e) => handleInputChange(fieldName, e.target.value)}
                    renderValue={(selected) => selected.join(', ')}
                    label={questionText}
                  >
                    {options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        <Checkbox checked={formData[fieldName]?.includes(option.value)} />
                        <ListItemText primary={option.label} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {/* Clear and Submit buttons above each divider /}
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                marginTop={2}
                style={{ width: '100%' }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleClear}
                  startIcon={<ClearAllIcon />}
                >
                  Clear
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  startIcon={<SendIcon />}
                >
                  Submit
                </Button>
              </Stack>

              {/* Divider between questions /}
              <Divider style={{ marginTop: '20px', marginBottom: '20px' }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DynamicForm;
*/
