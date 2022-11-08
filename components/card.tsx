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
        <div className="bg-gray-300 dark:bg-slate-800 w-[50rem] h-[40rem] top-[calc(50%-20rem)] left-[calc(50%-25rem)] px-8 py-6 fixed rounded-lg">
          <div className="flex justify-between">{title} <button className="px-2 bg-red-500 rounded" onClick={()=>setModal(false)}>X</button></div>
          {content}
        </div>
      )
    } else {
      null;
    }
  };

  return (
    <li key={note.id} className="border-b border-gray-600 p-2">
      <div onClick={() => setModal(!modal)} className="flex justify-between">
        <div className="flex-1">
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
          className="bg-blue-500 mr-3 px-3 text-white rounded"
        >
          Update
        </button>
        <button
          onClick={() => deleteNote(note.id)}
          className="bg-red-500 px-3 text-white rounded"
        >
          X
        </button>
      </div>
      {modalComponent(note.id, note.content, note.title)}
    </li>
  );
}
