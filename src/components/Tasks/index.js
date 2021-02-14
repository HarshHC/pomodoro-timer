import React, { useState } from "react";
import TodoForm from "./TodoForm";
import TodoItems from "./TodoItems";
import { Heading, Flex, useMediaQuery, Box } from "@chakra-ui/react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

function Tasks(props) {
  const [todos, setTodos] = useState([]);
  const [isOnmobile] = useMediaQuery("(max-width: 768px)");
  const [myTasks, updateTasks] = useState(todos);

  function onEnd(result) {
    console.log(result);
    if (result.destination) {
      const items = Array.from(todos);
      const [reorder] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorder);

      setTodos(items);
    }
  }

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
  const desktopTodos = (
    <DragDropContext onDragEnd={onEnd}>
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
          <Droppable droppableId="New">
            {(provided, snapshot) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                w="100%"
                h="100%">
                <TodoItems
                  theme={props.theme}
                  todos={todos}
                  completeTodo={completeTodo}
                  removeTodo={removeTodo}
                  updateTodo={updateTodo}
                />
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </Flex>
        <Flex
          mx="10px"
          flex="1"
          w="1/3"
          justifyContent="center"
          h="100%"
          flexDirection="column">
          <Heading fontSize="xl" textAlign="center" m="30px">
            Tasks in Progress
          </Heading>
          {/* <Droppable droppableId="Progress">
            {(provided) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                w="100%"
                h="100%">
                <TodoItems
                  theme={props.theme}
                  todos={todos}
                  completeTodo={completeTodo}
                  removeTodo={removeTodo}
                  updateTodo={updateTodo}
                />
              </Box>
            )}
          </Droppable> */}
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
          {/* <Droppable droppableId="Done">
            {(provided) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                w="100%"
                h="100%">
                <TodoItems
                  theme={props.theme}
                  todos={todos}
                  completeTodo={completeTodo}
                  removeTodo={removeTodo}
                  updateTodo={updateTodo}
                />
              </Box>
            )}
          </Droppable> */}
        </Flex>
      </Flex>
    </DragDropContext>
  );
  const mobileTodos = (
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
        <TodoItems
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
  );
  return (
    <Flex w="100vw" flexDir="column" align="center">
      <Heading fontSize="2xl" textAlign="center" m="30px">
        Tasks
      </Heading>
      <TodoForm theme={props.theme} onSubmit={addTodo} />
      {isOnmobile ? mobileTodos : desktopTodos}
    </Flex>
  );
}

export default Tasks;
