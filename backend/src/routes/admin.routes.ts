import express from "express";
import { loginAdmin , registerAdmin , refreshToken , logoutAdmin } from "../controllers/admin.controller";

const router = express.Router();


router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/refresh", refreshToken);
router.post("/logout", logoutAdmin);


export default router;