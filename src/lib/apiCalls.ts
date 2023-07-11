export const mversePost = async (url: string, data: any) => {
  let options: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const res = await fetch(url, options);
  return res.json();
};

export const mverseGet = async (url: string) => {
  const res = await fetch(url, { cache: "no-store" });
  return res.json();
};

export const mversePatch = async (url: string, data: any) => {
  let options: RequestInit = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const res = await fetch(url, options);
  return res.json();
};
