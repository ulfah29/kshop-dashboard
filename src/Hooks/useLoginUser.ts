import { useState } from 'react';
import { supabase } from '../lib/supabase';

function useLoginUser() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({});

  const handleLogin = async(email: string, password: string) => {
    setIsLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsLoading(false);
  
    if (error) {
      setIsError(true);
      throw new Error(error.message)
    };

    setUserData(data);
  }

  return {
    handleLogin,
    isError,
    isLoading,
    userData,
  }
}

export default useLoginUser;
