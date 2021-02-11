import { Container, Flex, Text, useColorMode } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

function RunningTimer(props) {
  const { colorMode } = useColorMode();
  const [sessionSeconds, setSessionSeconds] = useState(59);
  const [mins, setMins] = useState(props.sessionMins - 1);
  const [time, setTime] = useState(props.sessionMins * 60);
  let ztime = props.sessionMins * 60 - 2;

  const countdownHandler = () => {
    if (ztime <= 0) {
      props.setIsRunning(false);
    }
  };

  useEffect(() => {
    if (props.isRunning) {
      const id = window.setInterval(() => {
        countdownHandler();
        setSessionSeconds(ztime % 60);
        setMins(Math.floor(ztime / 60));
        setTime(time - 1);
        ztime--;
      }, 1000);

      return () => window.clearInterval(id);
    }
  }, [props.isRunning]);

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
          {mins}:{sessionSeconds < 10 ? "0" + sessionSeconds : sessionSeconds}
        </Text>
        {/* <Button
          bgGradient={
            colorMode === "light"
              ? "linear(to-bl, #F5F5F5, #FFFFFF)"
              : "linear(to-bl, #5d0cff, #9b00fa)"
          }
          _hover={{ bg: "#5d0cff" }}
          onClick={() => setIsRunning(!isRunning)}>
          {"Pause"}
        </Button> */}
      </Container>
    </Flex>
  );
}

export default RunningTimer;
