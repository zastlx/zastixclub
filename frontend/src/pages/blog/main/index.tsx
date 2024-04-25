import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

import NavBar from "../../../components/navbar";
import { Post } from "../../../types.d";
import BlogPost from "./post";
import Background from "../../../components/bg";
// @ts-expect-error
import styles from "./index.module.css";
import PostsManager from "../../../utils/PostsManager";

export default () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        document.title = "Blog | zastix' site"

        if (PostsManager.posts.length < 1) PostsManager.loadPosts().then(() => setPosts(PostsManager.posts.reverse()));
        else setPosts(PostsManager.posts.reverse());
    }, []);

    return (
        <>
            <NavBar />
            <div className="container">
                <Background />
                <div className={isMobile ? styles.blogsMobile : styles.blogs}>
                    {posts.map((post, _) => <BlogPost key={_} {...post} />)}
                </div>
            </div>
        </>
    );
}