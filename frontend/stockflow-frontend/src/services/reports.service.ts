import api from "./api";

export const getSalesTimeline = async (range = "monthly") => {
  const res = await api.get(`/reportss/sales-timeline?range=${range}`);
  return res.data;
};

export const getProfitRatio = async () => {
  const res = await api.get(`/reportss/profit-ratio`);
  return res.data;
};