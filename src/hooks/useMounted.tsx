import { useEffect, useState } from "react";

const useMounted = () => {
  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);

  return mount;
};

export default useMounted;
