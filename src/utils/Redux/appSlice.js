import { createSlice } from "@reduxjs/toolkit";

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
  },
  reducers: {
    getJobs: (state, action) => {
      state.jobs = action.payload;
    },
  },
});
export const { getJobs } = jobsSlice.actions;
export default jobsSlice.reducer;
