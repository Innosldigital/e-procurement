import mongoose from "mongoose";

declare global {
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

export interface UserToAdd {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  photo?: string;
}
