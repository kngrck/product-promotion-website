import { compare, hash } from "bcrypt";
import { getSession } from "next-auth/client";

export async function verifyPassword(password: any, hashedPassword: any) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}

export async function isAuthenticated(req: any) {
  const session = await getSession({ req: req });
  if (session) return true;
  else return false;
}
