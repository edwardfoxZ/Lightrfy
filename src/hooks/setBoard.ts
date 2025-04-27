import { useState } from "react";

export function useBoard() {
  const [isBoard, setIsBoard] = useState(false);

  return { setIsBoard, isBoard };
}
