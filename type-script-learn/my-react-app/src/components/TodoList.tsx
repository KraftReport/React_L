import React from "react";
import { Todo } from "../model";
import TodoItem from "./TodoItem";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  return (
    <>
      <div className="todoList">
        {todos.map((todo) => (
          <TodoItem todo={todo} todos={todos} setTodos={setTodos} />
        ))}
      </div>
    </>
  );
};

export default TodoList;
