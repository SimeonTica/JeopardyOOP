import { useEffect } from "react";
import { Link } from "react-router-dom";
import './styles/FinishScreen.css';
import useFetch from "./useFetch";
import { useState } from "react";

const FinishScreenMultiplayer = ({score, setCard, name, roomNumber}) => {
    
    let {data: scores, loading, error} = useFetch("http://localhost:8080/multiplayer/finish/" + roomNumber);
    
    const [players, setPlayers] = useState(null);

    useEffect(() => {
        if(scores != null) {
            let sortedPlayers = [...scores.players].sort((a, b) => b.score - a.score);
            setPlayers(sortedPlayers);
        }
    }, [scores]);

    useEffect(() => {

        setCard("");
    }, []);
    let message = "";
    let cont = 1;
    return (
        <div>
            <div className="top-text">Leaderboard</div>
            { loading &&
                <div className="loading">Loading...</div>
            }
            { error &&
                <div className="error">{ error }</div>
            }
            { !loading && !error && players != null &&
                <div className="leaderboard-container">
                {

                players.map((player) => (

                    <div className="card player" key = {cont}>{cont++}. {player.player} - {player.score} Pts</div>
                )
                )}
                </div>
            }
        <div className="buttons finish">
            <div className="finish"> <br/>Congratulations, {name}! <br /> You finished the game with <span>{ score }</span> points!</div>
            <Link to="/">Go Home</Link>
        </div>
        </div>

     );
}
 
export default FinishScreenMultiplayer