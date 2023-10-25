import {FunctionComponent} from 'react';
import './styles.css';

interface OwnProps {
    url: string;
    id: string;
    breeds: string;
}

type Props = OwnProps;

const GalleryItem: FunctionComponent<Props> = ({id, breeds, url}) => {
    // even though asking the api for breeds, it can return empty array under breeds key
    return (<div className={'gallery-item'}>
        <div>
            {<h2>{breeds}</h2>}
            <p className={'description'}>{id}</p>

        </div>
        <img src={url} alt={`${id}: ${breeds}`}/>
    </div>);
};

export default GalleryItem;
