import API from "./api";

export const fetchAllTests = async () => {
  const res = await API.get("/tests");
  return res.data.data;
};

export const createTest = async (testData:any) => {
  const res = await API.post("/tests", testData);
  return res.data.data;
};




// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:4000/api",
//   withCredentials: true,
// });

// export const getAllTests = async () => {
//   const res = await API.get("/tests");
//   return res.data.data; // backend returns { success, data }
// };

