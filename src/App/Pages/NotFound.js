import { useEffect } from "react";

export const NotFound = () => {
  useEffect(() => {
    document.title = "Page Not Found";
  }, []);
  return <>404</>;
};
