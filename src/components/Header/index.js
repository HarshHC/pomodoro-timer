import React from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IoMdBrush } from "react-icons/io";

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Flex justify="center" align="center" p="10">
        <Heading color={colorMode === "light" ? "black" : "white"} mx="20px">
          Pomodoro Timer
        </Heading>
        <IconButton
          color={colorMode === "light" ? "black" : "white"}
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          mx="10px"
          fill="red"
        />
        <IconButton
          color={colorMode === "light" ? "black" : "white"}
          icon={<IoMdBrush />}
          onClick={onOpen}
          mx="10px"
          fill="red"
        />
      </Flex>
      <Drawer
        isOpen={isOpen}
        placement="top"
        onClose={onClose}
        finalFocusRef={btnRef}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Customize Theme</DrawerHeader>

            <DrawerBody>type here</DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onClose}>
                Close
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}

export default Header;
