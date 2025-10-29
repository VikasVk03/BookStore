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
import Login from "../auth/Login.jsx";
import Signup from "../auth/Signup.jsx";
import AdminDashboard from "../admin/AdminDashboard.jsx";

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
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/signup',
          element: <Signup />
        },
        {
          path: '/admin/dashboard',
          element: <AdminDashboard />
        }
    ]
  },
]);

export default router