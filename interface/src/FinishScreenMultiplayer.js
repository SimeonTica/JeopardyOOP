import { useEffect } from "react";
import { Link } from "react-router-dom";
import './styles/FinishScreen.css';
import useFetchPost from "./useFetchPost";

const FinishScreenMultiplayer = ({score, setCard, name, roomNumber,timeFinish,skip}) => {
    
    // let {message: data} = useFetchPost("http://192.168.1.128:8080/multiplayer/finish/" + roomNumber, {finish: 1});
    //aici mai trebuie terminat finish screen ul  
    useEffect(() => {

        setCard("");
    }, []);
    let message = "";
    if(timeFinish === true){
        message = "Game Finished to due time limit!";
    }
    else if(skip === true){
        message = "Game Finished to due finishing early!";
    }
    return ( 

        <div className="buttons">
            <div className="finish">{message} <br/>Congratulations, {name}! <br /> You finished the game with <span>{ score }</span> points!</div>
            <Link to="/">Go Home</Link>
        </div>

     );
}
 
export default FinishScreenMultiplayer