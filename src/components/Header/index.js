import React from "react";
import {
  Flex,
  Heading,
  IconButton,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IoMdBrush } from "react-icons/io";
import ThemeDrawer from "./ThemeDrawer";

function Header(props) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  let bgProps = {};
  if (props.theme.bgImage) {
    if (colorMode === "dark") {
      bgProps = {
        ...props.theme.styles.darkTransparentBg,
        rounded: "xl",
        boxShadow: "dark-lg",
      };
    } else {
      bgProps = {
        ...props.theme.styles.lightTransparentBg,
        rounded: "xl",
        boxShadow: "dark-lg",
      };
    }
  } else {
    bgProps = {};
  }

  return (
    <>
      <Flex justify="center" align="center" p="10" m="4">
        <Heading
          color={colorMode === "light" ? "black" : "white"}
          {...(props.theme.bgImage
            ? props.theme.styles.imageModeContrastText
            : {})}
          mx="20px">
          Pomodoro Timer
        </Heading>
        <IconButton
          color={colorMode === "light" ? "black" : "white"}
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          {...(props.theme.bgImage
            ? props.theme.styles.imageModeContrastBg
            : {})}
          onClick={toggleColorMode}
          mx="10px"
          fill="red"
        />
        <IconButton
          color={colorMode === "light" ? "black" : "white"}
          icon={<IoMdBrush />}
          {...(props.theme.bgImage
            ? props.theme.styles.imageModeContrastBg
            : {})}
          onClick={onOpen}
          mx="10px"
          fill="red"
        />
      </Flex>
      <ThemeDrawer
        isOpen={isOpen}
        onClose={onClose}
        btnRef={btnRef}
        theme={props.theme}
        setTheme={props.setTheme}
      />
    </>
  );
}

export default Header;
