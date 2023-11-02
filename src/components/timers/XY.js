import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


//const XY = () => null;

const XY = ({ duration, init, rehearsal }) => {

  const navigate = useNavigate();
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
          <div className="timerSecond">
            {seconds}/{valInitial}
          </div>
          <div className="timerSecond">seconds</div>
        </div>
        <div className="counterBoxXY">
          <div className="timerTitle">Repeat</div>
          <div className="timerDisplaySecond">{repeat}</div>
          <div className="timerSecond">
            {repeat}/{valRepeat}
          </div>
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
              onClick={toggle}
            >
              {isActive ? "Pause" : "Start"}
            </button>

            <button className="button" onClick={forward}>
              Forward
            </button>
          </>
        )}
        <button className="button" onClick={reset}>
          Reset
        </button>
      </div>
      {/*  to do: when using route: no input form at the beginning but only in component
      <button
        className="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button> */}
    </div>
  );
};

export default XY;
