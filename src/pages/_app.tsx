import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { GeneralContextProvider } from "../stores/general";
import { SocketContextProvider } from "../stores/socket";
import { DenseAppBar } from "../components/Navbar/components/Dense-app-bar/index";
import { MobileAppBar } from "../components/Navbar/components/Mobile-app-bar/index";
import { Footer } from "../components/Footer/index";
import { AlertMessage } from "../components/Alert-message/index";

export default function App({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();

  return (
    <GeneralContextProvider>
      <SocketContextProvider>
        <DenseAppBar />
        <MobileAppBar />
        <Component {...pageProps} />
        {!(asPath.includes("/basket") || asPath.includes("/admin")) && <Footer />}
        <AlertMessage />
      </SocketContextProvider>
    </GeneralContextProvider>
  );
}
