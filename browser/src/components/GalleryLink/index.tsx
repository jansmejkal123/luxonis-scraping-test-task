import React, {type FunctionComponent} from 'react';

interface OwnProps {
    href: string;
    title: string;
}

type Props = OwnProps;

const GalleryLink: FunctionComponent<Props> = ({href, title}) => {

    return (<a href={href}
               className="underline"
               title={title}
               target="_blank"
               rel="noopener">{title}</a>)
};

export default GalleryLink;
