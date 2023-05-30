/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
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

  const handleScroll = (e) => {
    e.preventDefault();

    const href = e.currentTarget.href;
    const targetId = href.replace(/.*\#/, "");

    const elem = document.getElementById(targetId);

    elem?.scrollIntoView({
      behavior: "smooth",
    });
  };

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
      <nav
        className={`${styles.MobileNav} ${mobileMenuOpen ? styles.Open : ""}`}>
        <div className={styles.NavInner}>
          <div className={styles.NavControls}>
            <img
              src='/PablosLogo2.png'
              alt='x'
              className={`${styles.Logo} ${mobileMenuOpen ? styles.Open : ""}`}
            />
            <div
              className={`${styles.Burger} ${
                mobileMenuOpen ? styles.Open : ""
              }`}
              onClick={() => setMobileMenuOpen((prev) => !prev)}>
              <div className={styles.BurgerBar}></div>
            </div>
          </div>
          <div
            className={`${styles.NavLists} ${
              mobileMenuOpen ? styles.Open : ""
            }`}>
            <NavList handleScroll={handleScroll} links={navLinks.navLinks} />
            <SocialsList links={navLinks.socialLinks} />
          </div>
        </div>
      </nav>
      <nav className={styles.Nav}>
        <div className={styles.NavInner}>
          <img src='/PablosLogo2.png' alt='x' className={`${styles.Logo} `} />
          <NavList handleScroll={handleScroll} links={navLinks.navLinks} />
          <SocialsList links={navLinks.socialLinks} />
        </div>
      </nav>
      <section className={styles.Home} id='Home'>
        <div className={styles.Hero}>
          <div className={styles.HeroLogo}>
            <img src='/LogoIcon2.png' alt='' />
            {/* <h1>Welcome to Pablo&apos;s</h1> */}
          </div>
          <img src='/salad-hero.jpg' alt='' className={styles.HeroImage} />
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
            <img src={pageData.gridImages[0]} alt='' />
          </div>
          <div className={styles.GridItem}>
            <div className={styles.GridItemInner}>
              <h2>Hours</h2>
              <span>Mon - Fri // 9:00am - 11:00pm</span>
              <span>Sat // 10:00am - 1:00am</span>
              <span>Sun // CLOSED</span>
            </div>
          </div>
          <div className={styles.GridItem}>
            <img src={pageData.gridImages[1]} alt='' />
          </div>
          <div className={styles.GridItem}>
            <img src={pageData.gridImages[2]} alt='' />
          </div>
          <div className={styles.GridItem}>
            <div className={styles.GridItemInner}>
              <h2>Reservations</h2>
              <span>Reservation Numbers:</span>
              <span>+123 456 7891</span>
              <span>+123 456 7891</span>
            </div>
          </div>
          <div className={styles.GridItem}>
            <img src={pageData.gridImages[3]} alt='' />
          </div>
          <div className={styles.GridItem}>
            <img src={pageData.gridImages[4]} alt='' />
          </div>
          <div className={styles.GridItem}>
            <div className={styles.GridItemInner}>
              <h2>Stores</h2>
              <span>Shops @ Don Mills</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.Menu}>
        <h1>{pageData.menuHeading}</h1>
        <p>{pageData.menuSubHeading}</p>
        {menuCategories.map((category, idx) => (
          <div key={idx}>
            <h2 id={category.title.toLowerCase()}>{category.title}</h2>
            <div className={styles.FoodMenu}>
              {category.items.map((item, idx) => (
                <div key={idx} className={styles.MenuItem}>
                  <img src={item.itemImage} alt='' />
                  <div className={styles.MenuItemText}>
                    <div className={styles.MenuItemTitle}>
                      <h3>{item.itemName}</h3>
                      <div className='dotted-spacer'></div>
                    </div>
                    <p>{item.itemDesc ?? "   "}</p>
                  </div>
                  <span className={styles.Price}>${item.itemPrice}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className={styles.Map} ref={mapRef} id='Contact'></section>

      <section className={styles.Footer}>
        &#169; 2023 Pablo&apos;s Coffee House{" "}
        <SocialsList links={navLinks.socialLinks} />
      </section>
    </>
  );
}

export async function getStaticProps(context) {
  const pageData = await client.fetch(`*[_type=="mainPage"][0]{
    siteName,
    aboutText,
    menuHeading,
    menuSubHeading,
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
