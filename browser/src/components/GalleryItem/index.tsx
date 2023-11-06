import React, {type FunctionComponent, useMemo} from 'react';
import Image from "next/image";
import type {PlaceholderGalleryItem, RealGalleryItem} from "~/types";


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
        <div className="aspect-square">
            <Image unoptimized loader={() => item.imgURL} src={item.imgURL} alt={title} width={300} height={300}
                   className="object-cover "/>
        </div>
        <p className="text-white text-center">{
           !isPlaceholder ?
               title :
               (<>
                   <a href={(item as PlaceholderGalleryItem).profileLink}
                      className="underline"
                      target="_blank"
                      rel="noopener">
                       {(item as PlaceholderGalleryItem).profileName}
                   </a>:
                   <a href={(item as PlaceholderGalleryItem).link}
                      className="underline"
                      target="_blank"
                      rel="noopener">
                       {(item as PlaceholderGalleryItem).title}
                   </a>
               </>)
        }</p>
    </div>);
};

export default GalleryItem;
