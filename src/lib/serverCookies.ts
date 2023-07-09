import { cookies } from "next/headers";

export const getToken = () => {
  const clientCookies = cookies();
  return clientCookies.get("token")?.value;
};
export const getCurrentUser = () => {
  const user: any = cookies().get("user")?.value;
  return user ? JSON.parse(user) : null;
};
