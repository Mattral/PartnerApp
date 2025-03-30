"use client";
import React, { useState, useEffect } from "react";
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
  Card,
  Tooltip,
  IconButton
} from "@mui/material";
import {
  Edit as EditIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  ClearAll as ClearAllIcon,
  Send as SendIcon,
  QuestionMark as QuestionMarkIcon,
  ErrorOutline as ErrorOutlineIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  Info as InfoIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon
} from "@mui/icons-material";
import { useSearchParams } from "next/navigation";
import axios from "axios";

type Option = {
  label: string;
  value: string;
};

type Question = {
  dtvp_code: string;
  dtvp_name: string;
  dtvp_index: number;
  dtvp_answerIsRequired: boolean;
  question: string;
  type: "text" | "number" | "select" | "checkbox";
  options?: Option[];
  guideText?: string;
};

interface DynamicForm2Props {
  questions: Question[];
}

const DynamicForm2: React.FC<DynamicForm2Props> = ({ questions }) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const searchParams = useSearchParams();
  const dt_code = searchParams.get("dt_code");
  const dtv_code = searchParams.get("dtv_code");

  // Sort questions by dtvp_index
  const sortedQuestions = [...questions].sort((a, b) => a.dtvp_index - b.dtvp_index);

  // Initialize form data and completed steps
  useEffect(() => {
    const initialFormData: Record<string, any> = {};
    const initialCompletedSteps: Record<number, boolean> = {};
    
    sortedQuestions.forEach((question, index) => {
      initialFormData[question.dtvp_code] = "";
      initialCompletedSteps[index] = false;
    });

    setFormData(initialFormData);
    setCompletedSteps(initialCompletedSteps);
  }, [questions]);

  const handleSearchText = (variableName: string) => {
    const cleanVariableName = variableName.replace(/^\$|\{|\}/g, "");
    const searchText = `\\$\\{${cleanVariableName}\\}`;
    removeHighlight();

    const sunEditors = document.querySelectorAll(".sun-editor-editable");
    let found = false;

    sunEditors.forEach((editor) => {
      if (searchExactPatternInSunEditor(editor as HTMLElement, searchText)) {
        found = true;
      }
    });

    if (!found) {
      console.log("not found");
    }
  };

  const searchExactPatternInSunEditor = (editor: HTMLElement, exactPattern: string): boolean => {
    const editorContent = editor.textContent || "";
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
      const text = node.nodeValue || "";
      const match = regex.exec(text);

      if (match) {
        range.setStart(node, match.index);
        range.setEnd(node, match.index + match[0].length);

        const span = document.createElement("span");
        span.style.backgroundColor = "yellow";
        span.style.border = "1px solid orange";
        range.surroundContents(span);
        break;
      }
    }
  };

  const removeHighlight = () => {
    document.querySelectorAll('.sun-editor-editable > span[style*="background-color: yellow"]').forEach((el) => {
      const parent = el.parentNode;
      if (parent) {
        parent.replaceChild(document.createTextNode(el.textContent || ""), el);
      }
    });
  };

  const handleInputChange = (dtvp_code: string, value: any) => {
    if (Array.isArray(value)) {
      value = value.join(", ");
    }
    setFormData((prev) => ({
      ...prev,
      [dtvp_code]: value,
    }));

    // Mark step as completed if answer is provided
    const isAnswered = value !== undefined && (Array.isArray(value) ? value.length > 0 : value !== "");
    setCompletedSteps((prev) => ({
      ...prev,
      [currentStep]: isAnswered,
    }));
  };

  const handleQuestionSubmit = async (dtvp_code: string) => {
    const savedContent = localStorage.getItem("extractedHtml");
    if (!savedContent) {
      console.error('No content found in localStorage for "extractedHtml".');
      return;
    }

    const answer = formData[dtvp_code];
    if (!answer) {
      console.error("No answer found for the given dtvp_code.");
      return;
    }

    if (!dt_code || !dtv_code) {
      console.error("Missing dt_code or dtv_code from the URL.");
      return;
    }

    const url = `https://lawonearth.co.nz/api/partner/placeholder-answers/submit/${dtv_code}/${dtvp_code}`;
    const payload = {
      dpa_value: answer,
      document: savedContent,
      document_1: "",
      strict_mode: 0,
    };

    const headers = {
      "COMPANY-CODE": "MC-9E234746-3738-4E49-A7FA-27E3998A68E9",
      "FRONTEND-KEY": "XXX",
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post(url, payload, { headers });
      if (response.status === 200 && response.data) {
        const updatedDocument = response.data.data.primaryData.updatedDocument;
        if (updatedDocument) {
          localStorage.setItem("extractedHtml", updatedDocument);
          console.log("Local storage updated with the new extractedHtml.");
          // Move to next question after successful submission
          if (currentStep < sortedQuestions.length - 1) {
            setCurrentStep(currentStep + 1);
          }
        }
      }
    } catch (error) {
      console.error("Error while submitting data:", error);
    }
  };

  const handleFormSubmit = () => {
    console.log("All Answers:", formData);
  };

  const calculateCompletionPercentage = () => {
    const totalQuestions = sortedQuestions.length;
    const completedQuestions = Object.values(completedSteps).filter(Boolean).length;
    return (completedQuestions / totalQuestions) * 100;
  };

  const completionPercentage = calculateCompletionPercentage();
  const currentQuestion = sortedQuestions[currentStep];
  const answer = formData[currentQuestion.dtvp_code];
  const isAnswered = answer !== undefined && (currentQuestion.type !== "checkbox" ? answer !== "" : answer.length > 0);

  const handleNext = () => {
    if (currentStep < sortedQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Box 
    sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '50vh', // Set minimum height (viewport height)
      justifyContent: 'center', // Vertical centering
      width: "100%", 
      padding: "20px"
    }}
  >     
    {/* Progress Bar Container */}
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        backgroundColor: "white",
        padding: "10px 0",
        borderBottom: "1px solid #ccc",
      }}
    >
        <LinearProgress
          variant="determinate"
          value={completionPercentage}
          sx={{ marginBottom: "10px" }}
        />
        <Typography variant="body2" align="center">
          Question {currentStep + 1} of {sortedQuestions.length}
        </Typography>
        </Box>

    {/* Current Question Card - Centered with max width */}
    <Box 
      sx={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '40vh',
        maxWidth: '800px', // Optional: limit width for better readability
        width: '100%',
        margin: '0 auto', // Center horizontally
        my: 4 // Vertical margin
      }}
    >
        <Card sx={{ p: 2, boxShadow: 2, borderRadius: 2, width: "100%" }}>
          {/* Question Header */}
          <Typography
            variant="h5"
            gutterBottom
            style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "5px" }}
          >
            <div style={{ display: "flex", alignItems: "center", width: "100%", marginTop: "5px", justifyContent: "center" }}>
              <span style={{ marginRight: "8px", verticalAlign: "middle", alignItems: "center", justifyContent: "center" }}>
                {isAnswered ? <CheckCircleIcon color="primary" /> : <RadioButtonUncheckedIcon />}
              </span>
              <span style={{ flexGrow: 1, marginRight: "8px", textAlign: "center" }}>
                {currentQuestion.question}
              </span>
            </div>

            <span
              style={{
                fontSize: "14px",
                verticalAlign: "middle",
                marginTop: "4px",
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                textAlign: "center",
              }}
            >
              {currentQuestion.dtvp_answerIsRequired ? (
                <>
                  <Tooltip
                    title="This field is required"
                    placement="top"
                    arrow
                    sx={{
                      "& .MuiTooltip-tooltip": {
                        backgroundColor: isAnswered ? "green" : "red",
                        color: "#fff",
                        borderRadius: "8px",
                        fontSize: "14px",
                        padding: "8px",
                      },
                    }}
                  >
                    <span
                      style={{
                        color: isAnswered ? "green" : "red",
                        alignItems: "center",
                        marginLeft: "1px",
                        marginRight: "4px",
                      }}
                    >
                      {isAnswered ? <CheckCircleOutlineIcon fontSize="small" /> : <ErrorOutlineIcon fontSize="small" />}
                    </span>
                  </Tooltip>
                  <span
                    style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => handleSearchText(`$${currentQuestion.dtvp_name}`)}
                  >
                    | {`$\{${currentQuestion.dtvp_name}\}`}
                  </span>
                </>
              ) : (
                <>
                  <Tooltip
                    title="This field is optional"
                    placement="top"
                    arrow
                    sx={{
                      "& .MuiTooltip-tooltip": {
                        backgroundColor: "#00796b",
                        color: "#fff",
                        borderRadius: "8px",
                        fontSize: "14px",
                        padding: "8px",
                      },
                    }}
                  >
                    <span
                      style={{
                        color: "gray",
                        alignItems: "center",
                        marginLeft: "1px",
                        marginRight: "4px",
                      }}
                    >
                      <InfoIcon fontSize="small" />
                    </span>
                  </Tooltip>
                  <span
                    style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => handleSearchText(`$${currentQuestion.dtvp_name}`)}
                  >
                    {'\u00A0\u00A0\u00A0| '} {`$\{${currentQuestion.dtvp_name}\}`}
                  </span>
                </>
              )}
            </span>
          </Typography>

          {/* Guide Text */}
          {currentQuestion.guideText && (
            <Typography
              variant="body1"
              color="textSecondary"
              gutterBottom
              style={{ fontSize: "1rem", fontWeight: "400", textAlign: "center" }}
            >
              hint: {currentQuestion.guideText}
            </Typography>
          )}

          {/* Input Fields */}
          {currentQuestion.type === "text" && (
            <TextField
              fullWidth
              label="Enter Text"
              value={answer || ""}
              onChange={(e) => handleInputChange(currentQuestion.dtvp_code, e.target.value)}
              variant="outlined"
              size="small"
              margin="normal"
              InputProps={{
                startAdornment: <InputAdornment position="start"><EditIcon /></InputAdornment>,
              }}
            />
          )}

          {currentQuestion.type === "number" && (
            <TextField
              fullWidth
              label="Enter Number"
              type="number"
              value={answer || ""}
              onChange={(e) => handleInputChange(currentQuestion.dtvp_code, e.target.value)}
              variant="outlined"
              size="small"
              margin="normal"
              InputProps={{
                startAdornment: <InputAdornment position="start"><EditIcon /></InputAdornment>,
              }}
            />
          )}

          {currentQuestion.type === "select" && currentQuestion.options && (
            <FormControl fullWidth variant="outlined" size="small" margin="normal">
              <InputLabel>{currentQuestion.question}</InputLabel>
              <Select
                value={answer || ""}
                onChange={(e) => handleInputChange(currentQuestion.dtvp_code, e.target.value)}
                label={currentQuestion.question}
              >
                {currentQuestion.options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {currentQuestion.type === "checkbox" && currentQuestion.options && (
            <FormControl fullWidth variant="outlined" size="small" margin="normal">
              <InputLabel>{currentQuestion.question}</InputLabel>
              <Select
                multiple
                value={Array.isArray(answer) ? answer : (answer ? answer.split(", ") : [])}
                onChange={(e) => handleInputChange(currentQuestion.dtvp_code, e.target.value)}
                renderValue={(selected) => {
                  const selectedArray = Array.isArray(selected) ? selected : selected.split(", ");
                  return selectedArray.join(", ");
                }}
                label={currentQuestion.question}
              >
                {currentQuestion.options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Checkbox checked={answer?.split(", ").includes(option.value)} />
                    <ListItemText primary={option.label} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {/* Navigation and Submit Buttons */}
          <Stack direction="row" spacing={2} justifyContent="space-between" marginTop={2}>
            <Button
              variant="outlined"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              startIcon={<ArrowBackIcon />}
            >
              Previous
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={() => handleQuestionSubmit(currentQuestion.dtvp_code)}
              disabled={currentQuestion.dtvp_answerIsRequired && !isAnswered}
              endIcon={<SendIcon />}
            >
              {currentStep === sortedQuestions.length - 1 ? "Submit All" : "Submit & Next"}
            </Button>

            <Button
              variant="outlined"
              onClick={handleNext}
              disabled={currentStep === sortedQuestions.length - 1}
              endIcon={<ArrowForwardIcon />}
            >
              Next
            </Button>
          </Stack>
        </Card>
        </Box>

      </Box>
  );
};

export default DynamicForm2;