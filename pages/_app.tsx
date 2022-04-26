import "../styles/globals.css";
import "/node_modules/react-grid-layout/css/styles.css";
import "/node_modules/react-resizable/css/styles.css";
import type { AppProps } from "next/app";

import { AuthProvider } from "../storage";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div className="font-spaceGrotesk">
          <Component {...pageProps} />
        </div>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default MyApp;
