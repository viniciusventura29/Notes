import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FormData, SessionUser, SingleNote } from "../types";
import { useMutation, useQueryClient } from "react-query";
import { useAlert } from "./alert";

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
  const queryClient = useQueryClient();

  const [contentLength, setContentLength] = useState<Boolean>(false);
  const [titleLength, setTitleLength] = useState<Boolean>(false);
  const trigger = useAlert();

  const deleteNoteMutation = useMutation(
    ({ id }: { id: string }) => deleteNote(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getData"]);
        trigger({
          text: "Your note was successfully deleted",
          title: "Note Deleted",
          type: "Success",
        });
      },
    }
  );

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
      <div key={note.id} className="border-b border-gray-600 p-2 w-[30rem]">
        <div className="cursor-pointer flex justify-between">
          <div
            onClick={(e) => {
              callModal();
              e.preventDefault();
            }}
            className="w-80 h-12 overflow-hidden"
          >
            <div className="flex items-center w-full">
              <h3 className="font-bold overflow-hidden">{note.title}</h3>
              <p className={`font-bold ${titleLength ? "" : "hidden"}`}>...</p>
            </div>

            <div className="flex items-center relative">
              <p className="text-sm w-60 overflow-hidden">{note.content}</p>
              <p
                className={`absolute -right-24 w-10 lg:w-40 text-xs mb-5 italic font-semibold lg:ml-5 ${
                  contentLength ? "" : "hidden"
                }`}
              >
                See more...
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={() => {
                setForm({
                  title: note.title,
                  content: note.content,
                  id: note.id,
                });
                setIsUpdate(true);
              }}
              className="bg-blue-500 hover:bg-blue-600 duration-500 mr-3 p-2 text-white rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-edit"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                <path d="M16 5l3 3" />
              </svg>
            </button>
            <button
              onClick={() => {
                deleteNoteMutation.mutate({ id: note.id });
              }}
              className="bg-red-500 hover:bg-red-600 duration-500 p-2 text-white rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-x"
                width="18"
                height="18"
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
        </div>
      </div>
    </>
  );
}
