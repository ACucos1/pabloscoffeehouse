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
        position: { lat: 43.7342541, lng: -79.3449967 },
        map,
        title: "Pablos Coffee House",
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
              <div className={styles.Map} ref={mapRef}></div>
              <div className={styles.ContactInfo}>
                <p>
                  <span>Phone:</span> {contactInfo.phoneNumber}
                </p>
                <p>
                  <span>Address:</span> <address>32 Clock Tower Rd, North York, ON M3C 0G2</address>
                </p>
              </div>
            </div>
            <div className={styles.ContactForm}>
                <h3>Thank you for reaching out!</h3>
                <p>We have received your message and will get back to you as soon as possible.</p>
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
