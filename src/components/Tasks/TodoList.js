import React, { useState } from "react";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { Draggable } from "react-beautiful-dnd";

function TodoList(props) {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const submitUpdate = (value) => {
    props.updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return props.todos.map((todo, index) => (
    <Draggable key={todo.id} draggableId={todo.id + ""} index={index}>
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
