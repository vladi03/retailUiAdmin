import {useState, useEffect} from "react";

export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 760);
    const resize = () => {
        setIsMobile(window.innerWidth <= 760);
    };

    useEffect(() => {
        window.addEventListener("resize", resize);
        return () => {
            window.removeEventListener("resize", resize);
        };
    });

    return isMobile;
};