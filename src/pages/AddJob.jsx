


// import React, { useState } from 'react';
// import {
//   Container,
//   Typography,
//   Paper,
//   TextField,
//   Button,
//   Box,
//   MenuItem,
//   Grid,
//   Alert,
//   Chip,
//   Card,
//   CardContent,
//   InputAdornment,
//   Fade,
//   Stepper,
//   Step,
//   StepLabel
// } from '@mui/material';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { addNewJob } from '../store/jobSlice';
// import {
//   Add as AddIcon,
//   WorkOutline,
//   Business,
//   LocationOn,
//   AttachMoney,
//   Description,
//   Link,
//   Clear,
//   CheckCircle
// } from '@mui/icons-material';
// import jobbg from "./jobbg.jpg";

// const AddJob = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error } = useSelector(state => state.jobs);

//   const [formData, setFormData] = useState({
//     title: '',
//     company: '',
//     location: '',
//     type: '',
//     salary: '',
//     description: '',
//     applicationLink: ''
//   });

//   const [requirements, setRequirements] = useState([]);
//   const [currentRequirement, setCurrentRequirement] = useState('');
//   const [errors, setErrors] = useState({});
//   const [activeStep, setActiveStep] = useState(0);

//   const jobTypes = ['Full-time', 'Part-time', 'Intern', 'Contract', 'Remote'];
//   const locations = ['Remote', 'New York', 'San Francisco', 'London', 'Berlin', 'Bangalore', 'Mumbai', 'Delhi'];

//   const steps = ['Basic Info', 'Job Details', 'Requirements & Description'];

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.title.trim()) newErrors.title = 'Job title is required';
//     if (!formData.company.trim()) newErrors.company = 'Company name is required';
//     if (!formData.location) newErrors.location = 'Location is required';
//     if (!formData.type) newErrors.type = 'Job type is required';
//     if (!formData.salary.trim()) newErrors.salary = 'Salary range is required';
//     if (!formData.description.trim()) newErrors.description = 'Job description is required';
//     if (!formData.applicationLink.trim()) newErrors.applicationLink = 'Application link is required';
//     if (requirements.length === 0) newErrors.requirements = 'At least one requirement is needed';

//     try {
//       new URL(formData.applicationLink);
//     } catch {
//       newErrors.applicationLink = 'Please enter a valid URL';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleInputChange = (field) => (event) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: event.target.value
//     }));

//     if (errors[field]) {
//       setErrors(prev => ({
//         ...prev,
//         [field]: ''
//       }));
//     }
//   };

//   const handleAddRequirement = () => {
//     if (currentRequirement.trim() && !requirements.includes(currentRequirement.trim())) {
//       setRequirements(prev => [...prev, currentRequirement.trim()]);
//       setCurrentRequirement('');

//       if (errors.requirements) {
//         setErrors(prev => ({
//           ...prev,
//           requirements: ''
//         }));
//       }
//     }
//   };

//   const handleRemoveRequirement = (requirementToRemove) => {
//     setRequirements(prev => prev.filter(req => req !== requirementToRemove));
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       handleAddRequirement();
//     }
//   };

//   const handleNext = () => {
//     setActiveStep((prev) => prev + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prev) => prev - 1);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!validateForm()) return;

//     const jobData = {
//       ...formData,
//       requirements
//     };

//     try {
//       await dispatch(addNewJob(jobData)).unwrap();
//       navigate('/');
//     } catch (error) {
//       // Error handled by Redux
//     }
//   };

//   const handleReset = () => {
//     setFormData({
//       title: '',
//       company: '',
//       location: '',
//       type: '',
//       salary: '',
//       description: '',
//       applicationLink: ''
//     });
//     setRequirements([]);
//     setErrors({});
//     setActiveStep(0);
//   };

//   const getStepContent = (step) => {
//     switch (step) {
//       case 0:
//         return (
//           <Grid container spacing={3}>

//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Job Title"
//                 value={formData.title}
//                 onChange={handleInputChange('title')}
//                 error={!!errors.title}
//                 helperText={errors.title}
//                 required
//                 variant="outlined"
//                 placeholder="Enter Domain"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <WorkOutline color="primary" />
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: 2,
//                   }
//                 }}
//               />
//             </Grid>


