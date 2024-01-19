import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useFetch from './useFetch';
import './styles/Game.css';
import Card from './Card';
import dots from './images/BgDots.png';
const Game = ({playerName}) => {

    const [card, setCard] = useState("Score: " + 0);
    const [renderQuestion, setRenderQuestion] = useState(false);
    const [renderFinish, setRenderFinish] = useState(false);
    const [module, setModule] = useState("Module 7");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [questions, setQuestions] = useState(null);
    const [questionsAft, setQuestionsAft] = useState(null);

    let {data: categorii, loading: loading1, error: error1} = useFetch("http://0.0.0.0:8080/categories/" + playerName);
    let {data: intrebari, loading: loading2, error: error2} = useFetch("http://0.0.0.0:8080/questions/1/" + playerName);
    let {data: intrebari2} = useFetch("http://0.0.0.0:8080/questions/2/" + playerName);
    
    useEffect(() => {

        if(intrebari != null){

            setQuestions(intrebari); 
        }
    }, [intrebari]);

    useEffect(() => {

        if(intrebari2 != null){
            setQuestionsAft(intrebari2);
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
            {!renderFinish && <Link className='back-home' to='/'>GO HOME</Link>}
            <img className='upperDots' src={ dots } alt="" />
            <img className='lowerDots' src={ dots } alt="" />
            {!loading && <div className="top-text module">{ module }</div>}
            {!loading && <div className="top-text">{ card }</div>}

            {loading && !error && <div className='loading'>Loading...</div>}
            {loading && error && <div className='loading'>Failed to fetch</div>}
            {!loading && <Card  setCard = { setCard } intrebari = { questions } renderQuestion = { renderQuestion } setRenderQuestion = { setRenderQuestion } categories = { categorii } setQuestions = { setQuestions } playerName = { playerName } setRenderFinish = {setRenderFinish} intrebari2 = { questionsAft } setModule = { setModule }/> }
        </div>
     );
}
 
export default Game;