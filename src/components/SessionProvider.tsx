"use client";
import { Session } from "next-auth";
import { SessionProvider as Provider } from "next-auth/react";

type SessionProviderProps = {
  session: Session;
  children: React.ReactNode;
};

function SessionProvider({ session, children }: SessionProviderProps) {
  return <Provider session={session}>{children}</Provider>;
}

export default SessionProvider;
