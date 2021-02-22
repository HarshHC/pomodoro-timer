import { Flex, Square, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import { changeGradientThemeColorTo, themesList } from "../../Constants/themes";

function ColourSelector(props) {
  return (
    <Flex flexDir="column" flex="1">
      <Text ml="2" fontWeight="800">
        Colours
      </Text>
      <Flex mt="4" maxW="40vw" flexWrap="wrap">
        {themesList.map((item, i) => {
          return (
            <Tooltip label={item.name.toUpperCase()} key={i}>
              <Square
                m="2"
                size="10"
                bg={item.baseColor}
                rounded="md"
                onClick={() => {
                  props.setTheme(
                    changeGradientThemeColorTo(props.theme, themesList[i])
                  );
                }}></Square>
            </Tooltip>
          );
        })}
      </Flex>
    </Flex>
  );
}

export default ColourSelector;
