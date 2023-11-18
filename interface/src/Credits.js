import { Link } from "react-router-dom";
import './styles/Credits.css';
import dots from './images/BgDots.png';

const Credits = () => {
    return ( 
        <div className="buttonsWrapper credits">
            <img src={ dots } className="upperDots" alt=""/>
            <img src={ dots } className="lowerDots" alt=""/>
            <div className="credits-title">
                Credits
            </div>
            <div className="credits-content">
                This application was built by a team of five students from the University of Polytehnics
                in Bucharest, Faculty of Automatic Control and Computer Science, Romania. Each of the students
                contributed to the project in their own creative way, and the result is a
                fully functional <span className="credits-content-header">Jeopardy!</span> game. 
                <br /><br /><span className="credits-content-header">Team members: </span> Bolohan 
                Marian-Cristian, Gavrila Adrian-Daniel, Munteanu Vlad-George, Zarnescu
                Dragos Ioan and team leader Tica Simeon.
                <br /><br />This applications was built as part of the European project 
                "Fostering the Transversal Digital Competences in Higher Education” (Acronym: FTDCHE)
                Ref. Project: 2022-1-ES01-KA220-HED-000089861.
                <br /><br /><span className="credits-content-header">Special thanks </span> to our teacher,
                 Mr. M. Caramihai for his guidance and support thorughout each and every step required to 
                 bring this project to life.
            </div>
            <Link className="card credits-back" to='/'>Back</Link>
        </div>
     );
}
 
export default Credits;