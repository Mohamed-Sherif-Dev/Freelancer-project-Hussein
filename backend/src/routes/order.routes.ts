import express from "express";
import { createOrder , updateOrderStatus , getOrders , getOrderInvoice, getOrderInvoicePDF } from "../controllers/order.controller";
import { protectAdmin } from "../middlewares/auth.middleware";
import OrderModel from "../models/Order.model";



const router = express.Router();


router.post("/", createOrder);

// Admin
router.patch("/:id/status",protectAdmin , updateOrderStatus);

router.get("/", protectAdmin, getOrders);

router.get("/:id/invoice", protectAdmin , getOrderInvoice);

router.get(
  "/:id/invoice/pdf",
  protectAdmin,
  getOrderInvoicePDF
);


router.get("/orders/:orderNumber/invoice/public", async (req , res)=>{
  const orderNumber = req.params;
  const token = req.query;


  const order = await OrderModel.findOne({
    invoiceNumber: orderNumber,
    invoiceToken: token,
  })

  if(!order){
    return res.status(404).json({
      success: false,
      message: "الطلب غير موجود أو الرمز غير صالح",
    })
  }
  res.status(200).json({
    success: true,
    data: order,
    message: "تم الحصول على الطلب بنجاح",
  })
}) 

// router.get("/orders/:orderNumber/invoice/public", async (req, res) => {

//   const { orderNumber } = req.params;
//   const { token } = req.query;

//   const order = await OrderModel.findOne({
//     invoiceNumber: orderNumber,
//     invoiceToken: token,
//   });

//   if (!order) {
//     return res.status(404).json({
//       success: false,
//       message: "الطلب غير موجود أو الرمز غير صالح",
//     });
//   }

//   return res.status(200).json({
//     success: true,
//     data: order,
//   });

// });

export default router;