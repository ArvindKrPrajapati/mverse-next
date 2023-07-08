export default function userCurrentUser() {
  const logout = () => {
    localStorage.clear();
  };

  const setUser = (user: any, token: string) => {
    localStorage.clear();
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const getUser = () => {
    const user: any = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
  };

  return {
    logout,
    setUser,
    getUser,
  };
}
