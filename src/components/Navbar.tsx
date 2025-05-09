"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Todo App</h1>
        <div className="flex space-x-4">
          <Link 
            href="/create-task" 
            className={`px-3 py-2 rounded hover:bg-blue-700 transition ${
              pathname === "/create-task" ? "bg-blue-800" : ""
            }`}
          >
            Créer une tâche
          </Link>
          <Link
            href="/tasks"
            className={`px-3 py-2 rounded hover:bg-blue-700 transition ${
              pathname === "/tasks" ? "bg-blue-800" : ""
            }`}
          >
            Liste des tâches
          </Link>
        </div>
      </div>
    </nav>
  );
}