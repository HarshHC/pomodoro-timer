import { Box, Button, Center, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import MinSetter from "./MinSetter";

function Timer() {
  const [sessionMins, setSessionMins] = useState(25);
  const [breakMins, setBreakMins] = useState(10);

  return (
    <Box w="60vw" h="50vh" bg="blue.500" rounded="lg" boxShadow="md">
      <Flex
        height="80%"
        color="white"
        justifyContent="center"
        alignItems="center">
        <MinSetter
          title="Session"
          mins={sessionMins}
          setMins={setSessionMins}
        />

        <MinSetter title="Break" mins={breakMins} setMins={setBreakMins} />
      </Flex>

      <Center m="10px">
        <Button _hover={{ bg: "#ebedf0" }}>START</Button>
      </Center>
    </Box>
  );
}

export default Timer;
