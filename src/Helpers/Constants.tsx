export const APP_PATH =
  process.env.NODE_ENV === "production" ? process.env.REACT_APP_BASE_PATH : "";

export const BASE_URL = "https://api.nasa.gov/neo/rest/v1/";

export const API_KEY = "b0PybfrV7zPtxusffhurE3Hikl4GtukKe0uqZSDo";

export const STATUS_CODE = {
  INTERNAL_SERVER_ERROR: 500,
  SUCCESS: 200
};
