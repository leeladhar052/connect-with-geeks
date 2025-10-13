import axios from "axios";
import { API_ENDPOINTS } from "./constants";

export const fetchLeetCodeStats = async (username) => {
  try {
    const { data } = await axios.get(`${API_ENDPOINTS.LEETCODE_STATS}${username}`);
    return data;
  } catch (error) {
    console.error("LeetCode API Error:", error);
    return null;
  }
};

export const fetchGfgStats = async (username) => {
  try {
    const response = await axios.get(
      `https://cors-anywhere.herokuapp.com/https://gfg-api-server.onrender.com/profile/${username}`
    );
    return response.data;
  } catch (error) {
    console.error("GFG API Error:", error.message);
    return null;
  }
};

export const fetchCodeforcesStats = async (username) => {
  try {
    const response = await axios.get(
      `https://codeforces.com/api/user.info?handles=coder_ld_01`
    );
    return response.data;
  } catch (error) {
    console.error("Codeforces API Error:", error.message);
    return null;
  }
};

