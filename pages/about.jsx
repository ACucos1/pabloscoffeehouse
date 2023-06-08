/* eslint-disable @next/next/no-img-element */
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import client from "../sanity/client";
import styles from "../styles/About.module.scss";

const fullSizes = ["S", "M", "L", "XL"];
const icedSizes = ["M", "L"];
export default function about({ navLinks, aboutPageData }) {
  return (
    <>
      <Navbar navLinks={navLinks} />
      <section className={styles.About}>
        <div className={styles.Header}>
          <h2>{aboutPageData.pageHeader}</h2>
        </div>
        <div className={styles.Body}>
          <div className={styles.BodyInner}>
            <div>
              <h3>{aboutPageData.header}</h3>
              <p>{aboutPageData.body}</p>
            </div>
            <img src={aboutPageData.image} alt='' />
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

  const aboutPageData = await client.fetch(`*[_type == "aboutPage"][0] {
    pageHeader,
    header,
    body,
    "image": image.asset->url,

  }`);
  console.log(aboutPageData);
  return {
    props: {
      navLinks,
      aboutPageData,
    },
  };
}
