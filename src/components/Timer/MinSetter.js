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
} from "@chakra-ui/react";
import React from "react";

function MinSetter(props) {
  console.log(props.mins);
  return (
    <Container h="100%" flex="1" bg="transparent" centerContent>
      <Flex height="100%" direction="column" align="center" justify="center">
        <Spacer />
        <Text my="10px" color="white" fontWeight="500">
          {props.title.toUpperCase()} (mins)
        </Text>
        <Spacer />
        <Square
          size="40px"
          bg="orange"
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
            onChange={(val) => props.setMins(val)}>
            <EditablePreview />
            <EditableInput />
          </Editable>
        </Square>
        <Spacer />
        <Square
          size="40px"
          bg="orange"
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
