import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import Home from "../home/Home.jsx";
import Shop from "../shop/Shop.jsx";
import About from "../components/About.jsx";
import Blog from "../components/Blog.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: '/',
            element: <Home/>
        },
        {
            path:'/shop',
            element: <Shop />
        },
        {
            path: '/about',
            element: <About />
        },
        {
            path: '/blog',
            element: <Blog />
        }
    ]
  },
]);

export default router