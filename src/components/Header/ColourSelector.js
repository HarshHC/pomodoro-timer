import { Flex, Square, Text, Tooltip, useToast } from '@chakra-ui/react';
import uuid from 'react-uuid';
import React from 'react';
import { LockIcon } from '@chakra-ui/icons';
import {
  changeGradientThemeColorTo,
  FONT_FAMILY,
  themesList
} from '../../Constants/themes';

function ColourSelector(props) {
  const toast = useToast();
  let showLock = '';
  if (!props.isPremium) {
    showLock = <LockIcon textColor="black" />;
  }
  return (
    <Flex flexDir="column" flex="1">
      <Text
        letterSpacing="wide"
        fontFamily={FONT_FAMILY}
        fontSize="xl"
        ml="3"
        fontWeight="800">
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
                  if (i === 0 || i === 1 || props.isPremium) {
                    props.setTheme(
                      changeGradientThemeColorTo(props.theme, themesList[i])
                    );
                  } else {
                    toast({
                      title: 'Premium Required!',
                      description:
                        'You need to buy Premium to access this feature',
                      status: 'warning',
                      duration: 2000,
                      isClosable: true
                    });
                  }
                }}>
                {i === 0 || i === 1 ? '' : showLock}
              </Square>
            </Tooltip>
          );
        })}
      </Flex>
    </Flex>
  );
}

export default ColourSelector;
