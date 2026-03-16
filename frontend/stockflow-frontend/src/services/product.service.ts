
import api from "./api";

/* ================= FETCH ================= */

export const getFeaturedProducts = async () => {
  const res = await api.get("/products", {
    params: { limit: 8 },
  });
  return res.data.data;
};

export const getProducts = async (params?: any) => {
  const res = await api.get("/products", { params });
  return res.data.data;
};

/* ================= CREATE ================= */

export const addProduct = async (data: FormData) => {
  const res = await api.post("/products", data);
  return res.data;
};


/* ================= DELETE ================= */

export const deleteProduct = async (id: string) => {
  return api.delete(`/products/${id}`);
};