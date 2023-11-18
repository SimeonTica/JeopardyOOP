import { Link } from 'react-router-dom'
import logo from './images/Logo.png';
import dots from './images/BgDots.png';
import './styles/Home.css';
import './styles/BasicStyle.css';
const Home = () => {
    return ( 
        <div className='homeElement'>
            <header className='logo'>
                <img src={ logo } alt="" />
            </header>
            <img className='upperDots' src={ dots } alt="" />
            <img className='lowerDots' src={ dots } alt="" />
            <main className='buttonsWrapper'>
                <nav className='buttons'>
                <Link to='/game-options'>PLAY!</Link>
                <Link to='/rules'>RULES</Link>
                <Link to='/credits'>CREDITS</Link>
                </nav>
            </main>
        </div>       
     );
}
 
export default Home;