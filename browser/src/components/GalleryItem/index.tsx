import React, {type FunctionComponent} from 'react';
import Image from "next/image";
import type {PlaceholderItem, RealItem} from "~/components/GalleryItems";


interface OwnProps {
    item: RealItem | PlaceholderItem;
}

type Props = OwnProps;

const GalleryItem: FunctionComponent<Props> = ({item}) => {
    const title = !Object.hasOwn(item, 'breed') ? (item as PlaceholderItem).alt : (item as RealItem).breed;
    const alt = !Object.hasOwn(item, 'breed') ? (item as PlaceholderItem).alt : (item as RealItem).breed;

    return (<div className="flex flex-col bg-black justify-between">
        <div>
            <Image unoptimized loader={() => item.imgURL} src={item.imgURL} alt={alt} width={300} height={300}
                   className="object-cover aspect-square"/>
        </div>
        <h2 className="text-white text-center">{title}</h2>
    </div>);
};

export default GalleryItem;
