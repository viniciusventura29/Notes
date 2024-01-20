import { useState } from "react";
import { useAlert } from "./Alert";
import supabase from "../pages/api/supabaseClient";
import { User } from "@supabase/supabase-js";

export interface modalProps {
  setModalComponent: any;
  modalComponent: boolean;
  user: User | undefined;
}

export function UploadModal({
  user,
  setModalComponent,
  modalComponent,
}: modalProps) {
  const trigger = useAlert();
  const [file, setFile] = useState<FileList | null>();

  async function uploadFile(file: File | null | undefined) {
    if (file) {
      const { data, error } = await supabase.storage
        .from("files")
        .upload(user?.id + "/" + file.name, file);
      if (error) {
        trigger({
          text: "Ocorreu um erro no upload do seu arquivo! Verifique se está tudo correto.",
          title: "Erro ao enviar o arquivo",
          type: "Error",
        });
      } else {
        trigger({
          text: "Upload do arquivo feito com sucesso",
          title: "Sucesso ao enviar o arquivo",
          type: "Success",
        });
        setModalComponent(false);
      }
    }
  }

  return (
    <div
      className={`flex justify-center items-center fixed h-screen w-full top-0 ${
        modalComponent ? "" : "hidden"
      }`}
    >
      <div
        onClick={() => {
          setModalComponent(false);
        }}
        className="w-full fixed top-0 left-0 backdrop-blur-[3px] backdrop-brightness-90 h-full"
      ></div>
      <div className="divide-solid divide-y dark:divide-slate-900 shadow-2xl bg-gray-50 dark:bg-slate-800 px-8 py-6 z-10 rounded-lg w-[50rem]">
        <form
          onSubmit={(e) => {
            uploadFile(file?.item(0));
            e.preventDefault();
          }}
        >
          <h2 className="text-2xl font-bold mb-4">Upload your file</h2>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {file?.item(0)?.name ??
                    "SVG, PNG, JPG, PDF or PPTX (MAX. 800x400px)"}
                </p>
              </div>
              <input
                onChange={(e) => setFile(e.target.files)}
                type="file"
                id="dropzone-file"
                className="hidden"
              />
            </label>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 duration-500 text-white rounded p-2 mt-4 w-1/4"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}
