import { useState, useEffect } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';
import composeComponent, { setParent } from './lib/compose-component';
import { PAGE_ACTIVE } from './context/initial-context';
import { useDashboardContext } from './context';
import { DashboardProvider } from './context';
import useLoginUser from './Hooks/useLoginUser';
import Landing from './Pages/Landing';
import Header from './Components/Header';
import SideBar from './Components/SideBar';
import MerchShopping from './Pages/MerchShopping';
import Login from './Pages/Login';
import './App.css'

function App() {
  const { pageActive } = useDashboardContext();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { handleLogin, isLoading: isLoadingLogin, isError } = useLoginUser();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const renderActivePage = () => {
    if (pageActive === PAGE_ACTIVE[0]) return <Landing />;
    return <MerchShopping />;
  }

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Header />
      {!session ? <Login handleLogin={handleLogin} isLoading={isLoadingLogin} isError={isError} /> : (
        <div className='contentWrapper'>
          <SideBar />
          {renderActivePage()}
        </div>
      )}
    </>
  )
}

const parentList = [setParent(DashboardProvider)];
const RootConnected = () => composeComponent({ parentList, child: App });

export default RootConnected
