import { useState } from "react";
import Question from "./Question";
import Category from "./Category";

const Card = ({setCard, intrebari, renderQuestion, setRenderQuestion, categories}) => {

    const [question, setQuestion] = useState(null);

    const setCardtoCategory = (intrebare) => {
        categories.forEach(category => {
            if(category.id === intrebare.id % 5){
                setCard(category.category)       
            }
        });
    }

    return ( 

        <div>
            { !renderQuestion ? 
                <div className="card-container buttonsWrapper">
                    {[ <Category key='0' categories = { categories }/>,
                        intrebari.map(intrebare => (intrebare.render ? 
                        <div key={intrebare.id} className='card' onMouseOver={() => setCard("SCORE: " + intrebare.punctaj)} onClick={() => {
                            setCardtoCategory(intrebare);
                            setRenderQuestion(true);
                            setQuestion(intrebare);
                        }}>{ intrebare.punctaj }</div>
                        :
                        <div key={intrebare.id} className='card no-render' onMouseOver={() => setCard("SCORE: " + intrebare.punctaj)}>{ intrebare.punctaj }</div>
                        )) ]}
                </div>
                :
                <div className="buttonsWrapper">
                    <Question intrebare = { question } setRenderQuestion = { setRenderQuestion } setCard = { setCard }/>
                </div>
            }
        </div>
    ); 
}
 
export default Card;