"use client";
import { useEffect, useState } from "react";

export default function History() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/payments");
        if (res.ok) {
          const data = await res.json();
          setHistory(data);
        }
      } catch (err) {
        console.error("Error fetching history:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHistory();
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <h2>Recharge History</h2>
        <p>View all recent recharge payments</p>
      </div>

      <div className="card table">
        <div className="history-row header">
          <span>ID</span>
          <span>User/Email</span>
          <span>Operator</span>
          <span>Amount</span>
          <span>Method</span>
          <span>Date</span>
          <span>Status</span>
        </div>

        {loading ? (
          <p style={{ padding: 12 }}>Loading history...</p>
        ) : history.length === 0 ? (
          <p style={{ padding: 12 }}>No history found.</p>
        ) : (
          history.map((h, i) => (
            <div key={h.id || i} className="history-row">
              <span>{h.id || "-"}</span>
              <span>{h.userEmail || "guest"}</span>
              <span>{h.operator || "-"}</span>
              <span className="price">₹{h.amount || "-"}</span>
              <span className="method">{h.paymentMethod || "-"}</span>
              <span className="date">{h.paymentDate ? new Date(h.paymentDate).toLocaleString() : "-"}</span>
              <span className={`status ${h.status?.toLowerCase()}`}>{h.status || "SUCCESS"}</span>
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        .page {
          color: white;
          padding: 20px;
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

        .card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(16px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          padding: 24px;
          margin-bottom: 20px;
        }

        .table {
          overflow-x: auto;
        }

        .history-row {
          display: grid;
          grid-template-columns: 0.5fr 2.5fr 1fr 1fr 1.5fr 2fr 1fr;
          padding: 16px 12px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          align-items: center;
          font-size: 14px;
          transition: background 0.2s;
          min-width: 900px;
        }

        .history-row:not(.header):hover {
          background: rgba(255, 255, 255, 0.02);
        }

        .header {
          font-weight: 700;
          color: #8b5cf6;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 0.5px;
          background: rgba(0,0,0,0.3);
          border-bottom: 1px solid rgba(255,255,255,0.1);
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

        .method {
          color: #a5b4fc;
          font-weight: 500;
        }

        .date {
          color: #94a3b8;
          font-size: 13px;
        }

        .status {
          font-weight: 600;
          text-transform: capitalize;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 12px;
          display: inline-block;
          width: fit-content;
        }

        .status.success {
          background: rgba(34, 197, 94, 0.15);
          color: #4ade80;
          border: 1px solid rgba(34, 197, 94, 0.2);
        }

        .status.failed {
          background: rgba(239, 68, 68, 0.15);
          color: #f87171;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }
      `}</style>
    </div>
  );
}