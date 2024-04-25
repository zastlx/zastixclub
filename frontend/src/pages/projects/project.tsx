// @ts-expect-error
import styles from "./project.module.css";
import ReactMarkdown from "react-markdown"
import { useLayoutEffect, useRef } from "react";
import remarkGfm from "remark-gfm";
import { gsap } from "gsap";
import { isMobile } from "react-device-detect";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default ({ name, img, desc, src, link, outline }: {
    name: string;
    img: string;
    desc: string;
    src?: string;
    link: string;
    outline: boolean;
}) => {
    const ref = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!ref.current) return;

        gsap.set(ref.current, {
            opacity: 0,
            yPercent: 50
        });
        gsap.to(ref.current, {
            opacity: 1,
            duration: 1,
            yPercent: 0,
            ease: "circ.out",
            scrollTrigger: {
                trigger: ref.current,
                start: "top bottom",
                scroller: ref.current.parentElement
            },
        });
    }, []);

    return (
        <div className={isMobile ? styles.projectMobile : styles.project} ref={ref}>
            <img style={outline ? {} : {
                boxShadow: "none"
            }} src={img} />
            <div>
                <div className={styles.uwu}>
                    <h1>{name}</h1>
                    <ReactMarkdown linkTarget="_blank" className={styles.description} remarkPlugins={[remarkGfm]}>{desc}</ReactMarkdown>
                </div>
                <div className={styles.projectLinks}><a target="_blank" href={link} style={{
                    color: "unset"
                }}><b>Link</b></a> <span>/</span> {src ? <a target="_blank" href={src} style={{
                    color: "unset"
                }}><b>Source</b></a> : <b style={{ textDecoration: "line-through", cursor: "default" }}>Source</b>}</div>
            </div>
        </div>
    )
}