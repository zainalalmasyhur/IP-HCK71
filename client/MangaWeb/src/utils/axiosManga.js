import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.mangadex.org",
});

export default instance;
