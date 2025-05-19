"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ITodo } from "@/interfaces/todo";
import { getTodos, toggleTodo } from "@/geteway/todo";
import TodoItem from "@/components/TodoItem";
import Image from "next/image";
import Swal from 'sweetalert2';

export default function TasksPage() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [showCompleted, setShowCompleted] = useState(true);
  const [showPending, setShowPending] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setTodos(getTodos());

    // Vérifier les paramètres d'URL pour afficher les notifications
    const status = searchParams.get('status');
    const message = searchParams.get('message');
    const title = searchParams.get('title');

    if (status && message) {
      Swal.fire({
        title: title || 'Notification',
        text: message,
        icon: status as 'success' | 'error' | 'warning' | 'info',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6'
      });
    }
  }, [searchParams]);

  const handleToggleTodo = (id: number) => {
    try {
      toggleTodo(id);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );

      const todo = todos.find(t => t.id === id);
      if (todo) {
        router.push(`/tasks?status=success&message=La tâche "${todo.title}" a été ${todo.completed ? 'mise en cours' : 'marquée comme terminée'}&title=${todo.completed ? 'Tâche mise en cours' : 'Tâche terminée'}`);
      }
    } catch (error) {
      router.push('/tasks?status=error&message=Une erreur est survenue lors de la modification du statut de la tâche&title=Erreur');
    }
  };

  const handleDeleteTodo = (id: number) => {
    router.push(`/delete-task?id=${id}`);
  };

  const handleEditTodo = (id: number) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      router.push(`/update-task?id=${id}`);
    }
  };

  const handleAddTodo = () => {
    router.push('/create-task');
  };

  const filteredTodos = todos.filter((todo) => {
    if (todo.completed && !showCompleted) return false;
    if (!todo.completed && !showPending) return false;
    return true;
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const pendingCount = todos.filter(todo => !todo.completed).length;
  const totalCount = todos.length;
  const completedPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const pendingPercentage = totalCount > 0 ? (pendingCount / totalCount) * 100 : 0;

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

              <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/10 p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Tâches terminées</span>
                      <span className="text-sm font-medium text-gray-700">{completedCount}/{totalCount}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-green-500 h-2.5 rounded-full transition-all duration-500" 
                        style={{ width: `${completedPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-white/10 p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Tâches en cours</span>
                      <span className="text-sm font-medium text-gray-700">{pendingCount}/{totalCount}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-yellow-500 h-2.5 rounded-full transition-all duration-500" 
                        style={{ width: `${pendingPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-6 mb-6">
                <label className="flex items-center gap-2 cursor-pointer bg-white/10 p-2 rounded-lg">
                  <input
                    type="checkbox"
                    checked={showCompleted}
                    onChange={(e) => setShowCompleted(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Tâches terminées</span>
                </label>
                
                <label className="flex items-center gap-2 cursor-pointer bg-white/10 p-2 rounded-lg">
                  <input
                    type="checkbox"
                    checked={showPending}
                    onChange={(e) => setShowPending(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Tâches en cours</span>
                </label>
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
                      {filteredTodos.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="py-4 text-center text-gray-500">
                            Aucune tâche à afficher
                          </td>
                        </tr>
                      ) : (
                        filteredTodos.map((todo) => (
                          <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={handleToggleTodo}
                            onDelete={handleDeleteTodo}
                            onEdit={handleEditTodo}
                          />
                        ))
                      )}
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