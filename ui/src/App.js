import './App.css';
import React, { useState } from 'react';
import WelcomeScreen from './WelcomeScreen/WelcomeScreen.js';
import FirstScreen from './FirstScreen/FirstScreen.js';
import SecondScreen from './SecondScreen/SecondScreen.js';
import ThirdScreen from './ThirdScreen/ThirdScreen.js';
import FourthScreen from './FourthScreen/FourthScreen.js';


function App() {

  const [page, setPage] = useState(0);

  return (
    <div className="App">
      <div className="Header">
          <div className="NavBar">
          <div onClick={() => setPage(0)} style={{fontWeight: page === 0 ? "bold" : "normal"}} className="NavButton">
            Welcome Page
          </div>  
          <div onClick={() => setPage(1)} style={{fontWeight: page === 1 ? "bold" : "normal"}} className="NavButton">
            Services and Visits
          </div>  
          <div onClick={() => setPage(2)} style={{fontWeight: page === 2 ? "bold" : "normal"}} className="NavButton">
            Sales and Customers Info
          </div> 
          <div onClick={() => setPage(3)} style={{fontWeight: page === 3 ? "bold" : "normal"}} className="NavButton">
            Covid-19 Safety Measures
          </div> 
          <div onClick={() => setPage(4)} style={{fontWeight: page === 4 ? "bold" : "normal"}} className="NavButton">
            Halls of Fame
          </div> 
          </div>  
      </div>
        {
          page === 0
          ?    
          <WelcomeScreen />
          :
          null
        }
        {
          page === 1
          ?    
          <FirstScreen />
          :
          null
        }
        {
          page === 2
          ?    
          <SecondScreen />          
          :
          null
        }
        {
          page === 3
          ?    
          <ThirdScreen />
          :
          null
        }
        {
          page === 4
          ?    
          <FourthScreen />
          :
          null
        }
    </div>
  );
}

export default App;
