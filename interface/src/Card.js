import { useNavigate } from "react-router-dom";

const Card = ({setCard, intrebari}) => {

    const navigate = useNavigate();

    return ( 

        intrebari.map(intrebare => (
        <div className='card' onMouseOver={() => setCard(intrebare.punctaj)} onClick={() => navigate('/game/question', { state: {intrebare: intrebare}})}>{ intrebare.punctaj }</div>
        ))
        
     );
}
 
export default Card;