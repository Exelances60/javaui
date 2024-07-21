import Cookies from "universal-cookie";

const useCookies = () => {
  const cookies = new Cookies();
  const setCookie = (key: string, value: string, express: number) => {
    if (express) {
      const expirationDate = new Date(Date.now() + express);
      cookies.set(key, value, { path: "/", expires: expirationDate });
    } else {
      cookies.set(key, value, { path: "/" });
    }
  };
  const getCookie = (key: string) => {
    return cookies.get(key);
  };
  const removeCookie = (key: string) => {
    cookies.remove(key);
  };
  const getAllCookies = () => {
    return cookies.getAll();
  };

  return { setCookie, getCookie, removeCookie, getAllCookies };
};

export default useCookies;
