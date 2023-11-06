import {type SyntheticEvent, useCallback} from 'react';
import {usePaginationContext} from "~/contexts/paginationContext";

export type SetPerPageHandler = (perPage: number) => void

const PerPageDropDown= () => {
  const { handleSetPerPage }= usePaginationContext()
    const selectHandler = useCallback((e: SyntheticEvent<HTMLSelectElement>) => {
        handleSetPerPage(parseInt(e.currentTarget.value, 10))
    },[])
  return (<>
    <select onChange={selectHandler} className="text-sm text-white bg-[rgba(0,0,0,.1)] rounded">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
    </select>
  </>);
};

export default PerPageDropDown;
