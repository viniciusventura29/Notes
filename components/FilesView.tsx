import { Dispatch, SetStateAction } from "react";
import { FileObject } from "../types";
import supabase from "../pages/api/supabaseClient";

export interface modalProps {
  setModalComponent: Dispatch<SetStateAction<boolean>>;
  modalComponent: boolean;
  files: FileObject[] | undefined;
}

export function FilesView({
  setModalComponent,
  modalComponent,
  files,
}: modalProps) {

  const download = async (fileName: string) => {
    const { data } = await supabase.storage
      .from("files")
      .download(fileName);

    if (!data) return;
    
    const url = URL.createObjectURL(data)
    
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed bottom-10 right-14 flex flex-col-reverse gap-3 items-end">
      <button
        onClick={() => {
          setModalComponent(!modalComponent);
        }}
        className="rounded-full bg-blue-500 transition-colors duration-200 hover:bg-blue-600 shadow border dark:border-slate-800 flex justify-center items-center p-4 text-blue-100 w-16 h-16"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-files"
          width="26"
          height="26"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 3v4a1 1 0 0 0 1 1h4" />
          <path d="M18 17h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h4l5 5v7a2 2 0 0 1 -2 2z" />
          <path d="M16 17v2a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h2" />
        </svg>
      </button>
      <div
        className={`rounded-md rounded-br-none border dark:border-gray-600 shadow dark:bg-slate-800 bg-slate-100 w-72 h-[32rem] overflow-y-scroll ${
          modalComponent ? "" : "hidden"
        }`}
      >
        <h3 className="flex dark:text-white text-xl justify-center p-4 font-semibold">
          Your Files
        </h3>
        {files?.map((file, index) => (
          <div
          key={index}
          onClick={()=>download(file.name)}
            className={`flex justify-between px-4 py-2 border-b border-gray-400 dark:border-gray-700 hover:text-blue-700 text-blue-500 cursor-pointer ${
              index === 0 ? "border-t" : ""
            }`}
          >
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
        ))}
      </div>
    </div>
  );
}
