"use client";

import { Suspense } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getTodoById, updateTodo } from "@/geteway/todo";
import TodoForm from "@/components/TodoForm";
import { ITodo } from "@/interfaces/todo";
import Image from "next/image";

function UpdateTaskContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = Number(searchParams.get('id'));
  
  const [currentTodo, setCurrentTodo] = useState<ITodo | null>(null);

  useEffect(() => {
    if (id) {
      const foundTodo = getTodoById(id);
      if (foundTodo) {
        setCurrentTodo(foundTodo);
      } else {
        router.push('/tasks');
      }
    }
  }, [id, router]);

  const handleUpdateTodo = (title: string, completed: boolean) => {
    if (currentTodo) {
      updateTodo({
        id: currentTodo.id,
        title,
        completed
      });
      router.push('/tasks');
    }
  };

  if (!currentTodo) {
    return (
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
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-white text-xl">Chargement...</div>
        </div>
      </div>
    );
  }

  return (
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
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="backdrop-blur-sm bg-white p-8 rounded-2xl shadow-2xl border border-white/20">
            <h1 className="text-3xl font-bold mb-8 text-black text-center ">
              Modifier la tâche
            </h1>
            <TodoForm 
              onAdd={handleUpdateTodo} 
              initialTodo={currentTodo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UpdateTaskPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen relative bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-white text-xl">Chargement des paramètres...</div>
        </div>
      </div>
    }>
      <UpdateTaskContent />
    </Suspense>
  );
}