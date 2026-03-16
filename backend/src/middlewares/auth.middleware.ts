// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import Admin from "../models/Admin.model";

// interface JwtPayload {
//   id: string;
// }

// /**
//  * Protect Admin Routes
//  */
// export const protectAdmin = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   let token: string | undefined;

//   // 1️⃣ Check Authorization Header
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   }

//   // 2️⃣ No Token
//   if (!token) {
//     res.status(401);
//     return next(new Error("غير مصرح لك، التوكن غير موجود"));
//   }

//   try {
//     // 3️⃣ Verify Token
//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_ACCESS_SECRET! as string
//     ) as JwtPayload;

//     // 4️⃣ Get Admin From DB
//     const admin = await Admin.findById(decoded.id).select("-password");

//     if (!admin) {
//       res.status(401);
//       return next(new Error("غير مصرح لك، الأدمن غير موجود"));
//     }

//     // 5️⃣ Attach Admin To Request
//     (req as any).admin = admin;

//     next();
//   } catch (error) {
//     res.status(401);
//     next(new Error("توكن غير صالح أو منتهي"));
//   }
// };


import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.model";

interface JwtPayload {
  id: string;
}

export const protectAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string | undefined;

  // ✅ 1) From Authorization Header (Postman / Fetch)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // ✅ 2) From Query String (PDF open)
  if (!token && req.query.token) {
    token = String(req.query.token);
  }

  // ❌ No token at all
  if (!token) {
    res.status(401);
    return next(new Error("غير مصرح لك، التوكن غير موجود"));
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET!
    ) as JwtPayload;

    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      res.status(401);
      return next(new Error("غير مصرح لك، الأدمن غير موجود"));
    }

    (req as any).admin = admin;

    next();
  } catch {
    res.status(401);
    next(new Error("توكن غير صالح أو منتهي"));
  }
};