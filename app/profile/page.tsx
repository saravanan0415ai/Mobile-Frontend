"use client";

import UserLayout from "../components/UserLayout";
import { IoPersonOutline, IoMailOutline, IoCallOutline } from "react-icons/io5";

export default function Profile() {
  return (
    <UserLayout title="Profile">
      <div className="profile-container">
        <div className="card profile-card">
          <div className="avatar-large">
            <IoPersonOutline size={48} />
          </div>
          <h2>Saravanan M</h2>
          <p className="role-badge">Premium User</p>

          <div className="details-grid">
            <div className="detail-item">
              <IoMailOutline className="icon" />
              <div>
                <span className="label">Email Address</span>
                <span className="value">saravanan@example.com</span>
              </div>
            </div>
            <div className="detail-item">
              <IoCallOutline className="icon" />
              <div>
                <span className="label">Mobile Number</span>
                <span className="value">+91 98765 43210</span>
              </div>
            </div>
          </div>

          <button className="edit-btn">Edit Profile</button>
        </div>
      </div>

      <style jsx>{`
        .profile-container {
          display: flex;
          justify-content: center;
          padding-top: 40px;
        }

        .profile-card {
          width: 100%;
          max-width: 500px;
          background: #11131c;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 20px;
          padding: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .avatar-large {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: rgba(168, 85, 247, 0.2);
          border: 2px solid #a855f7;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a855f7;
          margin-bottom: 20px;
        }

        h2 {
          color: white;
          margin: 0 0 8px 0;
          font-size: 24px;
        }

        .role-badge {
          background: rgba(168, 85, 247, 0.2);
          color: #d946ef;
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 40px;
        }

        .details-grid {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 40px;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 12px;
        }

        .icon {
          font-size: 24px;
          color: #94a3b8;
        }

        .detail-item div {
          display: flex;
          flex-direction: column;
        }

        .label {
          font-size: 12px;
          color: #94a3b8;
        }

        .value {
          font-size: 15px;
          color: white;
          font-weight: 500;
        }

        .edit-btn {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          background: linear-gradient(90deg, #8b5cf6, #d946ef);
          color: white;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: 0.2s;
        }

        .edit-btn:hover {
          opacity: 0.9;
        }
      `}</style>
    </UserLayout>
  );
}
