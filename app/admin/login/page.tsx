"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import data from "../../data/data.json";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

const handleLogin = async () => {
  if (!email || !password) {
    showToast("Please fill all fields");
    return;
  }

  try {
    const res = await fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const user = await res.json();
      
      // Save user
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.removeItem("guest");

      // 🔀 ROLE BASED REDIRECT
      if (user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } else {
      showToast("Invalid credentials");
    }
  } catch (error) {
    console.error("Login failed:", error);
    showToast("Server error. Try again.");
  }
};

  const handleGuest = () => {
  localStorage.setItem("guest", "true");
  localStorage.removeItem("user");
  router.push("/operator");
};

  return (
    <div className="login-bg d-flex align-items-center justify-content-center vh-100 px-3">
      {/* Toast */}
      {toast && <div className="toast-msg">{toast}</div>}

      <div className="glass-card p-4 w-100" style={{ maxWidth: "380px" }}>
        {/* Title */}
        <div className="text-center mb-4">
          <h2 className="fw-bold text-white">Admin Login</h2>
          <p className="small text-light opacity-75">
            Secure panel access
          </p>
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label text-light">Email</label>
          <input
            type="email"
            className="form-control glass-input rounded-3"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-2">
          <label className="form-label text-light">Password</label>
          <input
            type="password"
            className="form-control glass-input rounded-3"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="btn glass-btn w-100 rounded-3 mt-3"
        >
          Login to Dashboard
        </button>

        {/* Footer */}
        <div className="text-center mt-4">
          <small className="text-light opacity-75">
            Admin access only. {" "}
            <span
              onClick={() => router.push("/")}
              style={{ cursor: "pointer", textDecoration: "underline", color: "#a5b4fc" }}
            >
              Return Home
            </span>
          </small>
        </div>
      </div>

      <style jsx>{`
        .login-bg {
          min-height: 100vh;
          background: radial-gradient(circle at top left, #312e81, #000 70%),
                      radial-gradient(circle at bottom right, #4c1d95, #000 70%);
          position: relative;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .login-bg::after {
          content: "";
          position: absolute;
          inset: 0;
          background: url("https://www.transparenttextures.com/patterns/stardust.png");
          opacity: 0.15;
          z-index: 0;
        }

        .login-bg > * {
          position: relative;
          z-index: 1;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(16px);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transform: translateY(0);
          animation: slideUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
          padding: 30px;
          width: 100%;
          max-width: 400px;
          margin: auto;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .glass-input {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          padding: 12px 15px;
          transition: all 0.3s;
          width: 100%;
          margin-top: 8px;
          margin-bottom: 15px;
          border-radius: 8px;
          box-sizing: border-box;
        }

        .glass-input::placeholder {
          color: rgba(255,255,255,0.4);
        }

        .glass-input:focus {
          outline: none;
          background: rgba(255,255,255,0.08);
          border-color: #8b5cf6;
          box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.15);
        }

        .glass-btn {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          border: none;
          padding: 14px;
          font-weight: 600;
          letter-spacing: 0.5px;
          transition: all 0.3s;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
          width: 100%;
          border-radius: 12px;
          cursor: pointer;
        }

        .glass-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
        }

        .toast-msg {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(239, 68, 68, 0.9);
          padding: 12px 24px;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          z-index: 100;
        }
      `}</style>
    </div>
  );
}