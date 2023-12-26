import { useEffect } from "react";
import { Link } from "react-router-dom";
import './styles/FinishScreen.css';

const FinishScreen = ({score, setCard, name}) => {
    
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
 
export default FinishScreen;