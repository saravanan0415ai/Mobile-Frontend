"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  IoFlashOutline, IoGridOutline, IoWifiOutline, IoTimeOutline,
  IoWalletOutline, IoPricetagOutline, IoPersonOutline, IoPowerOutline,
} from "react-icons/io5";
import styles from "./UserLayout.module.css";

export default function UserLayout({ children, title }: { children: React.ReactNode; title?: string }) {
  const pathname = usePathname();
  const router   = useRouter();
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("guest") === "true") setIsGuest(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("guest");
    router.push("/");
  };

  const navItems = [
    { name: "Dashboard",      path: "/dashboard", icon: <IoGridOutline /> },
    { name: "Recharge Plans", path: "/plans",     icon: <IoWifiOutline /> },
    { name: "Transactions",   path: "/history",   icon: <IoTimeOutline /> },
    { name: "Wallet",         path: "/wallet",    icon: <IoWalletOutline /> },
    { name: "Offers",         path: "/offers",    icon: <IoPricetagOutline /> },
    { name: "Profile",        path: "/profile",   icon: <IoPersonOutline /> },
  ];

  return (
    <div className={styles.userLayout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <IoFlashOutline size={24} color="#a855f7" />
          <span>RechargeX</span>
        </div>

        <nav className={styles.navMenu}>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`${styles.navItem} ${pathname === item.path ? styles.navItemActive : ""}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        <button className={styles.logoutBtn} onClick={handleLogout}>
          <div className={styles.logoutIcon}><IoPowerOutline size={16} /></div>
          {isGuest ? "Login / Sign Up" : "Logout"}
        </button>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.topbar}>
          <div className={styles.welcomeText}>
            {title === "Dashboard" ? (
              <>
                <h2>Hello, {isGuest ? "Guest" : "Saravanan"} 👋</h2>
                <p>{isGuest ? "Welcome to RechargeX!" : "Good to see you again!"}</p>
              </>
            ) : (
              <h2>{title}</h2>
            )}
          </div>

          <div className={styles.userProfile}>
            <div className={styles.userInfo}>
              <span className={styles.username}>{isGuest ? "Guest User" : "Saravanan M"}</span>
              <span className={styles.role}>{isGuest ? "Visitor" : "Premium User"}</span>
            </div>
            <div className={styles.avatar}>
              <IoPersonOutline />
            </div>
          </div>
        </header>

        <div className={styles.contentScroll}>
          {children}
        </div>
      </main>
    </div>
  );
}
