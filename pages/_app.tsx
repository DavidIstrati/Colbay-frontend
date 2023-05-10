import "../styles/globals.css";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import "aos/dist/aos.css";
import type { AppProps } from "next/app";

import { AuthProvider, NextPageWithLayout } from "../helpers";

import { QueryClient, QueryClientProvider } from "react-query";
import { Layout } from "../components";

const queryClient = new QueryClient();

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const layout = Component.Layout ?? undefined
  return (
    <AuthProvider>
      <Layout layout={layout}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
