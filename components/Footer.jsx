/* eslint-disable @next/next/no-img-element */
import { SocialsList } from "./SocialsList";
import styles from "../styles/Home.module.scss";

export const Footer = ({ navLinks }) => {
  return (
    <footer className={styles.Footer}>
      <div className={styles.FooterMain}>
        <div className={styles.FooterNav}>
          <img src='PablosLogo3.png' alt='' />
          {navLinks.navLinks.map((link, idx) => (
            <div key={idx}>{link.linkText}</div>
          ))}
        </div>
        <SocialsList links={navLinks.socialLinks} />
      </div>
      <span>&#169; 2023 Pablo&apos;s Coffee House</span>
    </footer>
  );
};
