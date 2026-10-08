"use client";
import { IoPeopleOutline, IoSwapVerticalOutline, IoWalletOutline } from "react-icons/io5";

export default function Admin() {
  return (
    <div className="admin-dashboard">
      <div className="header">
        <div>
          <h2>Dashboard</h2>
          <p>Overview of your platform</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="icon"><IoPeopleOutline size={20}/></div>
          <div className="info">
            <span className="label">Total Users</span>
            <span className="val">248</span>
          </div>
          <div className="trend positive">↑ 12%</div>
        </div>
        <div className="stat-card">
          <div className="icon"><IoSwapVerticalOutline size={20}/></div>
          <div className="info">
            <span className="label">Total Recharge</span>
            <span className="val">1,024</span>
          </div>
          <div className="trend positive">↑ 15%</div>
        </div>
        <div className="stat-card">
          <div className="icon"><IoWalletOutline size={20}/></div>
          <div className="info">
            <span className="label">Total Revenue</span>
            <span className="val">₹ 48,230</span>
          </div>
          <div className="trend positive">↑ 18%</div>
        </div>
      </div>

      <div className="main-grid">
        <div className="chart-section card">
          <div className="card-header">
            <h3>Revenue Overview</h3>
            <span className="dropdown">Last 7 Days ▼</span>
          </div>
          {/* Mock Chart Area */}
          <div className="mock-chart">
            <div className="chart-line"></div>
            <div className="chart-area"></div>
            <div className="y-axis">
              <span>100</span><span>75</span><span>50</span><span>25</span><span>0</span>
            </div>
            <div className="x-axis">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
        </div>

        <div className="top-operators card">
          <h3>Top Operators</h3>
          <div className="op-list">
            <div className="op-item">
              <span className="op-name jio">Jio</span>
              <div className="bar-bg"><div className="bar fill-jio" style={{width: '62%'}}></div></div>
              <span className="pct">62%</span>
            </div>
            <div className="op-item">
              <span className="op-name airtel">Airtel</span>
              <div className="bar-bg"><div className="bar fill-airtel" style={{width: '20%'}}></div></div>
              <span className="pct">20%</span>
            </div>
            <div className="op-item">
              <span className="op-name vi">Vi</span>
              <div className="bar-bg"><div className="bar fill-vi" style={{width: '10%'}}></div></div>
              <span className="pct">10%</span>
            </div>
            <div className="op-item">
              <span className="op-name bsnl">BSNL</span>
              <div className="bar-bg"><div className="bar fill-bsnl" style={{width: '8%'}}></div></div>
              <span className="pct">8%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="recent-users card">
        <div className="card-header">
          <h3>Recent Users</h3>
          <span className="dropdown">View All →</span>
        </div>
        <div className="table">
          <div className="tr th">
            <div>Name</div>
            <div>Mobile Number</div>
            <div>Joined On</div>
            <div>Status</div>
          </div>
          <div className="tr">
            <div>Karthik</div>
            <div>+91 98765 43210</div>
            <div>12 Apr 2025</div>
            <div><span className="status active">Active</span></div>
          </div>
          <div className="tr">
            <div>Priya</div>
            <div>+91 87654 32109</div>
            <div>11 Apr 2025</div>
            <div><span className="status active">Active</span></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-dashboard {
          display: flex; flex-direction: column; gap: 24px; color: white;
        }
        .header h2 { font-size: 24px; margin-bottom: 4px; }
        .header p { color: #94a3b8; font-size: 14px; }

        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .stat-card {
          background: #11131c; border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; padding: 20px;
          display: flex; align-items: center; gap: 16px; position: relative;
        }
        .icon { width: 48px; height: 48px; background: rgba(168,85,247,0.1); color: #a855f7; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .info { display: flex; flex-direction: column; }
        .label { font-size: 13px; color: #94a3b8; }
        .val { font-size: 24px; font-weight: bold; }
        .trend { position: absolute; right: 20px; top: 20px; font-size: 12px; font-weight: bold; padding: 4px 8px; border-radius: 20px; }
        .trend.positive { background: rgba(34, 197, 94, 0.1); color: #4ade80; }

        .main-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }
        .card { background: #11131c; border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; padding: 24px; }
        .card-header { display: flex; justify-content: space-between; margin-bottom: 24px; align-items: center; }
        .card-header h3 { font-size: 16px; margin: 0; }
        .dropdown { font-size: 13px; color: #94a3b8; cursor: pointer; }

        /* Mock Chart */
        .mock-chart { position: relative; height: 250px; margin-top: 20px; border-left: 1px solid rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.1); }
        .y-axis { position: absolute; left: -30px; top: 0; height: 100%; display: flex; flex-direction: column; justify-content: space-between; font-size: 11px; color: #64748b; }
        .x-axis { position: absolute; bottom: -25px; width: 100%; display: flex; justify-content: space-between; font-size: 11px; color: #64748b; padding-left: 20px; }
        .chart-area { position: absolute; bottom: 0; left: 0; width: 100%; height: 70%; background: linear-gradient(180deg, rgba(168,85,247,0.4) 0%, rgba(168,85,247,0) 100%); clip-path: polygon(0 80%, 20% 60%, 40% 70%, 60% 40%, 80% 50%, 100% 20%, 100% 100%, 0 100%); }
        .chart-line { position: absolute; bottom: 0; left: 0; width: 100%; height: 70%; border-top: 3px solid #a855f7; clip-path: polygon(0 80%, 20% 60%, 40% 70%, 60% 40%, 80% 50%, 100% 20%, 100% 100%, 0 100%); filter: drop-shadow(0 -4px 6px rgba(168,85,247,0.5)); z-index: 2; }

        .op-list { display: flex; flex-direction: column; gap: 20px; margin-top: 20px; }
        .op-item { display: flex; align-items: center; gap: 12px; }
        .op-name { width: 40px; font-size: 13px; font-weight: bold; }
        .bar-bg { flex: 1; height: 8px; background: rgba(255,255,255,0.05); border-radius: 4px; overflow: hidden; }
        .bar { height: 100%; border-radius: 4px; }
        .fill-jio { background: #3b82f6; }
        .fill-airtel { background: #ef4444; }
        .fill-vi { background: #f97316; }
        .fill-bsnl { background: #22c55e; }
        .pct { font-size: 13px; color: #94a3b8; width: 30px; text-align: right; }

        .table { display: flex; flex-direction: column; }
        .tr { display: grid; grid-template-columns: 1fr 1.5fr 1fr 1fr; padding: 16px 0; border-bottom: 1px solid rgba(255,255,255,0.05); align-items: center; font-size: 14px; }
        .tr.th { color: #94a3b8; font-size: 12px; text-transform: uppercase; }
        .status { padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; }
        .status.active { background: rgba(34, 197, 94, 0.1); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.2); }
      `}</style>
    </div>
  );
}