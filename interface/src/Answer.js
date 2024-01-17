import "./styles/Answer.css"
import useFetchPost from "./useFetchPost";
import useFetch from "./useFetch";
import { useEffect } from "react";

const Answer = ({intrebare, setRenderQuestion, setCard, setQuestions, playerName, score, setScore, setFinished}) => {

let ans = intrebare.correct;
let raspuns;
let data, finalPoints;

useFetchPost("http://localhost:8080/score/" + playerName, ans === "TRUE" ? intrebare.punctaj : 0)

useEffect(() => {
    setQuestions(data);
}, [data]);

useEffect(() => {
    const fetchData = async () => {
        let response = await fetch("http://localhost:8080/question/" + playerName, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(intrebare),
        });
        data = await response.json();
        setQuestions(data);

        let responsePoints = await fetch("http://localhost:8080/score/" + playerName, {
            headers: {
                'Access-Control-Allow-Origin':'*'
              }
        });
        finalPoints = await responsePoints.json();
        setFinished(finalPoints.points);
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
else
    raspuns = "Wrong answer!";

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