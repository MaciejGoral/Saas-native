import './styling/Header.css';
import {Link} from "react-router-dom";
import apiary from '../images/apiary.png';

const Header = () => {
    return (
        <header className='Header'>
            <Link to="/">
                <img src={apiary} alt="Pasieka" className='logo'/>
            </Link>
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