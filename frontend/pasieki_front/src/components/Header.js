import './styling/Header.css';
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header className='Header'>
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