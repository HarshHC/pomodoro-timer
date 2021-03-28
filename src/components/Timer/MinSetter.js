import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import {
  Button,
  Container,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Spacer,
  Square,
  Text,
  useToast
} from '@chakra-ui/react';
import React from 'react';
import { isInputValid, validateMins } from './utilities';

function MinSetter(props) {
  const toast = useToast();

  return (
    <Container
      h="100%"
      flex="1"
      bg="transparent"
      centerContent
      {...(props.theme.bgImage
        ? props.theme.styles.imageModeContrastText
        : {})}>
      <Flex height="100%" direction="column" align="center" justify="center">
        <Spacer />
        <Text
          fontSize="xl"
          my="10px"
          w="100%"
          fontWeight="bold"
          letterSpacing="wider"
          textAlign="center"
          m="8">
          {props.title.toUpperCase()} (mins)
        </Text>
        <Spacer />
        <Square
          size="40px"
          {...props.theme.styles.bg}
          rounded="md"
          fontSize="lg"
          as={Button}
          onClick={() => {
            validateMins(props.mins, props.setMins, props.maxVal, toast);
            if (props.mins < props.maxVal) {
              props.setMins(props.mins + 1);
            } else {
              toast({
                title: 'Error',
                description: `Minutes cannot exceed max limit ${props.maxVal}`,
                status: 'error',
                duration: 1000,
                isClosable: true
              });
            }
          }}>
          <AddIcon />
        </Square>
        <Spacer />
        <Square
          size="100px"
          bg="transparent"
          rounded="md"
          fontSize="7xl"
          textAlign="center">
          <Editable
            defaultValue={props.defaultMins}
            value={props.mins}
            onSubmit={val => {
              props.setMins(parseInt(val, 10));
              validateMins(props.mins, props.setMins, props.maxVal, toast);
              if (!isInputValid(val)) {
                props.setMins(props.defaultMins);
              }
            }}
            onChange={val => {
              props.setMins(val);
            }}>
            <EditablePreview />
            <EditableInput />
          </Editable>
        </Square>
        <Spacer />
        <Square
          size="40px"
          {...props.theme.styles.bg}
          rounded="md"
          fontSize="lg"
          as={Button}
          onClick={() => {
            validateMins(props.mins, props.setMins, props.maxVal, toast);
            if (props.mins > 1) {
              props.setMins(props.mins - 1);
            } else {
              toast({
                title: 'Error',
                description: 'Minutes cannot be less than 1',
                status: 'error',
                duration: 1000,
                isClosable: true
              });
            }
          }}>
          <MinusIcon />
        </Square>
        <Spacer />
      </Flex>
    </Container>
  );
}

export default MinSetter;
