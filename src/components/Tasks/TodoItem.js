import React, { useState, useRef, useEffect } from "react";
import { EditIcon, DeleteIcon, CheckIcon } from "@chakra-ui/icons";
import { Box, Flex, useMediaQuery } from "@chakra-ui/react";

function TodoItem(props) {
  const [updateMode, setUpdateMode] = useState(false);
  const [input, setInput] = useState(props.todo.text);
  const [isOnmobile] = useMediaQuery("(max-width: 768px)");

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [updateMode]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUpdateMode(false);
    props.updateTodo(props.index, props.todo.columnID, input);
  };

  const updateTodoMode = (
    <Box
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}
      ref={props.provided.innerRef}
      {...props.theme.styles.bgNoHover}
      w={isOnmobile ? "42vw" : "100%"}
      borderRadius="4px"
      p={isOnmobile ? "2" : "4"}
      my="10px"
      key={props.index}>
      <Flex>
        <Box w="40vw" overflow="hidden" key={props.todo.id}>
          <form className="todo-form" onSubmit={handleSubmit}>
            <Box
              {...props.theme.styles.bgNoHover}
              bg="transparent"
              border="2px"
              borderRadius="4px 0 0 4px"
              p="4px 8px"
              borderColor="white"
              color={props.theme.colorMode === "light" ? "black" : "white"}
              _placeholder={{
                color: props.theme.colorMode === "light" ? "black" : "white",
                ...(props.theme.bgImage
                  ? props.theme.styles.imageModeContrastText
                  : {}),
              }}
              w={isOnmobile ? "30vw" : "100%"}
              as="input"
              placeholder="Edit Text"
              value={input}
              onChange={handleChange}
              ref={inputRef}></Box>
          </form>
        </Box>
        <Flex align="center" justify="center" w="10%">
          <CheckIcon
            boxSize="5"
            m="8px"
            onClick={() => {
              setUpdateMode(false);
              props.updateTodo(props.index, props.todo.columnID, input);
            }}
          />
        </Flex>
      </Flex>
    </Box>
  );

  const defaultTodoMode = (
    <Box
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}
      ref={props.provided.innerRef}
      {...props.theme.styles.bgNoHover}
      w={isOnmobile ? "42vw" : "100%"}
      borderRadius="4px"
      p={isOnmobile ? "2" : "4"}
      my="10px"
      key={props.index}>
      <Flex justify="space-between">
        <Box
          w={isOnmobile ? "20vw" : "200%"}
          overflow="hidden"
          key={props.todo.id}>
          {props.todo.text}
        </Box>

        <Flex
          align="center"
          justify="center"
          w={isOnmobile ? "10vw" : "40%"}
          pr={isOnmobile ? "2" : "0px"}>
          <DeleteIcon
            boxSize={isOnmobile ? "4" : "5"}
            m="8px"
            onClick={() => props.removeTodo(props.index, props.todo.columnID)}
          />
          <EditIcon
            boxSize={isOnmobile ? "4" : "5"}
            m="8px"
            onClick={() => {
              setUpdateMode(true);
              setInput(props.todo.text);
            }}
          />
        </Flex>
      </Flex>
    </Box>
  );

  return updateMode ? updateTodoMode : defaultTodoMode;
}

export default TodoItem;
