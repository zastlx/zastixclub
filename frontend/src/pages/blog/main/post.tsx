import { Link } from "react-router-dom";
// @ts-expect-error
import styles from "./post.module.css";
import { isMobile } from"react-device-detect";

export default ({ title, date, id }: {
    title: string;
    date: string;
    id: number;
}) => {

    return (
        <>
            <div className={isMobile ? styles.blogPostMobile : styles.blogPost}>
                <span>{(new Date(date)).toLocaleDateString().split("/").join(" / ")}</span>
                <Link className={styles.blogPostLink} to={`/blog/${id}`}>
                    {title}
                </Link>
            </div>
            <hr/>
        </>
    );
}