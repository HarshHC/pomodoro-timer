/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import { Heading, Flex, Box } from '@chakra-ui/react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { FONT_FAMILY } from '../../Constants/themes';

function Tasks(props) {
  // useState to create the todo items and use the object elements to store the values of each column
  const [todos, setTodos] = useState({
    newTasks: [],
    completedTasks: []
  });

  // function to check the location in the DND feature and save the values for the respective location
  function onEnd(result) {
    if (result.destination) {
      const start = result.source.droppableId;
      const finish = result.destination.droppableId;
      if (start === finish) {
        const items = start === 'NEW' ? todos.newTasks : todos.completedTasks;
        const [reorder] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorder);
        const newTodos = { ...todos };
        start === 'NEW'
          ? (newTodos.newTasks = items)
          : (newTodos.completedTasks = items);
        setTodos(newTodos);
      } else {
        const sourceList =
          start === 'DONE' ? todos.completedTasks : todos.newTasks;
        const [removed] = sourceList.splice(result.source.index, 1);
        removed.columnID === 'DONE'
          ? (removed.columnID = 'NEW')
          : (removed.columnID = 'DONE');
        const destinationList =
          finish === 'DONE' ? todos.completedTasks : todos.newTasks;
        destinationList.splice(result.destination.index, 0, removed);
        const newTodos = { ...todos };
        if (start === 'DONE') {
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
  // function to check create the elements of the todo list ( Todo Item ).
  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = { ...todos };
    newTodos.newTasks = [todo, ...todos.newTasks];

    setTodos(newTodos);
  };
  // function to update the elements in the todo List
  const updateTodo = (index, columnID, newValue) => {
    if (!newValue || /^\s*$/.test(newValue)) {
      return;
    }
    const newTodos = { ...todos };

    if (columnID === 'NEW') {
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
  // remove function to Remove the Todo Item when pressed the button delete
  const removeTodo = (index, columnID) => {
    const newTodos = { ...todos };

    if (columnID === 'NEW') {
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
  // function to run the Tasks
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
            fontSize="3xl"
            my="30px"
            letterSpacing="wide"
            fontFamily={FONT_FAMILY}
            textAlign="center"
            {...(props.theme.bgImage
              ? props.theme.styles.imageModeContrastText
              : {})}>
            New Tasks
          </Heading>
          <Droppable droppableId="NEW">
            {provided => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                w="100%"
                h="100%"
                minH="200px">
                <TodoList
                  theme={props.theme}
                  todos={todos.newTasks}
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
            textAlign="center"
            fontSize="3xl"
            fontFamily={FONT_FAMILY}
            my="30px"
            letterSpacing="wide"
            {...(props.theme.bgImage
              ? props.theme.styles.imageModeContrastText
              : {})}>
            Tasks Done
          </Heading>
          <Droppable droppableId="DONE">
            {provided => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                w="100%"
                h="100%"
                minH="200px">
                <TodoList
                  theme={props.theme}
                  todos={todos.completedTasks}
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
        fontSize="4xl"
        textAlign="center"
        fontFamily={FONT_FAMILY}
        letterSpacing="wide"
        mt="30px"
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
