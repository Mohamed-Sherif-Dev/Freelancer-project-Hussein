import PDFDocument from "pdfkit";
import path from "path";

export const generateInvoicePdf = async (invoice: any, res: any) => {
  const doc = new PDFDocument({ margin: 40, size: "A4" });

  const fontPath = path.join(
    __dirname,
    "../assets/fonts/Cairo-Regular.ttf"
  );

  doc.registerFont("arabic", fontPath);
  doc.font("arabic");

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "inline; filename=invoice.pdf");

  doc.pipe(res);

  // Header
  doc.fontSize(20).text("StockFlow", { align: "center" });
  doc.moveDown(0.3);
  doc.fontSize(14).text("فاتورة بيع", { align: "center" });
  doc.moveDown();

  // Info
  doc.fontSize(12);
  doc.text(`رقم الفاتورة: INV-${String(invoice.invoiceNumber).padStart(5, "0")}`);
  doc.text(`اسم العميل: ${invoice.customerName}`);
  doc.text(`رقم الهاتف: ${invoice.phone}`);
  doc.text(`التاريخ: ${new Date().toLocaleDateString("ar-EG")}`);

  doc.moveDown();
  doc.text("────────────────────────");

  // Products
  invoice.items.forEach((item: any) => {
    doc.text(
      `${item.name} | ${item.quantity} × ${item.price} = ${item.total}`
    );
  });

  doc.text("────────────────────────");
  doc.moveDown();

  // Total
  doc
    .fontSize(14)
    .text(`الإجمالي الكلي: ${invoice.totalPrice} جنيه`, {
      align: "right",
    });

  doc.moveDown(2);
  doc.fontSize(10).text("شكراً لتعاملكم مع StockFlow", { align: "center" });

  doc.end();
};
