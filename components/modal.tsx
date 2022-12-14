import { useState } from "react";

export interface modalProps {
  setModalComponent: any;
  note: {
    id: string;
    title: string;
    content: string;
  };
}

export function Modal({ note, setModalComponent }: modalProps) {
  return (
    <>
      <div className="w-full fixed top-0 left-0 backdrop-blur-[3px] backdrop-brightness-90 h-full"></div>
      <div className="divide-solid divide-y dark:divide-slate-900 shadow-2xl bg-gray-50 dark:bg-slate-800 lg:w-[50rem] lg:h-[30rem] lg:top-[calc(50%-15rem)] lg:left-[calc(50%-25rem)] w-[20rem] h-[30rem] top-[calc(50%-15rem)] left-[calc(50%-10rem)] px-8 py-6 fixed rounded-lg">
        <div className="flex justify-between font-bold text-2xl">
          {note.title}{" "}
          <button onClick={() => setModalComponent(false)} className="px-3 bg-red-500 hover:bg-red-600 duration-500 rounded text-sm text-gray-50 font-normal">
            Close
          </button>
        </div>
        <textarea readOnly className="focus:outline-none resize-none w-full dark:bg-slate-700 bg-white px-4 py-2 rounded h-5/6 lg:mt-10 mt-6 dark:text-gray-100">
          {note.content}
        </textarea>
      </div>
    </>
  );
}
