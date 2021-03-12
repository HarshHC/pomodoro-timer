import React, { useState } from "react";
import TodoForm from "./TodoForm";
import TodoItems from "./TodoItems";
import { Heading, Flex, useMediaQuery, Box } from "@chakra-ui/react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

function Tasks(props) {
  const [todos, setTodos] = useState({
    newTasks: [],
    tasksInProgress: [],
    completedTasks: [],
  });
  const [isOnmobile] = useMediaQuery("(max-width: 768px)");

  function onEnd(result) {
    console.log(result);
    if (result.destination) {
      if (result.destination.droppableId === "New") {
        const items = Array.from(todos.newTasks);
        const [reorder] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorder);
        const newTodos = { ...todos };
        newTodos.newTasks = items;
        setTodos(newTodos);
      }
      if (result.destination.droppableId === "Progress") {
        const items = Array.from(todos.tasksInProgress);
        const [reorder] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorder);
        const newTodos = { ...todos };
        newTodos.tasksInProgress = items;
        setTodos(newTodos);
      }
      if (result.destination.droppableId === "Done") {
        const items = Array.from(todos.completedTasks);
        const [reorder] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorder);
        const newTodos = { ...todos };
        newTodos.completedTasks = items;
        setTodos(newTodos);
      }
    }
  }

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = { ...todos };
    newTodos.newTasks = [todo, ...todos.newTasks];

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
    const removeArr = [...todos.newTasks].filter((todo) => todo.id !== id);

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
          w="1/3"
          h="100%"
          flex="1"
          justifyContent="center"
          flexDirection="column">
          <Heading
            fontSize="xl"
            m="30px"
            textAlign="center"
            {...(props.theme.bgImage
              ? props.theme.styles.imageModeContrastText
              : {})}>
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
                  todos={todos.newTasks}
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
          w="1/3"
          h="100%"
          flex="1"
          justifyContent="center"
          flexDirection="column">
          <Heading
            fontSize="xl"
            textAlign="center"
            m="30px"
            {...(props.theme.bgImage
              ? props.theme.styles.imageModeContrastText
              : {})}>
            Tasks in Progress
          </Heading>
          <Droppable droppableId="Progress">
            {(provided, snapshot) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                w="100%"
                h="100%">
                <TodoItems
                  theme={props.theme}
                  todos={todos.tasksInProgress}
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
          w="1/3"
          h="100%"
          flex="1"
          justifyContent="center"
          flexDirection="column">
          <Heading
            fontSize="xl"
            textAlign="center"
            m="30px"
            {...(props.theme.bgImage
              ? props.theme.styles.imageModeContrastText
              : {})}>
            Tasks Done
          </Heading>
          <Droppable droppableId="Done">
            {(provided, snapshot) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                w="100%"
                h="100%">
                <TodoItems
                  theme={props.theme}
                  todos={todos.completedTasks}
                  completeTodo={completeTodo}
                  removeTodo={removeTodo}
                  updateTodo={updateTodo}
                />
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </Flex>
      </Flex>
    </DragDropContext>
  );
  const mobileTodos = (
    <Flex mx="10px" w="95vw" justifyContent="center" h="100%">
      <Flex
        mx="10px"
        w="1/3"
        h="100%"
        flex="1"
        justifyContent="center"
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
        w="1/3"
        h="100%"
        flex="1"
        justifyContent="center"
        flexDirection="column">
        <Heading fontSize="xl" textAlign="center" m="30px">
          Tasks in Process
        </Heading>
      </Flex>
      <Flex
        mx="10px"
        w="1/3"
        h="100%"
        flex="1"
        justifyContent="center"
        flexDirection="column">
        <Heading fontSize="xl" textAlign="center" m="30px">
          Tasks Done
        </Heading>
      </Flex>
    </Flex>
  );
  return (
    <Flex w="100vw" flexDir="column" align="center">
      <Heading
        fontSize="2xl"
        textAlign="center"
        m="30px"
        {...(props.theme.bgImage
          ? props.theme.styles.imageModeContrastText
          : {})}>
        Tasks
      </Heading>
      <TodoForm theme={props.theme} onSubmit={addTodo} />
      {isOnmobile ? desktopTodos : desktopTodos}
    </Flex>
  );
}

export default Tasks;
