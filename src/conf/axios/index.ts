import axios from "axios";

export default axios.create({
  baseURL: process.env.PLATFORMOON_APPS_BASE_URL,
});
