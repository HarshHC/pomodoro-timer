import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { Heading, Box, Spacer, Flex } from "@chakra-ui/react";

function Tasks(props) {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removeArr = [...todos].filter((todo) => todo.id !== id);

    setTodos(removeArr);
  };

  const completeTodo = (id) => {
    let updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updateTodos);
  };
  return (
    <Box w="100vw">
      <Flex>
        <Box w="33%">
          <Heading textAlign="Center" m="30px">
            New Tasks
          </Heading>
        </Box>
        <Spacer />
        <Box w="33%">
          <Heading textAlign="center" m="30px">
            Tasks in Process
          </Heading>
          <TodoForm theme={props.theme} onSubmit={addTodo} />
          <Todo
            theme={props.theme}
            todos={todos}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
          />
        </Box>
        <Spacer />
        <Box w="33%">
          <Heading textAlign="center" m="30px">
            Tasks Done
          </Heading>
        </Box>
      </Flex>
    </Box>
  );
}

export default Tasks;
