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
  Text,
} from "@chakra-ui/react";
import BackgroundOptions from "./BackgroundOptions";
import ColourSelector from "./ColourSelector";

function ThemeDrawer(props) {
  return (
    <Drawer
      isOpen={props.isOpen}
      placement="top"
      onClose={props.onClose}
      finalFocusRef={props.btnRef}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Text ml="3" fontWeight="800">
              Customize Theme
            </Text>
          </DrawerHeader>

          <DrawerBody>
            <Flex w="90vw">
              <ColourSelector theme={props.theme} setTheme={props.setTheme} />
              <BackgroundOptions
                theme={props.theme}
                setTheme={props.setTheme}
              />
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
