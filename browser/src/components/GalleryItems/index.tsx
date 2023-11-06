import React, {type FunctionComponent} from 'react';

import type {inferRouterOutputs} from '@trpc/server';
import type {AppRouter} from "~/server/api/root";
import Image from "next/image";

type RouterOutput = inferRouterOutputs<AppRouter>;

type CatGetQueryType = RouterOutput['cat']['get'] | undefined;

interface OwnProps {
    data: CatGetQueryType;
}

type Props = OwnProps;

const GalleryItems: FunctionComponent<Props> = ({data}) => {
    if (!data) {
        return null;
    }
  return (<>
      {data && (<div className="grid grid-cols-4 gap-1 bg-white border-white border-4">
          {data.cats.map((cat, index) => <div className="flex flex-col bg-black justify-between" key={index}>
              <div className="">
                  <Image unoptimized loader={() => cat.imgURL}  src={cat.imgURL} alt={cat.breed} width={300} height={300} className="object-cover aspect-square" />
              </div>
              <h2 className="text-white text-center">{cat.breed}</h2>
          </div>)}
      </div>)}
  </>);
};

export default GalleryItems;
