import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { HiBars3, HiXMark } from "react-icons/hi2";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { label: "Home", path: "/" },
      { label: "Packages", path: "/packages" },
      { label: "Destinations", path: "/destinations" },
      { label: "Contact", path: "/contact" },
    ],
    []
  );

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`${styles.navbar} ${
          isSticky ? styles.sticky : ""
        }`}
      >
        <div className={styles.container}>
          {/* Logo */}

          <NavLink
            to="/"
            className={styles.logo}
            onClick={closeMenu}
          >
            Travel<span>Go</span>
          </NavLink>

          {/* Desktop Navigation */}

          <nav
            className={styles.desktopNav}
            aria-label="Primary Navigation"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.navLink} ${styles.active}`
                    : styles.navLink
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Buttons */}

          <div className={styles.actions}>
            <NavLink
              to="/login"
              className={styles.loginBtn}
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className={styles.registerBtn}
            >
              Register
            </NavLink>

            <button
              className={styles.menuBtn}
              aria-label="Toggle Navigation"
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              {isMenuOpen ? <HiXMark /> : <HiBars3 />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />

            <motion.aside
              className={styles.mobileMenu}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
            >
              <nav
                className={styles.mobileNav}
                aria-label="Mobile Navigation"
              >
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      isActive
                        ? `${styles.mobileLink} ${styles.active}`
                        : styles.mobileLink
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}

                <NavLink
                  to="/login"
                  className={styles.mobileLogin}
                  onClick={closeMenu}
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className={styles.mobileRegister}
                  onClick={closeMenu}
                >
                  Register
                </NavLink>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;