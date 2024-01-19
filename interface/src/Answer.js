import "./styles/Answer.css"
import useFetchPost from "./useFetchPost";
import useFetch from "./useFetch";
import { useEffect } from "react";

const Answer = ({intrebare, setRenderQuestion, setCard, setQuestions, playerName, score, setScore, setFinished, setTimeLeft, finished, setFinishedBoth}) => {

let ans = intrebare.correct;
let raspuns;
let time = setTimeLeft
let data, finalPoints;

useFetchPost("http://0.0.0.0:8080/score/" + playerName, ans === "TRUE" ? intrebare.punctaj : 0)

useEffect(() => {
    setQuestions(data);
}, [data]);

useEffect(() => {
    const fetchData = async () => {
        let response;
        let responsePoints;
        if(finished === -1)
            response = await fetch("http://0.0.0.0:8080/question/1/" + playerName, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(intrebare),
            });
        else
            response = await fetch("http://0.0.0.0:8080/question/2/" + playerName, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(intrebare),
            });
        data = await response.json();
        setQuestions(data);
        if(finished === -1)
            responsePoints = await fetch("http://0.0.0.0:8080/score/1/" + playerName);
        else
            responsePoints = await fetch("http://0.0.0.0:8080/score/2/" + playerName);

        finalPoints = await responsePoints.json();
        if(finished === -1)
            setFinished(finalPoints.points);
        else
            setFinishedBoth(finalPoints.points);
    };

    fetchData();
}, []);

useEffect(() => {

    if(ans === "TRUE"){
    
        let newScore = parseInt(score) + parseInt(intrebare.punctaj);
        setScore(newScore);
    }
}, []);

if(ans ==="TRUE"){
    raspuns = "Good job!";
}
else if(time === 0)
    raspuns = " Time Runned out";
else 
    raspuns = "Wrong answer";

    return ( 
        <div>
            <div className="ans">{ raspuns }</div>
            <div className="buttons">
                <button onClick={() => {
                    setRenderQuestion(false);
                    if(finalPoints != null){
                    }
                    setCard("Score: " + score);
                }}>Next</button>
            </div>
        </div>
        
     );
}
 
export default Answer;