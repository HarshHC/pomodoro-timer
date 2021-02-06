import { Flex, useColorMode } from "@chakra-ui/react";
import React from "react";
import MinSetter from "./MinSetter";

function TimerEditMode({setSessionMins, setBreakMins, sessionMins, breakMins, maxBreakMins, maxSessionMins}) {
  const { colorMode } = useColorMode();

  return (
    <Flex
      height="80%"
      color={colorMode === "light" ? "black" : "white"}
      justifyContent="center"
      alignItems="center">
      <MinSetter
        title="Session"
        defaultMins={25}
        sessionMins={sessionMins}
        setSessionMins={setSessionMins}
        maxSessionMins={maxSessionMins}
      />

      <MinSetter
        title="Break"
        defaultMins={10}
        mins={breakMins}
        maxVal={maxBreakMins}
        setMins={setBreakMins}
      />
    </Flex>
  );
}

export default TimerEditMode;
