"use client";

import { useRouter } from "next/navigation";
import { IoArrowBack, IoLogOutOutline } from "react-icons/io5";
import Image from "next/image";

export default function Operator() {
  const router = useRouter();

  const operators = [
    { id: "jio", img: "/jio.png" },
    { id: "airtel", img: "/airtel.png" },
    { id: "vi", img: "/vi.png" },
    { id: "bsnl", img: "/bsnl.png" },
  ];

  const handleSelect = (id: string) => {
    localStorage.setItem("operator", id);
    router.push("/plans");
  };

  return (
    <div className="wrapper">
      {/* Background Image */}
      <div className="bg-layer" />

      <header className="nav">
        <button onClick={() => router.back()} className="nav-btn">
          <IoArrowBack />
        </button>

        <h2 className="title">Select Operator</h2>

        <button onClick={() => router.push("/")} className="nav-btn">
          <IoLogOutOutline />
        </button>
      </header>

      <main className="container">
        <p className="subtitle">
          Choose your network provider to continue
        </p>

        <div className="grid">
          {operators.map((op) => (
            <button
              key={op.id}
              className="card"
              onClick={() => handleSelect(op.id)}
            >
              <div className="logo-box">
                <Image
                  src={op.img}
                  alt={op.id}
                  width={70}
                  height={70}
                />
              </div>
            </button>
          ))}
        </div>
      </main>

      <style jsx>{`
        .wrapper {
          min-height: 100vh;
          position: relative;
          color: #fff;
          font-family: var(--font-geist-sans), sans-serif;
          overflow-x: hidden;
        }

        /* 🌌 UNIQUE ANIMATED BACKGROUND */
        .bg-layer {
          position: fixed;
          inset: 0;
          background: radial-gradient(circle at 15% 50%, #1e1b4b, #000 60%),
                      radial-gradient(circle at 85% 30%, #312e81, #000 60%);
          z-index: -2;
        }

        .bg-layer::after {
          content: "";
          position: absolute;
          inset: 0;
          background: url("https://www.transparenttextures.com/patterns/stardust.png");
          opacity: 0.2;
          z-index: -1;
        }

        /* 🔝 NAVBAR */
        .nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          background: linear-gradient(to bottom, rgba(0,0,0,0.8), transparent);
        }

        .nav-btn {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: 0.3s;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }

        .nav-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }

        .title {
          font-size: 1.25rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }

        /* 📦 Main */
        .container {
          max-width: 550px;
          margin: auto;
          padding: 2rem 1.5rem;
          text-align: center;
        }

        .subtitle {
          color: #94a3b8;
          margin-bottom: 2.5rem;
          font-size: 1.05rem;
        }

        /* 🧱 Grid */
        .grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        /* 🧊 UNIQUE CARD DESIGN */
        .card {
          border-radius: 20px;
          padding: 25px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card:hover {
          transform: translateY(-5px) scale(1.02);
          border-color: rgba(99, 102, 241, 0.4);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4), 0 0 20px rgba(99, 102, 241, 0.2);
          background: rgba(255, 255, 255, 0.06);
        }

        .logo-box {
          background: rgba(255, 255, 255, 0.9);
          border-radius: 16px;
          padding: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          transition: transform 0.3s;
        }

        .card:hover .logo-box {
          transform: scale(1.1);
        }

        /* 📱 Mobile */
        @media (max-width: 480px) {
          .grid {
            gap: 16px;
          }

          .card {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
}