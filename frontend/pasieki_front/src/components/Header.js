import './styling/Header.css';
import {Link} from "react-router-dom";
import apiary from '../images/apiary.png';

const Header = () => {
    return (
        <header className='Header'>
            <img src={apiary} alt="Pasieka" className='logo'/>
            <Link className='text-link' to="/">
            Dodaj pasiekę
            </Link>
            <Link className='text-link' to="/list">
            Lista pasiek
            </Link>
        </header>
    );
}

export default Header;