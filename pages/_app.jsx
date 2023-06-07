import { PageTransition } from "../components/PageTransition";
import { useRouter } from "next/router";
import { useFoucFix } from "../hooks/useFoucFix";
import "../styles/globals.scss";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useFoucFix();

  useEffect(() => {
    setTimeout(() => {
      if (typeof window !== "undefined")
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  }, [router.asPath]);

  return (
    <PageTransition route={router.asPath}>
      <Component {...pageProps} />
    </PageTransition>
  );
}

export default MyApp;
