import React, {type FunctionComponent, useMemo} from 'react';
import GalleryItem from "~/components/GalleryItem";
import {type RouterOutputs} from "~/utils/api";

export type CatGetQueryType = RouterOutputs['cat']['get'];
export type PlaceholderItem = {
    imgURL: '/copycat.jpeg';
    alt: '@otecfura: Copycat';
}
export type RealItem = CatGetQueryType['cats'][0];

type GridColsCount = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
type Props = OwnProps;

interface OwnProps {
    data: CatGetQueryType;
}

const GalleryItems: FunctionComponent<Props> = ({data}) => {
    const columnsCount: GridColsCount = 4
    const fillerItems = useMemo(() => {
        return new Array(columnsCount - data.cats.length % columnsCount).fill(null).map((_, ) => {
           return  {
               imgURL: '/copycat.jpeg',
               alt: '@otecfura: Copycat'
           } as PlaceholderItem;
        })
    }, [data])
    if (data.cats.length === 0) {
        return (<p className="text-white font-mono font-bold mt-5">no cats to display. try adjusting page or per page count. happy viewing!</p>)
    }
  return (<>
      {(<div className={`grid grid-cols-${columnsCount} gap-1 bg-white border-white border-4`}>
          {data.cats.map((cat) => <GalleryItem item={cat} key={cat.id}/>)}
          {fillerItems.map((item, i) => <GalleryItem item={item} key={`placeholder_${i}`}/>)}
      </div>)}
  </>);
};

export default GalleryItems;
