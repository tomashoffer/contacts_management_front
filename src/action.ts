"use server";
import { sessionOptions, SessionData, defaultSession } from "@/lib";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
};
export const login = async (
  data: SessionData
) => {
  const session = await getSession();

  session.userId = data.userId;
  session.username = data.username;
  session.email = data.email;
  session.token = data.token;
  session.isLoggedIn = true;

  await session.save();
  redirect("/");
};



export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/login");
};
