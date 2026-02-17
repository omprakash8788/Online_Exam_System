import API from "./api";

export const fetchQuestionsByTestId = async (testId:string) => {
  const res = await API.get(`/questions/test/${testId}`);
  return res.data.data;
};

export const uploadQuestions = async (questions:any) => {
  const res = await API.post("/questions", questions);
  return res.data;
};
