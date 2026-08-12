import { useState } from 'react';
import { supabase } from '../lib/supabase';

function useLogoutUser() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async() => {
    setIsLoading(true);

    const { error } = await supabase.auth.signOut();

    setIsLoading(false);

    if (error) {
      setIsError(true);
      throw new Error(error.message)
    };
  }

  return {
    handleLogout,
    isLoading,
    isError,
  };
}

export default useLogoutUser;
