import { useState, useEffect } from "react";

//const Stopwatch = () => null;

// ----------------------------- StopWatch -------------------------------------
const Stopwatch = ({ duration, init }) => {
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
      </div>
    </div>
  );
};

export default Stopwatch;
