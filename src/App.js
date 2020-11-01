import React, {useState} from 'react';
import Particles from "react-tsparticles";
import './App.css';
import particlesOptions from "./particles.json";
import DarkModeToggle from "react-dark-mode-toggle";

// create mqtt client
var mqtt    = require('mqtt');
var options = {
    username: "709130521220",
	password: "aio_WQTu75eQGGEMApVuJIsWUq51c8xJ",
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    keepalive: 60,
    reconnectPeriod: 1000,
    clean: true,
    port: 443

};
var client  = mqtt.connect('ws://io.adafruit.com', options);

// init page
console.log("Lights on")

function App() {
    const [isDarkMode, setIsDarkMode] = useState(() => false);

    const toggleClass = () => {
        setIsDarkMode(!isDarkMode);
        if (isDarkMode) {
            console.log("Lights on")
            client.publish("709130521220/feeds/bl.brightness", "45")
        } else {
            console.log("Lights off")
            client.publish("709130521220/feeds/bl.brightness", "0")
        }
      };
    return (
        <div className="App">
            <Particles options={particlesOptions}/>
            <header className="App-header">
                <div>Lights On/Off</div>
                <DarkModeToggle header="test"
                
                    onChange={toggleClass}
                    checked={isDarkMode}
                    size={150}
                />
            </header>
        </div>
    );
}

export default App;
