"use client";

import { useEffect, useState } from "react";
import UserLayout from "../components/UserLayout";

export default function History() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      let backendTxns: any[] = [];
      try {
        const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080") + "/api/payments");
        if (res.ok) {
          const data = await res.json();
          backendTxns = data.map((txn: any) => ({
            id: `TXN${txn.id.toString().padStart(8, '0')}`,
            mobile: txn.userEmail || "guest",
            operator: txn.operator,
            plan: `₹${txn.amount} Plan`,
            amount: `₹${txn.amount}`,
            date: new Date(txn.paymentDate).toLocaleString(),
            status: txn.status === "SUCCESS" ? "Success" : "Failed"
          }));
        }
      } catch (err) {
        console.log("Backend not available, checking local storage.");
      }

      // Check local storage for mock transactions
      const localTxnsStr = localStorage.getItem("mockTransactions");
      const localTxns = localTxnsStr ? JSON.parse(localTxnsStr) : [];

      // Combine and deduplicate if necessary, or just show both. 
      // Assuming localTxns has the exact same structure.
      const combined = [...backendTxns, ...localTxns];
      
      // Sort by date descending (rough sort if date is parsable)
      combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setTransactions(combined);
      setLoading(false);
    }
    fetchTransactions();
  }, []);

  return (
    <UserLayout title="Transactions">
      <div className="history-container">
        <p className="subtitle">View your past recharges and payments</p>

        <div className="history-card card">
          <div className="table">
            <div className="tr th">
              <div>Transaction ID</div>
              <div>Mobile Number</div>
              <div>Operator / Plan</div>
              <div>Amount</div>
              <div>Date</div>
              <div>Status</div>
            </div>
            
            {loading ? (
              <div className="tr" style={{ justifyContent: "center" }}>Loading...</div>
            ) : transactions.length === 0 ? (
              <div className="tr" style={{ justifyContent: "center" }}>No transactions found.</div>
            ) : (
              transactions.map((txn, idx) => (
                <div key={idx} className="tr">
                  <div className="txn-id">{txn.id}</div>
                  <div>{txn.mobile}</div>
                  <div>
                    <span className={`op-badge ${(txn.operator || "jio").toLowerCase()}`}>{txn.operator || "Jio"}</span>
                    <span className="plan-name">{txn.plan}</span>
                  </div>
                  <div className="amount">{txn.amount}</div>
                  <div className="date">{txn.date}</div>
                  <div>
                    <span className={`status ${(txn.status || "success").toLowerCase()}`}>{txn.status || "Success"}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .subtitle {
          color: #94a3b8;
          font-size: 14px;
          margin-bottom: 24px;
        }

        .card {
          background: #11131c;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 20px;
          padding: 24px;
          overflow-x: auto;
        }

        .table {
          display: flex;
          flex-direction: column;
          min-width: 800px;
        }

        .tr {
          display: grid;
          grid-template-columns: 1.5fr 1.5fr 2fr 1fr 1.5fr 1fr;
          padding: 20px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          align-items: center;
          font-size: 14px;
          color: #e2e8f0;
        }

        .tr:last-child {
          border-bottom: none;
        }

        .tr.th {
          color: #94a3b8;
          font-size: 12px;
          text-transform: uppercase;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding-top: 0;
          font-weight: 600;
        }

        .txn-id {
          font-family: monospace;
          color: #94a3b8;
        }

        .op-badge {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: bold;
          margin-right: 8px;
        }
        
        .op-badge.jio { background: rgba(59, 130, 246, 0.1); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.2); }
        .op-badge.airtel { background: rgba(239, 68, 68, 0.1); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.2); }
        .op-badge.vi { background: rgba(249, 115, 22, 0.1); color: #fb923c; border: 1px solid rgba(249, 115, 22, 0.2); }

        .plan-name {
          color: #cbd5e1;
        }

        .amount {
          font-weight: 600;
          font-size: 15px;
        }

        .date {
          color: #94a3b8;
          font-size: 13px;
        }

        .status {
          padding: 6px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }

        .status.success {
          background: rgba(34, 197, 94, 0.1);
          color: #4ade80;
          border: 1px solid rgba(34, 197, 94, 0.2);
        }

        .status.failed {
          background: rgba(239, 68, 68, 0.1);
          color: #f87171;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }
      `}</style>
    </UserLayout>
  );
}
