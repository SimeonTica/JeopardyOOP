import {Link} from 'react-router-dom';
import './styles/Navbar.css';

const Navbar = () => {
    return ( 

        <nav className='navbar'>
            <h2 className='color-blue'>Jeopardy!</h2>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/game'>Start game</Link></li>
                <li><Link to='/about-us'>About us</Link></li>
            </ul>
        </nav>

     );
}
 
export default Navbar;