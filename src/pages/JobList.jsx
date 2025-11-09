

import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  TextField,
  MenuItem,
  Pagination,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../store/jobSlice";
import JobCard from "../components/Job/JobCard";
import jobbg from "./jobbg.jpg";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import ErrorAlert from "../components/Common/ErrorAlert";

const JobList = () => {
  const dispatch = useDispatch();
  const { items, loading, error, pagination } = useSelector(
    (state) => state.jobs
  );

  const [filters, setFilters] = useState({ type: "", location: "" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchJobs(1));
  }, [dispatch]);

  const handlePageChange = (event, value) => {
    dispatch(fetchJobs(value));
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const jobTypes = [...new Set(items.map((job) => job.type))];
  const locations = [...new Set(items.map((job) => job.location))];

  const filteredJobs = items.filter((job) => {
    const matchesType = !filters.type || job.type === filters.type;
    const matchesLocation =
      !filters.location || job.location === filters.location;
    const matchesSearch =
      !searchTerm || job.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesLocation && matchesSearch;
  });

  if (loading && items.length === 0) return <LoadingSpinner />;

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `url(${jobbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        py: { xs: 4, sm: 6, md: 8 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
 
      <Box
        sx={{
          width: { xs: "95%", sm: "90%", md: "80%", lg: "70%" },
          backgroundColor: "rgba(227, 229, 235, 0.93)", 
  
           
          p: { xs: 2, sm: 3 },
          borderRadius: 4,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "stretch", sm: "center" },
          gap: { xs: 2, sm: 2 },
          boxShadow: "0 9px 15px rgba(33, 99, 204, 0.9)",
        }}
      >
       
        <TextField
          fullWidth
          placeholder="domain"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
          size="small"
        />

     
        <TextField
          select
          label="Location"
          value={filters.location}
          onChange={(e) => handleFilterChange("location", e.target.value)}
          size="small"
          sx={{ minWidth: { xs: "100%", sm: 150, md: 200 } }}
        >
          <MenuItem value="">All</MenuItem>
          {locations.map((loc) => (
            <MenuItem key={loc} value={loc}>
              {loc}
            </MenuItem>
          ))}
        </TextField>

      
        <TextField
          select
          label="Job Type"
          value={filters.type}
          onChange={(e) => handleFilterChange("type", e.target.value)}
          size="small"
          sx={{ minWidth: { xs: "100%", sm: 150, md: 200 } }}
        >
          <MenuItem value="">All</MenuItem>
          {jobTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>

  
        <Box
          sx={{
            bgcolor: "primary.main",
            color: "white",
            px: { xs: 0, sm: 3 },
            py: 1,
            borderRadius: 1,
            textAlign: "center",
            cursor: "pointer",
            fontWeight: 600,
            "&:hover": { bgcolor: "primary.dark" },
          }}
          onClick={() => setSearchTerm(searchTerm.trim())}
        >
          SEARCH
        </Box>
      </Box>

      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 6 }, pb: 6 }}>
        {error && (
          <ErrorAlert error={error} onRetry={() => dispatch(fetchJobs(1))} />
        )}

        <Grid container spacing={2}>
          <Grid item xs={12}>
            {filteredJobs.length === 0 ? (
              <Box textAlign="center" py={8}>
                <Typography variant="h6" color="text.secondary">
                  {items.length === 0
                    ? "No jobs posted yet. Add your first job!"
                    : "No jobs found matching your criteria"}
                </Typography>
              </Box>
            ) : (
              <>
                <Box mb={2}>
                  <Typography variant="body2" color="text.secondary">
                    Showing {filteredJobs.length} of {pagination.totalItems} jobs
                  </Typography>
                </Box>

                <Grid container spacing={2}>
                  {filteredJobs.map((job) => (
                    <Grid item xs={12} sm={6}  md={4} lg={3} key={job.id}>
                      <JobCard  sx={{marginTop:3, }} job={job} />
                    </Grid>
                  ))}
                </Grid>

                {pagination.totalPages > 1 && (
                  <Grid display="flex" justifyContent="center" mt={4}  sx={{marginTop:9, position:"sticky", marginLeft:10,alignItems:'center',justifyContent:'center'}}>
                    <Pagination
                      count={pagination.totalPages}
                      page={pagination.currentPage}
                      onChange={handlePageChange}
                      color="primary"

                     
                     
                    />
                  </Grid>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default JobList;
