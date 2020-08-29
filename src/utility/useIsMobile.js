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
        let heightPicCalc = "";
        if(contWidth < 550) {
            widthCalc= "calc(100vw - 5px)";
            heightPicCalc = "calc(78vw - 4px)";
        }
        else if(contWidth < 700) {
            widthCalc= "calc(48vw - 5px)";
            heightPicCalc = "calc(37vw - 4px)";
        }
        else if(contWidth < 1200) {
            widthCalc= "calc(32vw - 20px)";
            heightPicCalc = "calc(25vw - 4px)";
        }
        else {
            widthCalc= "calc(24vw - 10px)";
            heightPicCalc = "calc(19vw - 8px)";
        }

        return {widthCalc, heightPicCalc};
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