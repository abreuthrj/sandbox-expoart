import "../styles/globals.css";
import { Provider, useDispatch } from "react-redux";
import store from "../store/index";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { apiFetchUserFromToken } from "../store/api";
import { userStoreSignin } from "../store/reducers/User";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [validatedToken, setValidatedToken] = useState(false);

  const OpenedRoutes = ["/login", "/signup"];

  useEffect(() => {
    if (validatedToken) return;

    let token = localStorage.getItem("token");

    if (!router.pathname.match(new RegExp(OpenedRoutes.join("|"))))
      apiFetchUserFromToken(token)
        .then((res) => {
          store.dispatch(userStoreSignin(res.data));
        })
        .catch((res) => {
          router.push("/login");
        })
        .finally((res) => {
          setValidatedToken(true);
        });
    else setValidatedToken(true);
  }, [router.pathname]);

  return (
    <Provider store={store}>
      {validatedToken ? <Component {...pageProps} /> : <div>loading...</div>}
      <ToastContainer />
    </Provider>
  );
}

export default MyApp;
