import { SessionOptions } from "iron-session";

export interface SessionData {
  userId?:string;
  username?:string;
  email?:string;
  token?:string;
  id?:string
  isLoggedIn:boolean
}

export const defaultSession:SessionData = {
  isLoggedIn:false
}

export const sessionOptions: SessionOptions ={
  password: process.env.SECRET_KEY!,
  cookieName: "data-session",
  cookieOptions:{
    httpOnly:true,
    secure: process.env.NODE_ENV === "production"
  }
}