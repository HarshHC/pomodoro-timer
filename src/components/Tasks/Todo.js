import React, { useState } from "react";
import TodoForm from "./TodoForm";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex } from "@chakra-ui/react";

function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return todos.map((todo, index) => (
    <Box
      bgGradient="linear(to-r, #5d0cff, #9b00fa)"
      w="100%"
      borderRadius="4px"
      p="16px"
      my="10px"
      key={index}>
      <Flex>
        <Box w="80%" flex="1" key={todo.id}>
          {todo.text}
        </Box>
        <Box w="20%">
          <DeleteIcon
            boxSize="5"
            mx="10px"
            onClick={() => removeTodo(todo.id)}
          />
          <EditIcon
            boxSize="5"
            mx="10px"
            onClick={() => setEdit({ id: todo.id, value: todo.text })}
          />
        </Box>
      </Flex>
    </Box>
  ));
}

export default Todo;
