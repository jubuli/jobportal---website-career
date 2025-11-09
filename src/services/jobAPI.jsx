



const USER_JOBS_STORAGE_KEY = "user_posted_jobs";


const getUserPostedJobs = () => {
  try {
    const stored = localStorage.getItem(USER_JOBS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading user jobs:", error);
    return [];
  }
};


const saveUserJobsToStorage = (jobs) => {
  try {
    localStorage.setItem(USER_JOBS_STORAGE_KEY, JSON.stringify(jobs));
    console.log(" User jobs saved. Total:", jobs.length);
    return true;
  } catch (error) {
    console.error("Error saving user jobs:", error);
    return false;
  }
};

export const jobAPI = {
  getJobs: async (page = 1, itemsPerPage =2) => {
   
    const userJobs = getUserPostedJobs();
    
    
    
   
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedJobs = userJobs.slice(startIndex, endIndex);
    
    return {
      data: {
        jobs: paginatedJobs,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(userJobs.length / itemsPerPage),
          totalItems: userJobs.length,
          itemsPerPage,
        },
      },
    };
  },

  getJob: async (id) => {
    
    const userJobs = getUserPostedJobs();
    const job = userJobs.find(job => job.id === parseInt(id));
    
    if (!job) {
      throw new Error("Job not found in user posted jobs");
    }
    
    return { data: job };
  },

  createJob: async (jobData) => {
  
    const existingUserJobs = getUserPostedJobs();
    
    
    const newJobId = existingUserJobs.length > 0 
      ? Math.max(...existingUserJobs.map(j => j.id)) + 1 
      : 1;
    
    const newJob = {
      id: newJobId,
      ...jobData,
      postedDate: new Date().toISOString(),
    };

   
    const updatedUserJobs = [newJob, ...existingUserJobs];
    const saveSuccess = saveUserJobsToStorage(updatedUserJobs);
    
    if (!saveSuccess) {
      throw new Error("Failed to save job permanently");
    }

    console.log(" New job saved. Total user jobs:", updatedUserJobs.length);
    
    return { data: newJob };
  }
};

