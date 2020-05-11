import React, { useState } from "react";

import "./App.css";

type FormElem = React.FormEvent<HTMLFormElement>;

interface ITodo {
  text: string;
  complete: boolean;
}

// interface ITodo2 extends ITodo {
//   tags: string[] //aray of strings
// }

const App = () => {
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([]); //ITodo iceren bir array olcak, array of objects(ITodo) olacak, objects will be Itododa belirtilen string ve boolena olacak.

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };

  const addTodo = (text: string): void => {
    const newTodos: ITodo[] = [...todos, { text, complete: false }];
    setTodos(newTodos);
  };

  const completeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };

  const removeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ToDo List</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            required
          />
          <button type="submit">Add Todo</button>
        </form>
        <section>
          {todos.map((todo: ITodo, index: number) => (
            <div key={index}>
              <span
                style={{
                  textDecoration: todo.complete ? "line-through" : "",
                }}
              >
                {todo.text}
              </span>
              <button onClick={() => completeTodo(index)}>
                {todo.complete ? "Done" : "Not Done"}
              </button>
              <button onClick={() => removeTodo(index)}>Remove</button>
            </div>
          ))}
        </section>
      </header>
    </div>
  );
};

export default App;
