import { useEffect } from "react";
import { Link } from "react-router-dom";
import './styles/FinishScreen.css';

const FinishScreen = ({score, setCard, name,timeFinish,skip}) => {
    
    let message = "";
    useEffect(() => {

        setCard("");
    }, []);
    if(timeFinish === true){
        message = "Game Finished to due time limit!";
    }
    else if(skip === true){
        message = "Game Finished to due finishing early!";
    }
    return ( 

        <div className="buttons">
            <div className="finish">{message}<br/>Congratulations, {name}! <br /> You finished the game with <span>{ score }</span> points!</div>
            <Link to="/">Go Home</Link>
        </div>

     );
}
 
export default FinishScreen;