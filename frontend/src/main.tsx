import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./styles/index.css"
import pages from "./pages";

const router = createBrowserRouter([
    {
        path: "/*",
        element: <pages.home />
    },
    {
        path: "/projects",
        element: <pages.projects />
    },
    {
        path: "/blog",
        element: <pages.blogs.main />,
    },
    {
        path: "/blog/:id",
        element: <pages.blogs.post />,
    },
    {
        path: "/contact",
        element: <pages.contact />
    },
    {
        path: "/dev",
        element: <pages.dev />
    }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <RouterProvider fallbackElement={<div>womp womp</div>} router={router} />
)