import { useState } from "react";
import Question from "./Question";
import Category from "./Category";

const Card = ({setCard, intrebari, renderQuestion, setRenderQuestion, categories}) => {

    const [question, setQuestion] = useState(null);

    return ( 

        <div>
            { !renderQuestion ? 
                <div className="card-container buttonsWrapper">
                    {[ <Category key='0' categories = { categories }/>,
                        intrebari.map(intrebare => (intrebare.render ? 
                        <div key={intrebare.id} className='card' onMouseOver={() => setCard(intrebare.punctaj)} onClick={() => {
                            setCard(intrebare.intrebare);
                            setRenderQuestion(true);
                            setQuestion(intrebare);
                        }}>{ intrebare.punctaj }</div>
                        :
                        <div key={intrebare.id} className='card no-render' onMouseOver={() => setCard(intrebare.punctaj)}>{ intrebare.punctaj }</div>
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