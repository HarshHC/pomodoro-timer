import { Container, Flex, Text, useColorMode } from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from "react";
import { SESSION, BREAK } from "../../Constants/modes";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

function RunningTimer(props) {
  //useStates defined here
  const { colorMode } = useColorMode();
  const [seconds, setSeconds] = useState(0);
  const [mins, setMins] = useState(
    props.mode == SESSION ? props.sessionMins : props.breakMins
  );
  const [updatedTime, setUpdatedTime] = useState(props.sessionMins);

  //variables defined here
  const time = useRef(null);
  let interval;

  useEffect(() => {
    const timerProps = JSON.parse(localStorage.getItem("timerProps"));
    timerProps.mode = props.mode;
    timerProps.updatedTime = updatedTime;
    window.localStorage.setItem("timerProps", JSON.stringify(timerProps));
  }, [props.mode, updatedTime]);

  useEffect(() => {
    const timerProps = JSON.parse(localStorage.getItem("timerProps"));
    if (timerProps) {
      setUpdatedTime(timerProps.updatedTime);
      props.setMode(timerProps.mode);
      setMins(Math.floor(timerProps.updatedTime / 60));
      setSeconds(timerProps.updatedTime % 60);
    }
  }, []);

  //javascript functions defined here
  //function to handle the countdown. will be called every second.
  const countdownHandler = () => {
    setUpdatedTime(time.current);
    if (!props.isRunning) {
      clearInterval(interval);
    }
    if (time.current < 0) {
      setMins(props.mode === !SESSION ? props.sessionMins : props.breakMins);
      setUpdatedTime(
        props.mode === !SESSION ? props.sessionMinns * 60 : props.breakMins * 60
      );
      props.setMode(props.mode === SESSION ? BREAK : SESSION);
    }
  };

  //function that takes anammout of minutes as a parameter and starts the timer
  const startTimer = (startingMins) => {
    time.current = startingMins * 60 - 1;
    const runningInterval = window.setInterval(() => {
      setSeconds(time.current % 60);
      setMins(Math.floor(time.current / 60));
      time.current--;
      countdownHandler();
    }, 1000);
    return runningInterval;
  };

  //useEffects defined here
  useEffect(() => {
    if (props.isRunning) {
      //when start is clicked state is changed
      if (mins === props.sessionMins || mins === props.breakMins) {
        //checking if timer is starting again or just starting
        if (props.mode === SESSION) {
          //check the mode
          interval = startTimer(props.sessionMins);
        } else if (props.mode === BREAK) {
          //check the mode
          interval = startTimer(props.breakMins);
        }
      } else {
        //if timer is running and we pause, when unpaused we pass updated time.current back into startTimer
        console.log(updatedTime);
        interval = startTimer((updatedTime + 1) / 60);
      }
    }
    return () => clearInterval(interval);
  }, [props.mode, props.isRunning]);

  return (
    <Flex height="100%" justifyContent="center" alignItems="center">
      <Container h="100%" bg="transparent" centerContent>
        <Text
          m="5"
          fontSize="2xl"
          {...props.theme.styles.bgNoHover}
          textShadow={
            props.theme.colorMode === "dark" && props.theme.bgImage
              ? "1px 1px 50px black, -1px -1px 40px " +
                props.theme.color.baseColor
              : "1px 1px 50px " +
                props.theme.color.baseColor +
                ", -1px -1px 40px " +
                props.theme.color.baseColor +
                ", -4px 4px 30px black" +
                props.theme.color.baseColor
          }
          bgClip="text"
          fontWeight="extrabold">
          - {props.mode.toUpperCase()} -
        </Text>

        <Text
          color={colorMode === "light" ? "black" : "white"}
          {...(props.theme.bgImage
            ? props.theme.styles.imageModeContrastText
            : {})}
          fontSize="8xl">
          {seconds < 10 ? mins + ":" + "0" + seconds : mins + ":" + seconds}
        </Text>
      </Container>
    </Flex>
  );
}

export default RunningTimer;
