import React,{useState} from "react";  
//import axios from 'axios';
import Weather from "./components/Weather";
function App() {
  return (
    //const url=`https://api.openweathermap.org/data/2.5/weather?q=Warangal&appid=32d331e36cd4aa097b52aaf86582e58a`
    <div className="App">
     <Weather />
    </div>
  );
}

export default App;
