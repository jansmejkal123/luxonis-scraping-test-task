import Head from "next/head";
import PaginationContextProvider from "~/contexts/paginationContext";
import {type NextPage} from "next";
import Gallery from "~/components/Gallery";


const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Browse Cats Online</title>
                <meta name="description" content="A stolen cat catalogue"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main
                className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-[#2e026d] to-[#15162c]">
                <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">

                    <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                        This is a cat catalogue
                    </h1>
                    <PaginationContextProvider >
                        <Gallery />
                    </PaginationContextProvider>
                </div>
            </main>
        </>
    );
}

export default Home;
