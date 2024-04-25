// @ts-expect-error
import styles from "./index.module.css";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useIsMobile } from "../../utils";

export default function CarouselItem({ icon, url, site, username  }: {
    icon: IconProp,
    url: string,
    site: string,
    username: string;
}) {
    const isMobile = useIsMobile();

    return (
        <div className={isMobile ? styles.carouselCardMobile : styles.carouselCard}>
            <FontAwesomeIcon onClick={() => window.open(url)} className={isMobile ? styles.asdM : styles.asd} icon={icon} />
            <div onClick={() => window.open(url)} style={{
                textAlign: "center"
            }}>
                <p style={{ marginBottom: 0, position: "relative", top: 5 }}>{username}</p>
                <h1 style={{ margin: 0 }}>{site}</h1>
            </div>
        </div>
    );
}

/*
<div class="_carouselCard_1t2pb_23"><svg/><div style="
    text-align: center;
"><p style="margin-bottom: 0;position: relative;top: 5px;">@zastlx</p><h1 style="
    margin: 0;
">Github</h1></div></div>*/