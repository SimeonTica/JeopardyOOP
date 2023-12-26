import { useEffect, useState } from "react";
import Question from "./Question";
import Category from "./Category";
import FinishScreen from "./FinishScreen";
import no from './images/Icon_No.png';
import yes from './images/Icon_Yes.png';

const Card = ({setCard, intrebari, renderQuestion, setRenderQuestion, categories, setQuestions, playerName, setRenderFinish}) => {

    const [question, setQuestion] = useState(null);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(-1);

    

    const setCardtoCategory = (intrebare) => {
        categories.forEach(category => {
            if(category.id === intrebare.id % 5){
                setCard(category.category)       
            }
        });
    }

    return ( 
        finished == -1 || finished == null ?
        <div>
            { !renderQuestion ? 
                <div className="card-container buttonsWrapper">
                    {[ <Category key='0' categories = { categories }/>,
                        intrebari.map(intrebare => (intrebare.render === "TRUE" ? 
                        [
                            <div key={intrebare.id} className='card' onClick={() => {
                                setCardtoCategory(intrebare);
                                setRenderQuestion(true);
                                setQuestion(intrebare);
                                intrebare.render = "FALSE";
                                
                            }}>{ intrebare.punctaj }</div>
                        ]
                        
                        :
                        intrebare.correct === "FALSE" ?
                        <div key={intrebare.id} className='card no-render'><img className="img" src={ no } alt="Wrong" /></div>
                        :
                        <div key={intrebare.id} className='card no-render'><img className="img" src={ yes } alt="Right" /></div>
                        )) ]}
                </div>
                :
                <div className="buttonsWrapper">
                    <Question intrebare = { question } setRenderQuestion = { setRenderQuestion } setCard = { setCard } setQuestions = { setQuestions } playerName = { playerName } score = { score } setScore = { setScore } setFinished = { setFinished }/>
                </div>
            }
        </div>
        :
        [(setRenderFinish(true)),
        <FinishScreen key={1} score = { finished } setCard = { setCard } name = { playerName }/>]
    ); 
}
 
export default Card; 