import { Link } from "react-router-dom";
import './styles/Rules.css';
import dots from './images/BgDots.png';

const Rules = () => {
    return ( 
        <div className="buttonsWrapper rules">
            <img src={ dots } className="upperDots" alt=''/>
            <img src={ dots } className="lowerDots" alt=''/>
            <div className="rules-title">
                Rules
            </div>
            <div className="rules-content">
                <span className="rules-content-header">Game Structure: </span>
                The game consists of three rounds: Jeopardy!, Double Jeopardy!, and Final Jeopardy!
                Each round has a game board with categories and clues of increasing point values.
                <br /><span className="rules-content-header">Categories: </span>
                The game board features six categories, and each category has five clues of ascending point values.
                <br /><span className="rules-content-header">Game Start: </span>
                Three contestants compete in each episode.
                Contestants are selected through a qualifying process before the show.
                <br /><span className="rules-content-header">Clue Selection: </span>
                Contestants take turns selecting a clue from the game board.
                Clues are presented in the form of answers, and contestants respond with the corresponding questions.
                <br /><span className="rules-content-header">Responding To Clues: </span>
                Contestants use a buzzer system to signal that they want to respond.
                The first contestant to buzz in has the opportunity to answer.
                Responses must be in the form of a question (e.g., "What is...?" or "Who is...?").
                <br /><span className="rules-content-header">Scoring: </span>
                Correct responses earn the contestant the point value of the selected clue.
                Incorrect responses result in a deduction of the corresponding points.
                Contestants can "wager" or choose how much money they want to risk during certain rounds.
                <br /><span className="rules-content-header">Daily Double: </span>
                Two "Daily Double" clues are hidden on the board, allowing contestants to wager any or all of their current winnings on a single clue.
                <br /><span className="rules-content-header">Double Jeopardy!: </span>
                In the second round, point values are doubled.
                The game board features new clues, and contestants can accumulate more points.
                <br /><span className="rules-content-header">Final Jeopardy!: </span>
                After Double Jeopardy!, contestants can wager any or all of their winnings on a single Final Jeopardy! clue.
                They write down their responses and wagers during a designated time.
                <br /><span className="rules-content-header">Winning the Game: </span>
                The contestant with the highest total at the end of Final Jeopardy! wins.
                Contestants who finish with zero or negative winnings do not advance to Final Jeopardy!
                <br /><span className="rules-content-header">Tiebreaker: </span>
                In the event of a tie, additional tiebreaker questions are used to determine the winner.
            </div>
            <Link className="card rules-back" to='/'>Back</Link>
        </div>
     );
}
 
export default Rules;