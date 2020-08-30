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
            widthCalc= "calc(93vw)";
            heightPicCalc = "calc(72.54vw)";
        }
        else if(contWidth < 700) {
            widthCalc= "calc(46vw)";
            heightPicCalc = "calc(35.88)";
        }
        else if(contWidth < 1200) {
            widthCalc= "calc(30vw)";
            heightPicCalc = "calc(24.3vw)";
        }
        else {
            widthCalc= "calc(23vw)";
            heightPicCalc = "calc(17.94vw)";
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