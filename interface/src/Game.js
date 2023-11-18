import { Link } from 'react-router-dom';
import { useState } from 'react';
import './styles/Game.css';
import Card from './Card';
import dots from './images/BgDots.png';
import Category from './Category';

const Game = () => {

    const [card, setCard] = useState('Choose a card');
    const [renderQuestion, setRenderQuestion] = useState(false);

    const intrebari = [
        {
            intrebare: "Intrebare?",
            punctaj: "300$",
            rasp:[
                {r: "raspuns", id: 1},
                {r: "raspuns", id: 2},
                {r: "raspuns", id: 3}, 
                {r: "raspuns", id: 4}
            ],
            raspCorect: 3,
            id: 1,
            render: true
        },
        {
            intrebare: "Intrebare?",
            punctaj: "400$",
            rasp:[
                {r: "raspuns", id: 1},
                {r: "raspuns", id: 2},
                {r: "raspuns", id: 3}, 
                {r: "raspuns", id: 4}
            ],
            raspCorect: 3,
            id: 2,
            render: false
        },
        {
            intrebare: "Intrebare?",
            punctaj: "500$",
            rasp:[
                {r: "raspuns", id: 1},
                {r: "raspuns", id: 2},
                {r: "raspuns", id: 3}, 
                {r: "raspuns", id: 4}
            ],
            raspCorect: 1,
            id: 3,
            render: true
        },
        {
            intrebare: "Intrebare?",
            punctaj: "600$",
            rasp:[
                {r: "raspuns", id: 1},
                {r: "raspuns", id: 2},
                {r: "raspuns", id: 3}, 
                {r: "raspuns", id: 4}
            ],
            raspcorect: 2,
            id: 4,
            render: true
        },
        {
            intrebare: "Intrebare?",
            punctaj: "700$",
            rasp:[
                {r: "raspuns", id: 1},
                {r: "raspuns", id: 2},
                {r: "raspuns", id: 3}, 
                {r: "raspuns", id: 4}
            ],
            raspCorect: 1,
            id: 5,
            render: false
        },
        {
            intrebare: "Intrebare?",
            punctaj: "300$",
            rasp:[
                {r: "raspuns", id: 1},
                {r: "raspuns", id: 2},
                {r: "raspuns", id: 3}, 
                {r: "raspuns", id: 4}
            ],
            raspCorect: 3,
            id: 6,
            render: true
        },
        {
            intrebare: "Intrebare?",
            punctaj: "400$",
            rasp:[
                {r: "raspuns", id: 1},
                {r: "raspuns", id: 2},
                {r: "raspuns", id: 3}, 
                {r: "raspuns", id: 4}
            ],
            raspCorect: 3,
            id: 7,
            render: false
        },
        {
            intrebare: "Intrebare?",
            punctaj: "500$",
            rasp:[
                {r: "raspuns", id: 1},
                {r: "raspuns", id: 2},
                {r: "raspuns", id: 3}, 
                {r: "raspuns", id: 4}
            ],
            raspCorect: 1,
            id: 8,
            render: true
        },
        {
            intrebare: "Intrebare?",
            punctaj: "600$",
            rasp:[
                {r: "raspuns", id: 1},
                {r: "raspuns", id: 2},
                {r: "raspuns", id: 3}, 
                {r: "raspuns", id: 4}
            ],
            raspcorect: 2,
            id: 9,
            render: true
        },
        {
            intrebare: "Intrebare?",
            punctaj: "700$",
            rasp:[
                {r: "raspuns", id: 1},
                {r: "raspuns", id: 2},
                {r: "raspuns", id: 3}, 
                {r: "raspuns", id: 4}
            ],
            raspCorect: 1,
            id: 10,
            render: false
        },
        {
            intrebare: "Intrebare?",
            punctaj: "300$",
            rasp:[
                {r: "raspuns", id: 1},
                {r: "raspuns", id: 2},
                {r: "raspuns", id: 3}, 
                {r: "raspuns", id: 4}
            ],
            raspCorect: 3,
            id: 11,
            render: true
        },
        {
            intrebare: "Intrebare?",
            punctaj: "400$",
            rasp:[
                {r: "raspuns", id: 1},
                {r: "raspuns", id: 2},
                {r: "raspuns", id: 3}, 
                {r: "raspuns", id: 4}
            ],
            raspCorect: 3,
            id: 12,
            render: false
        },
        {
            intrebare: "Intrebare?",
            punctaj: "500$",
            rasp:[
                {r: "raspuns", id: 1},
                {r: "raspuns", id: 2},
                {r: "raspuns", id: 3}, 
                {r: "raspuns", id: 4}
            ],
            raspCorect: 1,
            id: 13,
            render: true
        },
        {
            intrebare: "Intrebare?",
            punctaj: "600$",
            rasp:[
                {r: "raspuns", id: 1},
                {r: "raspuns", id: 2},
                {r: "raspuns", id: 3}, 
                {r: "raspuns", id: 4}
            ],
            raspcorect: 2,
            id: 14,
            render: true
        },
        {
            intrebare: "Intrebare?",
            punctaj: "700$",
            rasp:[
                {r: "raspuns", id: 1},
                {r: "raspuns", id: 2},
                {r: "raspuns", id: 3}, 
                {r: "raspuns", id: 4}
            ],
            raspCorect: 1,
            id: 15,
            render: false
        },
        {
            intrebare: "Intrebare?",
            punctaj: "300$",
            rasp:[
                {r: "raspuns", id: 1},
                {r: "raspuns", id: 2},
                {r: "raspuns", id: 3}, 
                {r: "raspuns", id: 4}
            ],
            raspCorect: 3,
            id: 16,
            render: true
        },
        {
            intrebare: "Intrebare?",
            punctaj: "400$",
            rasp:[
                {r: "raspuns", id: 1},
                {r: "raspuns", id: 2},
                {r: "raspuns", id: 3}, 
                {r: "raspuns", id: 4}
            ],
            raspCorect: 3,
            id: 17,
            render: false
        },
        {
            intrebare: "Intrebare?",
            punctaj: "500$",
            rasp:[
                {r: "raspuns", id: 1},
                {r: "raspuns", id: 2},
                {r: "raspuns", id: 3}, 
                {r: "raspuns", id: 4}
            ],
            raspCorect: 1,
            id: 18,
            render: true
        },
        {
            intrebare: "Intrebare?",
            punctaj: "600$",
            rasp:[
                {r: "raspuns", id: 1},
                {r: "raspuns", id: 2},
                {r: "raspuns", id: 3}, 
                {r: "raspuns", id: 4}
            ],
            raspcorect: 2,
            id: 19,
            render: true
        },
        {
            intrebare: "Intrebare?",
            punctaj: "700$",
            rasp:[
                {r: "raspuns", id: 1},
                {r: "raspuns", id: 2},
                {r: "raspuns", id: 3}, 
                {r: "raspuns", id: 4}
            ],
            raspCorect: 1,
            id: 20,
            render: false
        }   
    ];

    const categorii = [
        {
            category: "CATEGORY 1",
            id: 1
        },
        {
            category: "CATEGORY 2",
            id: 2
        },
        {
            category: "CATEGORY 3",
            id: 3
        },
        {
            category: "CATEGORY 4",
            id: 4
        },
        {
            category: "CATEGORY 5",
            id: 5
        }
    ];

    const renderCards = () => {
        if(!renderQuestion){
            return (
                <div className='card-container buttonsWrapper' >
                    <Card  setCard = { setCard } intrebari = { intrebari } renderQuestion = { renderQuestion } setRenderQuestion= { setRenderQuestion }/>
                    <Category categories={ categorii }/>
                </div>
            )
        }
        else{ 

            return (
                <div className='buttonsWrapper'>
                    <Card  setCard = { setCard } intrebari = { intrebari } renderQuestion = { renderQuestion } setRenderQuestion= { setRenderQuestion }/>
                </div> 
            )
        }
    }

    return ( 
        <div>
            <Link className='back-home' to='/'>GO HOME</Link>
            <img className='upperDots' src={ dots } alt="" />
            <img className='lowerDots' src={ dots } alt="" />
            <div className="top-text">SCORE: { card }</div>
            <Card  setCard = { setCard } intrebari = { intrebari } renderQuestion = { renderQuestion } setRenderQuestion= { setRenderQuestion } categories={ categorii }/>
        </div>
     );
}
 
export default Game;