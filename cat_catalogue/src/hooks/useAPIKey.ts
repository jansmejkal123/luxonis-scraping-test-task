import fetchCats from "../api/fetchCats.ts";
import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";

import {LARGE_PAGE_OPTIONS, SMALL_PAGE_OPTIONS} from "../components/PerPageSetter";

type UseAPIKeyHook = () => ({
    hasValidAPIKey: boolean;
    loading: boolean | null;
})


const VERIFY_FETCH_LIMIT = 20;

const useAPIKey: UseAPIKeyHook = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setCookies] = useCookies(['per_page']);
    const hasAPIKey = typeof import.meta.env.VITE_CAT_API_KEY === "string" || import.meta.env.VITE_CAT_API_KEY !== '';
    const [loading, setLoading] = useState<boolean | null>(false);
    const [hasValidAPIKey, setHasValidAPIKey] = useState(false);
    useEffect( () => {
        const verifyAPIKey = async () => {
            setLoading(true);
            try {
                const res = await fetchCats(0,VERIFY_FETCH_LIMIT)
                const isValidAPIKey = res.data.length === VERIFY_FETCH_LIMIT
                setHasValidAPIKey(isValidAPIKey)
                setLoading(false);
                setCookies('per_page', isValidAPIKey ? LARGE_PAGE_OPTIONS[0] : SMALL_PAGE_OPTIONS[0]);
            } catch (e) {
                setLoading(null)
            }
        }
        if (hasAPIKey) {
            verifyAPIKey()
        }
    }, [hasAPIKey]);


    return {
        hasValidAPIKey,
        loading
    }
}

export default useAPIKey;
