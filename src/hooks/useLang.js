import React, { useEffect, useState } from "react";

const useLang = () => {
    const [lang, setValue] = useState('en');
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            setLoading(false);
            let value = window.localStorage.getItem('applang');
            if (value !== null) {
                setValue(value);
            }
        }
    }, [isLoading]);

    const setLang = (newValue, closeApp = false) => {
        setValue(newValue);
        window.localStorage.setItem('applang', newValue);
        setLoading(true)
    }

    return [lang, setLang];
}

export default useLang;