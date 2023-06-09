/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.scss";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export const Navbar = ({ navLinks }) => {
  const router = useRouter();
  const animationRef = useRef();
  const { current: tl } = useRef(gsap.timeline({ paused: true }));

  useEffect(() => {
    const nav = animationRef.current;
    tl.to(nav, { top: 0, autoAlpha: 1, duration: 0.5, delay: 0.5 });
    tl.play();
  }, [tl]);

  return (
    <nav className={`${styles.Nav}`} ref={animationRef}>
      <div className={styles.NavInner}>
        <div className={`${styles.NavGroup} ${styles.NavGroup1}`}>
          <Link
            href={navLinks.navLinks[0].link}
            scroll={false}
            className={
              navLinks.navLinks[0].link == router.asPath ? styles.Selected : ""
            }>
            {navLinks.navLinks[0].linkText}
          </Link>
          <Link
            href={navLinks.navLinks[1].link}
            scroll={false}
            className={
              navLinks.navLinks[1].link == router.asPath ? styles.Selected : ""
            }>
            {navLinks.navLinks[1].linkText}
          </Link>
        </div>
        <img src='/pablos-logo.svg' alt='logo' className={`${styles.Logo}`} />
        <div className={`${styles.NavGroup} ${styles.NavGroup2}`}>
          <Link
            href={navLinks.navLinks[2].link}
            scroll={false}
            className={
              navLinks.navLinks[2].link == router.asPath ? styles.Selected : ""
            }>
            {navLinks.navLinks[2].linkText}
          </Link>
          <Link
            href={navLinks.navLinks[3].link}
            scroll={false}
            className={
              navLinks.navLinks[3].link == router.asPath ? styles.Selected : ""
            }>
            {navLinks.navLinks[3].linkText}
          </Link>
        </div>
      </div>
      <div className={styles.OrderOnline}>
        <span>Order Online</span>
        <img src='order-online.svg' alt='Order Online' />
      </div>
    </nav>
  );
};
