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
  Switch,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import {
  changeGradientThemeColorTo,
  themesList,
  toggleRandomImageInGradientTheme,
  toggleBackgroundImageInGradientTheme,
} from "../../Constants/themes";

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
            <Flex w="100%">
              <Flex flexDir="column" w="50%">
                <Text ml="3" fontWeight="800">
                  Colours
                </Text>
                <Flex mt="4">
                  {themesList.map((item, i) => {
                    return (
                      <Tooltip label={item.name.toUpperCase()} key={i}>
                        <Square
                          mx="2"
                          size="10"
                          bg={item.baseColor}
                          rounded="md"
                          onClick={() => {
                            props.setTheme(
                              changeGradientThemeColorTo(
                                props.theme,
                                themesList[i]
                              )
                            );
                          }}></Square>
                      </Tooltip>
                    );
                  })}
                </Flex>
              </Flex>
              <Flex flexDir="column" w="50%">
                <Text ml="4" fontWeight="800">
                  Background
                </Text>
                <Flex m="4" flexDir="column">
                  <Flex m="2" w="40%" justify="space-between">
                    <Text>Background Image</Text>
                    <Switch
                      colorScheme={props.theme.name}
                      size="lg"
                      isChecked={props.theme.bgImage}
                      onChange={() => {
                        const newTheme = toggleBackgroundImageInGradientTheme(
                          props.theme
                        );
                        props.setTheme(newTheme);
                      }}
                    />
                  </Flex>
                  {props.theme.bgImage ? (
                    <Flex m="2" w="40%" justify="space-between">
                      <Text>Random Image</Text>
                      <Switch
                        colorScheme={props.theme.name}
                        size="lg"
                        isChecked={props.theme.bgInfo.random}
                        onChange={() => {
                          const newTheme = toggleRandomImageInGradientTheme(
                            props.theme
                          );
                          props.setTheme(newTheme);
                        }}
                      />
                    </Flex>
                  ) : (
                    <div></div>
                  )}
                </Flex>
              </Flex>
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
