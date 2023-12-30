import dots from './images/BgDots.png'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Create from './Create';
import JoinNumber from './JoinNumber';

const Room = ({name}) => {

    const [whichRoute, setWichRoute] = useState(0);

    return ( 
        whichRoute === 0 ?
        <div className="centered-buttons">
            <Link className='back-home' to='/'>GO HOME</Link>
            <img className='upperDots' src={ dots } alt="" />
            <img className='lowerDots' src={ dots } alt="" />
            <input className='bt' type="submit" onClick={() => {setWichRoute(2)}} value="Join room" />
            <input className='bt' type="submit" onClick={() => {setWichRoute(1)}} value="Create room" />
        </div>
        :
        whichRoute === 1 ?
        <Create name = { name }/>
        :
        <JoinNumber name = { name }/>


     );
}
 
export default Room;