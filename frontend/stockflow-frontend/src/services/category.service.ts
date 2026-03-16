

import api from "./api";

/* ================= GET ALL ================= */

export const getCategories = async () => {
  const res = await api.get("/categories");
  return res.data.data;
};

/* ================= GET ONE ================= */

export const getCategoryById = async (id: string) => {
  const res = await api.get(`/categories/${id}`);
  return res.data.data;
};

/* ================= CREATE ================= */

export const createCategory = async (data: FormData) => {
  const res = await api.post("/categories", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

/* ================= UPDATE ================= */

export const updateCategory = async (id: string, data: FormData) => {
  const res = await api.put(`/categories/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

/* ================= DELETE ================= */

export const deleteCategory = async (id: string) => {
  const res = await api.delete(`/categories/${id}`);
  return res.data;
};

/* ================= TOGGLE ================= */

export const toggleCategory = async (id: string) => {
  const res = await api.patch(`/categories/${id}/toggle`);
  return res.data.data;
};