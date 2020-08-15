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
    },[]);

    return isMobile;
};

export function useCardSize() {
    const calcCardSize = (contWidth) => {

        let widthCalc = "";
        if(contWidth < 550) widthCalc= "calc(100vw - 5px)";
        else if(contWidth < 700) widthCalc= "calc(48vw - 5px)";
        else if(contWidth < 1200) widthCalc= "calc(32vw - 20px)";
        else widthCalc= "calc(24vw - 10px)";
        console.log(contWidth);
        console.log(widthCalc);
        return widthCalc;
    };
    const [cardWidth, setCardWidth] = useState(calcCardSize(window.innerWidth));

    useEffect(() => {
        function resizeWidth() {
            const res = calcCardSize(window.innerWidth);
            setCardWidth(res);
        }

        window.addEventListener("resize", resizeWidth);

        return () => {
            window.removeEventListener("resize", resizeWidth);
        };
    },[]); // Empty array ensures that effect is only run on mount

    return cardWidth;
}