//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Company Name"
//                 value={formData.company}
//                 onChange={handleInputChange('company')}
//                 error={!!errors.company}
//                 helperText={errors.company}
//                 required
//                 variant="outlined"
//                 placeholder="Your company name"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Business color="primary" />
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: 2,
//                   }
//                 }}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 select
//                 label="Location"
//                 value={formData.location}
//                 onChange={handleInputChange('location')}
//                 error={!!errors.location}
//                 helperText={errors.location}
//                 required
//                 variant="outlined"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <LocationOn color="primary" />
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: 2,
//                   }
//                 }}
//               >
//                 {locations.map(location => (
//                   <MenuItem key={location} value={location}>
//                     {location}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//           </Grid>
//         );

//       case 1:
//         return (
//           <Grid container spacing={3}>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 select
//                 label="Job Type"
//                 value={formData.type}
//                 onChange={handleInputChange('type')}
//                 error={!!errors.type}
//                 helperText={errors.type}
//                 required
//                 variant="outlined"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <WorkOutline color="primary" />
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: 2,
//                   }
//                 }}
//               >
//                 {jobTypes.map(type => (
//                   <MenuItem key={type} value={type}>
//                     {type}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Salary Range"
//                 value={formData.salary}
//                 onChange={handleInputChange('salary')}
//                 error={!!errors.salary}
//                 helperText={errors.salary}
//                 placeholder="e.g., $80,000 - $100,000"
//                 required
//                 variant="outlined"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <AttachMoney color="success" />
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: 2,
//                   }
//                 }}
//               />
//             </Grid>


//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Application Link"
//                 value={formData.applicationLink}
//                 onChange={handleInputChange('applicationLink')}
//                 error={!!errors.applicationLink}
//                 helperText={errors.applicationLink}
//                 placeholder="https://company.com/careers/job-id"
//                 required
//                 variant="outlined"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <Link color="primary" />
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: 2,
//                   }
//                 }}
//               />
//             </Grid>
//           </Grid>
//         );

//       case 2:
//         return (
//           <Grid container spacing={3}>
//             {/* Requirements */}
//             <Grid item xs={12}>
//               <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
//                 Required Skills
//               </Typography>
//               <Box display="flex" alignItems="flex-start" gap={2} mb={2}>
//                 <TextField
//                   fullWidth
//                   label="Add skill requirement"
//                   value={currentRequirement}
//                   onChange={(e) => setCurrentRequirement(e.target.value)}
//                   onKeyPress={handleKeyPress}
//                   error={!!errors.requirements}
//                   helperText={errors.requirements}
//                   variant="outlined"
//                   sx={{
//                     '& .MuiOutlinedInput-root': {
//                       borderRadius: 2,
//                     }
//                   }}
//                 />
//                 <Button
//                   variant="contained"
//                   onClick={handleAddRequirement}
//                   startIcon={<AddIcon />}
//                   sx={{
//                     borderRadius: 2,
//                     px: 3,
//                     minWidth: '100px',
//                     height: '56px',
//                     mt: '1px'
//                   }}
//                 >
//                   Add
//                 </Button>
//               </Box>

