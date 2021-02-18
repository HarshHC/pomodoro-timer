import { Box, Button, Center, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { SESSION } from "../../Constants/modes";
import RunningTimer from "./RunningTimer";
import TimerEditMode from "./TimerEditMode";

function Timer(props) {
  const [sessionMins, setSessionMins] = useState(25);
  const [breakMins, setBreakMins] = useState(10);
  const [started, setStarted] = useState(false);
  const [mode, setMode] = useState(SESSION);
  const [isRunning, setIsRunning] = useState(true);
  const [breakIsRunning, setBreakIsRunning] = useState(false);

  let displayedTimer;

  if (started) {
    displayedTimer = (
      <RunningTimer
        theme={props.theme}
        mode={mode}
        sessionMins={sessionMins}
        setMode={setMode}
        started={started}
        setStarted={setStarted}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        breakIsRunning={breakIsRunning}
        setBreakIsRunning={setBreakIsRunning}
        breakMins={breakMins}
      />
    );
  } else {
    displayedTimer = (
      <TimerEditMode
        theme={props.theme}
        sessionMins={sessionMins}
        setSessionMins={setSessionMins}
        maxSessionMins={60}
        breakMins={breakMins}
        setBreakMins={setBreakMins}
        maxBreakMins={60}
      />
    );
  }
  return (
    <Box w="90%" minH="40vh" rounded="xl" boxShadow="dark-lg" p="2">
      <Flex
        minH="40vh"
        h="100%"
        justify="center"
        align="center"
        flexDir="column">
        <Center>{displayedTimer}</Center>
        <Flex m="4" justify="center" align="center">
          <Center m="20px">
            <Button
              {...props.theme.styles.bg}
              onClick={() => {
                setStarted(!started);
                setIsRunning(true);
              }}>
              {started ? "STOP" : "START"}
            </Button>
          </Center>

          {started ? (
            <Center>
              <Button
                {...props.theme.styles.bg}
                onClick={() => setIsRunning(!isRunning)}>
                {isRunning ? "PAUSE" : "RESUME"}
              </Button>
            </Center>
          ) : (
            <div></div>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}

export default Timer;
