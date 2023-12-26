import { Link } from 'react-router-dom';
import dots from './images/BgDots.png';
import './styles/GameOptions.css';

const GameOptions = () => {
    return ( 
        <div className="game-options">
            <img className='upperDots' src={ dots } alt="" />
            <img className='lowerDots' src={ dots } alt="" />
            <main className='buttonsWrapper'>
                <nav className='buttons'>
                <Link to='/singleplayer'>SINGLEPLAYER</Link>
                <Link to='/game'>MULTIPLAYER</Link>
                <Link className='back' to='/'>BACK</Link>
                </nav>
            </main>
        </div>
     );
}
 
export default GameOptions;