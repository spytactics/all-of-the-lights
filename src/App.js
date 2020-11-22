import React, {useState} from 'react';
import Particles from "react-tsparticles";
import './App.css';
import particlesOptions from "./particles.json";
import DarkModeToggle from "react-dark-mode-toggle";
import { SliderPicker } from 'react-color';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

// global var
const MQTT_KEY =  process.env.MQTT_KEY;
const MQTT_USER = process.env.MQTT_USERY;
// create mqtt client
var mqtt    = require('mqtt');
var options = {
    username: MQTT_USER,
	password: MQTT_KEY,
    clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
    keepalive: 60,
    reconnectPeriod: 1000,
    clean: true,
    port: 443

};
var client  = mqtt.connect('ws://io.adafruit.com', options);

// disable page scroll
document.body.classList.add("no-sroll")

// init page
console.log("Lights on")
client.publish("709130521220/feeds/bl.brightness", "120")


const divStyle = {
    marginLeft: '10px',
  };



function App() {
    const [isDarkMode, setIsDarkMode] = useState(() => false);
    const [colorHexCode, setColorHexCode] = useState('#862d2d');
    //const [selected, setSelected] = useState([]);

    const toggleColor = (color) => {
        setColorHexCode(color.hex)
        client.publish("709130521220/feeds/bl.color", color.hex)
    }

    const options = [
        { value: '1', label: 'Static' },
        { value: '2', label: 'Blink' },
        { value: '3', label: 'Breath' },
        { value: '4', label: 'Color Wipe' },
        { value: '5', label: 'Color Wipe Inverse' },
        { value: '6', label: 'Color Wipe Reverse' },
        { value: '7', label: 'Color Wipe Reverse Inverse' },
        { value: '8', label: 'Color Wipe Random' },
        { value: '9', label: 'Random Color' },
        { value: '10', label: 'Single Dynamic' },
        { value: '11', label: 'Multi Dynamic' },
        { value: '12', label: 'Rainbow' },
        { value: '13', label: 'Rainbow Cycle' },
        { value: '14', label: 'Scan' },
        { value: '15', label: 'Dual Scan' },
        { value: '16', label: 'Fade' },
        { value: '17', label: 'Theater Chase' },
        { value: '18', label: 'Theater Chase Rainbow' },
        { value: '19', label: 'Running Lights' },
        { value: '20', label: 'Twinkle' },
        { value: '21', label: 'Twinkle Random' },
        { value: '22', label: 'Twinkle Fade' },
        { value: '23', label: 'Twinkle Fade Random' },
        { value: '24', label: 'Sparkle' },
        { value: '25', label: 'Flash Sparkle' },
        { value: '26', label: 'Hyper Sparkle' },
        { value: '27', label: 'Strobe' },
        { value: '28', label: 'Strobe Rainbow' },
        { value: '29', label: 'Multi Strobe' },
        { value: '30', label: 'Blink Rainbow' },
        { value: '31', label: 'Chase White' },
        { value: '32', label: 'Chase Color' },
        { value: '33', label: 'Chase Random' },
        { value: '34', label: 'Chase Rainbow' },
        { value: '35', label: 'Chase Flash' },
        { value: '36', label: 'Chase Flash Random' },
        { value: '37', label: 'Chase Rainbow White' },
        { value: '38', label: 'Chase Blackout' },
        { value: '39', label: 'Chase Blackout Rainbow' },
        { value: '40', label: 'Color Sweep Random' },
        { value: '41', label: 'Running Color' },
        { value: '42', label: 'Running Red Blue' },
        { value: '43', label: 'Running Random' },
        { value: '44', label: 'Larson Scanner' },
        { value: '45', label: 'Comet' },
        { value: '46', label: 'Fireworks' },
        { value: '47', label: 'Fireworks Random' },
        { value: '48', label: 'Merry Christmas' },
        { value: '49', label: 'Fire Flicker' },
        { value: '50', label: 'Fire Flicker (soft)' },
        { value: '51', label: 'Fire Flicker (intense)' },
        { value: '52', label: 'Circus Combustus' },
        { value: '53', label: 'Halloween' },
        { value: '54', label: 'Bicolor Chase' },
        { value: '55', label: 'Tricolor Chase' },    
    ]
    const defaultOption = options[0]


    const selectMode = (mode) => {
        client.publish("709130521220/feeds/bl.mode", mode.value)
    }

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
        <div style={divStyle} className="App">
            <Particles options={particlesOptions}/>
            <container>
                <Dropdown options={options} onChange={selectMode} value={defaultOption} placeholder="Select an option" />
            </container>
            <container className="App-header" id="scroll-container">
                <div>Lights On/Off</div>
                <DarkModeToggle
                    onChange={toggleClass}
                    checked={isDarkMode}
                    size={150}
                />
            </container>
            <container className="body-header">
            <div></div>
                <SliderPicker
                    color={colorHexCode}
                    onChangeComplete={toggleColor}
                    style={({ marginLeft: '0.8rem' })}
                />
            </container>
            <container></container>
        </div>
    );
}

export default App;
