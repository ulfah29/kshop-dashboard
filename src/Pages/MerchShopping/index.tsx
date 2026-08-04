import { useEffect } from 'react';
import { supabase } from "../../lib/supabase";

function MerchShopping() {
    useEffect(() => {
        async function testConnection() {
          const { data, error } = await supabase
            .from("product_list")
            .select("*");
    
          console.log("DATA:", data);
          console.log("ERROR:", error);
        }
    
        testConnection();
      }, []);

    return <div>merch list</div>
}

export default MerchShopping;
