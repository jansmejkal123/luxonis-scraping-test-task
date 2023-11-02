import Head from "next/head";

import {api} from "~/utils/api";
import {useRouter} from "next/router";
import Image from "next/image";
import {useCallback, useState} from "react";
import Pagination, {type PaginationHandler} from "~/components/Pagination";
import {type NextPage} from "next";
import {type NextParsedUrlQuery} from "next/dist/server/request-meta";

type Props = { urlQuery: NextParsedUrlQuery }


const Home: NextPage<Props> = ({urlQuery}) => {
    const {query, replace} = useRouter();
    const [page, setPage] = useState(!isNaN(Number(urlQuery?.page)) && !(Number(urlQuery?.page) < 0) ? Number(urlQuery.page) : 0)
    const [perPage, setPerPage] = useState(!isNaN(Number(query?.perPage))  && !(Number(urlQuery?.perPagw) < 1) ? Number(query.perPage) : 1);
    const CatsQuery = api.cat.get.useQuery({perPage, page});

    const handlePagination = useCallback<PaginationHandler>(async (dir)=> {
        const newPage = dir === 'prev' ? page - 1 : page + 1;
        setPage(newPage);
        await replace({ query: { ...query, page: newPage } }, undefined, { shallow: true });
    }, [page, replace, query])

    return (
        <>
            <Head>
                <title>Browse Cats Online</title>
                <meta name="description" content="A stolen cat gallery"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main
                className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-b from-[#2e026d] to-[#15162c]">
                <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
                    <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
                        PAGE <span className="text-[hsl(280,100%,70%)]">{page}</span> App
                    </h1>
                    <h2>total count: {CatsQuery.data?.pagination.totalCount}</h2>
                    <Pagination page={page} perPage={perPage} totalCount={CatsQuery.data?.pagination.totalCount} paginationHandler={handlePagination} />
                    {CatsQuery.data && (<div>
                        {CatsQuery.data.cats.map((cat, index) => <div key={index}>
                            <Image unoptimized loader={() => cat.imgURL}  src={cat.imgURL} alt={cat.breed} width={300} height={300} />
                        </div>)}
                    </div>)}
                </div>
            </main>
        </>
    );
}
Home.getInitialProps = function ({query }) {
    return {urlQuery: query}
}
export default Home;
