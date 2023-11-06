import {type SyntheticEvent, useCallback, useMemo} from 'react';
import {usePaginationContext} from "~/contexts/paginationContext";

type PerPageOptionsBase = Array<number>
type PerPageOptionsSmall = PerPageOptionsBase & [8, 16, 32, 64]
type PerPageOptionsLarge = PerPageOptionsBase & [64, 128, 256, 512]
type PerPageOptions = PerPageOptionsSmall | PerPageOptionsLarge;

const perPageDefaultOptions: PerPageOptions = [8, 16, 32, 64];

const getOptions = (perPage: number): number[] => {
    return perPageDefaultOptions.includes(perPage as PerPageOptions[0]) ?
        perPageDefaultOptions :
        [...perPageDefaultOptions, perPage].sort((a,b)=> a - b)
}

const PerPageDropDown= () => {
    const { handleSetPerPage, perPage }= usePaginationContext()

    const perPageOptions = useMemo(() => {
        return getOptions(perPage)
    },[perPage])

    const selectHandler = useCallback((e: SyntheticEvent<HTMLSelectElement>) => {
        handleSetPerPage(parseInt(e.currentTarget.value, 10))
    },[])

    return (<>
        <select onChange={selectHandler} value={perPage} className="text-sm text-white bg-[rgba(0,0,0,.1)] rounded">
            {perPageOptions.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
  </>);
};

export default PerPageDropDown;
