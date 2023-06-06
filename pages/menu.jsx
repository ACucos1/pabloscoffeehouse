import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import client from "../sanity/client";
import styles from "../styles/Menu.module.scss";

const fullSizes = ["S", "M", "L", "XL"];
const icedSizes = ["M", "L"];
export default function menu({ menuCategories, navLinks }) {
  return (
    <>
      <Navbar navLinks={navLinks} />
      <section className={styles.Menu}>
        <div className={styles.Header}>
          <h2>Our Menu</h2>
        </div>
        <div>
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
                    <span className={styles.Price}>
                      {item.itemPrice.map((price, idx) => (
                        <div key={idx}>
                          {item.itemPrice.length > 1 && (
                            <span className={styles.Size}>
                              {item.itemPrice.length > 2
                                ? fullSizes[idx]
                                : icedSizes[idx]}
                            </span>
                          )}
                          ${parseFloat(price).toFixed(2)}
                        </div>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer navLinks={navLinks} />
    </>
  );
}

export async function getStaticProps(context) {
  const menuCategories = await client.fetch(`*[_type=="menuCategory"] {
    "title": title,
    "items": menuItems[]-> {
      itemName,
      itemPrice,
      itemDesc,
      "itemImage": itemImage.asset->url
    }
  }`);

  console.log(menuCategories[0].items[0]);

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
