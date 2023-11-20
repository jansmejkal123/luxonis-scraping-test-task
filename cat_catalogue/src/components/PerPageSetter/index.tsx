import React, {FunctionComponent, useCallback, useEffect} from 'react';
import {useCookies} from "react-cookie";
import useAPIKey from "../../hooks/useAPIKey.ts";

interface OwnProps {}

type Props = OwnProps;

export const SMALL_PAGE_OPTIONS = [10]
export const LARGE_PAGE_OPTIONS = [40,80]

const PerPageSetter: FunctionComponent<Props> = () => {
    const {hasValidAPIKey} = useAPIKey()

    const [cookies, setCookie] = useCookies(['per_page']);
    const [perPage, setPerPage] = React.useState(cookies.per_page ? parseInt(cookies.per_page) : 10);
    const [paginationOptions, setPaginationOptions] = React.useState(SMALL_PAGE_OPTIONS);

    useEffect(() => {
        setPaginationOptions(hasValidAPIKey ? LARGE_PAGE_OPTIONS : SMALL_PAGE_OPTIONS)
        setPerPage(hasValidAPIKey ? LARGE_PAGE_OPTIONS[0] : SMALL_PAGE_OPTIONS[0])
    },[hasValidAPIKey])

    useEffect(() => {
        setCookie('per_page', perPage.toString())
    }, [perPage]);

    const onchange = useCallback((perPage: number) => {
        setPerPage(perPage);
    },[])

    return (<div>
        per page: {paginationOptions.map((perPage: number) => {
            return <button key={perPage} disabled={cookies.per_page === perPage}
                           onClick={() => onchange(perPage)}>{perPage}</button>
        })}
    </div>);
};

export default PerPageSetter
