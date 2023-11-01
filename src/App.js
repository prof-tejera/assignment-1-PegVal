import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";

import DocumentationView from "./views/DocumentationView";
import TimersView from "./views/TimersView";

// ---------------------- peggy import ----------------------
import "./counter.css";
import { useState, useEffect } from "react";
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


// ----------- peggy components bloc: à déplacer après ----------------

// ### PANEL
function Panel() {
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


// ### Choix des différentes durées du Timer
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
        <TABATA
          duration={0}
          init={duration}
          rehearsal={repeat}
          pause={pause}
          remaining={total}
        />
        <XY
          duration={0}
          init={duration}
          rehearsal={repeat}
        />
        <CountDown
          duration={0}
          init={duration}
        />
        <StopWatch
          duration={duration}
          init={0}
        />
      </div>
    </div>
  );
}



// ----------------------------- TABATA -------------------------------------
const TABATA = ({ duration, init, rehearsal, pause, remaining }) => {
  // valeur à faire passer dans le componet
  const valInitial = init;
  const valFinal = duration;
  const valRepeat = rehearsal;
  const valPause = pause;

  const [total, setTotal] = useState(remaining+1);

  const [repeat, setRepeat] = useState(valRepeat); 
  const [seconds, setSeconds] = useState(valInitial);
  const [isActive, setIsActive] = useState(false); // btn play/pause
  const [isFinish, setIsFinish] = useState(false); // quand on arrive à la fin

  const [count, setCount] = useState(valPause); 
  const [pauseActif, setpauseActif] = useState(false);

  function toggle() {
    setIsActive(!isActive); // intervertir la valeur pour le btn Play/Pause
  }

  function reset() {
    setSeconds(valInitial);
    setIsActive(false);
    setIsFinish(false); // quand tout est terminé (pause et repetition inclus)
    setRepeat(valRepeat); // nombre de répétition: retour à la la valeur initiale
    setCount(valPause); // pause: retour à la valeur initiale
    setpauseActif(false); // la pause est inactive
    setTotal(remaining+1); 
    console.log("reset");
  }

  function forward() {
    setSeconds(valFinal); // timer: retour à la la valeur initiale
    setIsFinish(true); // c'est terminé
    setRepeat(0); // pour le repeat: au reset réinitialiser les valeurs
    setCount(0); // pour le timer de la pause: au reset réinitialiser les valeurs
    setpauseActif(false); // la pause est inactive
    setTotal(0);
    console.log("Forward end");
  }

  useEffect(() => {
    
    if (repeat > 0) {
      let interval = setInterval(() => {
        // ---- pause  pauseActif = true;
        if (count > 0 && pauseActif !== false) {
          setCount(count - 1);
          setTotal(total - 1);
          console.log("count", count);
          if (count === 1) {
            console.log("Redémarrer les compteurs");
            // ----- n° de round -----
            setSeconds((seconds) => valInitial); // on recommence le timer
            setCount((count) => valPause); // on recommence le compteur de la pause 
            setpauseActif(false); // on change le param de pause pour pouvoir recommencer
            setRepeat((repeat) => repeat - 1); // decrement n° of repeat
          }
        } else if (isActive && !pauseActif && count !== valPause) {
          setpauseActif(true); 
          clearInterval(interval);
          console.log("PAUSE ---> Start");
        }

        // ---- duration
        if (isActive && seconds !== valFinal) {
          setSeconds(seconds - 1);
          console.log("seconds", seconds);
          setTotal(total - 1);

          if (seconds === valFinal + 1) {
            console.log("round terminé");
            setpauseActif(true); // coundown de la pause
          }
        } else if (!isActive && pauseActif && seconds !== valInitial) {
          setpauseActif(false); 
          clearInterval(interval);
          console.log("TIMER ---> Pause");
        }
      }, 1000);

      return () => clearInterval(interval);
    } else {
      console.log("Tout est TERMINÉ!");
      setIsFinish(true); // quand on arrive à la fin, les btn doivent disparaitre
      setRepeat(0);
      setSeconds(0);
      setCount(0);
      setTotal(0);
    }
  }, [
    isActive,
    seconds,
    repeat,
    valFinal,
    valInitial,
    count,
    pauseActif,
    valPause,
    total
  ]);

  return (
    <div className="counter-content" id="#tabata">
      <h2>TABATA</h2>
      <h4>
        You have requested a counter from ({valInitial} to {valFinal}) with a
        pause of {valPause} seconds, {valRepeat} times
      </h4>

      <div className="counterBoxContent">
        <div className="counterBox">
          <div className="timerTitle">Timer</div>
          <div className="timerDisplaySecond">{seconds} </div>
          <div className="timerSecond">seconds</div>
        </div>
        <div className="infoBoxContent">
          <div className="info">
            <p className="titleInfo">Repeat</p>
            <p className="numInfo">{repeat}/{valRepeat}</p>
            <p className="numInfoSec">Times</p>
          </div>
          <div className="info">
            <p className="titleInfo">Pause</p>
            <p className="numInfo">{count}</p>
            <p className="numInfoSec">Seconds</p>
          </div>
          <div className="info">
            <p className="titleInfo">Remaining</p>
            <p className="numInfo">{total}/{remaining+1}</p>
            <p className="numInfoSec">Seconds</p>
          </div>
        </div>
      </div>

      <div className="buttonContent">
        {!isFinish && (
          <>
            <button
              className={`button button-${
                isActive ? "active" : "inactive"
              }`}
              onClick={toggle}>
              {isActive ? "Pause" : "Start"}
            </button>

            <button
              className="button"
              onClick={forward}>
              Forward
            </button>
          </>
        )}
        <button
          className="button"
          onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};



// ----------------------------- XY -------------------------------------
const XY = ({ duration, init, rehearsal }) => {
  // valeur à faire passer dans le component
  const valInitial = init;
  const valFinal = duration;
  const valRepeat = rehearsal;

  const [repeat, setRepeat] = useState(valRepeat); // pour le repeat
  const [seconds, setSeconds] = useState(valInitial);
  const [isActive, setIsActive] = useState(false); // btn play/pause
  const [isFinish, setIsFinish] = useState(false); // quand on arrive à la fin

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(valInitial);
    setIsActive(false);
    setIsFinish(false);
    setRepeat(valRepeat); // pour le repeat: au reset réinitialiser les valeurs
  }

  function forward() {
    setSeconds(valFinal);
    setIsFinish(true);
    setRepeat(0); // pour le repeat: au reset réinitialiser les valeurs
  }

  useEffect(() => {
    let interval = null;

    if (repeat > 0) {
      // --------------
      if (isActive && seconds !== valFinal) {
        interval = setInterval(() => {
          setSeconds((seconds) => seconds - 1); // + -
          console.log("seconds", seconds, "valFinal", valFinal);

          if (seconds === valFinal + 1) {
            console.log("round terminé");
            console.log("seconds", seconds, "valFinal", valFinal);
            setSeconds((seconds) => valInitial); // on recommence
            setRepeat((repeat) => repeat - 1); // decrement n° of repeat
          }
        }, 1000);
      } else if (!isActive && seconds !== valInitial) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    } else {
      console.log("timer + n° de fois TERMINÉ!");
      setIsFinish(true); // quand on arrive à la fin, les btn doivent disparaitre
      setRepeat(0);
      setSeconds(0);
    }
  }, [isActive, seconds, repeat, valFinal, valInitial]);

  return (
    <div className="counter-content" id="#xy">
      <h2>XY</h2>
      <h4>
        You have requested a counter from ({valInitial} to {valFinal}) *{" "}
        {valRepeat} times
      </h4>

      <div className="counterBoxContentXY">
        <div className="counterBoxXY">
          <div className="timerTitle">Timer</div>
          <div className="timerDisplaySecond">{seconds}</div>
          <div className="timerSecond">{seconds}/{valInitial}</div>
          <div className="timerSecond">seconds</div>
        </div>
        <div className="counterBoxXY">
          <div className="timerTitle">Repeat</div>
          <div className="timerDisplaySecond">{repeat}</div>
          <div className="timerSecond">{repeat}/{valRepeat}</div>
          <div className="timerSecond">Times</div>
        </div>
      </div>

      <div className="buttonContent">
        {!isFinish && (
          <>
            <button
              className={`button button-primary button-primary-${
                isActive ? "active" : "inactive"
              }`}
              onClick={toggle}>
              {isActive ? "Pause" : "Start"}
            </button>

            <button
              className="button"
              onClick={forward}>
              Forward
            </button>
          </>
        )}
        <button
          className="button"
          onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};





// ----------------------------- CountDown -------------------------------------
const CountDown = ({ duration, init }) => {
  const valInitial = init;
  const valFinal = duration;

  const [seconds, setSeconds] = useState(valInitial);
  const [isActive, setIsActive] = useState(false); // btn play/pause
  const [isFinish, setIsFinish] = useState(false); // quand on arrive à la fin

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(valInitial);
    setIsActive(false);
    setIsFinish(false);
  }

  function forward() {
    setSeconds(valFinal);
    setIsFinish(true);
  }

  useEffect(() => {
    let interval = null;
    if (isActive && seconds !== valFinal) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1); // + -
        console.log(seconds);
        if (seconds === valFinal + 1) { // + -
          console.log("terminé");
          setIsFinish(true); // quand on arrive à la fin, les btn doivent disparaitre
        }
      }, 1000);
    } else if (!isActive && seconds !== valInitial) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, valFinal, valInitial]);

  return (
    <div className="counter-content" id="#countdown">
      <h2>CountDown</h2>
      <h4>
        You have requested a counter from ({valInitial} to {valFinal})
      </h4>

      <div className="counterBoxContentCount">
        <div className="counterBox">
          <div className="timerTitle">Timer</div>
          <div className="timerDisplaySecond">{seconds}</div>
          <div className="timerSecond">
            {seconds}/{valInitial}
          </div>
          <div className="timerSecond">seconds</div>
        </div>

        <div className="buttonContentCount">
          {!isFinish && (
            <>
              <button
                className={`button button-primary button-primary-${
                  isActive ? "active" : "inactive"
                }`}
                onClick={toggle}>
                {isActive ? "Pause" : "Start"}
              </button>

              <button
                className="button"
                onClick={forward}>
                Forward
              </button>
            </>
          )}
          <button
            className="button"
            onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};


