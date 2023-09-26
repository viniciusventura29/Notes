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

  const deleteNoteMutation = useMutation(({id}:{id:string})=>deleteNote(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["getData"]);
      trigger({
        text:"Your note was successfully deleted",
        title:"Note Deleted",
        type:"Success"
      })
    }})

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
                deleteNoteMutation.mutate({id:note.id})
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
