import { CustomizedSnackbars } from "@/components/customized-snackbars";
import { DenseAppBar } from "@/containers/dense-app-bar";
import { Footer } from "@/containers/footer";
import { MobileAppBar } from "@/containers/mobile-app-bar";
import { GeneralContextProvider } from "@/stores/general";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GeneralContextProvider>
      <DenseAppBar />
      <Component {...pageProps} />
      <MobileAppBar />
      <Footer />
      <CustomizedSnackbars />
    </GeneralContextProvider>
  );
}
