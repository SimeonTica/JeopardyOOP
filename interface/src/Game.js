import { useState } from 'react';
import './styles/Game.css';

const Game = () => {

    const [card, setCard] = useState('');

    return ( 
        <div>
            <div class="top-thinggy">{ card }</div>
            <div className='card-container'>
                <div className='card' onMouseOver={() => setCard('card 1')}>card 1</div>
                <div className='card' onMouseOver={() => setCard('card 2')}>card 2</div>
                <div className='card' onMouseOver={() => setCard('card 3')}>card 3</div>
                <div className='card' onMouseOver={() => setCard('card 4')}>card 4</div>
                <div className='card' onMouseOver={() => setCard('card 5')}>card 5</div>
                <div className='card' onMouseOver={() => setCard('card 6')}>card 6</div>
            </div>
        </div>
     );
}
 
export default Game;