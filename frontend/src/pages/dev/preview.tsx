// @ts-ignore
import styles from "./index.module.css";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default ({
    title,
    content
}: {
    title: string,
    content: string
}) => {
    return (
        <> 
            <h1>
                {title}
                <hr/>
            </h1>
            <ReactMarkdown className={styles.content} linkTarget="_blank" rehypePlugins={[rehypeRaw as any]} remarkPlugins={[remarkGfm]}>{content.replace(/\n/g, "    \n")}</ReactMarkdown>
        </>
    );
}

