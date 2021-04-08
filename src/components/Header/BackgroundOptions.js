import { LockIcon, Search2Icon } from '@chakra-ui/icons';
import { Button, Flex, Switch, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import {
  FONT_FAMILY,
  toggleBackgroundImageInGradientTheme,
  toggleRandomImageInGradientTheme
} from '../../Constants/themes';
import ImageSearchDrawer from './ImageSearchDrawer';

function BackgroundOptions(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  if (props.theme.bgImage && props.isPremium === false) {
    const newTheme = toggleBackgroundImageInGradientTheme(props.theme);
    props.setTheme(newTheme);
  }

  return (
    <Flex flexDir="column" flex="1" my="8">
      <Text
        letterSpacing="wide"
        fontFamily={FONT_FAMILY}
        fontSize="xl"
        ml="3"
        fontWeight="800">
        Background
      </Text>
      <Flex m="2" flexDir="column">
        <Flex m="2" w="90%" justify="space-between" align="center">
          {props.isPremium ? ' ' : <LockIcon fontSize="xl" mr="2" mb="1" />}
          <Text
            fontFamily={FONT_FAMILY}
            fontSize="xl"
            letterSpacing="wide"
            width="70%"
            mr="4">
            Background Image
          </Text>
          <Switch
            {...(props.isPremium ? {} : { isDisabled: true })}
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
          <Flex m="2" w="90%" justify="space-between">
            <Text
              fontFamily={FONT_FAMILY}
              fontSize="xl"
              letterSpacing="wide"
              width="70%"
              mr="4">
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
          <div />
        )}
        {!props.theme.bgInfo.random && props.theme.bgImage ? (
          <Button
            my="4"
            minW="max-content"
            w="40%"
            p="6"
            fontFamily={FONT_FAMILY}
            fontSize="xl"
            letterSpacing="wider"
            leftIcon={<Search2Icon />}
            onClick={() => onOpen()}>
            Find image
          </Button>
        ) : (
          <div />
        )}
      </Flex>
      <ImageSearchDrawer
        isOpen={isOpen}
        onClose={onClose}
        theme={props.theme}
        setTheme={props.setTheme}
      />
    </Flex>
  );
}

export default BackgroundOptions;
