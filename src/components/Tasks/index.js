import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import {
  Heading,
  Wrap,
  Flex,
  WrapItem,
  useMediaQuery,
  Box,
} from "@chakra-ui/react";

function Tasks(props) {
  const [todos, setTodos] = useState([]);
  const [isOnmobile] = useMediaQuery("(max-width: 768px)");
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
    <Flex w="100vw" flexDir="column" align="center">
      <Heading fontSize="2xl" textAlign="center" m="30px">
        Tasks
      </Heading>
      <TodoForm theme={props.theme} onSubmit={addTodo} />
      <Flex mx="10px" w="95vw" justifyContent="center" h="100%">
        <Flex
          mx="10px"
          flex="1"
          w="1/3"
          justifyContent="center"
          h="100%"
          flexDirection="column">
          <Heading fontSize="xl" m="30px" textAlign="center">
            New Tasks
          </Heading>
          <Todo
            theme={props.theme}
            todos={todos}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
          />
        </Flex>
        <Flex
          mx="10px"
          flex="1"
          w="1/3"
          justifyContent="center"
          h="100%"
          flexDirection="column">
          <Heading fontSize="xl" textAlign="center" m="30px">
            Tasks in Process
          </Heading>
        </Flex>
        <Flex
          mx="10px"
          flex="1"
          w="1/3"
          justifyContent="center"
          h="100%"
          flexDirection="column">
          <Heading fontSize="xl" textAlign="center" m="30px">
            Tasks Done
          </Heading>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Tasks;
