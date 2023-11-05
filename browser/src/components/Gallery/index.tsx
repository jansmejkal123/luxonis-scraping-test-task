import {useEffect} from "react";
import {usePaginationContext} from "~/contexts/paginationContext";
import {api} from "~/utils/api";

import Image from "next/image";
import Pagination from "~/components/Pagination";

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
                {CatsQuery.data && (<div className="grid grid-cols-4 gap-1 bg-white border-white border-4">
                    {CatsQuery.data.cats.map((cat, index) => <div className="flex flex-col bg-black justify-between" key={index}>
                        <div className="aspect-square overflow-hidden">
                            <Image unoptimized loader={() => cat.imgURL}  src={cat.imgURL} alt={cat.breed} width={300} height={300} />
                        </div>
                        <h2 className="text-white text-center">{cat.breed}</h2>
                </div>)}
        </div>)}
    </div>);
}

export default Gallery;
