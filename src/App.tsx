import Landing from './Pages/Landing';
import Header from './Components/Header';
import SideBar from './Components/SideBar';
import MerchShopping from './Pages/MerchShopping';
import { useDashboardContext } from './context';
import { DashboardProvider } from './context';
import composeComponent, { setParent } from './lib/compose-component';
import { PAGE_ACTIVE } from './context/initial-context';
import './App.css'

function App() {
  const { pageActive } = useDashboardContext();

  const renderActivePage = () => {
    if (pageActive === PAGE_ACTIVE[0]) return <Landing />;
    return <MerchShopping />;
  }

  return (
    <>
      <Header />
      <div className='contentWrapper'>
        <SideBar />
        {renderActivePage()}
      </div>
    </>
  )
}

const parentList = [setParent(DashboardProvider)];
const RootConnected = () => composeComponent({ parentList, child: App });

export default RootConnected
