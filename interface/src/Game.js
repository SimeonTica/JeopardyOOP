import { useState } from 'react';
import './styles/Game.css';
import Card from './Card';

const Game = () => {

    const [card, setCard] = useState('Choose a card');
    const [renderQuestion, setRenderQuestion] = useState(false);

    const intrebari = [
        {
            intrebare: "Cine a fost mihai viteazul?",
            punctaj: "300$",
            rasp:[
                {r: "un conducator al moldovei", id: 1},
                {r: "un sofer", id: 2},
                {r: "un conducator al romaniei", id: 3}, 
                {r: "un gimnast", id: 4}
            ],
            raspCorect: 3,
            id: 1
        },
        {
            intrebare: "Cine a fost vlad tepes?",
            punctaj: "400$",
            rasp:[
                {r: "un conducator al moldovei", id: 1},
                {r: "un sofer", id: 2},
                {r: "un conducator al romaniei", id: 3}, 
                {r: "un gimnast", id: 4}
            ],
            raspCorect: 3,
            id: 2
        },
        {
            intrebare: "Cine e vladimir putin?",
            punctaj: "500$",
            rasp:[
                {r: "un conducator al rusiei", id: 1},
                {r: "un sofer", id: 2},
                {r: "un conducator al romaniei", id: 3}, 
                {r: "un gimnast", id: 4}
            ],
            raspCorect: 1,
            id: 3
        },
        {
            intrebare: "Cum se ajunge pe luna?",
            punctaj: "600$",
            rasp:[
                {r: "cu masina", id: 1},
                {r: "cu racheta", id: 2},
                {r: "cu barca", id: 3}, 
                {r: "un gimnast", id: 4}
            ],
            raspcorect: 2,
            id: 4
        },
        {
            intrebare: "Care este cea mai rapida masina?",
            punctaj: "700$",
            rasp:[
                {r: "bugatti", id: 1},
                {r: "ferrari", id: 2},
                {r: "dacia", id: 3}, 
                {r: "mclaren", id: 4}
            ],
            raspCorect: 1,
            id: 5
        },
        {
            intrebare: "Cine a facut aceasta interfata?",
            punctaj: "2000$",
            rasp:[
                {r: "simi", id: 1},
                {r: "adi", id: 2},
                {r: "vlad", id: 3}, 
                {r: "cristi", id: 4}
            ],
            raspCorect: 1,
            id: 6
        }
    ];


    return ( 
        <div>
            {/* aici trebuie facut un template care sa incarca el div in functie de fetch ul pe care
             il facem si cate intrebari avem nu o sa fie asa 
             plus ca trebuie sa avem un meniu unde sa selectam jucatorii
             */}
        <div className="top-text">{ card }</div>
            {!renderQuestion ? <div className='card-container' >
                <Card  setCard = { setCard } intrebari = { intrebari } setRenderQuestion= { setRenderQuestion }/>
            </div>:
            <div>
                <Card  setCard = { setCard } intrebari = { intrebari } renderQuestion = { renderQuestion } setRenderQuestion= { setRenderQuestion }/>
            </div>   
             }
        </div>
     );
}
 
export default Game;