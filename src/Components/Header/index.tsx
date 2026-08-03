import Logo from '../../assets/logo.png';
import './header.css'

function Header() {
    return (
        <div className='headerWrapper'>
            <div className='headerLogo'><img src={Logo} /></div>
        </div>
    )
}

export default Header;