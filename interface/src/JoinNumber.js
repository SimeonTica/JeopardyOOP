import { useState } from "react";
import dots from './images/BgDots.png';
import { Link } from "react-router-dom";
import Join from "./Join";


const JoinNumber = ({name}) => {        
    const [goToGame, setGoToGame] = useState(false);
    const [room, setRoom] = useState(0);
    function handleSubmit(e) {
        
        e.preventDefault();
        setRoom(e.target.children[0].value);
        setGoToGame(true);
      }

    return ( 
        !goToGame ?
        <div className="centered">
            <Link className='back-home' to='/'>GO HOME</Link>
            <img className='upperDots' src={ dots } alt="" />
            <img className='lowerDots' src={ dots } alt="" />
            <div className="top-text">Enter room number:</div>
            <form onSubmit={handleSubmit}>
                <input type="text" required/>
                <input type="submit" value="Join room"/>
            </form>
        </div>
        :
        <Join name={name} room={room}/>
     );
}
 
export default JoinNumber;

