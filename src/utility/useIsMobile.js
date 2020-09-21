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
            widthCalc= "93vw";
            heightPicCalc = "72.54vw";
        }
        else if(contWidth < 700) {
            widthCalc= "46vw";
            heightPicCalc = "35.88vw";
        }
        else if(contWidth < 1200) {
            widthCalc= "30vw";
            heightPicCalc = "24.3vw";
        }
        else {
            widthCalc= "23vw";
            heightPicCalc = "17.94vw";
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