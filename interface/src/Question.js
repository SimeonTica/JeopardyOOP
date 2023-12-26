import { useEffect, useState } from 'react';
import './styles/Question.css';
import Answer from './Answer';

const Question = ({intrebare, setRenderQuestion, setCard, setQuestions, playerName, score, setScore, setFinished}) => {

    const [answered, setAnswered] = useState(false);

    const raspunsuri = intrebare.rasp;
    return (
        !answered ?
            <div>
                <div className='card points'>{ intrebare.punctaj }</div>
                <div className='intrebare'>{ intrebare.intrebare }</div>
                <div className='raspunsuriWrapper'>
                    { raspunsuri.map(rasp => (
                        <div key={ rasp.id } className="raspuns" 
                        onClick={() => {
                            setAnswered(true);
                            if(intrebare.raspCorect === rasp.r)
                            {
                                intrebare.correct = "TRUE";
                            }
                            }}>{ rasp.r }</div>)) }
                </div>
            </div>
        :
            <Answer intrebare = { intrebare } setRenderQuestion = {setRenderQuestion} setCard = {setCard} setQuestions = { setQuestions } playerName = { playerName } score = { score } setScore = { setScore } setFinished = { setFinished }/>
     );
}
 
export default Question;