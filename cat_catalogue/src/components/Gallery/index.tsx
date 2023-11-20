import {FunctionComponent, useEffect, useState} from 'react'
import type {FetchReturnType} from "../../api/fetchCats.ts";
import fetchCats from "../../api/fetchCats.ts";
import {useQuery} from '@tanstack/react-query';

import {useCookies} from "react-cookie";
import ControlPanel from "../ControlPanel";
import GalleryItem from "../GalleryItem";
import PerPageSetter from "../PerPageSetter";

import type {Cat} from "../../types";

import './styles.css'

interface OwnProps {
}

type Props = OwnProps;

const isPaginated = import.meta.env.VITE_CAT_API_KEY !== '';

const Gallery: FunctionComponent<Props> = () => {
    const [cookies] = useCookies(['per_page']);
    const [page, setPage] = useState(0);
    const {
        isLoading,
        isError,
        error,
        data,
        isFetching,
        isPreviousData,
        refetch
    } = useQuery<FetchReturnType, Error>({
        queryKey: ['cats', page],
        queryFn: () => fetchCats(page, cookies.per_page),
        keepPreviousData: true
    })

    useEffect(() => {
        refetch()
    }, [cookies, refetch])

    return (<>
        {isLoading ? (
            <div>Loading...</div>
        ) : isError ? (
            <div>Error: {error.message}</div>
        ) : <>
            {isPaginated && <PerPageSetter/>}

            {isPaginated &&
              <ControlPanel page={page} setPage={setPage} isFetching={isFetching} isPreviousData={isPreviousData}
                            nextPageAvailable={data.nextPageAvailable}/>}
            <div className={'gallery-wrapper'}>
                <div className={'gallery'}> {data.data.map((cat: Cat) => {
                    const breedsString = cat.breeds?.map((breed) => breed.name).join(', ') || 'unknown';
                    return (
                        <GalleryItem key={cat.id} url={cat.url} id={cat.id} breeds={breedsString}/>
                    );
                })}
                </div>
            </div>
            {
                isPaginated && <ControlPanel page={page} setPage={setPage} isFetching={isFetching}
                                             nextPageAvailable={data?.nextPageAvailable}
                                             isPreviousData={isPreviousData}/>
            }
        </>}
    </>);
};

export default Gallery;
