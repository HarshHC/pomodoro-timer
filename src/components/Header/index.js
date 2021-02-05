import React from "react";
import { Flex, Heading, IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex justify="center" align="center" p="10">
      <Heading color={colorMode === "light" ? "black" : "white"} mx="20px">
        Pomodoro Timer
      </Heading>
      <IconButton
        color={colorMode === "light" ? "black" : "white"}
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        onClick={toggleColorMode}
        mx="20px"
        fill="red"
      />
    </Flex>
  );
}

export default Header;
