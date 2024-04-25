import axios from "axios";
import { Post } from "../types";

class PostManagerClass {
    posts: Post[];

    constructor() {
        console.log("[PostManager] Constructed")
        this.posts = [];

        this.loadPosts();
    }

    async loadPosts() {
        console.log("[PostManager] Loading posts")
        const res = await axios.get("/api/getpost");
        if (res.status !== 200) return console.error("[PostManager] Failed to load posts");
        console.log("[PostManager] Loaded posts");
        this.posts = res.data;
    }
}

const PostManager = new PostManagerClass();
export default PostManager;
// @ts-ignore
window.pm = PostManager;