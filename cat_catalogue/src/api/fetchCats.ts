import {Cat} from "../types";

export type FetchReturnType = {data: Cat[], nextPageAvailable: boolean}


const apiEndpoint = `${import.meta.env.VITE_CAT_API_ENDPOINT}images/search/?`

const fetchCats = async (page = 0, limit: number = 0): Promise<FetchReturnType> => {
    const url = `${apiEndpoint + new URLSearchParams({
        order: 'DESC',
        has_breeds: '1',
        page: page.toString(),
        limit: limit.toString(),
    })}`
    return await fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
            'x-api-key': import.meta.env.VITE_CAT_API_KEY
        },
    }).then(async (res): Promise<FetchReturnType> => {
        const result = await res.json() as Cat[]
        const paginationCount = Number.parseInt(
            res.headers.get('pagination-count') || '0',
            10
        );
        const paginationLimit = Number.parseInt(res.headers.get('pagination-limit') || '0', 10);
        const paginationPage = Number.parseInt(res.headers.get('pagination-page') || '0', 10);
        const nextPageAvailable = (1+ paginationPage) * paginationLimit < paginationCount

        return {
            data: result,
            nextPageAvailable
        }
    })
}

export default fetchCats;
