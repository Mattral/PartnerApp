"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";
import Loader from "./Loader"; // Import the Loader component

interface Template {
  dtv_code: string;
  dt_code: string;
  dt_name: string;
  dt_shortDesc: string;
  dt_desc: string;
  dt_type: string;
}

const Page: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "https://lawonearth.co.nz/api/partner/doc-templates";
        const headers = {
          "COMPANY-CODE": "MC-9E234746-3738-4E49-A7FA-27E3998A68E9",
          "FRONTEND-KEY": "XXX", // Replace with your actual frontend key
          PaginateResults: "1",
          MaxResultsPerPage: "12",
          "X-Requested-With": "XMLHttpRequest",
        };
        const params = {
          searchKey: "",
          PaginateResults: "1",
          MaxResultsPerPage: "12",
        };

        const response = await fetch(
          `${url}?${new URLSearchParams(params).toString()}`,
          { headers }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        const templatesData = data.data.primaryData._templates.data.map(
          (template: any) => ({
            dtv_code: template.dtv_code,
            dt_code: template.dt_code,
            dt_name: template.dt_name,
            dt_shortDesc: template.dt_shortDesc,
            dt_desc: template.dt_desc,
            dt_type: template.dt_type,
          })
        );

        setTemplates(templatesData);
        setFilteredTemplates(templatesData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle search input
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = templates.filter(
      (template) =>
        template.dt_name.toLowerCase().includes(query.toLowerCase()) ||
        template.dt_shortDesc.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTemplates(filtered);
  };

  // Handle Edit Click with dt_code and dtv_code as query parameters
  const handleEditClick = (dt_code: string, dtv_code: string) => {
    router.push(`/apps/editor?dt_code=${dt_code}&dtv_code=${dtv_code}`);
  };

  const handlePreviewClick = (dtv_code: string) => {
    router.push(`/apps/AboutDoc?dtv_code=${dtv_code}`);
  };

  return (
    <Box sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", color: "primary.main", mb: 4 }}>
        My Documents
      </Typography>

      {/* Search Bar (Centered and Smaller) */}
      <Box sx={{ width: "50%", mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search documents..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            borderRadius: 2,
            backgroundColor: "background.paper",
            boxShadow: 1,
          }}
        />
      </Box>

      {/* Loader or Document List */}
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
          <Loader /> {/* Loader Animation */}
          <Box sx={{ mb: 5 }} />
        </Box>
      ) : filteredTemplates.length === 0 ? (
        <Typography variant="h6" color="text.secondary" sx={{ textAlign: "center", mt: 4 }}>
          No documents found.
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {filteredTemplates.map((template) => (
            <Grid item xs={12} sm={6} md={4} key={template.dtv_code}>
              <Card
                sx={{
                  boxShadow: 4,
                  borderRadius: 8,
                  padding: 3,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  backgroundColor: "background.default",
                  position: "relative",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "primary.main" }}>
                    {template.dt_name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                    {template.dt_shortDesc}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.primary", mb: 2 }}>
                    {template.dt_desc}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary", fontStyle: "italic" }}>
                    Type: {template.dt_type}
                  </Typography>
                </CardContent>

                <Box sx={{ mt: "auto", display: "flex", flexDirection: "column" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mb: 1 }}
                    onClick={() => handleEditClick(template.dt_code, template.dtv_code)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    sx={{ mb: 1 }}
                    onClick={() => handlePreviewClick(template.dtv_code)}
                  >
                    Preview
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Page;