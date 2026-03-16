import api from "./api";

export const getOrders = async ( ) => {
  const res = await api.get("/orders");
  return res.data.data;
};

export const createOrder = async (data: any) => {
  const res = await api.post("/orders", data);
  return res.data;
};



export const updateOrderStatus = async (id: string, status: string) => {
  const res = await api.patch(`/orders/${id}/status`, { status }); 
  return res.data;
};