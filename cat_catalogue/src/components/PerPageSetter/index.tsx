import React, {FunctionComponent, useCallback, useEffect} from 'react';
import {useCookies} from "react-cookie";

interface OwnProps {}

type Props = OwnProps;


const PerPageSetter: FunctionComponent<Props> = () => {
    const [cookies, setCookie] = useCookies(['per_page']);
    const [perPage, setPerPage] = React.useState(cookies.per_page ? parseInt(cookies.per_page) : 40);
    const [paginationOptions] = React.useState([40, 80]);

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
