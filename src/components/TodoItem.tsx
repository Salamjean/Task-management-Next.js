"use client";

import { ITodoItemProps } from "@/interfaces/todo";

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: ITodoItemProps) {
  return (
    <tr className="border-b border-red hover:bg-white/5 transition-colors duration-200">
      <td className="p-4 text-center bg-gray">
        <span
          onClick={() => onToggle(todo.id)}
          className={`cursor-pointer inline-block text-black ${todo.completed ? "line-through text-black" : ""}`}
        >
          {todo.title}
        </span>
      </td>
      <td className="p-4 text-center">
        <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${
          todo.completed 
            ? "bg-green-500/20 text-black" 
            : "bg-yellow-500/20 text-black"
        }`}>
          {todo.completed ? "Terminé" : "En cours"}
        </span>
      </td>
      <td className="p-4">
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => onEdit(todo.id)}
            className="text-blue-400 hover:text-white px-4 py-2 border border-blue-500/30 rounded-lg hover:bg-blue-500 transition-colors duration-200 flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Editer
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="text-red-400 hover:text-white px-4 py-2 border border-red-500 rounded-lg hover:bg-red-500 transition-colors duration-200 flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Supprimer
          </button>
        </div>
      </td>
    </tr>
  );
}