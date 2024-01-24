import { useRouter } from "next/router";
import { useState } from "react";
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
import { useQuery } from "react-query";
import { UploadModal } from "../components/UploadModal";
import { FilesView } from "../components/FilesView";
import { MenuButton } from "../components/MenuButton";
import { NewNoteModal } from "../components/NewNoteModal";
import { ToggleDarkMode } from "../components/ToggleDarkMode";
import { UpdateNoteModal } from "../components/UpdateNoteModal";

export default function Home() {
  useQuery({ queryKey: ["getData"], queryFn: () => getData({ setNotes }) });
  useQuery({ queryKey: ["getFiles"], queryFn: () => getFiles({ setFiles }) });
  const [notes, setNotes] = useState<Notes>();
  const [files, setFiles] = useState<FileObject[]>();
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [singleNote, setSingleNote] = useState<SingleNote>({
    content: "",
    title: "",
    id: "",
    authorized_users:[]
  });
  const [contentModalIsOpen, setContentModalIsOpen] = useState(false);
  const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const [uploadModalIsOpen, setUploadModalIsOpen] = useState(false);
  const [newNoteModalIsOpen, setNewNoteModalIsOpen] = useState(false);
  const [form, setForm] = useState<FormData>({
    title: "",
    content: "",
    id: "",
    authorized_users: [],
  });
  const [popUp, setPopUp] = useState(false);
  const router = useRouter();

  const [darkMode, setDarkMode] = useState(false);

  function timer() {
    setTimeout(() => {
      setPopUp(false);
    }, 6000);
  }

  return (
    <AuthMiddleware>
      {(session: SessionUser) => (
        <div className={` ${darkMode && "dark"}`}>
          <title>Ventura Notes</title>
          <div className="transition duration-700 ease-in-out min-h-screen bg-gray-100 dark:bg-slate-900">
            <ToggleDarkMode darkMode={darkMode} setDarkMode={setDarkMode} />
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

            <div className="mt-12 min-w-[95%] max-w-min mx-auto transition duration-700 ease-in-out grid grid-cols-3  gap-4 w-full dark:text-gray-200">
              {!notes
                ? null
                : notes.map((note) => (
                    <Card
                      setUpdateModalIsOpen={setUpdateModalIsOpen}
                      setSingleNote={setSingleNote}
                      key={note.id}
                      note={note}
                      setForm={setForm}
                      deleteNote={deleteNote}
                      setModalComponent={setContentModalIsOpen}
                    />
                  ))}
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
          <NewNoteModal
            newNoteModalIsOpen={newNoteModalIsOpen}
            setNewNoteModalIsOpen={setNewNoteModalIsOpen}
            form={form}
            setForm={setForm}
            session={session}
          />
          <ContentModal
            modalComponent={contentModalIsOpen}
            setModalComponent={setContentModalIsOpen}
            note={singleNote}
          />
          <UploadModal
            user={session ? session.data.session?.user : undefined}
            setModalComponent={setUploadModalIsOpen}
            modalComponent={uploadModalIsOpen}
          />
          <MenuButton
            files={files}
            user={session ? session.data.session?.user : undefined}
            setNewFileModalIsOpen={setUploadModalIsOpen}
            setNewNoteModalIsOpen={setNewNoteModalIsOpen}
            modalComponent={menuIsOpen}
            setModalComponent={setMenuIsOpen}
          />
          <UpdateNoteModal
            form={form}
            session={session}
            setForm={setForm}
            setUpdateNoteModalIsOpen={setUpdateModalIsOpen}
            updateNoteModalIsOpen={updateModalIsOpen}
          />
        </div>
      )}
    </AuthMiddleware>
  );
}
