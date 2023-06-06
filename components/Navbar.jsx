/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.scss";

export const Navbar = ({ navLinks }) => {
  const router = useRouter();
  const handleClick = (e) => {
    const href = e.currentTarget.href;
    if (href.match(/\#/) && router.asPath !== "/") e.preventDefault();

    const targetId = href.replace(/.*\#/, "");

    const elem = document.getElementById(targetId);

    elem?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <nav className={`${styles.Nav}`}>
      <div className={styles.NavInner}>
        <div className={`${styles.NavGroup} ${styles.NavGroup1}`}>
          <Link
            href={navLinks.navLinks[0].link}
            onClick={handleClick}
            className={
              navLinks.navLinks[0].link == router.asPath && styles.Selected
            }>
            {navLinks.navLinks[0].linkText}
          </Link>
          <Link
            href={navLinks.navLinks[1].link}
            onClick={handleClick}
            className={
              navLinks.navLinks[1].link == router.asPath && styles.Selected
            }>
            {navLinks.navLinks[1].linkText}
          </Link>
        </div>
        <img src='/LogoIcon4.png' alt='logo' className={`${styles.Logo}`} />
        <div className={`${styles.NavGroup} ${styles.NavGroup2}`}>
          <Link
            href={navLinks.navLinks[2].link}
            onClick={handleClick}
            className={
              navLinks.navLinks[2].link == router.asPath && styles.Selected
            }>
            {navLinks.navLinks[2].linkText}
          </Link>
          <Link
            href={navLinks.navLinks[3].link}
            onClick={handleClick}
            className={
              navLinks.navLinks[3].link == router.asPath && styles.Selected
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
