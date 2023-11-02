//import { useState, useEffect } from "react";

import { useState } from "react";


import Stopwatch from "./Stopwatch";
import Countdown from "./Countdown";
import Tabata from "./Tabata";
import XY from "./XY";


function Panel() {
  const [duration, setDuration] = useState("");
  const [repeat, setNumRepeat] = useState("");
  const [pause, setPause] = useState("");
  const total = (pause + duration) * repeat;

  
  const [validate, setValidate] = useState(false);

  // Remettre les Inputs à zéro
  function handleReset() {
    setDuration("");
    setNumRepeat("");
    setPause("");
    setValidate(false);
  }

  // btn valider les inputs
  function validateInputs() {
    setValidate(true);
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

      {pause !== "" && repeat !== "" && duration !== "" && (
        <>
          <div className="inputPanelValidate">
            <button className="btnResetView" onClick={validateInputs}>Valider</button>
            <button className="btnResetView" onClick={handleReset}>Reset</button>
          </div>
        </>
      )}
      {/* ___________________________________________________Changer les conditions de validation des inputs fields */}

      {validate && (
        <>
          
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


// ### Input de base pour les champs des Timer
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



// ### --------------Affichage du résultat des inputs -------------------------------- AUTRE écran ?????????
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
/* function Button({ onReset }) {
  return (
    <div className="resetView">
      <button
        className="btnResetView"
        onClick={onReset}>
        Reset view
      </button>
    </div>
  );
} */



export default Panel;