import { AuthError, Session } from "@supabase/supabase-js";

export type SingleNote ={
    id: string;
    title: string;
    content: string;
  
}

export type Notes = {
  map(arg0: (note: any) => JSX.Element): import("react").ReactNode;
  notes: {
    id: string;
    title: string;
    content: string;
  }[];
};

export type FormData = {
  title: string;
  content: string;
  id: string;
};

export type SessionUser =
  | {
      data: { session: Session };
      error: null;
    }
  | { data: { session: null }; error: AuthError }
  | { data: { session: null }; error: null };
