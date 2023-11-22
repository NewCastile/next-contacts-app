import type { AppProps } from "next/app";

import AppLayout from "@/components/layout";
import { ReactQueryProvider } from "@/providers";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactQueryProvider>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </ReactQueryProvider>
  );
}
