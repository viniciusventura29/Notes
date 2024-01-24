import { Dispatch, SetStateAction, useState } from "react";
import { FilesView } from "./FilesView";
import { FileObject } from "../types";
import { User } from "@supabase/supabase-js";

export interface modalProps {
  setModalComponent: Dispatch<SetStateAction<boolean>>;
  modalComponent: boolean;
  setNewNoteModalIsOpen: Dispatch<SetStateAction<boolean>>;
  setNewFileModalIsOpen: Dispatch<SetStateAction<boolean>>;
  files: FileObject[] | undefined;
  user: User | undefined;
}

export function MenuButton({
  setModalComponent,
  modalComponent,
  setNewNoteModalIsOpen,
  setNewFileModalIsOpen,
  files,
  user,
}: modalProps) {
  const [filesViewIsOpen, setFilesViewIsOpen] = useState<boolean>(false);

  return (
    <div className="z-0 fixed bottom-7 left-7 md:bottom-10 md:left-10 flex flex-col-reverse items-center gap-3">
      <button
        onClick={() => {
          setModalComponent(!modalComponent);
        }}
        className="z-0 rounded-full bg-blue-500 transition-colors duration-200 hover:bg-blue-600 shadow border dark:border-slate-800 flex justify-center items-center p-4 text-blue-100 w-14 h-14 md:w-16 md:h-16"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-menu-2"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 6l16 0" />
          <path d="M4 12l16 0" />
          <path d="M4 18l16 0" />
        </svg>
      </button>
      <div
        className={`flex flex-col gap-2 md:gap-4 ${modalComponent ? "" : "invisible"}`}
      >
        <button
          onClick={() => {
            setNewNoteModalIsOpen(true);
            setModalComponent(false);
          }}
          className="md:w-14 md:h-14 w-12 h-12 p-4 flex justify-center items-center bg-blue-500 rounded-full text-white hover:bg-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-plus"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 5l0 14" />
            <path d="M5 12l14 0" />
          </svg>
        </button>
        <button
          onClick={() => {
            setNewFileModalIsOpen(true);
            setModalComponent(false);
          }}
          className="md:w-14 md:h-14 w-12 h-12 p-4 flex justify-center items-center bg-blue-500 rounded-full text-white hover:bg-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-folder-plus"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 19h-7a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v3.5" />
            <path d="M16 19h6" />
            <path d="M19 16v6" />
          </svg>
        </button>
        <FilesView
          files={files}
          modalComponent={filesViewIsOpen}
          setModalComponent={setFilesViewIsOpen}
          user={user}
        />
      </div>
    </div>
  );
}
