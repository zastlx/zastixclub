import axios from "axios";
import { useEffect, useState } from "react";

// @ts-ignore
import styles from "./index.module.css";
import Background from "../../components/bg";
import NavBar from "../../components/navbar";
import Preview from "./preview";
import Editor from "./editor";

export default () => {
    const [isPreview, setIsPreview] = useState(false);
    const [title, setTitle] = useState("Title");
    const [content, setContent] = useState("Content Here");
    const [key, setKey] = useState("");

    useEffect(() => {
        document.title = "Post Creator | zastix' site";
    }, []);

    return (
        <>
            <NavBar />
            <div className="container">
                <Background/>
                <div className={styles.post}>
                    <div onClick={() => setIsPreview(!isPreview)} className={styles.togglePreviewBtn}>{isPreview ? "Editor" : "Preview"}</div>
                    { isPreview ? <Preview title={title} content={content}/> : <Editor content={content} title={title} setContent={setContent} setTitle={setTitle}/> }
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2vh",
                    marginBottom: "4vh"
                }}>
                    <input className={styles.keyInput} type="password" placeholder="Key" onChange={(e) => setKey(e.target.value)}/>
                    <div className={styles.makePostBtn} onClick={() => { axios.post("/api/makepost", { title, content: content.replace(/\n/g, "    \n"), key}).then(() => location.href="/blog")}}>Post</div>
                </div>
            </div>
        </>
    );
} 

