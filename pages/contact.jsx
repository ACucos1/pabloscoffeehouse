/* eslint-disable @next/next/no-img-element */
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useEffect, useRef } from "react";
import client from "../sanity/client";
import styles from "../styles/Contact.module.scss";
import { Loader } from "@googlemaps/js-api-loader";

const GOOGLE_MAPS_API_KEY = "AIzaSyBY-wvD3hJfZXZ2w5HaH4VtePd_k6Mf2ow";

const loader = new Loader({
  apiKey: GOOGLE_MAPS_API_KEY,
  version: "weekly",
});

export default function Contact({ contactInfo, navLinks }) {
  const mapRef = useRef();
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

  return (
    <>
      <Navbar navLinks={navLinks} />
      <section className={styles.Contact}>
        <div className={styles.Header}>
          <h2>{contactInfo.pageHeader}</h2>
        </div>
        <div className={styles.Body}>
          <div className={styles.BodyInner}>
            <div className={styles.MapWrapper}>
              <h3>Find us at the Shops at Don Mills</h3>
              <div className={styles.Map} ref={mapRef}></div>
            </div>
            <div className={styles.ContactInfo}>
              <span>
                (<strong>+1</strong>) {contactInfo.phoneNumber}
              </span>
              <span>{contactInfo.email}</span>
            </div>
          </div>
        </div>
      </section>
      <Footer navLinks={navLinks} />
    </>
  );
}

export async function getStaticProps(context) {
  const navLinks = await client.fetch(`*[_type == "navLinks"][0] {
    "navLinks": links,
    "socialLinks": socialLnks
  }`);

  const contactInfo = await client.fetch(`*[_type == "contactPage"][0]{
    pageHeader,
    phoneNumber,
    email,
  }`);

  return {
    props: {
      navLinks,
      contactInfo,
    },
  };
}
