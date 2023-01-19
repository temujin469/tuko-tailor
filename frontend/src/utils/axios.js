import axios from "axios";

export const baseUrl = axios.create({
  // baseURL: "http://192.168.1.78:5000/api/v1",
  baseURL: "https://tuko-tailor-api.vercel.app/api/v1",
});
//https://tuko-tailor-api.vercel.app/
