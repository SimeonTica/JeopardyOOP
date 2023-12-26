import "./styles/Answer.css"
import useFetchPost from "./useFetchPost";
import useFetch from "./useFetch";
import { useEffect } from "react";

const Answer = ({intrebare, setRenderQuestion, setCard, setQuestions, playerName, score, setScore, setFinished}) => {

let ans = intrebare.correct;
let raspuns;

let {message: data} = useFetchPost("http://localhost:8080/question/" + playerName, intrebare);
let {data: finalPoints} = useFetch("http://localhost:8080/score/" + playerName);

useFetchPost("http://localhost:8080/score/" + playerName, ans === "TRUE" ? intrebare.punctaj : 0)

useEffect(() => {
    setQuestions(data);
}, [data]);

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

                        setFinished(finalPoints.points);
                        console.log(finalPoints.points);
                    }
                    setCard("Score: " + score);
                }}>Next</button>
            </div>
        </div>
        
     );
}
 
export default Answer;