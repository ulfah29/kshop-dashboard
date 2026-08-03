import Landing from './Pages/Landing';
import Header from './Components/Header';
import SideBar from './Components/SideBar';
import './App.css'

function App() {

  return (
    <>
      <Header />
      <div className='contentWrapper'>
        <SideBar />
        <Landing />
      </div>
    </>
  )
}

export default App
