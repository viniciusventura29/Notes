import { createClient } from "@supabase/supabase-js";
import { Notes, FormData } from "../../types";
import { Dispatch, SetStateAction } from "react";

const supabase = createClient(
  "https://osaoeebokyudngypsfhq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zYW9lZWJva3l1ZG5neXBzZmhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM0MzQ0NTgsImV4cCI6MjAwOTAxMDQ1OH0.locDhmsV4Syi21cXan2nfNSOImtYVYFR2D3NysOctE4"
);

const getData = async ({setNotes}:{setNotes: Dispatch<SetStateAction<Notes | undefined>>}) => {
  let { data, error } = await supabase.from("notes").select("*");

  if (error) {
    console.log(error);
    return;
  }

  if (!data) {
    console.log("Data is null!");
    return;
  }

  const newNotes = data as unknown as Notes;

  console.log(newNotes);
  setNotes(newNotes);
};

async function create(note: FormData) {
  const { data, error } = await supabase
    .from("notes")
    .insert([{ title: note.title, content: note.content }])
    .select();

  if (error) {
    console.log(error);
    return;
  }
}

async function update(note: FormData) {
  const { data, error } = await supabase
    .from("notes")
    .update({ title: note.title, content: note.content })
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

export { deleteNote, create, update, getData };
