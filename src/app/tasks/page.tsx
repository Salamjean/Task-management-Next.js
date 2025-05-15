"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ITodo } from "@/interfaces/todo";
import { getTodos, toggleTodo, deleteTodo } from "@/geteway/todo";
import TodoItem from "@/components/TodoItem";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function TasksPage() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const router = useRouter();

  useEffect(() => {
    setTodos(getTodos());
  }, []);

  const handleToggleTodo = (id: number) => {
    toggleTodo(id);
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    router.push(`/delete-task?id=${id}`);
  };

  const handleEditTodo = (id: number) => {
    router.push(`/update-task?id=${id}`);
  };

  const handleAddTodo = () => {
    router.push('/create-task');
  };

  return (
    <>
      <div className="min-h-screen relative bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="absolute inset-0">
          <Image
            src="/accueil.jpg"
            alt="Background"
            fill
            priority
            className="object-cover opacity-40"
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50"></div>
        </div>

        <main className="relative z-10 container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="backdrop-blur-sm bg-white p-8 rounded-2xl shadow-2xl border border-white/20">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
                <h1 className="text-3xl font-bold bg-black from-blue-400 to-purple-500 bg-clip-text text-transparent text-center sm:text-left">
                  Gestion des Tâches
                </h1>
                
                <button
                  onClick={handleAddTodo}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Ajouter une tâche
                </button>
              </div>
              
              <div className="rounded-xl overflow-hidden border border-white/10">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-white/10">
                    <thead className="bg-gradient-to-r from-blue-600/100 to-blue-600/100">
                      <tr>
                        <th className="py-4 px-6 text-center text-white font-semibold text-sm uppercase tracking-wider w-1/2">Titre</th>
                        <th className="py-4 px-6 text-center text-white font-semibold text-sm uppercase tracking-wider w-1/4">Statut</th>
                        <th className="py-4 px-6 text-center text-white font-semibold text-sm uppercase tracking-wider w-1/4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black">
                      {todos.map((todo) => (
                        <TodoItem
                          key={todo.id}
                          todo={todo}
                          onToggle={handleToggleTodo}
                          onDelete={handleDeleteTodo}
                          onEdit={handleEditTodo}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}