import axios from "axios";
import { Review } from "../types";

class ReviewManagerClass {
    reviews: Promise<Review>[] = [];

    constructor() {
        console.log("[ReviewManager] Constructed")
        this.reviews = [];

        this.loadReviews();
    }

    async loadReviews() {
        this.reviews = [];
        console.log("[ReviewManager] Loading reviews")
        const res = await axios.get("/api/getreviews");
        if (res.status !== 200) return console.error("[ReviewManager] Failed to load reviews");
        this.reviews = res.data.map(async (review: any) => { return { ...review, pfp: (await axios.get(`/api/avatar/${review.discord}`)).data } });
        console.log("[ReviewManager] Loaded reviews");
    }
}

const ReviewManager = new ReviewManagerClass();
export default ReviewManager;
// @ts-ignore
window.rm = ReviewManager;