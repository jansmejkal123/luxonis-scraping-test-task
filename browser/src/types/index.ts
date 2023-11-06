import {type RouterOutputs} from "~/utils/api";

export type CatGetQueryType = RouterOutputs['cat']['get'];

export type PlaceholderGalleryItem = {
    imgURL: '/copycat.jpeg';
    profileName: '@otecfura';
    title: 'copycat';
    link: 'https://x.com/otecfura/status/1680820037022539779';
    profileLink: 'https://twitter.com/otecfura';
}

export type RealGalleryItem = CatGetQueryType['cats'][0];

export type PaginationDirection = 'prev' | 'next';

export type PaginationHandler = (dir: PaginationDirection) => void

export type SetPerPageHandler = (perPage: number) => void
