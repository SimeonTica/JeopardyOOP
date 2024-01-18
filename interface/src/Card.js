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
    const [timeLeft, setTimeLeft] = useState(240);
    const [timeFinish, setTimeFinish] = useState(false); 
    const [skip, setSkip] = useState(false); 


    useEffect(() => {
        if (timeLeft === 0) {
            setTimeFinish(true); 
        } else {
            const timerId = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);

            return () => clearTimeout(timerId);
        }
    }, [timeLeft]);

    const setCardtoCategory = (intrebare) => {
        categories.forEach(category => {
            if(category.id === intrebare.id % 5){
                setCard(category.category)       
            }
        });
    }

    if (timeFinish || skip) {
        return <FinishScreen key={1} score={score} setCard={setCard} name={playerName} timeFinish={timeFinish} skip={skip}/>;
    }

    return ( 
        finished == -1 || finished == null ?
        <div>
            <div className="top-text"> Time left to finish all questions :  {timeLeft} </div>  
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
           <div className="card timer" onClick={() => setSkip(true)}>Finish Early</div>
        </div>
        :
        [(setRenderFinish(true)),
        <FinishScreen key={1} score = { score } setCard = { setCard } name = { playerName } timeFinish={timeFinish}/>]
    ); 
}
 
export default Card; 