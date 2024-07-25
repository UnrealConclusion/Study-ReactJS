import { useState, useEffect } from "react";

export default function useLocalStorageState(initialState, key){
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : initialState;
      });

    /**
     * Update local storage anytime value is updated 
     */
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]); 

    return [value, setValue]
}