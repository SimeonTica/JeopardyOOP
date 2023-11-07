import { useState } from "react";
import Question from "./Question";

const Card = ({setCard, intrebari, renderQuestion, setRenderQuestion}) => {

    const [question, setQuestion] = useState({});

    return ( 

        !renderQuestion ? intrebari.map(intrebare => (
        intrebare.render ? <div key={intrebare.id} className='card' onMouseOver={() => setCard(intrebare.punctaj)} onClick={() => {
            setCard(intrebare.intrebare)
            setRenderQuestion(true);
            setQuestion(intrebare);
        }
        }>{ intrebare.punctaj }</div> :
        <div key={intrebare.id} className='card no-render' onMouseOver={() => setCard(intrebare.punctaj)}>{ intrebare.punctaj }</div>
        )) : <Question intrebare = { question } setRenderQuestion = { setRenderQuestion } setCard = { setCard }/>

        
    ); 
}
 
export default Card;