//               <Box display="flex" gap={1} flexWrap="wrap">
//                 {requirements.map((requirement, index) => (
//                   <Chip
//                     key={index}
//                     label={requirement}
//                     onDelete={() => handleRemoveRequirement(requirement)}
//                     color="primary"
//                     variant="filled"
//                     deleteIcon={<Clear />}
//                     sx={{
//                       borderRadius: 1,
//                       mb: 1
//                     }}
//                   />
//                 ))}
//               </Box>
//             </Grid>

            
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 multiline
//                 rows={4}
//                 label="Job Description"
//                 value={formData.description}
//                 onChange={handleInputChange('description')}
//                 error={!!errors.description}
//                 helperText={errors.description}
//                 required
//                 variant="outlined"
//                 placeholder="Describe the job responsibilities, requirements, and what you're looking for in a candidate..."
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
//                       <Description color="primary" />
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{
//                   '& .MuiOutlinedInput-root': {
//                     borderRadius: 2,
//                     alignItems: 'flex-start'
//                   }
//                 }}
//               />
//             </Grid>
//           </Grid>
//         );

//       default:
//         return 'Unknown step';
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: '100vh',
       
//         backgroundImage: `url(${jobbg})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         py: 4,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center'
//       }}
//     >
//       <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center' }}>
//         <Fade in timeout={800}>
//           <Box sx={{ maxWidth: 800, width: '100%' }}>
           
//             <Card
//               sx={{
//                 mb: 3,
//                 borderRadius: 3,
//                 background: 'rgba(255, 255, 255, 0.95)',
//                 backdropFilter: 'blur(20px)',
//               }}
//             >
//               <CardContent sx={{ textAlign: 'center', py: 4 }}>
//                 <WorkOutline
//                   sx={{
//                     fontSize: 50,
//                     color: 'primary.main',
//                     mb: 2
//                   }}
//                 />
//                 <Typography
//                   variant="h4"
//                   component="h1"
//                   gutterBottom
//                   sx={{
//                     fontWeight: 700,
//                     color: 'primary.main'
//                   }}
//                 >
//                   Post a New Job
//                 </Typography>
//                 <Typography
//                   variant="h6"
//                   color="text.secondary"
//                   sx={{ fontWeight: 400 }}
//                 >
//                   Find the perfect candidate for your team
//                 </Typography>
//               </CardContent>
//             </Card>

           
//             <Paper
//               elevation={8}
//               sx={{
//                 borderRadius: 3,
//                 overflow: 'hidden',
//                 background: 'rgba(255, 255, 255, 0.95)',
//                 backdropFilter: 'blur(20px)',
//               }}
//             >
//               {error && (
//                 <Alert
//                   severity="error"
//                   sx={{
//                     borderRadius: 0,
//                     fontSize: '1rem',
//                     py: 2
//                   }}
//                 >
//                   {error}
//                 </Alert>
//               )}

//               <Box sx={{ p: 4 }}>
//                 {/* Stepper */}
//                 <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
//                   {steps.map((label) => (
//                     <Step key={label}>
//                       <StepLabel>{label}</StepLabel>
//                     </Step>
//                   ))}
//                 </Stepper>

//                 <form onSubmit={handleSubmit}>
//                   {getStepContent(activeStep)}

                 
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 3 }}>
//                     <Button
//                       disabled={activeStep === 0}
//                       onClick={handleBack}
//                       sx={{
//                         borderRadius: 2,
//                         px: 4
//                       }}
//                     >
//                       Back
//                     </Button>

//                     <Box sx={{ display: 'flex', gap: 2 }}>
//                       <Button
//                         type="button"
//                         variant="outlined"
//                         onClick={handleReset}
//                         disabled={loading}
//                         sx={{
//                           borderRadius: 2,
//                           px: 4
//                         }}
//                       >
//                         Reset
//                       </Button>

//                       {activeStep === steps.length - 1 ? (
//                         <Button
//                           type="submit"
//                           variant="contained"
//                           disabled={loading}
//                           startIcon={<CheckCircle />}
//                           sx={{
//                             borderRadius: 2,
//                             px: 4,
//                             background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
//                             '&:hover': {
//                               background: 'linear-gradient(135deg, #1565c0 0%, #1e88e5 100%)',
//                             }
//                           }}
//                         >
//                           {loading ? 'Posting...' : 'Post Job'}
//                         </Button>
//                       ) : (
//                         <Button
//                           variant="contained"
//                           onClick={handleNext}
//                           sx={{
//                             borderRadius: 2,
//                             px: 4
//                           }}
//                         >
//                           Next
//                         </Button>
//                       )}
//                     </Box>
//                   </Box>
//                 </form>
//               </Box>
//             </Paper>
//           </Box>
//         </Fade>
//       </Container>
//     </Box>
//   );
// };

// export default AddJob;




import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  MenuItem,
  Grid,
  Alert,
  Chip,
  Card,
  CardContent,
  InputAdornment,
  Fade,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewJob } from '../store/jobSlice';
