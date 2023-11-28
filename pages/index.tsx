import { useRouter } from "next/router";
import { useState } from "react";
import { Card } from "../components/card";
import { create, deleteNote, getData, signOut, update } from "./api/notes";
import { Notes, FormData, SessionUser, SingleNote } from "../types";
import AuthMiddleware from "../authmiddleware/authMiddleware";
import { ContentModal } from "../components/ContentModal";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAlert } from "../components/alert";
import { UploadModal } from "../components/UploadModal";
import Sun from "../components/icons/sun";
import Moon from "../components/icons/moon";

export default function Home() {
  useQuery({ queryKey: ["getData"], queryFn: () => getData({ setNotes }) });
  const [notes, setNotes] = useState<Notes>();
  const trigger = useAlert();
  const [singleNote, setSingleNote] = useState<SingleNote>({
    content: "",
    title: "",
    id: "",
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const [contentModalIsOpen, setContentModalIsOpen] = useState(false);
  const [uploadModalIsOpen, setUploadModalIsOpen] = useState(false);
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
          <Sun />
        </button>
      );
    } else {
      return (
        <button onClick={() => setDarkMode(true)}>
          <Moon />
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
                  onClick={()=>setUploadModalIsOpen(true)}
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
          <UploadModal setModalComponent={setUploadModalIsOpen} modalComponent={uploadModalIsOpen}  />
        </div>
      )}
    </AuthMiddleware>
  );
}
