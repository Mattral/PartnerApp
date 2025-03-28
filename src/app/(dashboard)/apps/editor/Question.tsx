"use client";
import React, { useState, useEffect } from "react";
import DynamicForm from "./DynamicForm";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { CircularProgress, Box, Button, Typography } from "@mui/material";


interface AiDocProcessorProps {
  isFullView: boolean;
  handleViewToggle: () => void;
}

export default function Question({ isFullView, handleViewToggle }: AiDocProcessorProps) {
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
            dtvp_name: placeholder.dtvp_name,
            dtvp_index: Number(placeholder.dtvp_index), // example "dtvp_index": 300, this value return only numbers
            dtvp_answerIsRequired: placeholder.dtvp_answerIsRequired, // true = Mandatory, flase = optional
            question: placeholder.dtvp_inputLabel,
            type: typeMapping[placeholder.dtvp_inputType] || "text",
            guideText: placeholder.dtvp_inputHelpText,
            options: placeholder.options.length > 0 ? options : undefined,
          };
        }).sort((a, b) => a.dtvp_index - b.dtvp_index);

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
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 3 }}>
        {/* Left aligned - Text */}
        <Typography variant="h4" sx={{ flexGrow: 0, marginRight: 2 }}>
          Please fill in the Form
        </Typography>

        {/* Center aligned - Empty Box (For centering purposes) */}
        <Box sx={{ flexGrow: 1 }}></Box>

        {/* Right aligned - Buttons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            {isLoading ? "Refreshing..." : "Refresh"}
          </Button>

          <Button
            variant="contained"
            color={isFullView ? 'secondary' : 'primary'}
            onClick={handleViewToggle}
          >
            {isFullView ? 'Half View' : 'Full View'}
          </Button>
        </Box>
      </Box>


      {/* Display DynamicForm */}
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress size={60} /> {/* Circular spinner with size 60px */}
        </Box>
      ) : (
        <DynamicForm questions={questions} />
      )}
    </div>
  );
};

