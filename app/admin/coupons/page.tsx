"use client";
import { useState, useEffect } from "react";

export default function Coupons() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [code, setCode] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("coupons") || "[]");
    setCoupons(stored);
  }, []);

  const saveCoupons = (updated: any[]) => {
    localStorage.setItem("coupons", JSON.stringify(updated));
    setCoupons(updated);
  };

  const addCoupon = () => {
    if (!code) return;
    const updated = [...coupons, { id: Date.now(), code: code.toUpperCase() }];
    saveCoupons(updated);
    setCode("");
  };

  const deleteCoupon = (id: number) => {
    saveCoupons(coupons.filter(c => c.id !== id));
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>Coupon Codes</h2>
        <p>Create and manage discount codes</p>
      </div>

      <div className="card form-grid">
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter Coupon Code (e.g., SAVE50)"
        />
        <button onClick={addCoupon}>Add Coupon</button>
      </div>

      <div className="card table">
        <div className="row header" style={{ gridTemplateColumns: "1fr auto" }}>
          <span>Code</span>
          <span>Actions</span>
        </div>

        {coupons.length === 0 ? (
          <p style={{ padding: 12 }}>No coupons created yet.</p>
        ) : (
          coupons.map((c, i) => (
            <div key={c.id || i} className="row" style={{ gridTemplateColumns: "1fr auto" }}>
              <span className="code-text">{c.code}</span>
              <div className="actions">
                <button className="delete" onClick={() => deleteCoupon(c.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        .page {
          color: white;
        }

        .page-header {
          margin-bottom: 25px;
        }

        .page-header h2 {
          font-size: 1.8rem;
          margin-bottom: 8px;
          font-weight: 700;
          letter-spacing: -0.5px;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }

        .page-header p {
          color: #94a3b8;
          font-size: 1rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 16px;
        }

        .form-grid input {
          padding: 14px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          color: white;
          font-size: 14px;
          text-transform: uppercase;
          transition: 0.3s;
        }

        .form-grid input:focus {
          outline: none;
          border-color: #8b5cf6;
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
          background: rgba(255, 255, 255, 0.1);
        }

        .form-grid button {
          padding: 14px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none;
          border-radius: 12px;
          color: white;
          font-weight: 600;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
        }

        .form-grid button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
        }

        .code-text {
          font-family: monospace;
          font-size: 16px;
          letter-spacing: 1px;
          color: #a5b4fc;
          font-weight: bold;
          background: rgba(255,255,255,0.05);
          padding: 6px 12px;
          border-radius: 8px;
          border: 1px dashed rgba(255,255,255,0.2);
          display: inline-block;
          width: fit-content;
        }

        @media (max-width: 600px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}