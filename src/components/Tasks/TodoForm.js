import React, { useState } from "react";
import { HStack, Box } from "@chakra-ui/react";

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
    <HStack spacing="0" w="32vw">
      <Box
        as="input"
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
        as="button"
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
    <HStack spacing="0px" w="32vw">
      <Box
        {...props.theme.styles.bgNoHover}
        bg="transparent"
        border="2px"
        borderRadius="4px 0 0 4px"
        p="14px 16px 14px 16px"
        borderColor={props.theme.startColor}
        color={props.theme.colorMode === "light" ? "black" : "white"}
        _placeholder={{
          color: props.theme.colorMode === "light" ? "black" : "white",
          ...(props.theme.bgImage
            ? props.theme.styles.imageModeContrastText
            : {}),
        }}
        w="70%"
        as="input"
        my="10px"
        placeholder="Add Task"
        value={input}
        onChange={handleChange}></Box>
      <Box
        as="button"
        type="submit"
        ml="0px"
        w="30%"
        border="2px"
        py="14px"
        borderRadius="0 4px 4px 0"
        textAlign="center"
        {...props.theme.styles.bg}
        borderColor={props.theme.startColor}
        borderLeft="0px">
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
