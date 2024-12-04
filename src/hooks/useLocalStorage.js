// src/hooks/useLocalStorage.js
import { useState, useEffect } from "react";

const useLocalStorage = (key, initialValue) => {
  // Check if localStorage has the saved value
  const storedValue = localStorage.getItem(key);

  // If a saved value exists in localStorage, use it, otherwise use the initialValue
  const [value, setValue] = useState(() =>
    storedValue ? JSON.parse(storedValue) : initialValue
  );

  // Sync localStorage with the value every time it changes
  useEffect(() => {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
