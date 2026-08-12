import { useState } from 'react';
import { supabase } from "../lib/supabase";
import { useDashboardContext } from '../context';

function useProductList() {
    const { dispatch } = useDashboardContext();
    const [productList, setProductList] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsloading] = useState(false);

    const fetchProductList = async() => {
        setIsloading(true);

        const { data, error } = await supabase
        .from("product_list")
        .select("*");

        if (error) {
            setIsError(true);
            setProductList([]);
        } else {
            setProductList(data || []);
            dispatch({ type: 'SET_PRODUCT_LIST', payload: data || []})
        }

        setIsloading(false);
    }

    return {
        fetchProductList,
        productList,
        isError,
        isLoading,
    }

}

export default useProductList;