
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jobAPI } from '../services/jobAPI';


export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await jobAPI.getJobs(page);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchJobDetails = createAsyncThunk(
  'jobs/fetchJobDetails',
  async (jobId, { rejectWithValue }) => {
    try {
      const response = await jobAPI.getJob(jobId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewJob = createAsyncThunk(
  'jobs/addNewJob',
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await jobAPI.createJob(jobData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const initializeJobs = createAsyncThunk(
  'jobs/initializeJobs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await jobAPI.getJobs(1);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    items: [],
    currentJob: null,
    loading: false,
    error: null,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      itemsPerPage: 6
    }
  },
  reducers: {
    clearCurrentJob: (state) => {
      state.currentJob = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(initializeJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(initializeJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.jobs;
        state.pagination = action.payload.pagination;
      })
      .addCase(initializeJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
   
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.jobs;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      
      .addCase(fetchJobDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentJob = action.payload;
      })
      .addCase(fetchJobDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      
      .addCase(addNewJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewJob.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
        state.pagination.totalItems += 1;
        state.pagination.totalPages = Math.ceil(state.pagination.totalItems / state.pagination.itemsPerPage);
      })
      .addCase(addNewJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearCurrentJob, clearError } = jobSlice.actions;
export default jobSlice.reducer;