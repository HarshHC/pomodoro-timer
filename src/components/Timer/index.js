import {
  Box,
  Button,
  Center,
  Flex,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import MinSetter from "./MinSetter";
import { validateMins } from "./utilities";

function Timer() {
  const [sessionMins, setSessionMins] = useState(25);
  const [breakMins, setBreakMins] = useState(10);

  const toast = useToast();
  const { colorMode } = useColorMode();

  validateMins(breakMins, setBreakMins, 60, toast);
  validateMins(sessionMins, setSessionMins, 120, toast);

  return (
    <Box w="80%" h="50vh" rounded="lg" boxShadow="dark-lg" p="2">
      <Flex
        height="80%"
        color={colorMode === "light" ? "black" : "white"}
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
