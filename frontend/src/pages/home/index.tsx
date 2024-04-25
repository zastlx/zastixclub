// @ts-expect-error
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import Background from "../../components/bg";
import { Review } from "../../types";
import ReviewComponent from "./review";
import NavBar from "../../components/navbar";
import ReviewManager from "../../utils/ReviewManager";

export default () => {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        document.title = "zastix' site";

        // goofy ahh
        if (ReviewManager.reviews.length < 1) ReviewManager.loadReviews().then(() => Promise.all(ReviewManager.reviews)
            .then((reviews) => reviews.sort(() => .5 - Math.random()))
            .then((sortedReviews) => setReviews(sortedReviews)));
        else Promise.all(ReviewManager.reviews)
            .then((reviews) => reviews.sort(() => .5 - Math.random()))
            .then((sortedReviews) => setReviews(sortedReviews));
    }, []);

    return (
        <>
            <NavBar />
            <div className="container">
                <Background />
                <div>
                    <div className={styles.pfpContainer}>
                        <img draggable={false} className={styles.pfpImg} src="/resources/pfps/pfp_crop.png" />
                        <div className={styles.pfpGlow}></div>
                    </div>
                    <div className={styles.textGlow} style={{
                        fontSize: "40px"
                    }}>zastix</div>
                    <div className={styles.textGlow}><i>fullstack web developer, horrible reverse engineer</i><br /><b>she/her</b></div>
                </div>
                <div className={styles.reviewGrid}>{reviews.map((review, _) => <ReviewComponent key={_} {...review} />)}</div>
            </div>
        </>
    );
} 
