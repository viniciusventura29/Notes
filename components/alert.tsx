import { Transition } from "@headlessui/react";
import { create } from "zustand";

type AlertType = "Error" | "Success";

type UseAlertStore = {
  alertText: string;
  alertTitle: string;
  isShowing: boolean;
  type: AlertType;
  trigger: (opts: {
    type?: AlertType;
    text: string;
    title: string;
    duration?: number;
  }) => void;
};

export const useAlertStore = create<UseAlertStore>()((set) => ({
  alertText: "",
  alertTitle: "",
  isShowing: false,
  type: "Success",
  trigger: ({ duration = 2000, type = "Success", text, title }) => {
    set((_state) => ({
      alertText: text,
      alertTitle: title,
      type: type,
      isShowing: true,
    }));
    setTimeout(() => {
      set((_state) => ({
        alertText: text,
        alertTitle: title,
        type: type,
        isShowing: false,
      }));
    }, duration);
  },
}));

export const useAlert = () => useAlertStore((state) => state.trigger);

export const Alert = () => {
  const { alertText, alertTitle, isShowing, type } = useAlertStore();

  return (
    <Transition
      show={isShowing}
      enter="transition ease-in-out duration-300 transform"
      enterFrom="translate-x-full"
      enterTo="-translate-x-0"
      leave="transition ease-in-out duration-300 transform"
      leaveFrom="-translate-x-0"
      leaveTo="translate-x-full"
      className={`border-l-4 z-[100] fixed right-6 bottom-4 w-1/4 rounded px-5 py-3 flex flex-col ${
        type == "Error"
          ? "border-red-500 bg-red-100 text-red-900"
          : "border-green-500 bg-green-100 text-green-900"
      }`}
    >
      <div className="text font-bold">{alertTitle}</div>
      <p className="text-sm">{alertText}</p>
    </Transition>
  );
};
