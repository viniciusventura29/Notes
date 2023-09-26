import { SingleNote } from "../types";

export interface modalProps {
  setModalComponent: any;
  note:  SingleNote
  modalComponent: boolean
}

export function Modal({ note, setModalComponent,modalComponent }: modalProps) {
  return (
    <div className={`flex justify-center items-center absolute h-screen w-full top-0 ${modalComponent? "":"hidden"}`}>
      <div className="w-full fixed top-0 left-0 backdrop-blur-[3px] backdrop-brightness-90 h-full"></div>
      <div className="divide-solid divide-y dark:divide-slate-900 shadow-2xl bg-gray-50 dark:bg-slate-800 h-96 px-8 py-6 z-10 rounded-lg w-[50rem]">
        <div className="flex justify-between font-bold text-2xl break-words">
          <h1 className="dark:text-white" style={{overflowWrap:"anywhere"}}>{note?.title}</h1>
          <button onClick={() => setModalComponent(false)} className="px-3 h-8 bg-red-500 hover:bg-red-600 duration-500 rounded text-sm text-gray-50 font-normal">
            Close
          </button>
        </div>
        <p className="break-words focus:outline-none resize-none w-full dark:bg-slate-700 bg-white px-4 py-2 rounded lg:mt-10 mt-6 dark:text-gray-100">
        {note.content}
        </p>
      </div>
    </div>
  );
}
