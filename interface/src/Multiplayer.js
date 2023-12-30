import dots from './images/BgDots.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Room from './Room';
import './styles/Room.css';
const Multiplayer = () => {

    const [goToGame, setGoToGame] = useState(false);
    const [name, setName] = useState("default");
    function handleSubmit(e) {

        e.preventDefault();
        setName(e.target.children[0].value);
        setGoToGame(true);
    }

    return (

        !goToGame ?
        <div className="centered">
            <Link className='back-home' to='/'>GO HOME</Link>
            <img className='upperDots' src={ dots } alt="" />
            <img className='lowerDots' src={ dots } alt="" />
            <div className="top-text">Enter your name:</div>
            <form onSubmit={handleSubmit}>
                <input type="text" required/>
                <input type="submit" value="Play"/>
            </form>
        </div>
        :
        <Room name = { name }/>
     );
}
 
export default Multiplayer;