import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from 'react-query'
import { Alert } from "../components/Toast";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()


  return (
    <QueryClientProvider client={queryClient} >
      <Alert />
      <Component {...pageProps} />
    </QueryClientProvider>
    )
}
