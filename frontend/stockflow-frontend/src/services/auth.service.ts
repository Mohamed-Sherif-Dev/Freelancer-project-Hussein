import api from "./api";

export const loginAdmin = async (data: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/admin/login", data);

  const token = res.data.accessToken; // ✅ الاسم الصحيح

  localStorage.setItem("accessToken", token);

  document.cookie = `accessToken=${token}; path=/;`;

  return res.data;
};