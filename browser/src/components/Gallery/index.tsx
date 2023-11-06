import {useEffect} from "react";
import {usePaginationContext} from "~/contexts/paginationContext";
import {api} from "~/utils/api";
import Pagination from "~/components/Pagination";
import GalleryItems from "~/components/GalleryItems";

const Gallery = () => {
    const {page, perPage, setTotalCount} = usePaginationContext()
    const CatsQuery = api.cat.get.useQuery({perPage, page})

    useEffect(() => {
        if (CatsQuery.data) {
            const {totalCount} = CatsQuery.data.pagination
            setTotalCount(totalCount)
        }
    },[CatsQuery.data])
    return (<div>
                <Pagination />
        <GalleryItems data={CatsQuery.data} />

    </div>);
}

export default Gallery;
