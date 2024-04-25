import Home from "./home";
import Projects from "./projects";
import Blogs from "./blog/main";
import BlogPost from "./blog/post";
import Contact from "./contact";
import Dev from "./dev";

export default {
    home:  Home,
    projects: Projects,
    blogs: {
        main: Blogs,
        post: BlogPost
    },
    contact: Contact,
    dev: Dev
}