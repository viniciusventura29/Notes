import { AuthError, Session } from "@supabase/supabase-js";

export type SingleNote ={
    id: string;
    title: string;
    content: string;
    authorized_users: string[]
}

export type FileObject={
  created_at:string;
  id: string;
  last_accessed_at: string;
  metadata: any;
  name: string;
  updated_at: string
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
  authorized_users: string[]
};

export type SessionUser =
  | {
      data: { session: Session };
      error: null;
    }
  | { data: { session: null }; error: AuthError }
  | { data: { session: null }; error: null };
