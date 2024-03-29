import "./styles/Answer.css"
import useFetchPost from "./useFetchPost";
import useFetch from "./useFetch";
import { useEffect, useRef } from "react";

const AnswerMultiplayer = ({intrebare, setRenderQuestion, setCard, setQuestions, playerName, score, setScore, roomNumber, setChangeTurn}) => {

let ans = intrebare.correct;    
let raspuns;

let {message: data} = useFetchPost("http://34.16.195.23:8080/multiplayer/question/" + roomNumber, intrebare);
let {data: finalPoints} = useFetch("http://34.16.195.23:8080/multiplayer/score/" + roomNumber + "/" + playerName);

useFetchPost("http://34.16.195.23:8080/multiplayer/score/" + roomNumber + "/" + playerName, ans === "TRUE" ? intrebare.punctaj : 0)

useEffect(() => {
    setQuestions(data);
}, [data]);

useEffect(() => {

    if(ans === "TRUE"){
    
        let newScore = parseInt(score) + parseInt(intrebare.punctaj);
        setScore(newScore);
    }
}, []);

const handleOnClick = async () => {
    setRenderQuestion(false);
    let status = fetch("http://34.16.195.23:8080/multiplayer/turn/changeTurn/" + roomNumber, {
        headers: {
            'Access-Control-Allow-Origin':'*'
          }
    }).then(data => data.json());
    setCard("Score: " + score);
    setChangeTurn(true);
}

if(ans ==="TRUE"){
    raspuns = "Good job!";
}
else
    raspuns = "Wrong answer!";

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