"use client";
import { useState, useEffect } from "react";

export default function Plans() {
  const [plans, setPlans] = useState<any[]>([]);
  const [form, setForm] = useState({ price: "", data: "", validity: "" });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("plans") || "[]");
    setPlans(stored);
  }, []);

  const savePlans = (data: any[]) => {
    localStorage.setItem("plans", JSON.stringify(data));
    setPlans(data);
  };

  const addPlan = () => {
    if (!form.price || !form.data || !form.validity) return;
    const newPlan = { ...form, id: Date.now() };
    savePlans([...plans, newPlan]);
    setForm({ price: "", data: "", validity: "" });
  };

  const deletePlan = (id: number) => {
    savePlans(plans.filter((p) => p.id !== id));
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>Plan Management</h2>
        <p>Add or remove recharge plans</p>
      </div>

      <div className="card form-grid">
        <input
          placeholder="Price (₹)"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          placeholder="Data (e.g., 2GB/day)"
          value={form.data}
          onChange={(e) => setForm({ ...form, data: e.target.value })}
        />
        <input
          placeholder="Validity (e.g., 28 Days)"
          value={form.validity}
          onChange={(e) => setForm({ ...form, validity: e.target.value })}
        />

        <button onClick={addPlan}>Add Plan</button>
      </div>

      <div className="card table">
        <div className="row header">
          <span>Price</span>
          <span>Data</span>
          <span>Validity</span>
          <span>Actions</span>
        </div>

        {plans.length === 0 ? (
          <p style={{ padding: 12 }}>No custom plans found.</p>
        ) : (
          plans.map((p) => (
            <div key={p.id} className="row">
              <span className="price">₹{p.price}</span>
              <span>{p.data}</span>
              <span>{p.validity}</span>
              <div className="actions">
                <button className="delete" onClick={() => deletePlan(p.id)}>
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
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .form-grid input {
          padding: 14px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          color: white;
          font-size: 14px;
          transition: 0.3s;
        }

        .form-grid input:focus {
          outline: none;
          border-color: #8b5cf6;
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
          background: rgba(255, 255, 255, 0.1);
        }

        .form-grid button {
          grid-column: span 3;
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

        .price {
          font-weight: 700;
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
          padding: 4px 8px;
          border-radius: 8px;
          text-align: center;
          width: fit-content;
        }

        @media (max-width: 800px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          .form-grid button {
            grid-column: span 1;
          }
        }
      `}</style>
    </div>
  );
}