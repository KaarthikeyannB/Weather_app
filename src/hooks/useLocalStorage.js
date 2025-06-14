import { useEffect, useState } from "react"

export default function useLocalStorage(key, defaultValue) {
    const [value, setValue] = useState(() => {
        let currentValue;
        try {
            currentValue = JSON.parse(localStorage.getItem(key) || String(defaultValue));
            // If the value is not parsable, fallback to defaultValue
        } catch (error) {
            console.error(`Error parsing localStorage key "${key}":`, error);
            currentValue = defaultValue;
        }
        return currentValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}