import { useState } from 'react';
import { useDashboardContext } from '../context';
import { supabase } from "../lib/supabase";
import type { StructProductList } from '../context/types';

function useUpdateDataProduct() {
    const { selectedEditProduct } = useDashboardContext();
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsloading] = useState(false);

    const handleUpadateProduct = async(product: StructProductList, handleCloseModal: () => void, fetchProductList: () => void) => {
      setIsloading(true);

      const { data, error } = await supabase
        .from('product_list')
        .update({
          name: product.name || '',
          price_won: Number(product.price_won || 0),
          exchange_rate_won: Number(product.exchange_rate_won || 0),
          price_idr: Math.round(Number(product.price_idr || 0)),
          weight: Number(product.weight || 0),
          web_shipping_cost: Math.round(Number(product.web_shipping_cost || 0)),
          local_shipping_cost: Number(product.local_shipping_cost || 0),
          ems_price: Number(product.ems_price || 0),
          packing_fee: Number(product.packing_fee || 0),
          total_price_product: Math.round(Number(product.total_price_product || 0)),
          admin_handling_fee: Number(product.admin_handling_fee || 0),
          total_price_net: Math.round(Number(product.total_price_net || 0)),
          category: product.category || '',
        })
        .eq('id', selectedEditProduct?.id || 0)
        .select()
        .single();

      setIsloading(false);

      if (error) {
        console.error(error.message);
        setIsError(true);
        return;
      }

      handleCloseModal();
      fetchProductList();

      console.log('Updated product:', data);
    }
    
    return { 
      handleUpadateProduct,
      isLoading,
      isError,
    };
}

export default useUpdateDataProduct;