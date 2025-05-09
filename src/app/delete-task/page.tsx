"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { deleteTodo, getTodoById } from "@/geteway/todo";
import Image from "next/image";

export default function DeleteTaskPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    if (!id) {
      router.push("/tasks");
      return;
    }
    
    const todo = getTodoById(Number(id));
    if (!todo) {
      router.push("/tasks");
    }
  }, [id, router]);

  const handleDelete = () => {
    if (!id) return;
    deleteTodo(Number(id));
    router.push("/tasks");
  };

  const handleCancel = () => {
    router.push("/tasks");
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0">
          <Image
            src="/accueil.jpg"
            alt="Background"
            fill
            priority
            className="object-cover opacity-40 rounded-2xl"
            quality={100}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-2xl"></div>
        </div>
        <div className="relative backdrop-blur-sm bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Confirmer la suppression</h2>
            <p className="text-gray-300">Êtes-vous sûr de vouloir supprimer cette tâche ? Cette action est irréversible.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleCancel}
              className="flex-1 bg-white/10 backdrop-blur-sm text-white border border-white/20 px-6 py-4 rounded-xl text-lg font-semibold hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Annuler
              </span>
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-xl text-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Supprimer
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}