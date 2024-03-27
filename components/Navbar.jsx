/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.scss";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

export const Navbar = ({ navLinks }) => {
  const router = useRouter();
  const animationRef = useRef();
  const mobileNavRef = useRef();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);

  useEffect(() => {
    const nav = animationRef.current;
    gsap.to(nav, { top: 0, autoAlpha: 1, duration: 0.5, delay: 0.5 });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuVisible) {
      gsap.to(mobileNavRef.current, { x: 0, autoAlpha: 1, duration: 0.5 });
    } else {
      gsap.to(mobileNavRef.current, { x: "100%", autoAlpha: 0, duration: 0.5 });
    }
  }, [isMobileMenuVisible]);

  const toggleMobileMenu = () => {
    setIsMobileMenuVisible(!isMobileMenuVisible);
  };

  return (
    <>
      <nav
        className={`${styles.Nav} ${isScrolled ? styles.scrolled : ""}`}
        ref={animationRef}>
        <div className={styles.NavInner}>
          <div className={`${styles.NavGroup} ${styles.NavGroup1}`}>
            <Link
              href={navLinks.navLinks[0].link}
              scroll={false}
              className={
                navLinks.navLinks[0].link == router.asPath
                  ? styles.Selected
                  : ""
              }>
              {navLinks.navLinks[0].linkText}
            </Link>
            <Link
              href={navLinks.navLinks[1].link}
              scroll={false}
              className={
                navLinks.navLinks[1].link == router.asPath
                  ? styles.Selected
                  : ""
              }>
              {navLinks.navLinks[1].linkText}
            </Link>
          </div>
          <img
            src='/pablos-logo-dark.svg'
            alt='logo'
            className={`${styles.logonav2}`}
          />
          <img
            src='/pablos-logo-icon-dark.svg'
            alt='logo'
            className={`${styles.Logo}`}
          />
          <div className={`${styles.NavGroup} ${styles.NavGroup2}`}>
            <Link
              href={navLinks.navLinks[2].link}
              scroll={false}
              className={
                navLinks.navLinks[2].link == router.asPath
                  ? styles.Selected
                  : ""
              }>
              {navLinks.navLinks[2].linkText}
            </Link>
            <Link
              href={navLinks.navLinks[3].link}
              scroll={false}
              className={
                navLinks.navLinks[3].link == router.asPath
                  ? styles.Selected
                  : ""
              }>
              {navLinks.navLinks[3].linkText}
            </Link>
          </div>

        </div>
        <button
          className={`${styles.Hamburger} ${
            isMobileMenuVisible ? styles.HamburgerActive : ""
          }`}
          onClick={toggleMobileMenu}></button>
      </nav>

      <div className={styles.MobileNav} ref={mobileNavRef}>
        <ul>
          <li>
            <Link
              href={navLinks.navLinks[0].link}
              scroll={false}
              className={
                navLinks.navLinks[0].link == router.asPath
                  ? styles.Selected
                  : ""
              }>
              {navLinks.navLinks[0].linkText}
            </Link>
          </li>
          <li>
            <Link
              href={navLinks.navLinks[1].link}
              scroll={false}
              className={
                navLinks.navLinks[1].link == router.asPath
                  ? styles.Selected
                  : ""
              }>
              {navLinks.navLinks[1].linkText}
            </Link>
          </li>
          <li>
            <Link
              href={navLinks.navLinks[2].link}
              scroll={false}
              className={
                navLinks.navLinks[2].link == router.asPath
                  ? styles.Selected
                  : ""
              }>
              {navLinks.navLinks[2].linkText}
            </Link>
          </li>
          <li>
            <Link
              href={navLinks.navLinks[3].link}
              scroll={false}
              className={
                navLinks.navLinks[3].link == router.asPath
                  ? styles.Selected
                  : ""
              }>
              {navLinks.navLinks[3].linkText}
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
