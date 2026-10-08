"use client";

import UserLayout from "../components/UserLayout";
import { IoWalletOutline, IoAddCircleOutline, IoSwapVerticalOutline } from "react-icons/io5";

export default function Wallet() {
  return (
    <UserLayout title="My Wallet">
      <div className="wallet-container">
        <p className="subtitle">Manage your funds and wallet history</p>

        <div className="wallet-grid">
          {/* Balance Card */}
          <div className="balance-card">
            <div className="glow"></div>
            <div className="balance-info">
              <span className="label">Available Balance</span>
              <h2>₹ 245.00</h2>
            </div>
            <IoWalletOutline className="bg-icon" />
            
            <div className="actions">
              <button className="btn-primary">
                <IoAddCircleOutline size={20} /> Add Money
              </button>
              <button className="btn-secondary">
                <IoSwapVerticalOutline size={20} /> Send to Bank
              </button>
            </div>
          </div>

          {/* Recent Wallet Activity */}
          <div className="activity-card card">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              <div className="activity-item">
                <div className="icon-box add"><IoAddCircleOutline size={20}/></div>
                <div className="activity-details">
                  <span className="title">Added via UPI</span>
                  <span className="date">12 Apr 2025, 09:00 AM</span>
                </div>
                <div className="amount positive">+ ₹500.00</div>
              </div>
              <div className="activity-item">
                <div className="icon-box minus"><IoSwapVerticalOutline size={20}/></div>
                <div className="activity-details">
                  <span className="title">Paid for Recharge</span>
                  <span className="date">12 Apr 2025, 10:24 AM</span>
                </div>
                <div className="amount negative">- ₹199.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .subtitle {
          color: #94a3b8;
          font-size: 14px;
          margin-bottom: 24px;
        }

        .wallet-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .balance-card {
          background: linear-gradient(135deg, #4f46e5, #9333ea);
          border-radius: 24px;
          padding: 40px;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 250px;
        }

        .glow {
          position: absolute;
          top: -50px;
          right: -50px;
          width: 200px;
          height: 200px;
          background: rgba(255,255,255,0.1);
          border-radius: 50%;
          filter: blur(40px);
        }

        .bg-icon {
          position: absolute;
          right: -20px;
          bottom: -20px;
          font-size: 180px;
          color: rgba(255,255,255,0.05);
          transform: rotate(-15deg);
        }

        .balance-info {
          position: relative;
          z-index: 1;
        }

        .label {
          color: rgba(255,255,255,0.8);
          font-size: 16px;
        }

        h2 {
          color: white;
          font-size: 48px;
          font-weight: 800;
          margin: 8px 0 0 0;
        }

        .actions {
          display: flex;
          gap: 16px;
          position: relative;
          z-index: 1;
          margin-top: 40px;
        }

        .actions button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
          border: none;
        }

        .btn-primary {
          background: white;
          color: #4f46e5;
        }

        .btn-primary:hover {
          background: #f1f5f9;
        }

        .btn-secondary {
          background: rgba(0,0,0,0.2);
          color: white;
        }

        .btn-secondary:hover {
          background: rgba(0,0,0,0.3);
        }

        .card {
          background: #11131c;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 20px;
          padding: 30px;
        }

        .activity-card h3 {
          margin: 0 0 24px 0;
          color: white;
          font-size: 18px;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .activity-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .activity-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .icon-box {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-box.add {
          background: rgba(34, 197, 94, 0.1);
          color: #4ade80;
        }

        .icon-box.minus {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        .activity-details {
          flex: 1;
          margin-left: 16px;
          display: flex;
          flex-direction: column;
        }

        .title {
          color: white;
          font-weight: 500;
          font-size: 15px;
        }

        .date {
          color: #94a3b8;
          font-size: 13px;
          margin-top: 4px;
        }

        .amount {
          font-weight: 600;
          font-size: 16px;
        }

        .positive { color: #4ade80; }
        .negative { color: #ef4444; }

        @media (max-width: 900px) {
          .wallet-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </UserLayout>
  );
}
