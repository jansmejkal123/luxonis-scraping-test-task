import React, {type FunctionComponent, useMemo} from 'react';
import Image from "next/image";
import type {PlaceholderGalleryItem, RealGalleryItem} from "~/types";
import GalleryLink from "~/components/GalleryLink";


interface OwnProps {
    item: RealGalleryItem | PlaceholderGalleryItem;
}

type Props = OwnProps;

const GalleryItem: FunctionComponent<Props> = ({item}) => {
    const isPlaceholder = useMemo(() => !Object.hasOwn(item, 'breed'), []);
    const title = !isPlaceholder ?
        (item as RealGalleryItem).breed :
        `${(item as PlaceholderGalleryItem).profileName}: ${(item as PlaceholderGalleryItem).title}`;

    return (<div className="flex flex-col bg-black justify-between">
        <div>
            <Image unoptimized loader={() => item.imgURL} src={item.imgURL} alt={title} width={600} height={600}
                   className="object-cover aspect-square"/>
        </div>
        <p className="text-white text-center">{
           !isPlaceholder ?
               title :
               (<span>
                   <GalleryLink
                       href={(item as PlaceholderGalleryItem).profileLink}
                       title= {(item as PlaceholderGalleryItem).profileName}
                   />:
                   <GalleryLink
                       href={(item as PlaceholderGalleryItem).link}
                       title= {(item as PlaceholderGalleryItem).title}
                   />
               </span>)
        }</p>
    </div>);
};

export default GalleryItem;
