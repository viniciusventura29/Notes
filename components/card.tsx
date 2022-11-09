import { Dispatch, SetStateAction, useState } from "react";
import { FormData } from "../pages";

export interface cardProps {
  note: {
    id: string;
    title: string;
    content: string;
  };
  deleteNote: any
  setForm: Dispatch<SetStateAction<FormData>>;
}
export function Card({ note, setForm, deleteNote }: cardProps) {
  const [modal, setModal] = useState(false);

  const modalComponent = (id: string, content: string, title: string) => {
    if (modal === true) {
      return (
        <div className="shadow-lg bg-gray-300 dark:bg-slate-800 w-[50rem] h-[30rem] top-[calc(50%-15rem)] left-[calc(50%-25rem)] px-8 py-6 fixed rounded-lg">
          <div className="flex justify-between font-bold text-2xl">{title} <button className="px-2 bg-red-500 hover:bg-red-600 rounded text-sm text-gray-50 font-normal" onClick={()=>setModal(false)}>X</button></div>
          <p className="dark:bg-slate-700 bg-gray-100 px-4 py-2 border-2 border-gray-500 rounded h-5/6 mt-10 dark:text-gray-100">{content}</p>
        </div>
      )
    } else {
      null;
    }
  };

  return (
    <li key={note.id} className="border-b border-gray-600 p-2">
      <div onClick={() => setModal(!modal)} className="cursor-pointer flex justify-between">
        <div className="flex-1 h-12 overflow-hidden">
          <h3 className="font-bold">{note.title}</h3>
          <p className="text-sm pr-6">{note.content}</p>
        </div>
        <button
          onClick={() =>
            setForm({
              title: note.title,
              content: note.content,
              id: note.id,
            })
          }
          className="bg-blue-500 hover:bg-blue-600 mr-3 px-3 text-white rounded"
        >
          Update
        </button>
        <button
          onClick={() => deleteNote(note.id)}
          className="bg-red-500 hover:bg-red-600 px-3 text-white rounded"
        >
          X
        </button>
      </div>
      {modalComponent(note.id, note.content, note.title)}
    </li>
  );
}
