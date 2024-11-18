import { createContext, useContext, useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import supabase from "../utils/supabase";

const SessionContext = createContext<{
  session: Session | null;
}>({
  session: null,
});

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

type Props = { children: React.ReactNode };

export const SessionProvider = ({ children }: Props) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const authStateListener = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setSession(session);
      },
    );

    return () => {
      authStateListener.data.subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <SessionContext.Provider value={{ session }}>
      {children}
    </SessionContext.Provider>
  );
};
