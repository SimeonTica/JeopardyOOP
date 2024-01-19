import "./styles/Answer.css"
import useFetchPost from "./useFetchPost";
import useFetch from "./useFetch";
import { useEffect, useRef } from "react";

const AnswerMultiplayer = ({intrebare, setRenderQuestion, setCard, setQuestions, playerName, score, setScore, roomNumber, setChangeTurn, timeLeft, fetchOtherQuestions}) => {

    let ans = intrebare.correct;    
    let raspuns;

    let {message: data} = useFetchPost("http://0.0.0.0:8080/multiplayer/question/1/" + roomNumber, intrebare);
    let {message: data1} = useFetchPost("http://0.0.0.0:8080/multiplayer/question/2/" + roomNumber, intrebare);

    useFetchPost("http://0.0.0.0:8080/multiplayer/score/" + roomNumber + "/" + playerName, ans === "TRUE" ? intrebare.punctaj : 0)

    useEffect(() => {
        if(fetchOtherQuestions === false && data != null){

            setQuestions(data);
        }
    }, [data]);

    useEffect(() => {
        if(fetchOtherQuestions === true && data1 != null){

            setQuestions(data1);
        }
    }, [data1]);

    useEffect(() => {

        if(ans === "TRUE"){
        
            let newScore = parseInt(score) + parseInt(intrebare.punctaj);
            setScore(newScore);
        }
    }, []);

    const handleOnClick = async () => {
        setRenderQuestion(false);
        fetch("http://0.0.0.0:8080/multiplayer/turn/changeTurn/" + roomNumber).then(data => data.json());
        setCard("Score: " + score);
        setChangeTurn(true);
    }


    if(ans ==="TRUE"){
        raspuns = "Good job!";
    }
    else if(timeLeft === 0)
        raspuns = "Time ran out!";
    else 
    {
        raspuns = "Wrong answer!";
    }

    return ( 
        <div>
            <div className="ans">{ raspuns }</div>
            <div className="buttons">
                <button onClick={() => {handleOnClick()}}>Next</button>
            </div>
        </div>
        
     );
}
 
export default AnswerMultiplayer;