import React, { useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { Heading, Flex, Box } from "@chakra-ui/react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

function Tasks(props) {
  const [todos, setTodos] = useState({
    newTasks: [],
    completedTasks: [],
  });

  function onEnd(result) {
    if (result.destination) {
      const start = result.source.droppableId;
      const finish = result.destination.droppableId;
      if (start === finish) {
        const items = start === "NEW" ? todos.newTasks : todos.completedTasks;
        const [reorder] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorder);
        const newTodos = { ...todos };
        start === "NEW"
          ? (newTodos.newTasks = items)
          : (newTodos.completedTasks = items);
        setTodos(newTodos);
      } else {
        const sourceList =
          start === "DONE" ? todos.completedTasks : todos.newTasks;
        const [removed] = sourceList.splice(result.source.index, 1);
        removed.columnID === "DONE"
          ? (removed.columnID = "NEW")
          : (removed.columnID = "DONE");
        const destinationList =
          finish === "DONE" ? todos.completedTasks : todos.newTasks;
        destinationList.splice(result.destination.index, 0, removed);
        const newTodos = { ...todos };
        if (start === "DONE") {
          newTodos.completedTasks = sourceList;
          newTodos.newTasks = destinationList;
        } else {
          newTodos.completedTasks = destinationList;
          newTodos.newTasks = sourceList;
        }
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

  const updateTodo = (index, columnID, newValue) => {
    if (!newValue || /^\s*$/.test(newValue)) {
      return;
    }
    const newTodos = { ...todos };

    if (columnID === "NEW") {
      const items = [...todos.newTasks];
      items[index].text = newValue;
      newTodos.newTasks = items;
    } else {
      const items = [...todos.completedTasks];
      items[index].text = newValue;
      newTodos.completedTasks = items;
    }
    setTodos(newTodos);
  };

  const removeTodo = (index, columnID) => {
    const newTodos = { ...todos };

    if (columnID === "NEW") {
      const items = [...todos.newTasks];
      items.splice(index, 1);
      newTodos.newTasks = items;
    } else {
      const items = [...todos.completedTasks];
      items.splice(index, 1);
      newTodos.completedTasks = items;
    }
    setTodos(newTodos);
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
          <Droppable droppableId="NEW">
            {(provided) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                w="100%"
                h="100%"
                minH="200px">
                <TodoList
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
            Tasks Done
          </Heading>
          <Droppable droppableId="DONE">
            {(provided) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                w="100%"
                h="100%"
                minH="200px">
                <TodoList
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
      {desktopTodos}
    </Flex>
  );
}

export default Tasks;
