//const Tabata = () => null;
import { useState, useEffect } from "react";

const Tabata = ({ duration, init, rehearsal, pause, remaining }) => {
  // valeur à faire passer dans le componet
  const valInitial = init;
  const valFinal = duration;
  const valRepeat = rehearsal;
  const valPause = pause;

  const [total, setTotal] = useState(remaining + 1);

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
    setTotal(remaining + 1);
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
    total,
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
            <p className="numInfo">
              {repeat}/{valRepeat}
            </p>
            <p className="numInfoSec">Times</p>
          </div>
          <div className="info">
            <p className="titleInfo">Pause</p>
            <p className="numInfo">{count}</p>
            <p className="numInfoSec">Seconds</p>
          </div>
          <div className="info">
            <p className="titleInfo">Remaining</p>
            <p className="numInfo">
              {total}/{remaining + 1}
            </p>
            <p className="numInfoSec">Seconds</p>
          </div>
        </div>
      </div>

      <div className="buttonContent">
        {!isFinish && (
          <>
            <button
              className={`button button-${isActive ? "active" : "inactive"}`}
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
  );
};

export default Tabata;
