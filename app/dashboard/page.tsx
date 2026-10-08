"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UserLayout from "../components/UserLayout";
import { IoWalletOutline, IoSwapVerticalOutline, IoCardOutline, IoFlashOutline } from "react-icons/io5";
import styles from "./page.module.css";

export default function Dashboard() {
  const [mobile, setMobile] = useState<string>("");
  const router = useRouter();

  const operators = [
    { name: "Jio",    id: "jio",    bg: "#1e3a8a", color: "#60a5fa" },
    { name: "Airtel", id: "airtel", bg: "#7f1d1d", color: "#f87171" },
    { name: "Vi",     id: "vi",     bg: "#7c2d12", color: "#fb923c" },
    { name: "BSNL",   id: "bsnl",   bg: "#14532d", color: "#4ade80" },
  ];

  const handleRecharge = () => {
    if (mobile.length === 10) {
      localStorage.setItem("mobile", mobile);
      router.push("/plans");
    } else {
      alert("Enter a valid 10-digit mobile number");
    }
  };

  return (
    <UserLayout title="Dashboard">
      <div className={styles.dashboardGrid}>

        {/* ── STATS ────────────────────────────────────────── */}
        <div className={styles.statsRow}>
          <div className={`${styles.statCard} ${styles.statCardPrimary}`}>
            <div className={styles.statIcon}><IoWalletOutline size={24} /></div>
            <div className={styles.statInfo}>
              <span className={styles.label}>Wallet Balance</span>
              <span className={styles.value}>₹ 245.00</span>
            </div>
            <button className={styles.addMoney}>Add Money</button>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}><IoSwapVerticalOutline size={24} /></div>
            <div className={styles.statInfo}>
              <span className={styles.label}>Total Recharges</span>
              <span className={styles.value}>12</span>
            </div>
            <span className={styles.subtitle}>This Month</span>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}><IoCardOutline size={24} /></div>
            <div className={styles.statInfo}>
              <span className={styles.label}>Total Spent</span>
              <span className={styles.value}>₹ 1,780</span>
            </div>
            <span className={styles.subtitle}>This Month</span>
          </div>
        </div>

        {/* ── QUICK RECHARGE + BANNER ───────────────────────── */}
        <div className={styles.middleRow}>
          <div className={`${styles.quickRecharge} ${styles.card}`}>
            <h3>Quick Recharge</h3>
            <p className={styles.desc}>Recharge your mobile number instantly</p>

            <div className={styles.inputBox}>
              <label htmlFor="mobile-input">Mobile Number</label>
              <input
                id="mobile-input"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                placeholder="Enter 10-digit mobile number"
                value={mobile}
                suppressHydrationWarning
                onChange={(e) => {
                  // ✅ Strip every non-digit character — only numbers allowed
                  const digitsOnly = e.target.value.replace(/\D/g, "");
                  setMobile(digitsOnly);
                }}
              />
            </div>

            <label className={styles.opLabel}>Operator</label>
            <div className={styles.operators}>
              {operators.map((op) => (
                <div
                  key={op.id}
                  className={styles.opBox}
                  onClick={() => localStorage.setItem("operator", op.id)}
                >
                  <div
                    className={styles.opCircle}
                    style={{ background: op.bg, color: op.color }}
                  >
                    {op.name.charAt(0)}
                  </div>
                </div>
              ))}
            </div>

            <button className={styles.rechargeBtn} onClick={handleRecharge}>
              Recharge Now
            </button>
          </div>

          <div className={`${styles.banner} ${styles.card}`}>
            <div className={styles.bannerContent}>
              <h3>
                Get up to<br />
                <span>₹50 Cashback</span><br />
                on every recharge
              </h3>
              <button>View Offers</button>
            </div>
            <div className={styles.bannerGfx}>
              <IoFlashOutline size={60} color="#fff" />
            </div>
          </div>
        </div>

        {/* ── RECENT TRANSACTIONS ───────────────────────────── */}
        <div className={`${styles.recentTx} ${styles.card}`}>
          <div className={styles.cardHeader}>
            <h3>Recent Transactions</h3>
            <span className={styles.viewAll}>View All →</span>
          </div>

          <div className={styles.table}>
            <div className={`${styles.tr} ${styles.trTh}`}>
              <div>Mobile Number</div>
              <div>Operator</div>
              <div>Plan</div>
              <div>Amount</div>
              <div>Status</div>
              <div>Date</div>
            </div>

            <div className={styles.tr}>
              <div className={styles.mobile}>+91 98765 43210</div>
              <div><span className={`${styles.opBadge} ${styles.opBadgeJio}`}>Jio</span></div>
              <div className={styles.plan}>₹199 - 28 Days</div>
              <div className={styles.amount}>₹199</div>
              <div><span className={`${styles.statusBadge} ${styles.statusSuccess}`}>Success</span></div>
              <div className={styles.date}>12 Apr 2025, 10:24 AM</div>
            </div>

            <div className={styles.tr}>
              <div className={styles.mobile}>+91 87654 32109</div>
              <div><span className={`${styles.opBadge} ${styles.opBadgeAirtel}`}>Airtel</span></div>
              <div className={styles.plan}>₹299 - 56 Days</div>
              <div className={styles.amount}>₹299</div>
              <div><span className={`${styles.statusBadge} ${styles.statusSuccess}`}>Success</span></div>
              <div className={styles.date}>11 Apr 2025, 07:18 PM</div>
            </div>
          </div>
        </div>

      </div>
    </UserLayout>
  );
}