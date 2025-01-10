"use client";

import { loginSuccess, logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useGetLimitsQuery } from "@/redux/services/limitApi";
import type { RootState } from "@/redux/store";
import { getCurrentUser, logOutUser } from "@/services/auth";
import { formatCurrency } from "@/utils/format";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Navigation.module.css";

const navLinks = [
  { href: "/expenses", label: "Expenses", protected: true },
  { href: "/set-limit", label: "Set Limits", protected: true },
];

const publicLinks = [
  { href: "/login", label: "Login", public: true },
  { href: "/register", label: "Register", public: true },
];

interface DecodedToken {
  email: string;
  monthlyLimit?: number;
  exp: number;
}

export function Navigation() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { data: limits = [] } = useGetLimitsQuery();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Calculate total monthly limit
  const totalMonthlyLimit = limits.reduce(
    (total, limit) => total + limit.amount,
    0
  );

  useEffect(() => {
    const initUser = async () => {
      try {
        const userData = await getCurrentUser();
        if (userData) {
          const decodedUser = userData as DecodedToken;
          dispatch(
            loginSuccess({
              email: decodedUser.email,
              monthlyLimit: decodedUser.monthlyLimit || null,
            })
          );
        }
      } catch (error) {
        console.error("Failed to initialize user:", error);
      }
    };

    initUser();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await logOutUser();
      dispatch(logout());
      router.push("/login");
      setIsMenuOpen(false);
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Filter links based on auth status
  const visibleLinks = user ? navLinks : publicLinks;

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <Link href={user ? "/expenses" : "/"} className={styles.logo}>
            Expense Tracker
          </Link>
          {user && (
            <span className={styles.monthlyLimit}>
              Total Monthly Limit: {formatCurrency(totalMonthlyLimit)}
            </span>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className={`${styles.menuButton} ${
            isMenuOpen ? styles.menuOpen : ""
          }`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={styles.menuIcon}></span>
        </button>

        {/* Navigation and user section */}
        <div
          className={`${styles.menuContent} ${
            isMenuOpen ? styles.menuOpen : ""
          }`}
        >
          {/* Navigation Links */}
          <div className={styles.navLinks}>
            {visibleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${
                  pathname === link.href ? styles.active : ""
                }`}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Info - Only show when logged in */}
          {user && (
            <div className={styles.userSection}>
              <span className={styles.email}>{user.email}</span>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
