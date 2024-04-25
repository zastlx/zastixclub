// @ts-ignore
import styles from "./review.module.css";
import { Review } from "../../types";

export default ({
    pfp,
    name,
    review,
    link
}: Review) => {
    return (
        <div className={styles.review}>
            <div className={styles.reviewAuthor}>
                <img draggable={false} src={pfp}></img>
                <h1 style={{
                    cursor: "pointer",
                    textDecoration: "underline"
                }} onClick={() => window.open(link)}>{name}</h1>
            </div>
            <i>"{review}"</i>
        </div>
    );
}