import './styles/Question.css';

const Question = ({intrebare, setRenderQuestion, setCard}) => {

const raspunsuri = intrebare.rasp;

    return ( 
        <div className='raspunsuriWrapper'>
                {raspunsuri.map(rasp => (
                    <div key={ rasp.id } className="raspuns" 
                    onClick={() => {setRenderQuestion(false); setCard('Choose a card')}}>{ rasp.r }</div>))}
        </div>
     );
}
 
export default Question;