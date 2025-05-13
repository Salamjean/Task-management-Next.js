"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { addTodo } from "@/geteway/todo";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function CreateTaskPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() !== '') {
      addTodo(title, completed);
      router.push('/tasks');
    }
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

      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="backdrop-blur-sm bg-white p-8 rounded-2xl shadow-2xl border border-black">
            <h1 className="text-3xl font-bold mb-8 text-black text-center ">
              Créer une nouvelle tâche
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="title" className="block text-lg text-black font-medium">
                  Titre de la tâche
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-4 bg-white/5 border border-black rounded-xl text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Entrez le titre de votre tâche"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="status" className="block text-lg text-black font-medium">
                  Statut
                </label>
                <select
                  id="status"
                  value={completed ? "completed" : "pending"}
                  onChange={(e) => setCompleted(e.target.value === "completed")}
                  className="w-full p-4 bg-white border border-black rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="pending" className="bg-gray-200">En cours</option>
                  <option value="completed" className="bg-gray-200">Terminé</option>
                </select>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Ajouter la tâche
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/tasks')}
                  className="flex-1 bg-gray-200 backdrop-blur-sm text-black border border-white/20 px-6 py-4 rounded-xl text-lg font-semibold hover:bg-gray-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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
          </div>
        </div>
      </div>
    </div>
    </>
  );
}