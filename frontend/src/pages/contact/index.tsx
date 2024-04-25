import { useEffect } from "react";
import Background from "../../components/bg";
import NavBar from "../../components/navbar";
import AutoplayCarousel from "./carousel";

export default () => {
    useEffect(() => {
        document.title = "Contact Me | zastix' site";
    }, []);

    return (
        <>
            <NavBar />
            <div className="container">
                <Background/>
                <AutoplayCarousel/>
            </div>
        </>
    );
} 
