import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const getToken = () => {
  const clientCookies = cookies();
  return clientCookies.get("token")?.value;
};
export const getCurrentUser = () => {
  const user: any = cookies().get("user")?.value;
  return user ? JSON.parse(user) : null;
};

export function getUserIdFromAuth(request: Request) {
  const auth = request.headers.get("authorization") || getToken();
  let id = "";
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
  return id;
}
