import { ReactNode, useEffect, useState } from "react";
import { getUser } from "../pages/api/notes"
import { useRouter } from "next/router";
import { SessionUser } from "../types";

const AuthMiddleware = ({
  children,
}: {
  children: (session: any) => ReactNode;
}) => {
  const [session, setSession] = useState<SessionUser>();

  const route = useRouter();

  useEffect(() => {
    getUser().then((r) => {
      setSession(r);
      if (!r?.data.session?.user) {
        route.push("/login");
      }
    });
  }, []);

  return <div>{children(session)}</div>;
};

export default AuthMiddleware;
