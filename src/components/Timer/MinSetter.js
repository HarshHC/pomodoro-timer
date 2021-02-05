import { AddIcon, MinusIcon } from "@chakra-ui/icons";
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
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { isInputValid } from "./utilities";

function MinSetter(props) {
  const { colorMode } = useColorMode();

  return (
    <Container h="100%" flex="1" bg="transparent" centerContent>
      <Flex height="100%" direction="column" align="center" justify="center">
        <Spacer />
        <Text my="10px" fontWeight="500" textAlign="center" m="10px">
          {props.title.toUpperCase()} (mins)
        </Text>
        <Spacer />
        <Square
          size="40px"
          bgGradient={
            colorMode === "light"
              ? "linear(to-bl, #F5F5F5, #FFFFFF)"
              : "linear(to-bl, #5d0cff, #9b00fa)"
          }
          rounded="md"
          fontSize="lg"
          as={Button}
          _hover={{ bg: "#f09b00" }}
          onClick={() => props.setMins(props.mins + 1)}>
          <AddIcon />
        </Square>
        <Spacer />
        <Square
          size="100px"
          bg="transparent"
          rounded="md"
          fontSize="6xl"
          textAlign="center">
          <Editable
            defaultValue={props.mins}
            value={props.mins}
            onChange={(val) => {
              if (isInputValid(val)) {
                props.setMins(val);
              }
            }}>
            <EditablePreview />
            <EditableInput />
          </Editable>
        </Square>
        <Spacer />
        <Square
          size="40px"
          bgGradient={
            colorMode === "light"
              ? "linear(to-bl, #F5F5F5, #FFFFFF)"
              : "linear(to-bl, #5d0cff, #9b00fa)"
          }
          rounded="md"
          fontSize="lg"
          as={Button}
          _hover={{ bg: "#f09b00" }}
          onClick={() => props.setMins(props.mins - 1)}>
          <MinusIcon />
        </Square>
        <Spacer />
      </Flex>
    </Container>
  );
}

export default MinSetter;
