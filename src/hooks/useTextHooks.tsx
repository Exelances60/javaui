const useTextHooks = () => {
  const toTitleCase = (str: string) => {
    return str
      .toLocaleLowerCase()
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
  };

  return { toTitleCase };
};

export default useTextHooks;
