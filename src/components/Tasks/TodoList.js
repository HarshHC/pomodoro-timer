import React, { useState } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import { Draggable } from 'react-beautiful-dnd';

function TodoList(props) {
  const [edit, setEdit] = useState({
    id: null,
    value: '',
  });
  //function to save the update when pressed the check button
  const submitUpdate = (value) => {
    props.updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: '',
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }
  //map to map each element inside the todoList to have is as a prop when calling it from other function
  return props.todos.map((todo, index) => (
    <Draggable key={todo.id} draggableId={todo.id + ''} index={index}>
      {(provided) => (
        <TodoItem
          theme={props.theme}
          provided={provided}
          todo={todo}
          index={index}
          removeTodo={props.removeTodo}
          updateTodo={props.updateTodo}
        />
      )}
    </Draggable>
  ));
}

export default TodoList;
