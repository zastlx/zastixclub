// @ts-expect-error
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import CarouselItem from "./item";
import { faDiscord, faGithub, faReddit, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useIsMobile } from "../../utils";

interface Account {
    icon: IconProp;
    url: string;
    site: string;
    username: string;
}
export default function AutoplayCarousel() {
    const [accs, setAccs] = useState<Account[]>([]);
    const isMobile = useIsMobile();

    useEffect(() => {
        setAccs([
            {
                icon: faDiscord,
                url: "https://blooket.com/",
                site: "Discord",
                username: "@notzastix"
            },
            {
                icon: faGithub,
                url: "https://github.com/zastlx",
                site: "Github",
                username: "@zastlx"
            },
            {
                icon: faTwitter,
                url: "https://twitter.com/@notzastix",
                site: "Twitter",
                username: "@notzastix"
            },
            {
                icon: faReddit,
                url: "https://www.reddit.com/u/zastixx",
                site: "Reddit",
                username: "u/zastixx"
            },
            {
                icon: faYoutube,
                url: "https://www.youtube.com/@zastix",
                site: "Youtube",
                username: "@zastix"
            }
        ]);
    }, []);
    
  return (
    <div className={isMobile ? styles.carouselContainerMobile : styles.carouselContainer}>
      <div className={isMobile ? styles.carouselTrackMobile : styles.carouselTrack}>
         {accs.map((acc, _) => {
            return (<CarouselItem {...acc} />);
         })}
         {accs.map((acc, _) => {
            return (<CarouselItem {...acc} />);
         })}
      </div>
    </div>
  );
}