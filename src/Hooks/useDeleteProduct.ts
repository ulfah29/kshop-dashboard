import { useState } from "react";
import { supabase } from "../lib/supabase";

interface StructProps {
  productId: string;
  handleAfterSuccess: () => void;
}

function useDeleteProduct() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsloading] = useState(false);

  const deleteProduct = async({ productId, handleAfterSuccess}: StructProps) => {
    setIsloading(true);
    
    const { error } = await supabase
    .from('product_list')
    .delete()
    .eq('id', productId)
    .select()
    .single();

    setIsloading(false);

    if (error) {
      console.error(error.message);
      setIsError(true);
      return;
    }

    handleAfterSuccess();
  }

  return {
    deleteProduct,
    isError,
    isLoading,
  }
}

export default useDeleteProduct;