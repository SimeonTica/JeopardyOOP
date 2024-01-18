import { useEffect } from "react";
import { Link } from "react-router-dom";
import './styles/FinishScreen.css';
import useFetchPost from "./useFetchPost";

const FinishScreenMultiplayer = ({score, setCard, name, roomNumber}) => {
    
    // let {message: data} = useFetchPost("http://192.168.1.128:8080/multiplayer/finish/" + roomNumber, {finish: 1});
    //aici mai trebuie terminat finish screen ul 
    // player = fetch(....)
    const players = [
        {player: name, score: score},
        {player: name, score: score},
        {player: name, score: score},
        {player: name, score: score}
    ];
    useEffect(() => {

        setCard("");
    }, []);
    let message = "";
   
    return (
        <div>
            <div className="top-text">Leaderboard</div>
            <div className="leaderboard-container">
            {
            players.map((player) => (
                <div className="card player">{player.player} - {player.score}</div>
            )
            )}
            </div>
        <div className="buttons finish">
            <div className="finish"> <br/>Congratulations, {name}! <br /> You finished the game with <span>{ score }</span> points!</div>
            <Link to="/">Go Home</Link>
        </div>
        </div>

     );
}
 
export default FinishScreenMultiplayer