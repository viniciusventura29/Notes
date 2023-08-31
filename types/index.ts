export type Notes={
  map(arg0: (note: any) => JSX.Element): import("react").ReactNode;
  notes: {
    id: string;
    title: string;
    content: string;
  }[];
}

export type FormData ={
  title: string;
  content: string;
  id: string;
}