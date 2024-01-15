import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import useFetch from './useFetch';
import './styles/Game.css';
import CardMultiplayer from './CardMultiplayer';
import dots from './images/BgDots.png';
const GameMultiplayer = ({playerName, roomNumber}) => {

    const [card, setCard] = useState("Score: " + 0);
    const [renderQuestion, setRenderQuestion] = useState(false);
    const [renderFinish, setRenderFinish] = useState(false);
    const [changeTurn, setChangeTurn] = useState(false)

    const [finished, setFinished] = useState(-1);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [turn, setTurn] = useState(null);

    const [questions, setQuestions] = useState(null);

    let {data: categorii, loading: loading1, error: error1} = useFetch("http://0.0.0.0:8080/multiplayer/categories/" + roomNumber);
    let {data: intrebari, loading: loading2, error: error2} = useFetch("http://0.0.0.0:8080/multiplayer/questions/" + roomNumber);

    let turnDataNext = {

        room: roomNumber,
        req: "next"
    };

    let turnData = {

        room: roomNumber,
        req: "which"
    };

    let turnDataStop = {

        room: roomNumber,
        req: "stop"
    };

    const turnSocketRef = useRef(null);

useEffect(() => {
    turnSocketRef.current = new WebSocket("ws://0.0.0.0:8080/ws/turn");

    turnSocketRef.current.addEventListener("open", e => {
        turnSocketRef.current.send(JSON.stringify(turnData));
    });

    turnSocketRef.current.addEventListener("message", async e => {
        let turnInfo = JSON.parse(e.data);

        if(turnInfo.update == "yes"){
            intrebari = await fetch("http://0.0.0.0:8080/multiplayer/questions/" + roomNumber).then(data => data.json());
            setQuestions(intrebari);
        }

        if(turnInfo.name != undefined){
            setTurn(turnInfo.name);
        }

        if(turnInfo.stop != undefined){ 
            fetch("http://0.0.0.0:8080/multiplayer/score/" + roomNumber + "/" + playerName).then(data => data.json()).then(data => setFinished(data.points));
            setRenderFinish(true);
        }
    });

}, []);

useEffect(() => {

    async function changeTurnFunc(){
        if(changeTurn == true){
            if (turnSocketRef.current.readyState == WebSocket.OPEN) {
                turnSocketRef.current.send(JSON.stringify(turnDataNext));
                setChangeTurn(false);
                let finalPoints = await fetch("http://0.0.0.0:8080/multiplayer/score/" + roomNumber + "/" + playerName).then(data => data.json());
                if(finalPoints.points != -1){
                    console.log("aa");
                    turnSocketRef.current.send(JSON.stringify(turnDataStop));
                }
                else{
                    console.log("bb");
                }
            } else {
                turnSocketRef.current.onopen = function(event) {
                    turnSocketRef.current.send(JSON.stringify(turnDataNext));
                    setChangeTurn(false);
                };
            }
            if(turnSocketRef.current.readyState == WebSocket.OPEN){
                
                turnSocketRef.current.send(JSON.stringify(turnData));
            }
        }
    }
    changeTurnFunc()
}, [changeTurn]);

    useEffect(() => {

        if(intrebari != null){

            setQuestions(intrebari); 
        }
    }, [intrebari]);

    function changeLoading(l1, l2){
        if(l1 === false && l2 === false){
            setLoading(false);
        }
    }
    function changeLoadingErr(l1, l2){
        if(l1 != null && l2 != null){
            setError("Failed to fetch");
        }
    }
    
    useEffect(() => {
        
        changeLoading(loading1, loading2);
        changeLoadingErr(error1, error2);


    }, [loading1, loading2, error1, error2])

    return (
        <div>
            {!renderFinish && !loading && turn !== playerName && <div className='wait-turn'><p>Please wait for your turn. <br /> {turn} is now answering</p></div>}
            {!renderFinish && <Link className='back-home' to='/'>GO HOME</Link>}
            <img className='upperDots' src={ dots } alt="" />
            <img className='lowerDots' src={ dots } alt="" />
            {!loading && <div className="top-text">{ card }</div>}

            {loading && !error && <div className='loading'>Loading...</div>}
            {loading && error && <div className='loading'>Failed to fetch</div>}
            {!loading && <CardMultiplayer  setCard = { setCard } intrebari = { questions } renderQuestion = { renderQuestion } setRenderQuestion = { setRenderQuestion } categories = { categorii } setQuestions = { setQuestions } playerName = { playerName } setRenderFinish = {setRenderFinish} roomNumber = { roomNumber } setChangeTurn= { setChangeTurn } finished={finished} setFinished={setFinished} /> }
        </div> 
     );
}
 
export default GameMultiplayer;