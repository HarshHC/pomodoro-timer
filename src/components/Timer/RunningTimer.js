import { Container, Flex, Text, useColorMode } from "@chakra-ui/react";
import React, {useState, useEffect} from "react";

function RunningTimer({setSessionMins, sessionMins, setMode, started, setStarted, mode}) {
  const { colorMode } = useColorMode();
  let mins = sessionMins;
  let sec = "00";
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() =>{
    if(started){
      const id = window.setInterval(()=> {
        setSessionMins(sessionMins => sessionMins-1);
      }, 1000);
      setIntervalId(id);
    }else {
      window.clearInterval(intervalId);
    }
  },[started])

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
          - {mode.toUpperCase()} -
        </Text>

        <Text fontSize="8xl">
          {sessionMins} : {sessionSeconds}
        </Text>
      </Container>
    </Flex>
  );
}

export default RunningTimer;
