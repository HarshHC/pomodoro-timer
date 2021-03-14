import { Flex, Square, Text, Tooltip } from '@chakra-ui/react';
import uuid from 'react-uuid';
import React from 'react';
import { changeGradientThemeColorTo, themesList } from '../../Constants/themes';

function ColourSelector(props) {
  return (
    <Flex flexDir="column" flex="1">
      <Text ml="2" fontWeight="800">
        Colours
      </Text>
      <Flex mt="4" maxW="40vw" flexWrap="wrap">
        {themesList.map((item, i) => {
          return (
            <Tooltip label={item.name.toUpperCase()} key={uuid()}>
              <Square
                m="2"
                size="10"
                bg={item.baseColor}
                rounded="md"
                onClick={() => {
                  props.setTheme(
                    changeGradientThemeColorTo(props.theme, themesList[i])
                  );
                }}
              />
            </Tooltip>
          );
        })}
      </Flex>
    </Flex>
  );
}

export default ColourSelector;
