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

export const mverseGet = async (url: string) => {
  // let options: RequestInit = {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // };

  // if (mverseToken()) {
  //   options.headers = {
  //     ...options.headers,
  //     Authorization: "Bearer " + mverseToken(),
  //   };
  // }
  const res = await fetch(url);
  if (!res.ok) throw new Error("failed to fetch");
  return res.json();
};
