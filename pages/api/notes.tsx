import { Notes, FormData, SessionUser, FileObject } from "../../types";
import { Dispatch, SetStateAction } from "react";
import supabase from "./supabaseClient";
import { User } from "@supabase/supabase-js";

const getUser = async () => {
  const user = await supabase.auth.getSession();

  return user;
};

const getData = async ({
  setNotes,
}: {
  setNotes: Dispatch<SetStateAction<Notes | undefined>>;
}) => {
  const user = await getUser();
  let { data, error } = await supabase
    .from("notes")
    .select("*")
    .eq("user", user.data.session?.user.id);

  if (error) {
    console.log(error);
    return;
  }

  if (!data) {
    console.log("Data is null!");
    return;
  }

  const newNotes = data as unknown as Notes;

  setNotes(newNotes);
};

async function create(note: FormData, session: SessionUser) {
  const { data, error } = await supabase
    .from("notes")
    .insert([
      {
        title: note.title,
        content: note.content,
        user: session.data.session?.user.id,
      },
    ])
    .select();

  if (error) {
    console.log(error);
    return;
  }
}

async function update(note: FormData, session: SessionUser) {
  const { data, error } = await supabase
    .from("notes")
    .update({
      title: note.title,
      content: note.content,
      user: session.data.session?.user.id,
    })
    .eq("id", note.id)
    .select();

  if (error) {
    console.log(error);
    return;
  }
}

async function deleteNote(id: string) {
  const { error } = await supabase.from("notes").delete().eq("id", id);

  if (error) {
    console.log(error);
    return;
  }
}

async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error);
  }
}

async function getFiles({
  setFiles,
}: {
  setFiles: Dispatch<SetStateAction<FileObject[] | undefined>>;
}) {
  const user = await getUser();
  const { data, error } = await supabase.storage
    .from("files")
    .list(user.data.session?.user.id + "/");

  if (data) {
    setFiles(data);
  }
}

async function uploadFilesApi({
  user,
  file,
}: {
  user: User | undefined;
  file: File;
}) {
  const { data, error } = await supabase.storage
    .from("files")
    .upload(user?.id + "/" + file.name, file);

  return { data, error };
}

export {
  deleteNote,
  create,
  update,
  getData,
  getUser,
  signOut,
  getFiles,
  uploadFilesApi,
};
