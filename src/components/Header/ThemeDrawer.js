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
  Square,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { generateGradientTheme, themesList } from "../../Constants/themes";

function ThemeDrawer(props) {
  const { colorMode } = useColorMode();

  return (
    <Drawer
      isOpen={props.isOpen}
      placement="top"
      onClose={props.onClose}
      finalFocusRef={props.btnRef}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Customize Theme</DrawerHeader>

          <DrawerBody>
            <Text>Available theme colors:</Text>
            <Flex mt="4">
              {themesList.map((item, i) => {
                return (
                  <Square
                    key={i}
                    mx="2"
                    size="10"
                    bg={item.baseColor}
                    rounded="md"
                    onClick={() => {
                      props.setTheme(
                        generateGradientTheme(themesList[i], colorMode)
                      );
                      localStorage.setItem(
                        "timer-theme",
                        JSON.stringify(
                          generateGradientTheme(themesList[i], colorMode)
                        )
                      );
                    }}></Square>
                );
              })}
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={props.onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

export default ThemeDrawer;
