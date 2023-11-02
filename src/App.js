import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";

import DocumentationView from "./views/DocumentationView";
import TimersView from "./views/TimersView";

// ---------------------- peggy import ----------------------
import "./counter.css";

//import { useState, useEffect } from "react";

/* import Stopwatch from "./components/timers/Stopwatch";
import Countdown from "./components/timers/Countdown";
import Tabata from "./components/timers/Tabata";
import XY from "./components/timers/XY"; */



import Panel from "./components/timers/Panel";
// ---------------------- end import ----------------------





const Container = styled.div`
  background: #f0f6fb;
  height: 100vh;
  overflow: auto;
`;

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Timers</Link>
        </li>
        <li>
          <Link to="/docs">Documentation</Link>
        </li>
      </ul>
    </nav>
  );
};


/** ----------------------------------------------------------- **/

/* function Panel() {
  const [duration, setDuration] = useState("");
  const [repeat, setNumRepeat] = useState("");
  const [pause, setPause] = useState("");
  const total = (pause + duration) * repeat;

  function handleReset() {
    setDuration("");
    setNumRepeat("");
    setPause("");
  }

  return (
    <div className="panel">
      <div className="inputPanel">
        <h1 className="csci-e39">CSCI E-39</h1>
        <h1 className="black">Counter</h1>

        <TimerDurationInput duration={duration} onSetDuration={setDuration}>
          Timer duration in seconds
        </TimerDurationInput>

        <TimerDurationInput duration={repeat} onSetDuration={setNumRepeat}>
          Number of timer repeats
        </TimerDurationInput>

        <TimerDurationInput duration={pause} onSetDuration={setPause}>
          Break duration
        </TimerDurationInput>
      </div>

      {pause > 0 && (
        <>
          <div className="inputPanel">
            <Button onReset={handleReset} />
          </div>
          <DisplayTime
            duration={duration}
            repeat={repeat}
            pause={pause}
            total={total}
          />
        </>
      )}
    </div>
  );
}

// ### INPUT de base pour les champs des Timer
function TimerDurationInput({ children, duration, onSetDuration }) {
  return (
    <div>
      <label>{children}</label>
      <input
        type="text"
        placeholder={children}
        value={duration}
        onChange={(e) => onSetDuration(Number(e.target.value))}
      />
    </div>
  );
}

// ### Affichage du résultat des inputs
function DisplayTime({ duration, repeat, pause, total }) {
  return (
    <div className="displayResult">
      <div className="resultContent">
        <h3 className="resultTitle">Timer results for your request</h3>
        <div className="resultBox">
          <div className="resultNum">{duration}</div>
          <div className="resultTxt">
            Timer <br />
            Duration
          </div>
        </div>

        <div className="resultBox">
          <div className="resultNum">{repeat}</div>
          <div className="resultTxt">
            number <br /> of Repeat
          </div>
        </div>

        <div className="resultBox">
          <div className="resultNum">{pause}</div>
          <div className="resultTxt">
            break <br />
            duration
          </div>
        </div>

        <div className="resultBox">
          <div className="resultNum">{total}</div>
          <div className="resultTxt">
            Total <br />
            length
          </div>
        </div>
      </div>

      <div className="resultContentLink">
        <h4 className="selectTimer">Selects one of the timers</h4>
        <div className="resultBoxLink">
          <div className="resultNumLink">TABATA</div>
        </div>

        <div className="resultBoxLink">
          <div className="resultNumLink">XY</div>
        </div>

        <div className="resultBoxLink">
          <div className="resultNumLink">COUNTDOWN</div>
        </div>

        <div className="resultBoxLink">
          <div className="resultNumLink">STOPWATCH</div>
        </div>
      </div>


      <div>
        <Tabata
          duration={0}
          init={duration}
          rehearsal={repeat}
          pause={pause}
          remaining={total}
        />
        <XY duration={0} init={duration} rehearsal={repeat} />
        <Countdown duration={0} init={duration} />
        <Stopwatch duration={duration} init={0} />
      </div>
    </div>
  );
}

// ### btn pour tout recommencer
function Button({ onReset }) {
  return (
    <div className="resetView">
      <button className="btnResetView" onClick={onReset}>
        Reset view
      </button>
    </div>
  );
} */

/** ----------------------------------------------------------- **/




const App = () => {
  return (
    <Container>
      <Router>
        <Nav />
        <Panel />
        <Routes>
          <Route path="/docs" element={<DocumentationView />} />
          {/*  charge par defaut, tout les composants
          <Route path="/" element={<TimersView />} /> 
        */}
        </Routes>
      </Router>
    </Container>
  );
};

export default App;
