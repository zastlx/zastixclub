// @ts-ignore
import styles from "./index.module.css";

export default ({
    title,
    content,
    setTitle,
    setContent
}: {
    title: string,
    content: string,
    setTitle: (title: string) => void,
    setContent: (content: string) => void
}) => {

    return (
        <> 
            <h1 style={{
                marginTop: "10vh"
            }}>
                <input className={styles.titleInput} value={title} onChange={(e) => setTitle(e.target.value)}/>
                <hr/>
            </h1>
            <textarea className={styles.contentInput} value={content} onChange={(e) => setContent(e.target.value)}/>
        </>
    );
}

