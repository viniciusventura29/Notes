import { useState } from "react";

export interface modalProps{
    note: {
        id: string;
        title: string;
        content: string;
      };
}

export function Modal({ note }: modalProps){
    return (
        <>
        <div className="w-full fixed top-0 left-0 backdrop-blur-[3px] backdrop-brightness-90 h-full"></div>
            <div className="shadow-lg bg-gray-300 dark:bg-slate-800 lg:w-[50rem] lg:h-[30rem] lg:top-[calc(50%-15rem)] lg:left-[calc(50%-25rem)] w-[20rem] h-[30rem] top-[calc(50%-15rem)] left-[calc(50%-10rem)] px-8 py-6 fixed rounded-lg">
              <div className="flex justify-between font-bold text-2xl">{note.title} <button className="px-2 bg-red-500 hover:bg-red-600 duration-500 rounded text-sm text-gray-50 font-normal">X</button></div>
              <p className="dark:bg-slate-700 bg-gray-100 px-4 py-2 border-2 border-gray-500 rounded h-5/6 lg:mt-10 mt-6 dark:text-gray-100">{note.content}</p>
            </div>
            </>
          )
      };