import {
  Add as AddIcon,
  WorkOutline,
  Business,
  LocationOn,
  AttachMoney,
  Description,
  Link,
  Clear,
  CheckCircle
} from '@mui/icons-material';
import jobbg from "./jobbg.jpg";

const AddJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.jobs);

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    salary: '',
    description: '',
    applicationLink: ''
  });

  const [requirements, setRequirements] = useState([]);
  const [currentRequirement, setCurrentRequirement] = useState('');
  const [errors, setErrors] = useState({});
  const [activeStep, setActiveStep] = useState(0);

  const jobTypes = ['Full-time', 'Part-time', 'Intern', 'Contract', 'Remote'];
  const locations = ['Remote', 'New York', 'San Francisco', 'London', 'Berlin', 'Bangalore', 'Mumbai', 'Delhi'];

  const steps = ['Basic Info', 'Job Details', 'Requirements & Description'];

  const textFieldStyles = {
    backgroundColor: 'rgba(245,247,250,0.9)',
    borderRadius: 2,
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      '& fieldset': { borderColor: 'rgba(0,0,0,0.2)' },
      '&:hover fieldset': { borderColor: 'primary.main' },
      '&.Mui-focused fieldset': { borderColor: 'primary.main' }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.company.trim()) newErrors.company = 'Company name is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.type) newErrors.type = 'Job type is required';
    if (!formData.salary.trim()) newErrors.salary = 'Salary range is required';
    if (!formData.description.trim()) newErrors.description = 'Job description is required';
    if (!formData.applicationLink.trim()) newErrors.applicationLink = 'Application link is required';
    if (requirements.length === 0) newErrors.requirements = 'At least one requirement is needed';

    try {
      new URL(formData.applicationLink);
    } catch {
      newErrors.applicationLink = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({ ...prev, [field]: event.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleAddRequirement = () => {
    if (currentRequirement.trim() && !requirements.includes(currentRequirement.trim())) {
      setRequirements(prev => [...prev, currentRequirement.trim()]);
      setCurrentRequirement('');
      if (errors.requirements) setErrors(prev => ({ ...prev, requirements: '' }));
    }
  };

  const handleRemoveRequirement = (req) => {
    setRequirements(prev => prev.filter(r => r !== req));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddRequirement();
    }
  };

  const handleNext = () => setActiveStep(prev => prev + 1);
  const handleBack = () => setActiveStep(prev => prev - 1);
  const handleReset = () => {
    setFormData({
      title: '', company: '', location: '', type: '',
      salary: '', description: '', applicationLink: ''
    });
    setRequirements([]); setErrors({}); setActiveStep(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await dispatch(addNewJob({ ...formData, requirements })).unwrap();
      navigate('/');
    } catch {}
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth label="Job Title" value={formData.title}
                onChange={handleInputChange('title')}
                error={!!errors.title} helperText={errors.title}
                required variant="outlined" placeholder="Enter Domain"
                InputProps={{ startAdornment: (<InputAdornment position="start"><WorkOutline color="primary" /></InputAdornment>) }}
                sx={textFieldStyles}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth label="Company Name" value={formData.company}
                onChange={handleInputChange('company')}
                error={!!errors.company} helperText={errors.company}
                required variant="outlined" placeholder="Your company name"
                InputProps={{ startAdornment: (<InputAdornment position="start"><Business color="primary" /></InputAdornment>) }}
                sx={textFieldStyles}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth select label="Location" value={formData.location}
                onChange={handleInputChange('location')}
                error={!!errors.location} helperText={errors.location}
                required variant="outlined"
                InputProps={{ startAdornment: (<InputAdornment position="start"><LocationOn color="primary" /></InputAdornment>) }}
                sx={textFieldStyles}
              >
                {locations.map(loc => <MenuItem key={loc} value={loc}>{loc}</MenuItem>)}
              </TextField>
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth select label="Job Type" value={formData.type}
                onChange={handleInputChange('type')}
                error={!!errors.type} helperText={errors.type}
                required variant="outlined"
                InputProps={{ startAdornment: (<InputAdornment position="start"><WorkOutline color="primary" /></InputAdornment>) }}
                sx={textFieldStyles}
              >
                {jobTypes.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth label="Salary Range" value={formData.salary}
                onChange={handleInputChange('salary')}
                error={!!errors.salary} helperText={errors.salary}
                placeholder="e.g., $80,000 - $100,000"
                required variant="outlined"
                InputProps={{ startAdornment: (<InputAdornment position="start"><AttachMoney color="success" /></InputAdornment>) }}
                sx={textFieldStyles}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth label="Application Link" value={formData.applicationLink}
                onChange={handleInputChange('applicationLink')}
                error={!!errors.applicationLink} helperText={errors.applicationLink}
                placeholder="https://company.com/careers/job-id"
                required variant="outlined"
                InputProps={{ startAdornment: (<InputAdornment position="start"><Link color="primary" /></InputAdornment>) }}
                sx={textFieldStyles}
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>Required Skills</Typography>
              <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} mb={2}>
                <TextField
                  fullWidth label="Add skill requirement" value={currentRequirement}
                  onChange={(e) => setCurrentRequirement(e.target.value)}
                  onKeyPress={handleKeyPress} error={!!errors.requirements}
                  helperText={errors.requirements} variant="outlined" sx={textFieldStyles}
                />
                <Button
                  variant="contained" onClick={handleAddRequirement}
                  startIcon={<AddIcon />} sx={{
                    borderRadius: 2, px: 3, height: 56, alignSelf: { xs: 'stretch', sm: 'center' }
                  }}
                >
                  Add
                </Button>
              </Box>

              <Box display="flex" gap={1} flexWrap="wrap">
                {requirements.map((req, i) => (
                  <Chip
                    key={i} label={req} onDelete={() => handleRemoveRequirement(req)}
                    color="primary" deleteIcon={<Clear />} sx={{ borderRadius: 1, mb: 1 }}
                  />
                ))}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth multiline rows={4} label="Job Description"
                value={formData.description} onChange={handleInputChange('description')}
                error={!!errors.description} helperText={errors.description}
                required variant="outlined" placeholder="Describe the job..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                      <Description color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={textFieldStyles}
              />
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${jobbg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        py: { xs: 3, md: 6 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="md">
        <Fade in timeout={800}>
          <Box>
            <Card sx={{ mb: 3, borderRadius: 3, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)' }}>
              <CardContent sx={{ textAlign: 'center', py: { xs: 3, md: 4 } }}>
                <WorkOutline sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />
                <Typography variant="h4" fontWeight={700} color="primary.main">
                  Post a New Job
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Find the perfect candidate for your team
                </Typography>
              </CardContent>
            </Card>

            <Paper
              elevation={8}
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)'
              }}
            >
              {error && <Alert severity="error" sx={{ borderRadius: 0, fontSize: '1rem', py: 2 }}>{error}</Alert>}

              <Box sx={{ p: { xs: 2, sm: 4 } }}>
                <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                  {steps.map((label) => (
                    <Step key={label}><StepLabel>{label}</StepLabel></Step>
                  ))}
                </Stepper>

                <form onSubmit={handleSubmit}>
                  {getStepContent(activeStep)}

                  <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                    gap: 2,
                    pt: 3
                  }}>
                    <Button disabled={activeStep === 0} onClick={handleBack} sx={{ borderRadius: 2, px: 4 }}>
                      Back
                    </Button>

                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                      <Button variant="outlined" onClick={handleReset} disabled={loading} sx={{ borderRadius: 2, px: 4 }}>
                        Reset
                      </Button>

                      {activeStep === steps.length - 1 ? (
                        <Button
                          type="submit" variant="contained" disabled={loading}
                          startIcon={<CheckCircle />}
                          sx={{
                            borderRadius: 2, px: 4,
                            background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
                            '&:hover': { background: 'linear-gradient(135deg, #1565c0 0%, #1e88e5 100%)' }
                          }}
                        >
                          {loading ? 'Posting...' : 'Post Job'}
                        </Button>
                      ) : (
                        <Button
                          variant="contained" onClick={handleNext}
                          sx={{ borderRadius: 2, px: 4 }}
                        >
                          Next
                        </Button>
                      )}
                    </Box>
                  </Box>
                </form>
              </Box>
            </Paper>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default AddJob;
