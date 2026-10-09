"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoShieldCheckmarkOutline, IoFlashOutline, IoHeadsetOutline, IoLogoGoogle, IoLogoApple } from "react-icons/io5";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [toast, setToast] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      localStorage.removeItem("guest");
    }
  }, []);

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
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080") + "/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const user = await res.json();
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.removeItem("guest");
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

  return (
    <div className="split-layout">
      {/* Background Synthwave */}
      <div className="bg-synthwave"></div>

      {toast && <div className="toast-msg">{toast}</div>}

      {/* Left Content */}
      <div className="left-section">
        <div className="brand">
          <IoFlashOutline size={28} color="#a855f7" />
          <span className="brand-name">RechargeX</span>
          <span className="brand-tag">Fast | Secure | Anytime</span>
        </div>

        <div className="hero-text">
          <h1>Stay Connected</h1>
          <h1 className="highlight">Always</h1>
          <p>
            Recharge your mobile, pay your bills,<br/>
            with just a few clicks. Simple. Secure. Fast.
          </p>
        </div>

        <div className="features">
          <div className="feature">
            <div className="icon-box"><IoFlashOutline size={24}/></div>
            <span>Instant<br/>Recharge</span>
          </div>
          <div className="feature">
            <div className="icon-box"><IoShieldCheckmarkOutline size={24}/></div>
            <span>Secure<br/>Payments</span>
          </div>
          <div className="feature">
            <div className="icon-box"><IoHeadsetOutline size={24}/></div>
            <span>24/7<br/>Support</span>
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="right-section">
        <div className="login-card">
          <div className="card-header">
            <h3>Welcome Back 👋</h3>
            <p>Login to your account</p>
          </div>

          <div className="input-group">
            <input 
              type="email" 
              placeholder="Mobile Number / Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="primary-btn" onClick={handleLogin}>
            Login
          </button>

          <div className="divider">
            <span>or continue with</span>
          </div>

          <div className="social-login">
            <button className="social-btn"><IoLogoGoogle size={20}/></button>
            <button className="social-btn"><IoLogoApple size={20}/></button>
          </div>

          <p className="signup-link">
            Don't have an account? <span onClick={() => router.push("/signup")}>Sign Up</span>
          </p>

          <p className="signup-link" style={{ marginTop: '12px' }}>
            Just exploring? <span onClick={() => { localStorage.setItem("guest", "true"); router.push("/plans"); }}>Continue as Guest</span>
          </p>
        </div>

        {/* Floating Phone Graphic */}
        <div className="floating-phone">
          <div className="phone-screen">
            <IoFlashOutline size={60} color="#fff" />
          </div>
          <div className="glow-orb"></div>
        </div>
      </div>

      <style jsx>{`
        .split-layout {
          min-height: 100vh;
          display: flex;
          position: relative;
          color: white;
          overflow: hidden;
          background: #09090e;
        }

        .bg-synthwave {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 70% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 30% 80%, rgba(139, 92, 246, 0.2) 0%, transparent 40%);
          z-index: 0;
        }

        .left-section, .right-section {
          flex: 1;
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          padding: 40px 60px;
        }

        .right-section {
          align-items: center;
          justify-content: center;
        }

        /* BRAND */
        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 80px;
        }

        .brand-name {
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .brand-tag {
          font-size: 12px;
          color: #94a3b8;
          border-left: 1px solid rgba(255,255,255,0.2);
          padding-left: 12px;
          margin-left: 4px;
        }

        /* HERO TEXT */
        .hero-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .hero-text h1 {
          font-size: 64px;
          font-weight: 800;
          line-height: 1.1;
          margin: 0;
          letter-spacing: -1px;
        }

        .hero-text .highlight {
          background: linear-gradient(90deg, #a855f7, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-text p {
          margin-top: 24px;
          font-size: 18px;
          color: #94a3b8;
          line-height: 1.6;
        }

        /* FEATURES */
        .features {
          display: flex;
          gap: 40px;
          margin-top: 60px;
          margin-bottom: 40px;
        }

        .feature {
          display: flex;
          flex-direction: column;
          gap: 12px;
          font-size: 14px;
          color: #cbd5e1;
          font-weight: 500;
        }

        .icon-box {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a855f7;
        }

        /* LOGIN CARD */
        .login-card {
          background: rgba(20, 20, 30, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          padding: 40px;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          z-index: 2;
        }

        .card-header h3 {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .card-header p {
          font-size: 14px;
          color: #94a3b8;
          margin-bottom: 30px;
        }

        .input-group {
          margin-bottom: 16px;
        }

        .input-group input {
          width: 100%;
          background: rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 16px;
          color: white;
          font-size: 14px;
          transition: 0.3s;
          box-sizing: border-box;
        }

        .input-group input:focus {
          outline: none;
          border-color: #a855f7;
          box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.2);
        }

        .primary-btn {
          width: 100%;
          padding: 16px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(90deg, #8b5cf6, #d946ef);
          color: white;
          font-weight: 600;
          font-size: 16px;
          margin-top: 10px;
          cursor: pointer;
          transition: 0.3s;
          box-shadow: 0 10px 20px rgba(168, 85, 247, 0.3);
        }

        .primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(168, 85, 247, 0.5);
        }

        .divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 30px 0;
          color: #64748b;
          font-size: 12px;
        }

        .divider::before, .divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .divider span {
          padding: 0 10px;
        }

        .social-login {
          display: flex;
          gap: 16px;
          justify-content: center;
          margin-bottom: 30px;
        }

        .social-btn {
          width: 60px;
          height: 48px;
          border-radius: 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: 0.3s;
        }

        .social-btn:hover {
          background: rgba(255,255,255,0.1);
        }

        .signup-link {
          text-align: center;
          font-size: 13px;
          color: #94a3b8;
        }

        .signup-link span {
          color: #a855f7;
          font-weight: 600;
          cursor: pointer;
        }

        /* FLOATING PHONE */
        .floating-phone {
          position: absolute;
          right: -80px;
          top: 50%;
          transform: translateY(-50%) rotate(15deg);
          width: 260px;
          height: 520px;
          background: #000;
          border-radius: 40px;
          border: 8px solid #1a1a24;
          box-shadow: -20px 20px 60px rgba(0,0,0,0.8), inset 0 0 20px rgba(168, 85, 247, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
          animation: floatPhone 6s ease-in-out infinite;
        }

        .phone-screen {
          position: absolute;
          inset: 0;
          border-radius: 32px;
          background: linear-gradient(135deg, rgba(168,85,247,0.4), rgba(0,0,0,0.8));
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        .phone-screen::after {
          content: "";
          position: absolute;
          inset: 0;
          background: url("https://www.transparenttextures.com/patterns/stardust.png");
          opacity: 0.3;
        }

        .glow-orb {
          position: absolute;
          width: 150px;
          height: 150px;
          background: #a855f7;
          border-radius: 50%;
          filter: blur(60px);
          z-index: -1;
        }

        @keyframes floatPhone {
          0%, 100% { transform: translateY(-50%) rotate(15deg); }
          50% { transform: translateY(-55%) rotate(12deg); }
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

        @media (max-width: 900px) {
          .split-layout { flex-direction: column; }
          .left-section, .right-section { padding: 30px 20px; }
          .floating-phone { display: none; }
          .brand { margin-bottom: 40px; }
          .hero-text h1 { font-size: 48px; }
          .features { flex-direction: column; gap: 20px; }
        }
      `}</style>
    </div>
  );
}
