interface Review {
    discord: string;
    pfp: string;
    name: string;
    review: string;
    link: string;
}

interface Project {
    link: string;
    name: string;
    img: string;
    desc: string;
    src?: string;
    outline: boolean;
}

interface Post {
    id: number;
    content: string;
    date: string;
    title: string;
}

declare module "*.module.css" {
    const content: Record<string, string>;
    export default content;
}

export { Post, Review, Project };