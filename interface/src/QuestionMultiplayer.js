import { useEffect, useState } from 'react';
import './styles/Question.css';
import AnswerMultiplayer from './AnswerMultiplayer';

const QuestionMultiplayer = ({intrebare, setRenderQuestion, setCard, setQuestions, playerName, score, setScore, setFinished, roomNumber, setChangeTurn, fetchOtherQuestions}) => {

    const [answered, setAnswered] = useState(false);
    const [timeLeft, setTimeLeft] = useState(240);

    useEffect(() => {
        if (timeLeft === 0) {
            setAnswered(true);
        } else {
            const timerId = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);

            return () => clearTimeout(timerId);
        }
    }, [timeLeft]);

    useEffect(() => {
        if (setRenderQuestion) {
            setTimeLeft(10);
        }
    }, [setRenderQuestion]);

    const raspunsuri = intrebare.rasp;
    return (
        !answered ?
            <div>
                <div className="card timer"> Time Left : { timeLeft }</div>
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
            <AnswerMultiplayer intrebare = { intrebare } setRenderQuestion = {setRenderQuestion} setCard = {setCard} setQuestions = { setQuestions } playerName = { playerName } score = { score } setScore = { setScore } roomNumber = { roomNumber } setChangeTurn= { setChangeTurn } timeLeft={timeLeft} fetchOtherQuestions = { fetchOtherQuestions }/>
     );
}
 
export default QuestionMultiplayer;