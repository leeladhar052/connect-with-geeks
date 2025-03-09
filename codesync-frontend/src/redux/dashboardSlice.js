import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLeetCodeStats, fetchCodeforcesStats, fetchGfgStats } from "../utils/api";

export const fetchUserStats = createAsyncThunk(
  "dashboard/fetchUserStats",
  async (username) => {
    // const leetCodeData = await fetchLeetCodeStats(username);
    const codeforcesData = await fetchCodeforcesStats(username);
    // const gfgData = await fetchGfgStats(username);
    return {  codeforcesData };
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: { stats: null, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserStats.fulfilled, (state, action) => {
        state.stats = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserStats.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default dashboardSlice.reducer;
