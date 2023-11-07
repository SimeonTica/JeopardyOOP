import Navbar from './Navbar';
import Home from './Home';
import Game from './Game';
import AboutUs from './AboutUs';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
      <div className='App'>
        <Navbar />
        <div className='content'>
          <Routes>
            <Route path='/' element={ <Home /> }></Route>
            <Route path='/game' element={ <Game /> }></Route>
            <Route path='/about-us' element={ <AboutUs /> }></Route> 
          </Routes>  
        </div>
      </div>
    </Router>
  );
}

export default App;
