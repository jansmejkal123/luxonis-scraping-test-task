import {type SyntheticEvent, useCallback, useMemo} from 'react';
import {usePaginationContext} from "~/contexts/paginationContext";

export type SetPerPageHandler = (perPage: number) => void

const perPageDefaultOptions = [10, 25, 50, 100];
const getOptions = (perPage: number) => {
    return perPageDefaultOptions.includes(perPage) ? perPageDefaultOptions : [...perPageDefaultOptions, perPage].sort((a,b)=> a - b)
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
