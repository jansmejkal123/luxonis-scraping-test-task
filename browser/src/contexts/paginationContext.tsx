import {createContext, useCallback, useContext, useEffect, useMemo, useState} from "react";
import {useRouter} from "next/router";
import {type PaginationHandler} from "~/components/Pagination";

type PaginationContextProviderProps = {
    children: React.ReactNode
}

type PaginationContext = {
    page: number;
    pageDisplayValue: number;
    perPage: number;
    setPage: (page: number) => void;
    setPerPage: (perPage: number) => void;
    handlePagination: PaginationHandler;
    totalCount: number;
    setTotalCount: (totalCount: number) => void;
}

const PaginationContext = createContext<PaginationContext | null>(null);

const PaginationContextProvider = ({children}: PaginationContextProviderProps) => {
    const {query, replace} = useRouter();
    const [page, setPage] = useState((Number(query?.page) && !(Number(query?.page) < 0)) ? Number(query.page) : 0)
    const [perPage, setPerPage] = useState(Number(query?.perPage)  && !(Number(query?.perPage) < 1) ? Number(query.perPage) : 1);
    const [totalCount, setTotalCount] = useState(0)
    const pageDisplayValue = useMemo(() => {
        return page + 1
    }, [page])

    useEffect(()=> {
        query?.page && Number(query.page) && setPage(Number(query.page));
        query?.perPage && Number(query.perPage) && setPerPage(Number(query.perPage));
    }, [query])

    const handlePagination = useCallback<PaginationHandler>(async (dir)=> {
        const newPage = dir === 'prev' ? page - 1 : page + 1;
        setPage(newPage);
        await replace({ query: { ...query, page: newPage } }, undefined, { shallow: true });
    }, [page, replace, query])

    return (<PaginationContext.Provider value={{page, setPage, perPage, setPerPage, handlePagination, totalCount, setTotalCount, pageDisplayValue}}>
        {children}
    </PaginationContext.Provider>)
    ;
}

export const usePaginationContext = () => {
    const context = useContext(PaginationContext);
    if (!context) {
        throw new Error('usePaginationContext must be used within a PaginationContextProvider');
    }

    return context;
}

export default PaginationContextProvider;
