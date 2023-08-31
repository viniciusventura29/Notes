import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Modal } from "./modal";
import { useRouter } from "next/router";
import { FormData, SessionUser, SingleNote } from "../types";

export interface cardProps {
  note: SingleNote;
  deleteNote: any;
  setForm: Dispatch<SetStateAction<FormData>>;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
  session: SessionUser;
  setModalComponent: Dispatch<SetStateAction<boolean>>;
  setSingleNote: Dispatch<SetStateAction<SingleNote>>;
}

export function Card({
  note,
  setForm,
  deleteNote,
  setIsUpdate,
  session,
  setModalComponent,
  setSingleNote,
}: cardProps) {
  const [contentLength, setContentLength] = useState<Boolean>(false);
  const [titleLength, setTitleLength] = useState<Boolean>(false);

  const router = useRouter();

  function verifyLengthContent() {
    if (note.content.length > 25) {
      setContentLength(true);
    }
  }

  function verifyTitleLength() {
    if (note.title.length > 15) {
      setTitleLength(true);
    }
  }

  function callModal() {
    setModalComponent(true);
    setSingleNote({ content: note.content, id: note.id, title: note.title });
  }

  useEffect(() => {
    verifyLengthContent();
    verifyTitleLength();
  }, [setForm]);

  return (
    <>
      <div
        key={note.id}
        className="border-b border-gray-600 p-2 w-[30rem]"
      >
        <div className="cursor-pointer flex justify-between">
          <div
            onClick={(e) => {callModal(); e.preventDefault()}}
            className="w-80 h-12 overflow-hidden"
          >
            <div className="flex items-center w-full">
              <h3 className="font-bold overflow-hidden">{note.title}</h3>
              <p className={`font-bold ${titleLength ? "" : "hidden"}`}>...</p>
            </div>

            <div className="flex items-center">
              <p className="text-sm w-96 overflow-hidden">{note.content}</p>
              <p
                className={`flex w-10 lg:w-40 text-xs italic font-semibold lg:ml-5 ${
                  contentLength ? "" : "hidden"
                }`}
              >
                See more...
              </p>
            </div>
          </div>
          <div className="flex">
            <button
              onClick={() => {
                setForm({
                  title: note.title,
                  content: note.content,
                  id: note.id,
                });
                setIsUpdate(true);
              }}
              className="bg-blue-500 hover:bg-blue-600 duration-500 mr-3 px-3 text-white rounded"
            >
              Update
            </button>
            <button
              onClick={() => {
                deleteNote(note.id, router);
              }}
              className="bg-red-500 hover:bg-red-600 duration-500 px-3 text-white rounded"
            >
              X
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
