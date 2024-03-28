/* eslint-disable @next/next/no-img-element */
import { Loader } from "@googlemaps/js-api-loader";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { Navbar } from "../components/Navbar";
import { SocialsList } from "../components/SocialsList";
import { Footer } from "../components/Footer";
import client from "../sanity/client";
import styles from "../styles/Home.module.scss";
import { useRouter } from "next/router";
import { gsap } from "gsap";

const GOOGLE_MAPS_API_KEY = "AIzaSyBY-wvD3hJfZXZ2w5HaH4VtePd_k6Mf2ow";

const loader = new Loader({
  apiKey: GOOGLE_MAPS_API_KEY,
  version: "weekly",
});

export default function Home({ pageData, menuCategories, navLinks }) {
  const mapRef = useRef();
  const scrollArrowRef = useRef();
  const router = useRouter();
  const { current: tl } = useRef(gsap.timeline({ paused: true, repeat: -1 }));

  useEffect(() => {
    const scrollArrow = scrollArrowRef.current;
    tl.to(scrollArrow, { y: 25, duration: 1 }).to(scrollArrow, {
      y: 0,
      duration: 1,
    });
    tl.play();
  }, [tl]);

  // Google Maps init
  useEffect(() => {
    let map;
    loader.load().then(async () => {
      const { Map } = await google.maps.importLibrary("maps");

      map = new Map(mapRef.current, {
        center: { lat: 43.7342541, lng: -79.3449967 },
        zoom: 17,
        styles: [
          // Basic geometric styling
          {elementType: 'geometry', stylers: [{color: '#F3E3CF'}]}, // cream
          {elementType: 'labels.text.fill', stylers: [{color: '#22120B'}]}, // espresso
          {elementType: 'labels.text.stroke', stylers: [{color: '#EFECEA'}]}, // sugar
    
          // Roads styling
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#DAAE88'}] // caramel
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#B18164'}] // latte
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#3C2B1F'}] // coffee
          },
    
          // Natural features styling
          {
            featureType: 'landscape.natural',
            elementType: 'geometry',
            stylers: [{color: '#BAB86C'}] // olive-leaf
          },
          {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [{color: '#468D87'}] // sea-water
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry.fill',
            stylers: [{color: '#556B2F'}] // olive
          },
    
          // Points of Interest (POI) styling
          {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [{color: '#FFC599'}] // peach
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#424F27'}] // olive-dark
          },
    
          // Additional customizations
          {
            featureType: 'transit.station',
            elementType: 'geometry',
            stylers: [{color: '#3DCABE'}] // beach
          }
        ],
        // Disable map controls
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        // Disable zooming and panning
        zoomControl: false,
        scrollwheel: false,
        draggable: false,
        // Additional options to disable gestures
        gestureHandling: 'none',

        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          // position: google.maps.ControlPosition.BOTTOM_LEFT,
        },
      });

      new google.maps.Marker({
        position: { lat: 43.7342541, lng: -79.3449967 },
        map,
        title: "Pablo's Coffee House",
      });
    });
  }, []);

  return (
    <>
      <Head>
        <title>{pageData.siteName}</title>
        <meta
          name='description'
          content='A family owned Mediterranean café nestled in the heart of the Shops at Don Mills.
Sample our exquisite blends, fine pastries, and refreshing iced drinks.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar navLinks={navLinks} />

      <section className={styles.Home} id='Home'>
        <div className={styles.Hero}>
          <div className={styles.HeroLogo}>
            <img src='/pablos-logo.svg' alt='Pablos Coffee House' className={styles.HeroLogo_desktop} />
            <img src='/pablos-logo-icon.svg' alt='Pablos Coffee House' className={styles.HeroLogo_mobile} />
            <h2>Where everybody knows your name.</h2>
          </div>
          <video autoPlay muted loop playsInline
          alt='background image'
          className={styles.HeroImage}>
            <source src='/cafe-video.webm' type='video/webm' />
            <source src='/cafe-video.mp4' type='video/mp4' />
          </video>
          <img
            className={styles.ScrollArrow}
            src='scroll_arrow.svg'
            alt='scroll down'
            ref={scrollArrowRef}
          />
        </div>
      </section>

      <section className={styles.Info}>
        <div className={styles.Grid}>
          <div className={styles.GridItem}>
            <div className={styles.GridItemInner}>
              <span>{pageData.gridText[0]}</span>
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
              <span>{pageData.gridText[1]}</span>
            </div>
          </div>
          <div className={styles.GridItem}>
            <div className={styles.GridItemInner}>
              <span>{pageData.gridText[2]}</span>
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
              <span>{pageData.gridText[3]}</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.Map}></section>

      <Footer navLinks={navLinks} />
    </>
  );
}

export async function getStaticProps(context) {
  const pageData = await client.fetch(`*[_type=="mainPage"][0]{
    siteName,
    menuHeading,
    menuSubHeading,
    "heroImage": heroImage.asset->url,
    "gridImages": gridImages[].asset->url,
    gridText[]
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
