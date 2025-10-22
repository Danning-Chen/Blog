import {createBrowserRouter} from "react-router-dom";
import Layout from "../pages/Layout";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Explore from "../pages/Explore";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children:[
            {
                path: "",
                element: <Home/>
            },
            {
                path: "explore",
                element: <Explore />
            }
        ]
    },
    {
        path : '/login',
        element: <Login />
    }
])

export default router;