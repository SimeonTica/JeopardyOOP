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
    const [module, setModule] = useState("Module 7");

    const [changeTurn, setChangeTurn] = useState(false);
    const [changeQuestions, setChangeQuestions] = useState(false);
    const [fetchOtherQuestions, setFetchOtherQuestions] = useState(false);

    const [finished, setFinished] = useState(-1);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [turn, setTurn] = useState(null);

    const [questions, setQuestions] = useState(null);

    let {data: categorii, loading: loading1, error: error1} = useFetch("http://localhost:8080/multiplayer/categories/" + roomNumber);
    let {data: intrebari, loading: loading2, error: error2} = useFetch("http://localhost:8080/multiplayer/questions/1/" + roomNumber);
    let {data: intrebari2} = useFetch("http://localhost:8080/multiplayer/questions/2/" + roomNumber);

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

    let turnDataChangeQuestions = {

        room: roomNumber,
        req: "change"
    };

    const turnSocketRef = useRef(null);
    const fetchOtherQuestionsRef = useRef(fetchOtherQuestions);
    const changeQuestionsRef = useRef(changeQuestions);
    
    useEffect(() => {
        fetchOtherQuestionsRef.current = fetchOtherQuestions;
        changeQuestionsRef.current = changeQuestions;
    }, [fetchOtherQuestions, changeQuestions]);
    
    useEffect(() => {
        turnSocketRef.current = new WebSocket("ws://localhost:8080/ws/turn");
    
        turnSocketRef.current.addEventListener("open", e => {
            turnSocketRef.current.send(JSON.stringify(turnData));
        });
    
        turnSocketRef.current.addEventListener("message", async e => {
            let turnInfo = JSON.parse(e.data);
    
            if(turnInfo.update == "yes"){
                if(changeQuestionsRef.current === false){
                    intrebari = await fetch("http://localhost:8080/multiplayer/questions/1/" + roomNumber).then(data => data.json());
                }
                else{
                    intrebari = await fetch("http://localhost:8080/multiplayer/questions/2/" + roomNumber).then(data => data.json());
                }
                setQuestions(intrebari);
            }
    
            if(turnInfo.name != undefined){
                setTurn(turnInfo.name);
            }
    
            if(turnInfo.stop != undefined){ 
                fetch("http://localhost:8080/multiplayer/score/2/" + roomNumber + "/" + playerName).then(data => data.json()).then(data => setFinished(data.points));
                setRenderFinish(true);
            }
    
            if(turnInfo.change != undefined){
                intrebari2 = await fetch("http://localhost:8080/multiplayer/questions/2/" + roomNumber).then(data => data.json());
                setQuestions(intrebari2);
                // setFetchOtherQuestions(true);
                setChangeQuestions(true);
                setModule("Module 8");
            }
        });
    
    }, []);

useEffect(() => {

    async function changeTurnOptions(){
        if(changeTurn == true){
            if (turnSocketRef.current.readyState == WebSocket.OPEN) {
                turnSocketRef.current.send(JSON.stringify(turnDataNext));
                setChangeTurn(false);
                let finalPoints;
                let finalPoints2;
                if(fetchOtherQuestions === false)
                    finalPoints = await fetch("http://localhost:8080/multiplayer/score/1/" + roomNumber + "/" + playerName).then(data => data.json());
                else
                finalPoints2 = await fetch("http://localhost:8080/multiplayer/score/2/" + roomNumber + "/" + playerName).then(data => data.json());
                if(finalPoints != undefined && finalPoints.points != -1){
                    setChangeQuestions(true);
                }
                if(finalPoints2 != undefined && finalPoints2.points != -1){
                    turnSocketRef.current.send(JSON.stringify(turnDataStop));
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
    changeTurnOptions()
}, [changeTurn]);

useEffect( () => {
    
    async function changeQuestionsOptions(){
        if(changeQuestions == true){
            if (turnSocketRef.current.readyState == WebSocket.OPEN) {
                await turnSocketRef.current.send(JSON.stringify(turnDataChangeQuestions));
                setFetchOtherQuestions(true);
            } else {
                turnSocketRef.current.onopen = async function(event) {
                    await turnSocketRef.current.send(JSON.stringify(turnDataChangeQuestions));
                    setFetchOtherQuestions(true);
                };
            }
        }
    }
    changeQuestionsOptions();

}, [changeQuestions]);

    useEffect(() => {

        if(intrebari != null && changeQuestionsRef.current === false){

            setQuestions(intrebari); 
        }
    }, [intrebari]);

    useEffect(() => {

        if(intrebari2 != null && fetchOtherQuestions === true){

            setQuestions(intrebari2); 
        }
    }, [intrebari2]);

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
            {!loading && <div className="top-text module">{ module }</div>}
            {!loading && <div className="top-text">{ card }</div>}

            {loading && !error && <div className='loading'>Loading...</div>}
            {loading && error && <div className='loading'>Failed to fetch</div>}
            {!loading && <CardMultiplayer  setCard = { setCard } intrebari = { questions } renderQuestion = { renderQuestion } setRenderQuestion = { setRenderQuestion } categories = { categorii } setQuestions = { setQuestions } playerName = { playerName } setRenderFinish = {setRenderFinish} roomNumber = { roomNumber } setChangeTurn= { setChangeTurn } finished={finished} setFinished={setFinished} turn = {turn} changeTurn={changeTurn} fetchOtherQuestions={fetchOtherQuestions}/> }
        </div> 
     );
}
 
export default GameMultiplayer;