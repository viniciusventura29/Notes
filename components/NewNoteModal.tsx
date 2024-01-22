import { useMutation, useQueryClient } from "react-query";
import { SessionUser, FormData } from "../types";
import { create } from "../pages/api/notes";
import { Dispatch, SetStateAction } from "react";
import { useAlert } from "./Alert";

export function NewNoteModal({
  form,
  setForm,
  session,
  newNoteModalIsOpen,
  setNewNoteModalIsOpen,
}: {
  form: FormData;
  setForm: Dispatch<SetStateAction<FormData>>;
  session: SessionUser;
  newNoteModalIsOpen: boolean;
  setNewNoteModalIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const trigger = useAlert();
  const queryClient = useQueryClient();
  const createNoteMutation = useMutation(
    ({ session }: { session: SessionUser }) => create(form, session),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getData"] });
        trigger({
          text: "Your note was successfully created",
          title: "Note created",
          type: "Success",
        });
        setForm({ content: "", title: "", id: "" });
      },
    }
  );
  return (
    <div
      className={`flex justify-center items-center fixed h-screen w-full top-0 ${
        newNoteModalIsOpen ? "" : "hidden"
      }`}
    >
      <div
        onClick={() => {
          setNewNoteModalIsOpen(false);
        }}
        className="w-full fixed top-0 left-0 backdrop-blur-[3px] backdrop-brightness-90 h-full"
      ></div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createNoteMutation.mutate({ session });
          setNewNoteModalIsOpen(false);
        }}
        className="mt-6 space-y-6 flex flex-col bg-gray-50 dark:bg-slate-800 px-8 py-6 z-10 rounded-lg h-[30rem] w-[50rem]"
      >
        <div className="flex w-full justify-between items-center">
          <h1 className="transition duration-700 ease-in-out text-center dark:text-white font-bold text-2xl">
            New Note
          </h1>
          <button
            onClick={(e) => {setNewNoteModalIsOpen(false);e.preventDefault()}}
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
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="transition duration-700 ease-in-out border rounded border-gray-600 p-2  dark:text-gray-200 dark:bg-slate-800"
        />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="transition duration-700 ease-in-out resize-none h-full border rounded border-gray-600 p-2  dark:text-gray-200 dark:bg-slate-800"
        />

        <div className="flex gap-2 w-full justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 duration-500 text-white rounded p-2 w-52"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
