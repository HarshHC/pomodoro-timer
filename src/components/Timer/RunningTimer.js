import { Container, Flex, Text, useColorMode } from "@chakra-ui/react";
import React from "react";

function RunningTimer(props) {
  const { colorMode } = useColorMode();
  let mins = props.startingMins - 1;
  let sec = 59;

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
          {mins} : {sec}
        </Text>
      </Container>
    </Flex>
  );
}

export default RunningTimer;
