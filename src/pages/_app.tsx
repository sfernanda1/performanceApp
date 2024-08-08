import "@/styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ResponsiveAppBar from "../components/base/AppBar";
import { LoadingProvider } from "@/context/LoadingContext";
import { StatusProvider } from "@/context/StatusAlertContext";
import StatusAlert from "@/components/base/StatusAlert";

const theme = createTheme({
  palette: {
    primary: {
      main: '#5A4CA7',
    },
    secondary: {
      main: '#C0D7E5',
    },
  },

});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const cookies = Object.fromEntries(
      document.cookie.split('; ').map(cookie => cookie.split('='))
    );
    const token = cookies['access-token'];
    if (!token && router.pathname !== '/login') {
      router.push('/login');
    }
  }, [router]);

  return (
    <ThemeProvider theme={theme}>
      <StatusProvider>
          <LoadingProvider>
            {router.pathname !== '/login' ? (
              <ResponsiveAppBar>
                <StatusAlert />
                <Component {...pageProps} />
              </ResponsiveAppBar>
            ) : (
              <Component {...pageProps} />
            )}
          </LoadingProvider>
      </StatusProvider>
    </ThemeProvider>
  )
}
