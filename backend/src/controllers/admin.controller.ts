import { Request, Response } from "express";
import Admin from "../models/Admin.model";
import { generateAccessToken , generateRefreshToken } from "../utils/generateToken";
import jwt from "jsonwebtoken";

/**
 * Register Admin (مرة واحدة غالباً)
 */
export const registerAdmin = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const exists = await Admin.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "الأدمن موجود بالفعل" });
  }

  await Admin.create({ name, email, password });

  res.status(201).json({
    success: true,
    message: "تم إنشاء الأدمن بنجاح",
  });
};

/**
 * Login Admin
 */


export const loginAdmin = async (req: Request, res: Response) => {

  const { email, password } = req.body;

  const admin = await Admin.findOne({ email }).select("+password");

  if (!admin || !(await admin.comparePassword(password))) {
    return res.status(401).json({ message: "بيانات غير صحيحة" });
  }

  const accessToken = generateAccessToken(admin._id.toString());
  const refreshToken = generateRefreshToken(admin._id.toString());

  admin.refreshToken = refreshToken;
  await admin.save();

  res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({
      accessToken,
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });
};


export const refreshToken = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (!token) return res.status(401).json({ message: "غير مصرح" });

  const decoded: any = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);

  const admin = await Admin.findById(decoded.id).select("+refreshToken");

  if (!admin || admin.refreshToken !== token) {
    return res.status(401).json({ message: "توكن غير صالح" });
  }

  const newAccessToken = generateAccessToken(admin._id.toString());

  res.json({ accessToken: newAccessToken });
};


export const logoutAdmin = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (token) {
    const admin = await Admin.findOne({ refreshToken: token });
    if (admin) {
      admin.refreshToken = null;
      await admin.save();
    }
  }

  res.clearCookie("refreshToken").json({ success: true });
};
