import React from "react";
import styled from "styled-components";

import DocumentComponent from "../components/documentation/DocumentComponent";

import Loading from "../components/generic/Loading";

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Title = styled.div`
  font-size: 2rem;
`;

/**
 * You can document your components by using the DocumentComponent component
 */
const Documentation = () => {
  return (
    <div className="docs">
      <Container>
        <div className="docsContent">
          <DocumentComponent
            title="Stopwatch"
            propDocs={[
              {
                prop: "duration",
                description: "changes the duration of the counter",
                type: "string (converted into num)",
                defaultValue: "None",
              },
              {
                prop: "init",
                description: "No user input. From O to init",
                type: "num",
                defaultValue: "0",
              },
            ]}
          />
        </div>
      </Container>

      <Container>
        <div className="docsContent">
          <DocumentComponent
            title="Countdown"
            propDocs={[
              {
                prop: "duration",
                description: "No user input. From init to O",
                type: "num",
                defaultValue: "0",
              },
              {
                prop: "init",
                description: "changes the duration of the counter",
                type: "string (converted into num)",
                defaultValue: "None",
              },
            ]}
          />
        </div>
      </Container>

      <Container>
        <div className="docsContent">
          <DocumentComponent
            title="XY"
            propDocs={[
              {
                prop: "duration",
                description: "No user input. From init to O",
                type: "num",
                defaultValue: "0",
              },
              {
                prop: "init",
                description: "changes the duration of the counter",
                type: "string (converted into num)",
                defaultValue: "None",
              },
              {
                prop: "rehearsal",
                description: "changes the number of repeat",
                type: "string (converted into num)",
                defaultValue: "None",
              },
            ]}
          />
        </div>
      </Container>

      <Container>
        <div className="docsContent">
          <DocumentComponent
            title="Tabata"
            propDocs={[
              {
                prop: "duration",
                description: "countdown. From init to O",
                type: "num",
                defaultValue: "0",
              },
              {
                prop: "init",
                description: "changes the duration of the counter",
                type: "string (converted into num)",
                defaultValue: "None",
              },
              {
                prop: "rehearsal",
                description: "changes the number of repeat",
                type: "string (converted into num)",
                defaultValue: "None",
              },
              {
                prop: "pause",
                description:
                  "changes the number of seconds for the pause between each duration",
                type: "string (converted into num)",
                defaultValue: "None",
              },
              {
                prop: "remaining",
                description:
                  "No user input. Defines the total number of seconds to elapse (including duration, pause and repeat).",
                type: "Num",
                defaultValue: "None",
              },
            ]}
          />
        </div>
      </Container>
    </div>
  );
};

export default Documentation;
