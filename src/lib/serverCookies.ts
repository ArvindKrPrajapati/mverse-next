import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const getToken = () => {
  const clientCookies = cookies();
  return clientCookies.get("token")?.value;
};
export const getCurrentUser = () => {
  const token: any = getToken();
  if (!token) return null;
  try {
    const jwt_secret = process.env.JWT_SECRET as string;
    const decoded: any = jwt.verify(token, jwt_secret);
    return decoded;
  } catch (error) {
    console.log(error);

    return null;
  }
};

export function getUserIdFromAuth(request: Request) {
  const auth = request.headers.get("authorization") || getToken();
  let id: any = null;
  let token;
  if (auth && auth.startsWith("Bearer ")) {
    token = auth.split(" ")[1];
  } else {
    token = auth;
  }

  if (token) {
    try {
      const jwt_secret = process.env.JWT_SECRET as string;
      const decoded: any = jwt.verify(token, jwt_secret);
      id = decoded._id;
    } catch (error) {}
  }

  return getValidId(id);
}

export const getValidId = (id: any) => {
  const isValidMyId = mongoose.Types.ObjectId.isValid(id);
  if (isValidMyId) {
    return new mongoose.Types.ObjectId(id);
  }
  return null;
};
