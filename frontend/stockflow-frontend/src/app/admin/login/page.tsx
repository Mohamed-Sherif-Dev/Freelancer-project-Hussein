"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/src/services/auth.service";



export default function AdminLoginPage () {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");



  
const handleLogin = async () => {
  if (!email || !password) {
    setError("ادخل البريد الإلكتروني وكلمة المرور");
    return;
  }

  try {
    setLoading(true);
    setError("");

    const res = await loginAdmin({ email, password });
    // ✅ دخول الداشبورد
    router.push("/admin/dashboard");

  } catch (error) {
    setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
  } finally {
    setLoading(false);
  }
};


    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4">
                <h2 className="text-2xl font-bold text-center">تسجيل دخول الادمن</h2>

                {error && (
                    <p className="bg-red-100 text-red-500 p-2 rounded text-sm">
                        {error}
                    </p>
                )}

                <input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="كلمة المرور"
                    className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="bg-primary text-white px-6 py-2 rounded-xl hover:opacity-90 transition"
                    onClick={handleLogin}
                    disabled={loading}
                >
                    {loading ? "جاري التسجيل..." : "تسجيل دخول"}
                </button>
            </div>
        </div>
    )
}