import { Box, Button, Center, useColorMode } from "@chakra-ui/react";
import React, { useState } from "react";
import { SESSION } from "../../Constants/modes";
import RunningTimer from "./RunningTimer";
import TimerEditMode from "./TimerEditMode";

function Timer() {
  const [sessionMins, setSessionMins] = useState(25);
  const [breakMins, setBreakMins] = useState(10);
  const [started, setStarted] = useState(false);
  const [mode, setMode] = useState(SESSION);

  const { colorMode } = useColorMode();

  let displayedTimer;

  if (started) {
    displayedTimer = <RunningTimer mode={mode} startingMins={sessionMins} />;
  } else {
    displayedTimer = (
      <TimerEditMode
        sessionMins={sessionMins}
        setSessionMins={setSessionMins}
        maxSessionMins={120}
        breakMins={breakMins}
        setBreakMins={setBreakMins}
        maxBreakMins={60}
      />
    );
  }

  return (
    <Box w="80%" h="50vh" rounded="lg" boxShadow="dark-lg" p="2">
      {displayedTimer}
      <Center m="10px">
        <Button
          bgGradient={
            colorMode === "light"
              ? "linear(to-bl, #F5F5F5, #FFFFFF)"
              : "linear(to-bl, #5d0cff, #9b00fa)"
          }
          _hover={{ bg: "#9b00fa" }}
          onClick={() => setStarted(!started)}>
          {started ? "STOP" : "START"}
        </Button>
      </Center>
    </Box>
  );
}

export default Timer;
