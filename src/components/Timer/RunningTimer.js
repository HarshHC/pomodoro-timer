import { Container, Flex, Text, useColorMode } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { SESSION, BREAK } from "../../Constants/modes";

function RunningTimer(props) {
  //useStates defined here
  const { colorMode } = useColorMode();
  const [seconds, setSeconds] = useState(0);
  const [mins, setMins] = useState(props.sessionMins);
  const [updatedTime, setUpdatedTime] = useState(props.sessionMins);

  //variables defined here
  let time;
  let interval;

  //javascript functions defined here

  const countdownHandler = () => {
    setUpdatedTime(time);
    if (!props.isRunning) {
      clearInterval(interval);
    }
    if (time < 0) {
      props.setMode(props.mode === SESSION ? BREAK : SESSION);
      setMins(props.mode === SESSION ? props.sessionMins : props.breakMins);
      setUpdatedTime(
        props.mode === SESSION ? props.sessionMinns * 60 : props.breakMins * 60
      );
    }
  };

  let startTimer = (startingMins) => {
    time = startingMins * 60 - 1;
    const runningInterval = window.setInterval(() => {
      setSeconds(time % 60);
      setMins(Math.floor(time / 60));
      time--;
      countdownHandler();
    }, 1000);
    return runningInterval;
  };

  //useEffects defined here
  useEffect(() => {
    if (props.isRunning) {
      if (mins === props.sessionMins || mins === props.breakMins) {
        if (props.mode === SESSION) {
          interval = startTimer(props.sessionMins);
        } else if (props.mode === BREAK) {
          interval = startTimer(props.breakMins);
        }
      } else {
        console.log(updatedTime);
        interval = startTimer((updatedTime + 1) / 60);
      }
    }
    console.log("useEffect", interval);
    return () => clearInterval(interval);
  }, [props.mode, props.isRunning]);

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
          {seconds < 10 ? mins + ":" + "0" + seconds : mins + ":" + seconds}
        </Text>
      </Container>
    </Flex>
  );
}

export default RunningTimer;
