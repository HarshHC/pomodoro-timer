import { Flex, useColorMode } from "@chakra-ui/react";
import React from "react";
import MinSetter from "./MinSetter";

function TimerEditMode(props) {
  const { colorMode } = useColorMode();

  return (
    <Flex
      height="100%"
      color={colorMode === "light" ? "black" : "white"}
      justifyContent="center"
      alignItems="center">
      <MinSetter
        title="Session"
        defaultMins={25}
        mins={props.sessionMins}
        maxVal={props.maxSessionMins}
        setMins={props.setSessionMins}
      />

      <MinSetter
        title="Break"
        defaultMins={10}
        mins={props.breakMins}
        maxVal={props.maxBreakMins}
        setMins={props.setBreakMins}
      />
    </Flex>
  );
}

export default TimerEditMode;
