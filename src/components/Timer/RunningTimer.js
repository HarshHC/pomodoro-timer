import { Container, Flex, Text, useColorMode } from "@chakra-ui/react";
import React, {useState, useEffect} from "react";

function RunningTimer({setSessionMins, sessionMins, setMode,
  started, setStarted, mode, setSessionSeconds, sessionSeconds, setTime, time}) {
  const { colorMode } = useColorMode();
  let ztime = sessionMins*60
  
  useEffect(() =>{
    if(started && time>0){
      const id = window.setInterval(()=> {
      setSessionSeconds(sessionSeconds => ztime % 60);
      setSessionMins(sessionMins => Math.floor(ztime/60));
      setTime(time => time - 1);
      ztime--;
      }, 1000);
      return () => window.clearInterval(id);
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
        {sessionMins<10? "0"+sessionMins: sessionMins} : {sessionSeconds<10? "0"+sessionSeconds: sessionSeconds}
        </Text>
      </Container>
    </Flex>
  );
}

export default RunningTimer;