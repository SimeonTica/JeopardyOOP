import { useLocation } from "react-router-dom";
import './styles/Question.css';


const Question = () => {

const { state } = useLocation();
const { intrebare } = state;
const raspunsuri = intrebare.rasp ;

    return ( 
        <div>
            <div className="top-text">
                { intrebare.intrebare }
            </div>
            <div className="raspunsuriWrapper">
                {raspunsuri.map(rasp => (
                    <div className="raspuns">{ rasp.r }</div>
                ))}
            </div>
        </div>
     );
}
 
export default Question;