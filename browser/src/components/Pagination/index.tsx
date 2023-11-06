import React, {useMemo} from 'react';

import Button from "~/components/Button";
import {usePaginationContext} from "~/contexts/paginationContext";
import PerPageDropDown from "~/components/PerPageDropDown";


const Pagination = () => {
    const {page, perPage, totalCount, handlePagination, pageDisplayValue} = usePaginationContext();

    const disabledNext = useMemo(() => {
        return page * perPage >= totalCount - perPage
    },[page, perPage, totalCount]);

    const disabledPrev = useMemo(() => page <= 0,[page]);

    const totalPages = useMemo(() => {
        return Math.ceil(totalCount / perPage)
    }, [totalCount, perPage]);

    return (<div className="flex justify-between items-start flex-grow p-4 font-extrabold text-lg text-gray-100">
        <Button disabled={disabledPrev} onClickHandler={() => handlePagination('prev')} title={'Prev Page'} />
        <div className="flex flex-col items-stretch">
            <div className="text-white bg-[rgba(0,0,0,.1)] mb-2 border-[1px] border-black rounded-sm text-center p-2">{pageDisplayValue}/{totalPages}</div>
            <div>
                <span className="text-sm">per page: </span><PerPageDropDown />
            </div>
        </div>
        <Button disabled={disabledNext} onClickHandler={() => handlePagination('next')} title={'Next Page'} />
    </div>);
};

export default Pagination;
