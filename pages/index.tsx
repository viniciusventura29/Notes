import { useRouter } from "next/router";
import { SetStateAction, useState } from "react";
import { Card } from "../components/Card";
import {
  create,
  deleteNote,
  getData,
  getFiles,
  signOut,
  update,
} from "./api/notes";
import { Notes, FormData, SessionUser, SingleNote, FileObject } from "../types";
import AuthMiddleware from "../authmiddleware/authMiddleware";
import { ContentModal } from "../components/ContentModal";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAlert } from "../components/Alert";
import { UploadModal } from "../components/UploadModal";
import { FilesView } from "../components/FilesView";

export default function Home() {
  useQuery({ queryKey: ["getData"], queryFn: () => getData({ setNotes }) });
  useQuery({ queryKey: ["getFiles"], queryFn: () => getFiles({ setFiles }) });
  const [notes, setNotes] = useState<Notes>();
  const [files, setFiles] = useState<FileObject[]>();
  const trigger = useAlert();
  const [singleNote, setSingleNote] = useState<SingleNote>({
    content: "",
    title: "",
    id: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [contentModalIsOpen, setContentModalIsOpen] = useState(false);
  const [uploadModalIsOpen, setUploadModalIsOpen] = useState(false);
  const [filesViewIsOpen, setFilesViewIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const [form, setForm] = useState<FormData>({
    title: "",
    content: "",
    id: "",
  });
  const [popUp, setPopUp] = useState(false);
  const router = useRouter();

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    if (darkMode === true) {
      return (
        <button onClick={() => setDarkMode(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="transition duration-500 ease-in-out text-gray-200 ml-6 hover:text-gray-400 mt-6 p-3 w-14 rounded-lg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            />
          </svg>
        </button>
      );
    } else {
      return (
        <button onClick={() => setDarkMode(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="transition duration-500 ease-in-out text-black hover:text-gray-600 mt-6 ml-6 p-3 w-14 rounded-lg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            />
          </svg>
        </button>
      );
    }
  };

  function popMessage() {
    if (popUp) {
      timer();
      return (
        <div className="fixed lg:absolute transition duration-700 p-2 ease-in-out lg:px-10 lg:py-6 lg:top-10 rounded-b-sm lg:rounded-sm lg:right-3 dark:border-red-600 border-red-500 lg:border-r-[10px] dark:bg-red-600 bg-red-400 lg:dark:bg-slate-800 lg:bg-slate-200 font-bold dark:text-slate-50 text-slate-800">
          O titulo ou o corpo da mensagem não podem ser vazios!
        </div>
      );
    } else {
      null;
    }
  }

  function timer() {
    setTimeout(() => {
      setPopUp(false);
    }, 6000);
  }

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

  const updateNoteMutation = useMutation(
    ({ session }: { session: SessionUser }) => update(form, session),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getData"]);
        trigger({
          text: "Your note was successfully updated",
          title: "Note updated",
          type: "Success",
        });
        setForm({ content: "", title: "", id: "" });
      },
    }
  );

  return (
    <AuthMiddleware>
      {(session: SessionUser) => (
        <div className={` ${darkMode && "dark"}`}>
          <title>Ventura Notes</title>
          {popMessage()}
          <div className="transition duration-700 ease-in-out min-h-screen bg-gray-100 dark:bg-slate-900">
            {toggleDarkMode()}
            <button
              className={`absolute right-12 top-10 transition duration-700 ease-in-out dark:bg-slate-800 rounded-md dark:border-slate-700 dark:text-white dark:hover:bg-slate-700 border ${
                session && session.data.session?.user ? "" : "hidden"
              } p-2 px-4 bg-slate-100 hover:bg-white`}
              onClick={() => {
                signOut();
                setTimeout(() => {
                  router.reload();
                }, 500);
              }}
            >
              Logout
            </button>
            <h1 className="transition duration-700 ease-in-out text-center dark:text-white font-bold text-2xl">
              Notes
            </h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                isUpdate
                  ? updateNoteMutation.mutate({ session })
                  : createNoteMutation.mutate({ session });
              }}
              className="w-auto mt-6 min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch"
            >
              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="transition duration-700 ease-in-out border-2 rounded border-gray-600 p-2  dark:text-gray-200 dark:bg-slate-800"
              />
              <textarea
                placeholder="Content"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="transition duration-700 ease-in-out resize-none h-28 border-2 rounded border-gray-600 p-2  dark:text-gray-200 dark:bg-slate-800"
              />

              <div className="flex gap-2 w-full">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 duration-500 text-white rounded p-2 w-3/4"
                >
                  {isUpdate ? "Update" : "Add +"}
                </button>
                <button
                  onClick={(e) => {
                    setUploadModalIsOpen(true);
                    e.preventDefault();
                  }}
                  className="flex justify-center gap-2 items-center bg-sky-600 hover:bg-sky-700 duration-500 text-white rounded p-2 w-1/4"
                >
                  Upload
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-upload"
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
                    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                    <path d="M7 9l5 -5l5 5" />
                    <path d="M12 4l0 12" />
                  </svg>
                </button>
              </div>
            </form>

            <div className="transition duration-700 ease-in-out w-auto min-w-[25%] max-w-min mt-20 mx-auto space-y-6 flex flex-col items-stretch dark:text-gray-200">
              <div className="mb-12">
                {!notes
                  ? null
                  : notes.map((note) => (
                      <Card
                        setSingleNote={setSingleNote}
                        key={note.id}
                        session={session}
                        setIsUpdate={setIsUpdate}
                        note={note}
                        setForm={setForm}
                        deleteNote={deleteNote}
                        setModalComponent={setContentModalIsOpen}
                      />
                    ))}
              </div>
            </div>
          </div>
          <footer className=" pb-6 w-full bg-gray-100 dark:bg-slate-900 dark:text-gray-200 flex align-center items-center justify-center">
            Made by &nbsp;
            <a
              href="https://github.com/viniciusventura29"
              target="_blank"
              className="dark:hover:text-gray-400 hover:text-gray-800 font-semibold"
            >
              Vinicius Ventura
            </a>
          </footer>
          <ContentModal
            modalComponent={contentModalIsOpen}
            setModalComponent={setContentModalIsOpen}
            note={singleNote}
          />
          <FilesView
            user={session ? session.data.session?.user : undefined}
            files={files}
            setModalComponent={setFilesViewIsOpen}
            modalComponent={filesViewIsOpen}
          />
          <UploadModal
            user={session ? session.data.session?.user : undefined}
            setModalComponent={setUploadModalIsOpen}
            modalComponent={uploadModalIsOpen}
          />
        </div>
      )}
    </AuthMiddleware>
  );
}
