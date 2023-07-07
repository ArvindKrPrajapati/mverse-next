import { mverseToken } from "./constants";

export const mversePost = async (url: string, data: any) => {
  let options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  if (mverseToken()) {
    options.headers = {
      ...options.headers,
      Authorization: "Bearer " + mverseToken(),
    };
  }

  const res = await fetch(url, options);
  return res.json();
};
