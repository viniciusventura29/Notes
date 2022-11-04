import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { stringify } from "querystring";
import { useState } from "react";
import { prisma } from "../lib/prisma";

interface Notes {
  notes: {
    id: string;
    title: string;
    content: string;
  }[];
}

interface FormData {
  title: string;
  content: string;
  id: string;
}

export default function Home({ notes }: Notes) {
  const [form, setForm] = useState<FormData>({
    title: "",
    content: "",
    id: "",
  });
  const router = useRouter();

  const [darkMode, setDarkMode] = useState(false);

  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function create(data: FormData) {
    if (data.content === "" || data.content === "") {
      console.log("Não SEU MAMACO");
    } else {
      try {
        fetch("/api/create", {
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }).then(() => {
          if (data.id) {
            deleteNote(data.id);
            setForm({ title: "", content: "", id: "" });
            refreshData();
          } else {
            setForm({ title: "", content: "", id: "" });
            refreshData();
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function deleteNote(id: string) {
    try {
      fetch(`/api/note/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }).then(() => {
        refreshData();
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (data: FormData) => {
    try {
      create(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={` ${darkMode && "dark"}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-slate-900">
        <input type="checkbox" onClick={() => setDarkMode(!darkMode)}></input>
        <h1 className="text-center dark:text-white font-bold text-2xl mt-4">
          Notes
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(form);
          }}
          className="w-auto mt-6 min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch"
        >
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border-2 rounded border-gray-600 p-2 border-gray-500 dark:text-gray-200 dark:bg-slate-800"
          />
          <textarea
            placeholder="Content"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="resize-none h-28 border-2 rounded border-gray-600 p-2 border-gray-500 dark:text-gray-200 dark:bg-slate-800"
          />

          <button type="submit" className="bg-blue-500 text-white rounded p-1">
            Add +
          </button>
        </form>

        <div className="w-auto min-w-[25%] max-w-min mt-20 mx-auto space-y-6 flex flex-col items-stretch dark:text-gray-200">
          <ul>
            {notes.map((note) => (
              <li key={note.id} className="border-b border-gray-600 p-2">
                <div className="flex justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold">{note.title}</h3>
                    <p className="text-sm">{note.content}</p>
                  </div>
                  <button
                    onClick={() =>
                      setForm({
                        title: note.title,
                        content: note.content,
                        id: note.id,
                      })
                    }
                    className="bg-blue-500 mr-3 px-3 text-white rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="bg-red-500 px-3 text-white rounded"
                  >
                    X
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const notes = await prisma.note.findMany({
    select: {
      title: true,
      id: true,
      content: true,
    },
  });

  return {
    props: {
      notes,
    },
  };
};
