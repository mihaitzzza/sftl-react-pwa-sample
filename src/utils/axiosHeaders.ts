import axios from "axios";

export function setAuthHeader(token: string) {
  axios.defaults.headers.common["Authorization"] = token
    ? "Bearer " + token
    : "";
}
