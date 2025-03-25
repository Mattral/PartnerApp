"use client";
import React, { useState, useEffect } from "react";
import DynamicForm from "./DynamicForm";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";

const Question = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const dt_code = searchParams.get("dt_code");
  const dtv_code = searchParams.get("dtv_code");

  // Fetch data from the API
  const fetchData = async () => {
    try {
      const url = `https://lawonearth.co.nz/api/partner/doc-templates/${dt_code}`;
      const headers = {
        "COMPANY-CODE": "MC-9E234746-3738-4E49-A7FA-27E3998A68E9",
        "FRONTEND-KEY": "XXX", // Replace with your actual frontend key
        PaginateResults: "1",
        MaxResultsPerPage: "12",
        "X-Requested-With": "XMLHttpRequest",
      };

      const response = await axios.get(url, { headers });

      if (response.status === 200) {
        const data = response.data;

        // Save dtvf_htmlTranscript to localStorage
        const htmlTranscript = data.data.primaryData._template.dtvf_htmlTranscript;
        localStorage.setItem("extractedHtml", htmlTranscript);

        // Format placeholders into the desired structure
        const placeholders = data.data.primaryData._template.placeholders;
        const formattedQuestions = placeholders.map((placeholder: any) => {
          const typeMapping: { [key: string]: string } = {
            string: "text",
            decimal: "number",
            "dropdown-mono": "select",
            "dropdown-multi": "checkbox",
          };

          const options = placeholder.options.map((option: any) => ({
            label: option.dpo_label || "empty",
            value: option.dpo_value || "empty",
          }));

          return {
            dtvp_code: placeholder.dtvp_code, 
            dtvp_answerIsRequired: placeholder.dtvp_answerIsRequired, // true = Mandatory, flase = optional
            question: placeholder.dtvp_inputLabel,
            type: typeMapping[placeholder.dtvp_inputType] || "text", // Default to "text" if type is unknown
            guideText: placeholder.dtvp_inputHelpText,
            options: placeholder.options.length > 0 ? options : undefined, // Only include options if they exist
          };
        });

        setQuestions(formattedQuestions);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, [dt_code]);

  // Handle refresh button click
  const handleRefresh = () => {
    setIsLoading(true);
    fetchData();
  };

  return (
    <div>
    {/* Using Box to align Typography and Button in a row */}
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
      <Typography variant="h4" sx={{ marginRight: 2 }}>
        Please fill in the Form
      </Typography>

      {/* Refresh Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleRefresh}
        disabled={isLoading}
      >
        {isLoading ? "Refreshing..." : "Refresh"}
      </Button>
    </Box>

    {/* Display DynamicForm */}
    {isLoading ? (
      <Typography>Loading...</Typography>
    ) : (
      <DynamicForm questions={questions} />
    )}
  </div>
  );
};

export default Question;