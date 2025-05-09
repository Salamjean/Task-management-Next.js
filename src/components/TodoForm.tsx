"use client";

import { useState, useEffect } from "react";
import { ITodoFormProps } from "@/interfaces/todo";

export default function TodoForm({ onAdd, initialTodo }: ITodoFormProps) {
  const [title, setTitle] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (initialTodo) {
      setTitle(initialTodo.title);
      setCompleted(initialTodo.completed);
    }
  }, [initialTodo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() !== "") {
      onAdd(title, completed);
      if (!initialTodo) {
        // Réinitialiser seulement si c'est une création
        setTitle("");
        setCompleted(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="title" className="block text-lg text-gray-200 font-medium">
          Titre de la tâche
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Entrez le titre de votre tâche"
          className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="status" className="block text-lg text-gray-200 font-medium">
          Statut
        </label>
        <select
          id="status"
          value={completed ? "completed" : "pending"}
          onChange={(e) => setCompleted(e.target.value === "completed")}
          className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        >
          <option value="pending" className="bg-gray-800">En cours</option>
          <option value="completed" className="bg-gray-800">Terminé</option>
        </select>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button
          type="submit"
          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <span className="flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {initialTodo ? "Mettre à jour" : "Ajouter"}
          </span>
        </button>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="flex-1 bg-white/10 backdrop-blur-sm text-white border border-white/20 px-6 py-4 rounded-xl text-lg font-semibold hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <span className="flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Annuler
          </span>
        </button>
      </div>
    </form>
  );
}