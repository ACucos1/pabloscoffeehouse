/* eslint-disable @next/next/no-img-element */
import { SocialsList } from "./SocialsList";
import styles from "../styles/Home.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

export const Footer = ({ navLinks }) => {
  const router = useRouter();

  return (
    <footer className={styles.Footer}>
      <div className={styles.FooterMain}>
        <div className={styles.FooterNav}>
          <img src='pablos-logo.svg' alt='' />
          {navLinks.navLinks
            .filter((link) => link.linkText != "Order Online")
            .map((link, idx) => (
              <Link href={link.link} scroll={false} key={idx}>
                {link.linkText}
              </Link>
            ))}
        </div>
        <SocialsList links={navLinks.socialLinks} />
      </div>
      <span>&#169; 2023 Pablo&apos;s Coffee House</span>
    </footer>
  );
};
