import { Request, Response } from "express";
import * as OrderService from "../services/order.service";
import { generateInvoicePdf } from "../utils/invoicePdf";
import crypto from "crypto";
/**
 * @desc    Create Order (User)
 * @route   POST /api/orders
 */
// export const createOrder = async (req: Request, res: Response) => {
//   const { customerName, phone, items } = req.body;


//   const invoiceToken = crypto.randomBytes(32).toString("hex");

//   if (!customerName || customerName.trim().length < 2) {
//     return res.status(400).json({
//       success: false,
//       message: "اسم العميل مطلوب و يجب أن يكون أكثر من حرفين",
//     });
//   }

//   if (!phone || phone.trim().length < 8) {
//     return res.status(400).json({
//       success: false,
//       message: "رقم الهاتف مطلوب و يجب أن يكون أكثر من 8 أرقام",
//     });
//   }

//   if (!items || items.length === 0) {
//     return res.status(400).json({
//       success: false,
//       message: "المنتجات مطلوبة",
//     });
//   }

//   const order = await OrderService.createOrder({ ...req.body, invoiceToken });
//   res.status(201).json({
//     success: true,
//     invoiceToken: order.invoiceToken,
//     orderNumber: order.invoiceNumber,
//     data: order,
//     message: "تم إنشاء الطلب بنجاح",
//   });
// };
export const createOrder = async (req: Request, res: Response) => {
  try {
    const { customerName, phone, items } = req.body;

    const invoiceToken = crypto.randomBytes(32).toString("hex");

    if (!customerName || customerName.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: "اسم العميل مطلوب و يجب أن يكون أكثر من حرفين",
      });
    }

    if (!phone || phone.trim().length < 8) {
      return res.status(400).json({
        success: false,
        message: "رقم الهاتف مطلوب و يجب أن يكون أكثر من 8 أرقام",
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "المنتجات مطلوبة",
      });
    }

    const order = await OrderService.createOrder({
      customerName,
      phone,
      items,
      invoiceToken,
    });

    res.status(201).json({
      success: true,
      invoiceToken: order.invoiceToken,
      orderNumber: order.invoiceNumber,
      data: order,
      message: "تم إنشاء الطلب بنجاح",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء إنشاء الطلب",
    });
  }
};

/**
 * @desc    Update Order Status (Admin)
 * @route   PATCH /api/orders/:id/status
 */
export const updateOrderStatus = async (req: Request, res: Response) => {
  const { status } = req.body;
  const id = req.params.id as string;

  if (!status) {
    return res.status(400).json({
      success: false,
      message: "حالة الطلب مطلوبة",
    });
  }

  const order = await OrderService.updateOrderStatus(id, status);

  res.status(200).json({
    success: true,
    data: order,
    message: "تم تحديث حالة الطلب بنجاح",
  });
};


/**
 * @desc    GET Order (Admin)
 * @route   GET /api/orders
 */
export const getOrders = async (req: Request, res: Response) => {
  const result = await OrderService.getOrders(req.query);

  res.status(200).json({
    success: true,
    data: result,
    message: "تم الحصول على الطلبات بنجاح",
  });
}


/**
 * @desc    Get Order Invoice
 * @route   GET /api/orders/:id/invoice
 */

export const getOrderInvoice = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const invoice = await OrderService.getOrderInvoice(id);

  res.status(200).json({
    success: true,
    data: invoice,
    message: "تم الحصول على الفاتورة بنجاح",
  });
}



export const getOrderInvoicePDF = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const invoice = await OrderService.getOrderInvoice(id);

  generateInvoicePdf(invoice, res);
}