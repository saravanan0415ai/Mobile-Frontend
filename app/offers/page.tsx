"use client";

import UserLayout from "../components/UserLayout";
import { IoFlashOutline, IoGiftOutline } from "react-icons/io5";

export default function Offers() {
  const offers = [
    { title: "Flat ₹50 Cashback", desc: "On your first recharge of the month via UPI.", code: "FIRST50" },
    { title: "20% Off on Annual Plans", desc: "Save big on Jio & Airtel annual subscriptions.", code: "YEAR20" },
    { title: "Win up to ₹500", desc: "Scratch card on recharges above ₹299.", code: "No code required" },
  ];

  return (
    <UserLayout title="Offers & Rewards">
      <div className="offers-container">
        <p className="subtitle">Exclusive deals just for you</p>

        <div className="offers-grid">
          {offers.map((offer, idx) => (
            <div key={idx} className="offer-card">
              <div className="icon-wrapper">
                <IoGiftOutline size={32} />
              </div>
              <div className="offer-content">
                <h3>{offer.title}</h3>
                <p>{offer.desc}</p>
                <div className="coupon-code">
                  Code: <strong>{offer.code}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .subtitle {
          color: #94a3b8;
          font-size: 14px;
          margin-bottom: 24px;
        }

        .offers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }

        .offer-card {
          background: #11131c;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 20px;
          padding: 24px;
          display: flex;
          align-items: flex-start;
          gap: 20px;
          transition: 0.2s;
        }

        .offer-card:hover {
          border-color: #a855f7;
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
        }

        .icon-wrapper {
          width: 60px;
          height: 60px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(168,85,247,0.2), rgba(236,72,153,0.2));
          color: #d946ef;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .offer-content h3 {
          color: white;
          margin: 0 0 8px 0;
          font-size: 18px;
        }

        .offer-content p {
          color: #94a3b8;
          font-size: 14px;
          margin: 0 0 16px 0;
          line-height: 1.5;
        }

        .coupon-code {
          display: inline-block;
          background: rgba(255,255,255,0.05);
          border: 1px dashed rgba(255,255,255,0.2);
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 13px;
          color: #cbd5e1;
        }
        
        .coupon-code strong {
          color: #a855f7;
          font-family: monospace;
          font-size: 14px;
        }
      `}</style>
    </UserLayout>
  );
}
