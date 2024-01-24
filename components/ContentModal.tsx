import { Dispatch, SetStateAction } from "react";
import { SingleNote } from "../types";

export interface modalProps {
  setModalComponent: Dispatch<SetStateAction<boolean>>;
  note: SingleNote;
  modalComponent: boolean;
}

export function ContentModal({ note, setModalComponent, modalComponent }: modalProps) {
  return (
    <div
      className={`flex justify-center items-center fixed h-screen w-full top-0 z-30 ${
        modalComponent ? "" : "hidden"
      }`}
    >
      <div
        onClick={() => {
          setModalComponent(false);
        }}
        className="w-full fixed top-0 left-0 backdrop-blur-[3px] backdrop-brightness-90 h-full"
      ></div>
      <div className="divide-solid divide-y dark:divide-slate-900 shadow-2xl bg-gray-50 dark:bg-slate-800 px-8 py-6 z-20 rounded-lg w-[50rem]">
        <div className="flex justify-between font-bold text-2xl break-words">
          <h1 className="dark:text-white" style={{ overflowWrap: "anywhere" }}>
            {note?.title}
          </h1>
          <button
            onClick={() => setModalComponent(false)}
            className="p-2 bg-red-500 hover:bg-red-600 duration-500 rounded text-xs text-gray-50 font-normal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-x"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18 6l-12 12" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="break-words whitespace-pre-line focus:outline-none w-full dark:bg-slate-700 bg-white px-4 py-2 rounded lg:mt-10 mt-6 dark:text-gray-100 max-h-[30rem] overflow-y-scroll">
          {note.content}
        </div>
      </div>
    </div>
  );
}
