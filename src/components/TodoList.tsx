"use client";

import { useState, useEffect } from "react";

import { ITodo } from "@/interfaces/todo";
import { addTodo, deleteTodo, getTodos, toggleTodo } from "@/geteway/todo";
import TodoItem from "@/components/TodoItem";
import TodoForm from "@/components/TodoForm";

export default function TodoList() {
  const [todos, setTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    setTodos(getTodos());
  }, []);

  const handleAddTodo = (title: string) => {
    const newTodo = addTodo(title);
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const handleToggleTodo = (id: number) => {
    toggleTodo(id);
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodo(id);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <main className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center bg-blue-500 text-white">Ma Todo List</h1>
      <TodoForm onAdd={handleAddTodo} />
      <div>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
          />
        ))}
      </div>
    </main>
  );
}

