import { ITodo, IUpdateTodoParams } from "@/interfaces/todo";

const STORAGE_KEY = "todos";

function getStoredTodos(): ITodo[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveTodos(todos: ITodo[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function getTodos(): ITodo[] {
  return getStoredTodos();
}

export function addTodo(title: string, completed: boolean = false): ITodo {
  const todos = getStoredTodos();
  const newTodo: ITodo = {
    id: Date.now(),
    title,
    completed,
  };
  todos.push(newTodo);
  saveTodos(todos);
  return newTodo;
}

export function toggleTodo(id: number): void {
  const todos = getStoredTodos();
  const updatedTodos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  saveTodos(updatedTodos);
}

export function deleteTodo(id: number): void {
  const todos = getStoredTodos();
  const updatedTodos = todos.filter((todo) => todo.id !== id);
  saveTodos(updatedTodos);
}

export function getTodoById(id: number): ITodo | undefined {
  const todos = getStoredTodos();
  return todos.find((todo) => todo.id === id);
}

export function updateTodo({ id, title, completed }: IUpdateTodoParams): void {
  const todos = getStoredTodos();
  const updatedTodos = todos.map((todo) =>
    todo.id === id ? { ...todo, title, completed } : todo
  );
  saveTodos(updatedTodos);
}