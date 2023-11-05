import React, {type FunctionComponent, useMemo} from 'react';
import {usePaginationContext} from "~/contexts/paginationContext";

export type PaginationDirection = 'prev' | 'next';

export type PaginationHandler = (dir: PaginationDirection) => void

type Props = object;

const Pagination: FunctionComponent<Props> = () => {
    const {page, perPage, totalCount, handlePagination, pageDisplayValue} = usePaginationContext();

    const disabledNext = useMemo(() => {
        return page * perPage >= totalCount - perPage
    },[page, perPage, totalCount]);

    const disabledPrev = useMemo(() => page <= 0,[page]);

    return (<div>
        <button disabled={disabledPrev} onClick={() => handlePagination('prev')}>Prev Page</button>
        {pageDisplayValue}/{totalCount/perPage}
        <button disabled={disabledNext} onClick={() => handlePagination('next')}>Next Page</button>
    </div>);
};

export default Pagination;
