import { Session } from '@supabase/supabase-js';
import React, { SetStateAction, useEffect, useState } from 'react';

import { SessionContext } from '@/hooks/use-session';
import supabase from '@/utils/supabase';

type Props = { children: React.ReactNode };

export const SessionProvider = ({ children }: Props) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const authStateListener = supabase.auth.onAuthStateChange(
      async (_: string, session: SetStateAction<Session | null>) => {
        setSession(session);
      },
    );

    return () => {
      authStateListener.data.subscription.unsubscribe();
    };
  }, []);

  return <SessionContext.Provider value={{ session }}>{children}</SessionContext.Provider>;
};
