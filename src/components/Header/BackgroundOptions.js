import { Search2Icon } from "@chakra-ui/icons";
import { Button, Flex, Switch, Text } from "@chakra-ui/react";
import React from "react";
import {
  toggleBackgroundImageInGradientTheme,
  toggleRandomImageInGradientTheme,
} from "../../Constants/themes";

function BackgroundOptions(props) {
  return (
    <Flex flexDir="column" flex="1">
      <Text ml="4" fontWeight="800">
        Background
      </Text>
      <Flex m="4" flexDir="column">
        <Flex m="2" w="70%" justify="space-between">
          <Text width="70%" mr="4">
            Background Image
          </Text>
          <Switch
            size="lg"
            colorScheme={props.theme.name}
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
          <Flex m="2" w="70%" justify="space-between">
            <Text width="70%" mr="4">
              Random Image
            </Text>
            <Switch
              size="lg"
              colorScheme={props.theme.name}
              isChecked={props.theme.bgInfo.random}
              onChange={() => {
                const newTheme = toggleRandomImageInGradientTheme(props.theme);
                props.setTheme(newTheme);
              }}
            />
          </Flex>
        ) : (
          <div></div>
        )}
        {props.theme.bgInfo.random && props.theme.bgImage ? (
          <Button my="4" minW="max-content" w="40%" leftIcon={<Search2Icon />}>
            Find image
          </Button>
        ) : (
          <div></div>
        )}
      </Flex>
    </Flex>
  );
}

export default BackgroundOptions;
