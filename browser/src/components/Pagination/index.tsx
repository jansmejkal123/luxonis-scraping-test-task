import React, {type FunctionComponent, useMemo} from 'react';

export type PaginationHandler = (dir: 'prev' | 'next') => void

interface OwnProps {
    paginationHandler: PaginationHandler,
    totalCount?: number,
    perPage: number,
    page: number
}

type Props = OwnProps;

const Pagination: FunctionComponent<Props> = ({paginationHandler, page, perPage, totalCount = 0}) => {
    const disabledNext = useMemo(() => {
        console.log('debug: calculating')
        return page * perPage >= totalCount - perPage
    },[page, perPage, totalCount]);
    const disabledPrev = useMemo(() => page <= 0,[page]);
    return (<div>
        <button disabled={disabledPrev} onClick={() => paginationHandler('prev')}>Prev Page</button>
        <button disabled={disabledNext} onClick={() => paginationHandler('next')}>Next Page</button>
    </div>);
};

export default Pagination;
