import { createSlice } from "@reduxjs/toolkit";

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    jobsTotal: [],
  },
  reducers: {
    getJobs: (state, action) => {
      state.jobs = action.payload;
    },
    getTotalJobs: (state, action) => {
      state.jobsTotal = action.payload;
    },
  },
});
export const { getJobs, getTotalJobs } = jobsSlice.actions;
export default jobsSlice.reducer;