// ----------------------------- StopWatch -------------------------------------
const StopWatch = ({ duration, init }) => {
  const valInitial = init;
  const valFinal = duration;

  const [seconds, setSeconds] = useState(valInitial);
  const [isActive, setIsActive] = useState(false); // btn play/pause
  const [isFinish, setIsFinish] = useState(false); // quand on arrive à la fin

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(valInitial);
    setIsActive(false);
    setIsFinish(false);
  }

  function forward() {
    setSeconds(valFinal);
    setIsFinish(true);
  }

  useEffect(() => {
    let interval = null;
    if (isActive && seconds !== valFinal) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
        console.log(seconds);
        if (seconds === valFinal - 1) {
          console.log("terminé");
          setIsFinish(true); // quand on arrive à la fin, les btn doivent disparaitre
        }
      }, 1000);
    } else if (!isActive && seconds !== valInitial) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, valFinal, valInitial]);

  return (
    <div className="counter-content" id="#stopwatch">
      <h2>StopWatch</h2>
      <h4>
        You have requested a counter from ({valInitial} to {valFinal})
      </h4>
      <div className="counterBoxContentCount">
        <div className="counterBox">
          <div className="timerTitle">Timer</div>
          <div className="timerDisplaySecond">{seconds}</div>
          <div className="timerSecond">
            {seconds}/{valFinal}
          </div>
          <div className="timerSecond">seconds</div>
        </div>

        <div className="buttonContentCount">
          {!isFinish && (
            <>
              <button
                className={`button button-primary button-primary-${
                  isActive ? "active" : "inactive"
                }`}
                onClick={toggle}>
                {isActive ? "Pause" : "Start"}
              </button>

              <button
                className="button"
                onClick={forward}>
                Forward
              </button>
            </>
          )}
          <button
            className="button"
            onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};


// ### btn pour tout recommencer
function Button({ onReset }) {
  return (
    <div className="resetView">
      <button
        className="btnResetView"
        onClick={onReset}>
        Reset view
      </button>
    </div>
  );
}

// --------------------------------------------------------------------



const App = () => {
  return (
    <div>
      <Panel />
    </div>
    /*  <Container>
      <Router>
        <Nav />
        <Routes>
          <Route path="/docs" element={<DocumentationView />} />
          <Route path="/" element={<TimersView />} />
        </Routes>
      </Router>
    </Container> */
  );
};

export default App;
