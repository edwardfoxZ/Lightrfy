import { useState } from "react";

export const useMobileBoard = () => {
  const [mobileSong, setMobileSong] = useState(false);

  return { mobileSong, setMobileSong };
};
