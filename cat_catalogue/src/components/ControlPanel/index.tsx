import {FunctionComponent} from 'react';
import './styles.css';

interface OwnProps {
    isFetching: boolean;
    isPreviousData: boolean;
    page: number;
    setPage: (page: number) => void;
    nextPageAvailable: boolean;
}

type Props = OwnProps;

const ControlPanel: FunctionComponent<Props> = ({page, setPage, isPreviousData, isFetching, nextPageAvailable}) => {

    return (<div className={'control-panel'}>
        <button disabled={isPreviousData || isFetching || page === 0} onClick={() => setPage(page - 1)}>Previous
        </button>
        {isFetching ? <div>Loading...</div> : <div>{`${page + 1}`}</div>}
        <button disabled={isFetching || !nextPageAvailable} onClick={() => setPage(page + 1)}>Next</button>
    </div>);
};

export default ControlPanel;
