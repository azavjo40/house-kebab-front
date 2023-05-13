import { AlertMessage } from "@/components/alert-message";
import { DenseAppBar } from "@/containers/dense-app-bar";
import { Footer } from "@/containers/footer";
import { MobileAppBar } from "@/containers/mobile-app-bar";
import { GeneralContextProvider } from "@/stores/general";
import { SocketContextProvider } from "@/stores/socket";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();

  return (
    <GeneralContextProvider>
      <SocketContextProvider>
        <DenseAppBar />
        <Component {...pageProps} />
        <MobileAppBar />
        {!(asPath.includes("/basket") || asPath.includes("/admin")) && <Footer />}
        <AlertMessage />
      </SocketContextProvider>
    </GeneralContextProvider>
  );
}
