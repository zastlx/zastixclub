import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

import NavBar from "../../../components/navbar";
import Background from "../../../components/bg";
import { Post } from "../../../types.d";
// @ts-ignore
import styles from "./index.module.css";
import PostsManager from "../../../utils/PostsManager";

export default () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        if (PostsManager.posts.length > 0) {
            const post = PostsManager.posts.find((post) => post.id === Number(id));
            if (post) {
                setPost(post);
                document.title = `${post.title} | zastix' site`;
            }
            else navigate("/blog");
        }
        else PostsManager.loadPosts().then(() => navigate(`/blog/${id}`)); // hacky way to force a rerender but it works
    }, []);

    return (
        <>
            <NavBar />
            <div className="container">
                <Background />
                {post && <div className={styles.post}>
                    <h1>
                        {post.title}
                        <hr />
                    </h1>
                    {/* @ts-ignore */}
                    <ReactMarkdown className={styles.content} linkTarget="_blank" rehypePlugins={[rehypeRaw as any]} remarkPlugins={[remarkGfm]}>{post.content.replaceAll("\\n", "\n")}</ReactMarkdown>
                </div>}
            </div>
        </>
    );
}