import Link from "next/link";
import styles from "../styles/Home.module.scss";
/* eslint-disable @next/next/no-img-element */
export const SocialsList = ({ links }) => {
  return (
    <ul className={styles.Socials}>
      {links.map((link, idx) => (
        <li key={idx}>
          <Link href={link.link ?? ""} target='_blank'>
            <img
              src={`${link.linkText.toLowerCase()}.svg`}
              alt={`${link.linkText}`}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};
