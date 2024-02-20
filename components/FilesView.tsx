import { Dispatch, SetStateAction } from "react";
import { FileObject } from "../types";
import supabase from "../pages/api/supabaseClient";
import { User } from "@supabase/supabase-js";
import { useQueryClient } from "react-query";

export interface modalProps {
  setModalComponent: Dispatch<SetStateAction<boolean>>;
  modalComponent: boolean;
  files: FileObject[] | undefined;
  user: User | undefined;
}

export function FilesView({
  setModalComponent,
  modalComponent,
  files,
  user,
}: modalProps) {
  const queryClient = useQueryClient();
  const download = async (fileName: string) => {
    const { data } = await supabase.storage.from("files").download(fileName);

    if (!data) return;

    const url = URL.createObjectURL(data);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const deleteFile = async (fileName: string) => {
    await supabase.storage.from("files").remove([user?.id + "/" + fileName]);
    queryClient.invalidateQueries(["getFiles"]);
  };

  return (
    <div className="flex flex-col-reverse gap-3 items-end">
      <button
        onClick={() => {
          setModalComponent(!modalComponent);
        }}
        className="rounded-full bg-blue-500 transition-colors duration-200 hover:bg-blue-600 shadow border dark:border-slate-800 flex justify-center items-center p-4 text-blue-100 md:w-14 md:h-14 w-12 h-12"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-folders"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 4h3l2 2h5a2 2 0 0 1 2 2v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
          <path d="M17 17v2a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h2" />
        </svg>
      </button>
      <div
        className={`absolute sm:left-16 sm:bottom-24 rounded-md rounded-br-none border dark:border-gray-600 shadow dark:bg-slate-800 bg-slate-100 sm:w-96 sm:h-[32rem] w-full h-full overflow-y-scroll ${
          modalComponent ? "" : "hidden"
        }`}
      >
        <h3 className="dark:text-white text-xl justify-center p-4 font-semibold">
          Your Files
        </h3>
        <button className="text-red-500" onClick={()=>setModalComponent(false)}>X</button>
        {files?.map((file, index) => (
          <div
            key={index}
            onClick={() => download(file.name)}
            className={`flex gap-4 px-4 py-2 border-b border-gray-400 dark:border-gray-700 hover:text-blue-700 text-blue-500 cursor-pointer items-center group/file ${
              index === 0 ? "border-t" : ""
            }`}
          >
            <div className="flex justify-between w-full items-center">
              {file.name}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                <path d="M7 11l5 5l5 -5" />
                <path d="M12 4l0 12" />
              </svg>
            </div>

            <button
              onClick={() => deleteFile(file.name)}
              className="group-hover/file:flex hidden p-1 hover:bg-red-500 rounded group/trash"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-trash stroke-black group-hover/trash:stroke-white"
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
                <path d="M4 7l16 0" />
                <path d="M10 11l0 6" />
                <path d="M14 11l0 6" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
