import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoItem: React.FC<Props> = ({ todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  const editRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    editRef.current?.focus();
  }, [edit]);

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id: number, e: React.FormEvent) => {
    e.preventDefault();
    setEdit(false);
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, todo: editTodo } : todo,
      ),
    );
  };

  const handleSetEdit = () => {
    setEdit(true);
  };

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo,
      ),
    );
  };

  return (
    <>
      <div className="todoitem" key={todo.id}>
        <li key={todo.id}>{todo.todo}</li>
        <div>
          {edit ? (
            <form key={todo.id} onSubmit={(e) => handleEdit(todo.id, e)}>
              <input
                ref={editRef}
                key={todo.id}
                value={editTodo}
                onChange={(e) => setEditTodo(e.target.value)}
              />
            </form>
          ) : (
            <button key={todo.id} onClick={() => handleSetEdit()}>
              Edit
            </button>
          )}
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
          <button onClick={() => handleDone(todo.id)}>
            {todo.isDone ? "Undo" : "Mark Done"}
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoItem;
