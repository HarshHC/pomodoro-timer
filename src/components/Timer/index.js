import { Box, Button, Center, Flex, useColorMode } from "@chakra-ui/react";
import React, { useState } from "react";
import { SESSION } from "../../Constants/modes";
import RunningTimer from "./RunningTimer";
import TimerEditMode from "./TimerEditMode";

function Timer() {
  const [sessionMins, setSessionMins] = useState(25);
  const [breakMins, setBreakMins] = useState(10);
  const [started, setStarted] = useState(false);
  const [mode, setMode] = useState(SESSION);
  const [isRunning, setIsRunning] = useState(true);

  const { colorMode } = useColorMode();

  let displayedTimer;

  if (started) {
    displayedTimer = (
      <RunningTimer
        mode={mode}
        sessionMins={sessionMins}
        setMode={setMode}
        started={started}
        setStarted={setStarted}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
      />
    );
  } else {
    displayedTimer = (
      <TimerEditMode
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
              bgGradient={
                colorMode === "light"
                  ? "linear(to-bl, #F5F5F5, #FFFFFF)"
                  : "linear(to-bl, #5d0cff, #9b00fa)"
              }
              _hover={{ bg: "#5d0cff" }}
              onClick={() => setStarted(!started)}>
              {started ? "STOP" : "START"}
            </Button>
          </Center>

          {started ? (
            <Center>
              <Button
                bgGradient={
                  colorMode === "light"
                    ? "linear(to-bl, #F5F5F5, #FFFFFF)"
                    : "linear(to-bl, #5d0cff, #9b00fa)"
                }
                _hover={{ bg: "#5d0cff" }}
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
