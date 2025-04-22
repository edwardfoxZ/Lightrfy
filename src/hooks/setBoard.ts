import { useEffect, useState } from "react";

export function useBoard() {
  const [isBoard, setIsBoard] = useState(false);

  useEffect(() => {
    console.log(`Status of Board: ${isBoard}`);
  }, [isBoard]);

  return { setIsBoard, isBoard };
}
