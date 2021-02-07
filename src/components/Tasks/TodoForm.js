import React, { useState, useEffect, useRef } from "react";
import { Input, Button, HStack, Box } from "@chakra-ui/react";

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 10000),
      text: input,
    });

    setInput(" ");
  };
  const updateOption = (
    <HStack spacing="0" w="100%">
      <Box
        as="Input"
        border="2px"
        borderRadius="4px 0 0 4px"
        bg="transparent"
        p="14px 32px 14px 16px"
        borderColor="#5d0cff"
        color="white"
        w="70%"
        my="10px"
        placeholder="Update Task"
        value={input}
        onChange={handleChange}
      />
      <Box
        as="Button"
        type="submit"
        ml="0px"
        border="2px"
        borderRadius="0 4px 4px 0"
        py="14px"
        textAlign="center"
        width="30%"
        bgGradient="linear(to-r, #5d0cff, #9b00fa)"
        borderColor="#5d0cff">
        Update
      </Box>
    </HStack>
  );

  const taskOption = (
    <HStack spacing="0px" w="100%">
      <Box
        bg="transparent"
        border="2px"
        borderRadius="4px 0 0 4px"
        p="14px 16px 14px 16px"
        borderColor="#5d0cff"
        color="white"
        _placeholder={{ color: "white" }}
        w="70%"
        as="Input"
        my="10px"
        placeholder="Add Task"
        value={input}
        onChange={handleChange}></Box>
      <Box
        as="Button"
        type="submit"
        ml="0px"
        w="30%"
        border="2px"
        py="14px"
        borderRadius="0 4px 4px 0"
        textAlign="center"
        bgGradient="linear(to-r, #5d0cff, #9b00fa)"
        borderColor="#5d0cff">
        Add Task
      </Box>
    </HStack>
  );
  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      {props.edit ? updateOption : taskOption}
    </form>
  );
}

export default TodoForm;