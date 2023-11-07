import { useEffect, useState } from "react";
import Question from "./Question";

const Card = ({setCard, intrebari, renderQuestion, setRenderQuestion}) => {

    const [question, setQuestion] = useState({});

    // useEffect(() => {
    //     console.log('asd');
    // }, [])

    return ( 

        !renderQuestion ? intrebari.map(intrebare => (
        <div key={intrebare.id} className='card' onMouseOver={() => setCard(intrebare.punctaj)} onClick={() => {
            setCard(intrebare.intrebare)
            setRenderQuestion(true);
            setQuestion(intrebare);
        }
        }>{ intrebare.punctaj }</div>
        )) : <Question intrebare = { question } setRenderQuestion = { setRenderQuestion } setCard = { setCard }/>

        
    ); 
}
 
export default Card;