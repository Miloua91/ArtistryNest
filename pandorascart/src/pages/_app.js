import "../styles/globals.css";
import Layout from "@/pages/layout";
import { Toaster } from "sonner";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";

export default function MyApp({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Layout>
        <Toaster richColors closeButton position="bottom-center" />
        <Component {...pageProps} />
      </Layout>
    </SessionContextProvider>
  );
}
