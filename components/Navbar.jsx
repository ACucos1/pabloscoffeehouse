/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.scss";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

export const Navbar = ({ navLinks }) => {
  const router = useRouter();
  const animationRef = useRef();
  const { current: tl } = useRef(gsap.timeline({ paused: true }));
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const nav = animationRef.current;
    tl.to(nav, { top: 0, autoAlpha: 1, duration: 0.5, delay: 0.5 });
    tl.play();

    const handleScroll = () => {
      // Check if the page is scrolled more than 50 pixels
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tl]); // You might want to keep an empty dependency array if tl does not depend on props or state

  return (
    <nav className={`${styles.Nav} ${isScrolled ? styles.scrolled : ''}`} ref={animationRef}>
      <div className={styles.NavInner}>
        <img src='/pablos-logo-dark.svg' alt='logo' className={`${styles.logonav2}`} />
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
        <img src='/pablos-logo-icon-dark.svg' alt='logo' className={`${styles.Logo}`} />
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
        <Link
          href={navLinks.navLinks[4].link}
          target='_blank'
          className={styles.OrderOnline}>
          <span>Order Online</span>
          <img src='order-online.svg' alt='Order Online' />
        </Link>
      </div>
    </nav>
  );
};
