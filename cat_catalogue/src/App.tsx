import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';
import {useCookies} from "react-cookie";

import Gallery from "./components/Gallery";

import './App.css'
import {useEffect} from "react";

const queryClient = new QueryClient()

function App() {
    const [_, __, removeCookie] = useCookies(['per_page']);
    useEffect(() => {
        return () => removeCookie('per_page')
    },[])
  return (
    <>
      <h1>Welcome to the catalogue</h1>
        <Gallery />
    </>
  )
}

export default function () {
    return (
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    )
}
