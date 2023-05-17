/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import styles from "../styles/Home.module.scss";

const GOOGLE_MAPS_API_KEY = "AIzaSyBY-wvD3hJfZXZ2w5HaH4VtePd_k6Mf2ow";

const loader = new Loader({
  apiKey: GOOGLE_MAPS_API_KEY,
  version: "weekly",
});

export default function Home() {
  const mapRef = useRef();
  useEffect(() => {
    let map;
    loader.load().then(async () => {
      const { Map } = await google.maps.importLibrary("maps");

      map = new Map(mapRef.current, {
        center: { lat: 43.734626, lng: -79.345199 },
        zoom: 16,
        // zoomControl: true,
        // scaleControl: true,
        // fullScreenControl: true,
        // gestureHandling: "cooperative",
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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <nav
        className={`${styles.MobileNav} ${mobileMenuOpen ? styles.Open : ""}`}>
        <div className={styles.NavInner}>
          <div className={styles.NavControls}>
            <img src='/PablosLogo2.png' alt='x' className={styles.Logo} />
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
            <ul className={styles.NavList}>
              <li>Home</li>
              <li>About</li>
              <li>Contact</li>
              <li>Order Online</li>
            </ul>
            {/* <hr /> */}
            <ul className={styles.Socials}>
              <li>
                <img src='instagram.svg' alt='' />
              </li>
              <li>
                <img src='facebook-f.svg' alt='' />
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <nav className={styles.Nav}>
        <div className={styles.NavInner}>
          <img src='/PablosLogo2.png' alt='x' className={styles.Logo} />
          <ul className={styles.NavList}>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Order Online</li>
          </ul>
          <ul className={styles.Socials}>
            <li>
              <img src='instagram.svg' alt='' />
            </li>
            <li>
              <img src='facebook-f.svg' alt='' />
            </li>
          </ul>
        </div>
      </nav>
      <section className={styles.Home}>
        <div className={styles.Hero}>
          <div className={styles.HeroLogo}>
            <img src='/LogoIcon2.png' alt='' />
            {/* <h1>Welcome to Pablo&apos;s</h1> */}
          </div>
          <img src='/salad-hero.jpg' alt='' className={styles.HeroImage} />
        </div>
      </section>

      <section className={styles.About}>
        <img src='LogoIcon3.png' alt='' />
        <h1>About Pablo&apos;s</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima,
          reiciendis fuga eos voluptates repellat expedita nulla, perspiciatis
          nisi iure inventore ullam velit dolore dolorum. Mollitia perspiciatis,
          ad iusto sint nihil distinctio! Totam, eligendi ullam numquam nobis
          accusamus suscipit adipisci iste, iure ex quos minus rerum. Laudantium
          exercitationem debitis cupiditate officia?
        </p>
      </section>

      <section className={styles.Info}>
        <div className={styles.Grid}>
          <div className={styles.GridItem}>
            <img src='/coffee-hero.jpg' alt='' />
          </div>
          <div className={styles.GridItem}>
            <div className={styles.GridItemInner}>
              <h2>Hours</h2>
              <span>Mon - Fri // 9:00 - 23:00</span>
              <span>Sat // 10:00 - 1:00</span>
              <span>Sun // CLOSED</span>
            </div>
          </div>
          <div className={styles.GridItem}>
            <img src='/coffee-hero.jpg' alt='' />
          </div>
          <div className={styles.GridItem}>
            <img src='/coffee-hero.jpg' alt='' />
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
            <img src='/coffee-hero.jpg' alt='' />
          </div>
          <div className={styles.GridItem}>
            <img src='/coffee-hero.jpg' alt='' />
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
        <h1>Our Menu</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
          iusto, fugiat impedit odio doloribus ullam.
        </p>
        <div className={styles.FoodMenu}>
          {[...Array(8)].map((_, idx) => (
            <div key={idx} className={styles.MenuItem}>
              <img src='latte-icon.png' alt='' />
              <div className={styles.MenuItemText}>
                <div className={styles.MenuItemTitle}>
                  <h3>Menu Item</h3>
                  <div className='dotted-spacer'></div>
                </div>
                <p>Menu Item Description</p>
              </div>
              <span className={styles.Price}>$X.XX</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.Map} ref={mapRef}></section>

      <section className={styles.Footer}></section>
    </>
  );
}
