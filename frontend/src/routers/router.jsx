import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import Home from "../home/Home.jsx";
import Shop from "../shop/Shop.jsx";
import About from "../components/About.jsx";
import Blog from "../components/Blog.jsx";
import SingleBook from "../shop/SingleBook.jsx";

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
        },
        {
          path: '/book/:id',
          element: <SingleBook/>,
          loader: ({params}) => fetch(`http://localhost:5000/book/${params.id}`),
        }
    ]
  },
]);

export default router