import { useState } from 'react';
import './styles/Game.css';
import Card from './Card';

const Game = () => {

    const [card, setCard] = useState('Choose a card');
    const intrebari = [
        {
            intrebare: "Cine a fost mihai viteazul?",
            punctaj: "300$",
            rasp:[
                {r: "un conducator al moldovei"},
                {r: "un sofer"},
                {r: "un conducator al romaniei"}, 
                {r: "un gimnast"}
            ],
            raspCorect: 3,
            id: 1
        },
        {
            intrebare: "Cine a fost vlad tepes?",
            punctaj: "400$",
            rasp:[
                {r: "un conducator al moldovei"},
                {r: "un sofer"},
                {r: "un conducator al romaniei"}, 
                {r: "un gimnast"}
            ],
            raspCorect: 3,
            id: 2
        },
        {
            intrebare: "Cine e vladimir putin?",
            punctaj: "500$",
            rasp:[
                {r: "un conducator al rusiei"},
                {r: "un sofer"},
                {r: "un conducator al romaniei"}, 
                {r: "un gimnast"}
            ],
            raspCorect: 1,
            id: 3
        },
        {
            intrebare: "Cum se ajunge pe luna?",
            punctaj: "600$",
            rasp:[
                {r: "cu masina"},
                {r: "cu racheta"},
                {r: "cu barca"}, 
                {r: "un gimnast"}
            ],
            raspcorect: 2,
            id: 4
        },
        {
            intrebare: "Care este cea mai rapida masina?",
            punctaj: "700$",
            rasp:[
                {r: "bugatti"},
                {r: "ferrari"},
                {r: "dacia"}, 
                {r: "mclaren"}
            ],
            raspCorect: 1,
            id: 5
        },
        {
            intrebare: "Cine a facut aceasta interfata?",
            punctaj: "2000$",
            rasp:[
                {r: "simi"},
                {r: "adi"},
                {r: "vlad"}, 
                {r: "cristi"}
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
        <div class="top-text">{ card }</div>
            <div className='card-container'>
                <Card  setCard = { setCard } intrebari = { intrebari }/>
            </div>
        </div>
     );
}
 
export default Game;