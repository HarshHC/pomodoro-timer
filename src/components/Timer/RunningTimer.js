import { Container, Flex, Text, useColorMode } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

function RunningTimer(props) {
  const { colorMode } = useColorMode();
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [mins, setMins] = useState(props.sessionMins);
  const [time, setTime] = useState(props.sessionMins * 60);
  let ztime = props.sessionMins * 60;

  useEffect(() => {
    if (props.started && time > 0) {
      const id = window.setInterval(() => {
        setSessionSeconds((sessionSeconds) => ztime % 60);
        setMins((mins) => Math.floor(ztime / 60));
        setTime((time) => time - 1);
        ztime--;
      }, 1000);
      return () => window.clearInterval(id);
    }
  }, [props.started]);

  return (
    <Flex
      height="80%"
      color={colorMode === "light" ? "black" : "white"}
      justifyContent="center"
      alignItems="center">
      <Container h="100%" bg="transparent" centerContent>
        <Text
          m="5"
          fontSize="2xl"
          bgGradient={
            colorMode === "light"
              ? "linear(to-bl, #000, #000)"
              : "linear(to-bl, #5d0cff, #9b00fa)"
          }
          bgClip="text"
          fontWeight="extrabold">
          - {props.mode.toUpperCase()} -
        </Text>

        <Text fontSize="8xl">
          {props.sessionMins < 10 ? "0" + mins : mins} :{" "}
          {sessionSeconds < 10 ? "0" + sessionSeconds : sessionSeconds}
        </Text>
      </Container>
    </Flex>
  );
}

export default RunningTimer;
