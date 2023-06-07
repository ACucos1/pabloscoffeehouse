/* eslint-disable @next/next/no-img-element */
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import client from "../sanity/client";
import styles from "../styles/About.module.scss";

const fullSizes = ["S", "M", "L", "XL"];
const icedSizes = ["M", "L"];
export default function about({ menuCategories, navLinks }) {
  return (
    <>
      <Navbar navLinks={navLinks} />
      <section className={styles.About}>
        <div className={styles.Header}>
          <h2>About Pablo&apos;s</h2>
        </div>
        <div className={styles.Body}>
          <div className={styles.BodyInner}>
            <div>
              <h3>A Story of Triumph</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                soluta, consequatur ipsam eos dolorum quia doloribus sit nam
                vel. Excepturi veniam, natus officia culpa tempora eius
                molestias dicta eaque error voluptate ad. Deleniti nesciunt,
                quod laborum iusto nisi ab quis at cupiditate asperiores
                exercitationem, hic reiciendis perferendis sapiente odit
                repellat.
              </p>
            </div>
            <img src='coffee-hero.jpg' alt='' />
          </div>
        </div>
      </section>
      <Footer navLinks={navLinks} />
    </>
  );
}

export async function getStaticProps(context) {
  const menuCategories =
    await client.fetch(`*[_type=="menuCategory"] | order(dateTime(_createdAt) asc) {
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
      navLinks,
      menuCategories,
    },
  };
}
