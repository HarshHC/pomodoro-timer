import { Container, Flex, Text, useColorMode } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { SESSION, BREAK } from "../../Constants/modes";

function RunningTimer(props) {
  //useStates defined here
  const { colorMode } = useColorMode();
  const [sessionSeconds, setSessionSeconds] = useState(59);
  const [mins, setMins] = useState(props.sessionMins - 1);
  const [time, setTime] = useState(props.sessionMins * 60);
  const [bSeconds, setBSeconds] = useState(59);
  const [bMins, setBMins] = useState(props.breakMins - 1);

  //variables defined here
  let sTime = props.sessionMins * 60 - 2;
  let bTime = props.breakMins * 60 - 2;

  //javascript functions defined here

  //This checks if the time for session is complete
  const sessionCountdownHandler = () => {
    if (sTime <= 0) {
      props.setIsRunning(false);
      setTime((time) => props.breakMins * 60);
      props.setMode(BREAK);
      props.setBreakIsRunning(true);
    }
  };

  //This checks if the time for the break is complete
  const breakCountdownHandler = () => {
    if (bTime <= 0) {
      props.setBreakIsRunning(!props.breakIsRunning);
      setTime(props.sessionMins * 60);
      props.setMode(SESSION);
      props.setIsRunning(true);
    }
  };

  //useEffects defined here

  //This use effect uses set interval to count the session time we set down to 0, all calcs done inside
  //re-renders every time the value in isRunning changes
  useEffect(() => {
    sTime = time - 2;
    if (props.isRunning) {
      const id = window.setInterval(() => {
        sessionCountdownHandler();
        setSessionSeconds(sTime % 60);
        setMins(Math.floor(sTime / 60));
        setTime((time) => time - 1);
        sTime--;
      }, 1000);
      return () => window.clearInterval(id);
    }
  }, [props.isRunning]);

  //This use effect uses set interval to count the break time we set down to 0, all calcs done inside
  //re-renders every time the value in breakIsRunning changes
  useEffect(() => {
    bTime = time - 2;
    if (props.breakIsRunning) {
      const id2 = window.setInterval(() => {
        breakCountdownHandler();
        setBSeconds(bTime % 60);
        setBMins(Math.floor(bTime / 60));
        setTime((time) => time - 1);
        bTime--;
      }, 1000);

      return () => window.clearInterval(id2);
    }
  }, [props.breakIsRunning]);

  return (
    <Flex height="100%" justifyContent="center" alignItems="center">
      <Container h="100%" bg="transparent" centerContent>
        <Text
          m="5"
          fontSize="2xl"
          {...props.theme.styles.bgNoHover}
          bgClip="text"
          fontWeight="extrabold">
          - {props.mode.toUpperCase()} -
        </Text>

        <Text color={colorMode === "light" ? "black" : "white"} fontSize="8xl">
          {props.mode === SESSION
            ? sessionSeconds < 10
              ? mins + ":" + "0" + sessionSeconds
              : mins + ":" + sessionSeconds
            : bSeconds < 10
            ? bMins + ":" + "0" + bSeconds
            : bMins + ":" + bSeconds}
        </Text>
      </Container>
    </Flex>
  );
}

export default RunningTimer;
