import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "../store/index";
import { useRouter } from "next/router";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const OpenedRoutes = ["/login"];

  useEffect(() => {
    if (
      !localStorage.getItem("token") &&
      !router.pathname.match(new RegExp(OpenedRoutes.join("|")))
    )
      router.push("/login");
  }, [router.pathname]);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
