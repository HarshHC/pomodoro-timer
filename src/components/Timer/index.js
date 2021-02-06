import { Box, Button, Center, Flex, useColorMode } from "@chakra-ui/react";
import React, { useState } from "react";
import MinSetter from "./MinSetter";

function Timer() {
  const [sessionMins, setSessionMins] = useState(25);
  const [breakMins, setBreakMins] = useState(10);

  const { colorMode } = useColorMode();

  return (
    <Box w="80%" h="50vh" rounded="lg" boxShadow="dark-lg" p="2">
      <Flex
        height="80%"
        color={colorMode === "light" ? "black" : "white"}
        justifyContent="center"
        alignItems="center">
        <MinSetter
          title="Session"
          defaultMins={25}
          mins={sessionMins}
          maxVal={120}
          setMins={setSessionMins}
        />

        <MinSetter
          title="Break"
          defaultMins={10}
          mins={breakMins}
          maxVal={120}
          setMins={setBreakMins}
        />
      </Flex>

      <Center m="10px">
        <Button
          bgGradient={
            colorMode === "light"
              ? "linear(to-bl, #F5F5F5, #FFFFFF)"
              : "linear(to-bl, #5d0cff, #9b00fa)"
          }
          _hover={{ bg: "#ebedf0" }}>
          START
        </Button>
      </Center>
    </Box>
  );
}

export default Timer;
