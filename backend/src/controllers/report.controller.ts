import { Request, Response } from "express";
import * as ReportService from "../services/report.service";

export const getDailyReport = async (req: Request, res: Response) => {
  const { date } = req.query;

  const report = await ReportService.getDailyReport(date as string);

  res.status(200).json({
    success: true,
    data: report,
  });
};


export const getBestSellingProducts = async (req: Request, res: Response) => {
  const data = await ReportService.getBestSellingProducts();

  res.status(200).json({
    success: true,
    data,
    message: "تم الحصول على المنتجات المبيعة بنجاح",
  });
}



export const getDashboardSummary = async (req: Request, res: Response) => {
  const summary = await ReportService.getDashboardSummary();

  res.status(200).json({
    success: true,
    data: summary,
    message: "تم الحصول على الملخص بنجاح",
  });
};