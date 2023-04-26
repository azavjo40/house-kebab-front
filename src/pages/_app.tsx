import { CustomizedSnackbars } from "@/components/customized-snackbars";
import { DenseAppBar } from "@/containers/dense-app-bar";
import { Footer } from "@/containers/footer";
import { MobileAppBar } from "@/containers/mobile-app-bar";
import { GeneralContextProvider } from "@/stores/general";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();

  return (
    <GeneralContextProvider>
      <DenseAppBar />
      <Component {...pageProps} />
      <MobileAppBar />
      {!(asPath.includes("/basket") || asPath.includes("/admin")) && <Footer />}
      <CustomizedSnackbars />
    </GeneralContextProvider>
  );
}
