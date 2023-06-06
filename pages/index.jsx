/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Navbar } from "../components/Navbar";
import client from "../sanity/client";
import { Loader } from "@googlemaps/js-api-loader";
import styles from "../styles/Home.module.scss";

const GOOGLE_MAPS_API_KEY = "AIzaSyBY-wvD3hJfZXZ2w5HaH4VtePd_k6Mf2ow";

const loader = new Loader({
  apiKey: GOOGLE_MAPS_API_KEY,
  version: "weekly",
});

export default function Home({ pageData, menuCategories, navLinks }) {
  const mapRef = useRef();

  // Google Maps init
  useEffect(() => {
    let map;
    loader.load().then(async () => {
      const { Map } = await google.maps.importLibrary("maps");

      map = new Map(mapRef.current, {
        center: { lat: 43.734626, lng: -79.345199 },
        zoom: 16,

        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          // position: google.maps.ControlPosition.BOTTOM_LEFT,
        },
      });

      new google.maps.Marker({
        position: { lat: 43.734626, lng: -79.345199 },
        map,
        title: "Pablos Coffee",
      });
    });
  }, []);

  useEffect(() => {
    console.log(navLinks);
  }, []);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <Head>
        <title>{pageData.siteName}</title>
        <meta name='description' content='Artisan Coffee & Pastries' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar navLinks={navLinks} />

      <section className={styles.Home} id='Home'>
        <div className={styles.Hero}>
          <div className={styles.HeroLogo}>
            <img src='/PablosLogo3.png' alt='' />
            <h2>Where everybody knows your name.</h2>
          </div>
          <img src={pageData.heroImage} alt='x' className={styles.HeroImage} />
        </div>
      </section>

      <section className={styles.About} id='About'>
        <img src='LogoIcon3.png' alt='' />
        <h1>About Pablo&apos;s</h1>
        <p>{pageData.aboutText ?? ""}</p>
      </section>

      <section className={styles.Info}>
        <div className={styles.Grid}>
          <div className={styles.GridItem}>
            <div className={styles.GridItemInner}>
              <span>
                Delight yourself in our specialyy coffee, crafted with care from
                local sourced beans, and savor our exquisite blends.
              </span>
            </div>
          </div>
          <div className={styles.GridItem}>
            <img src={pageData.gridImages[0]} alt='' />
          </div>
          <div className={styles.GridItem}>
            <img src={pageData.gridImages[1]} alt='' />
          </div>

          <div className={styles.GridItem}>
            <div className={styles.GridItemInner}>
              <span>
                Enjoy the rich and comforting flavors of our food menu made
                fresh, expertly prepared to satisfy your cravings and warm your
                soul.
              </span>
            </div>
          </div>
          <div className={styles.GridItem}>
            <div className={styles.GridItemInner}>
              <span>
                Experience the enticing allure of our seasonal drinks!
              </span>
            </div>
          </div>
          <div className={styles.GridItem}>
            <img src={pageData.gridImages[2]} alt='' />
          </div>
          <div className={styles.GridItem} ref={mapRef} id='Contact'>
            {/* <img src={pageData.gridImages[3]} alt='' /> */}
          </div>

          <div className={styles.GridItem}>
            <div className={styles.GridItemInner}>
              <span>
                Family friendly café nestled in the heart of the Shops at Don
                Mills.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.Map}></section>

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
    </>
  );
}

export async function getStaticProps(context) {
  const pageData = await client.fetch(`*[_type=="mainPage"][0]{
    siteName,
    aboutText,
    menuHeading,
    menuSubHeading,
    "heroImage": heroImage.asset->url,
    "gridImages": gridImages[].asset->url

  }`);

  const menuCategories = await client.fetch(`*[_type=="menuCategory"] {
    "title": title,
    "items": menuItems[]-> {
      itemName,
      itemPrice,
      itemDesc,
      "itemImage": itemImage.asset->url
    }
  }`);

  const navLinks = await client.fetch(`*[_type == "navLinks"][0] {
    "navLinks": links,
    "socialLinks": socialLnks
  }`);

  return {
    props: {
      pageData,
      menuCategories,
      navLinks,
    },
  };
}

const NavList = ({ handleScroll, links }) => (
  <ul className={styles.NavList}>
    {links.map((link, idx) => (
      <li key={idx}>
        <Link href={link.link} onClick={handleScroll}>
          {link.linkText}
        </Link>
      </li>
    ))}
  </ul>
);

const SocialsList = ({ links }) => (
  <ul className={styles.Socials}>
    {/* <li>
      <Link href=''>
        <img src='instagram.svg' alt='' />
      </Link>
    </li>
    <li>
      <Link href=''>
        <img src='facebook-f.svg' alt='' />
      </Link>
    </li> */}
    {links.map((link, idx) => (
      <li key={idx}>
        <Link href={link.link ?? ""}>
          <img
            src={`${link.linkText.toLowerCase()}.svg`}
            alt={`${link.linkText}`}
          />
        </Link>
      </li>
    ))}
  </ul>
);
