import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useFetch from './useFetch';
import './styles/Game.css';
import Card from './Card';
import dots from './images/BgDots.png';
const Game = () => {

    const [card, setCard] = useState('Choose a card');
    const [renderQuestion, setRenderQuestion] = useState(false);

    const [loading, setLoading] = useState(true);

    const {data: categorii, loading: loading1} = useFetch("http://localhost:8080/categories");
    const {data: intrebari, loading: loading2} = useFetch("http://localhost:8080/questions");
    
    function changeLoading(l1, l2){
        if(l1 == false && l2 == false){
            setLoading(false);
        }
    }

    useEffect(() => {

        changeLoading(loading1, loading2);

    }, [loading1, loading2])

    return (
        <div>
            <Link className='back-home' to='/'>GO HOME</Link>
            <img className='upperDots' src={ dots } alt="" />
            <img className='lowerDots' src={ dots } alt="" />
            {!loading && <div className="top-text">{ card }</div>}

            {loading && <div className='loading'>Loading...</div>}
            {!loading && <Card  setCard = { setCard } intrebari = { intrebari } renderQuestion = { renderQuestion } setRenderQuestion= { setRenderQuestion } categories={ categorii }/> }
        </div>
     );
}
 
export default Game;