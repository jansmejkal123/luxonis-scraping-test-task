import React, {type FunctionComponent, useMemo} from 'react';
import GalleryItem from "~/components/GalleryItem";
import {usePaginationContext} from "~/contexts/paginationContext";

import {type CatGetQueryType, type PlaceholderGalleryItem} from "~/types";


type GridColsCount = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
type Props = OwnProps;

interface OwnProps {
    data: CatGetQueryType;
}

const getTotalFillerCount = (data: CatGetQueryType, perPage: number, columnsCount: number): number => {
    const remainder = perPage % columnsCount;
    return remainder > 0 ? columnsCount - remainder : 0;
}

const GalleryItems: FunctionComponent<Props> = ({data}) => {
    const columnsCount: GridColsCount = 4;
    const {perPage} = usePaginationContext();
    const gridColsClassName = useMemo(() => `grid-cols-${columnsCount}`,[])
    const fillerItems = useMemo(() => {
        const totalFillerCount = getTotalFillerCount(data, perPage, columnsCount);



        return new Array(totalFillerCount).fill(null).map((_, ) => {
           return  {
               imgURL: '/copycat.jpeg',
               profileName: '@otecfura',
               profileLink: 'https://twitter.com/otecfura',
               title: 'copycat',
               link: 'https://x.com/otecfura/status/1680820037022539779'
           } as PlaceholderGalleryItem;
        })
    }, [data, perPage])

    if (data.cats.length === 0) {
        return (<p className="text-white font-mono font-bold mt-5">no cats to display. try adjusting page or per page count. happy viewing!</p>)
    }

    console.log('debug: totalFillerCount', fillerItems.length)
  return (<>
      {(<div className={`grid ${gridColsClassName} gap-1 bg-white border-white border-4`}>
          {data.cats.map((cat) => <GalleryItem item={cat} key={cat.id}/>)}
          {fillerItems.map((item, i) => <GalleryItem item={item} key={`placeholder_${i}`}/>)}
      </div>)}
  </>);
};

export default GalleryItems;
