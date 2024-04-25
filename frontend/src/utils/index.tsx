import { useEffect, useState } from "react";

const useIsMobile = () => {
    const [width, setWidth] = useState<number>(window.innerWidth);
    const handleWindowSizeChange = () => setWidth(window.innerWidth);

    useEffect(() => {
        window.addEventListener("resize", handleWindowSizeChange);
        return () => window.removeEventListener("resize", handleWindowSizeChange);
    }, []);

    return width <= 768;
}

const useScreenSize = () => {
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [height, setHeight] = useState<number>(window.innerHeight);
    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }

    useEffect(() => {
        window.addEventListener("resize", handleWindowSizeChange);
        return () => window.removeEventListener("resize", handleWindowSizeChange);
    }, []);

    return [width, height];
}

const formatDate = (date: string) => (new Date(date)).toLocaleDateString().split("/").join(" / ");

export { useIsMobile, useScreenSize, formatDate }