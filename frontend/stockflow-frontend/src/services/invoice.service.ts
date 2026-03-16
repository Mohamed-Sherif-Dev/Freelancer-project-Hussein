
import api from "./api";

export const getInvoice = async (orderId: string) => {
  const res = await api.get(`/orders/${orderId}/invoice`);
  return res.data
};

// export const openInvoicePDF = (orderId: string) => {
//   const token = localStorage.getItem("accessToken");
//   window.open(
//     `http://localhost:5000/api/orders/${orderId}/invoice/pdf?token=${token}`,
//     "_blank"
//   );
// };


export const openInvoicePDF = (orderId: string) => {
  const token = localStorage.getItem("accessToken");

  return `http://localhost:5000/api/orders/${orderId}/invoice/pdf?token=${token}`;
};