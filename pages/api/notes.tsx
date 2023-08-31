import { createClient } from "@supabase/supabase-js";
import { Notes, FormData, SessionUser } from "../../types";
import { Dispatch, SetStateAction } from "react";
import { NextRouter, useRouter } from "next/router";

const supabase = createClient(
  "https://osaoeebokyudngypsfhq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zYW9lZWJva3l1ZG5neXBzZmhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM0MzQ0NTgsImV4cCI6MjAwOTAxMDQ1OH0.locDhmsV4Syi21cXan2nfNSOImtYVYFR2D3NysOctE4"
);

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

async function deleteNote(id: string, router: NextRouter) {
  const { error } = await supabase.from("notes").delete().eq("id", id);

  if (error) {
    console.log(error);
    return;
  }
  router.reload();
}

async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error);
  }

  
}

export { deleteNote, create, update, getData, getUser, signOut };
