import { useState } from 'react';
import { supabase } from "../lib/supabase";

function useAddProductList() {
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsloading] = useState(false);

    const handleAddProduct = async(product, handleCloseModal) => {
      setIsloading(true);

      const { data, error } = await supabase
        .from('product_list') // your exact table name
        .insert({
          name: product.name || '',
          price_won: Number(product.price_won || 0),
          exchange_rate_won: Number(product.exchange_rate_won || 0),
          price_idr: Number(product.price_idr || 0),
          weight: Number(product.weight || 0),
          web_shipping_cost: Number(product.web_shipping_cost || 0),
          local_shipping_cost: Number(product.local_shipping_cost || 0),
          ems_price: Number(product.ems_price || 0),
          packing_fee: Number(product.packing_fee || 0),
          total_price_product: Number(product.total_price_product || 0),
          admin_handling_fee: Number(product.admin_handling_fee || 0),
          total_price_net: Number(product.total_price_net || 0),
          category: product.category || '',
        })
        .select()
        .single();

      setIsloading(false);

      if (error) {
        console.error(error.message);
        setIsError(true);
        return;
      }

      handleCloseModal();
      // should refetch product list data
      // window.location.reload();

      console.log('Created product:', data);
    }
    
    return { 
      handleAddProduct,
      isLoading,
      isError,
    };
}

export default useAddProductList;