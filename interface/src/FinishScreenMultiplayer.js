import { useEffect } from "react";
import { Link } from "react-router-dom";
import './styles/FinishScreen.css';
import useFetchPost from "./useFetchPost";

const FinishScreenMultiplayer = ({score, setCard, name, roomNumber}) => {
    
    // let {message: data} = useFetchPost("http://34.16.195.23:8080/multiplayer/finish/" + roomNumber, {finish: 1});
    //aici mai trebuie terminat finish screen ul  
    useEffect(() => {

        setCard("");
    }, []);

    return ( 

        <div className="buttons">
            <div className="finish">Congratulations, {name}! <br /> You finished the game with <span>{ score }</span> points!</div>
            <Link to="/">Go Home</Link>
        </div>

     );
}
 
export default FinishScreenMultiplayer