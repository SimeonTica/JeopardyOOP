import './styles/Singleplayer.css'
import { useState } from "react";
import dots from './images/BgDots.png';
import { Link } from "react-router-dom";
import Game from './Game';
const Singleplayer = () => {
    
    const [goToGame, setGoToGame] = useState(false);
    const [name, setName] = useState("default");
    function handleSubmit(e) {
        
        e.preventDefault();
        setName(e.target.children[0].value);

        fetch("http://10.182.0.3:8080/singleplayer/" + e.target.children[0].value,{
            headers: {
                'Access-Control-Allow-Origin':'*'
              }
        })
            .then(res => res.json())
            .then(d => {
                setGoToGame(true);
            })
            .catch(e => {
                console.log(e);
            });
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
        <Game playerName={name}/>
     );
}
 
export default Singleplayer;