import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
    const [dbValue, setDbValue] = useState(value);
    useEffect(() => {
        const thich = setTimeout(() => setDbValue(value), delay);
        return () => clearTimeout(thich);
    }, [value]);
    return dbValue;
}

export default useDebounce;
