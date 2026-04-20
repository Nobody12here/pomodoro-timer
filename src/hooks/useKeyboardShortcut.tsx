import { useState, useEffect } from "react";

export function useKeyboardShortcut(key: string, callback: CallableFunction) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === key) {
        callback();
      }
    };
    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [key, callback]);
}
