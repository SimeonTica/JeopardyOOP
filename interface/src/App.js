import Home from './Home';
import Game from './Game';
import GameOptions from './GameOptions';
import Rules from './Rules';
import Credits from './Credits';
import Singleplayer from './Singleplayer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
      <div className='App'>
        <div className='content'>
          <Routes>
            <Route path='/' element={ <Home /> }></Route>
            <Route path='/game' element={ <Game /> }></Route>
            <Route path='/singleplayer' element={ <Singleplayer /> }></Route>
            <Route path='/credits' element={ <Credits /> }></Route> 
            <Route path='/rules' element={ <Rules /> }></Route> 
            <Route path='/game-options' element={ <GameOptions /> }></Route> 
          </Routes>  
        </div>
      </div>
    </Router>
  );
}

export default App;
