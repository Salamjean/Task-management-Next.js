"use client";

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { deleteTodo } from "@/geteway/todo";
import Image from "next/image";
import { Dialog } from "@headlessui/react";

function DeleteTaskContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = Number(searchParams.get('id'));
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      if (id) {
        await deleteTodo(id);
      }
      router.push('/tasks');
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    router.push('/tasks');
  };

  if (!id) {
    router.push('/tasks');
    return null;
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Background */}
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

      {/* Confirmation Dialog */}
      <Dialog 
        open={true}
        onClose={handleCancel}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 backdrop-blur-sm">
            <Dialog.Title className="text-2xl font-bold text-gray-900">
              Confirmer la suppression
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-gray-600">
              Êtes-vous sûr de vouloir supprimer cette tâche définitivement ?
            </Dialog.Description>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                disabled={isDeleting}
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isDeleting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Suppression...
                  </span>
                ) : (
                  'Supprimer'
                )}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Loading Overlay */}
      {isDeleting && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
          <div className="text-white text-xl flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Suppression en cours...
          </div>
        </div>
      )}
    </div>
  );
}

export default function DeleteTaskPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen relative bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="relative z-10 flex items-center justify-center min-h-screen text-white">
          <div className="text-xl">Chargement...</div>
        </div>
      </div>
    }>
      <DeleteTaskContent />
    </Suspense>
  );
}