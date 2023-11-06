import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";

import DocumentationView from "./views/DocumentationView";
//import TimersView from "./views/TimersView";

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
          <Link to="/docs">Documentation</Link>
        </li>
        <li>
          <Link to="/">Counter</Link>
        </li>
      </ul>
    </nav>
  );
};



/** ----------------------------------------------------------- **/


const Inner = () => {
  const commonRoutes = (
    <>
      <Route path="/" element={<Panel />} />
      {/*  To do when creating new components with their own input fields
        <Route path="/xy" element={<XY />} /> 
    */}
    </>
  );
return(
  <Routes>
    {commonRoutes}
  </Routes>
);
};

const App = () => {
  return (
    <Container>
      <Router>
        <Nav />
        <Inner />
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
