import { createBrowserRouter } from "react-router-dom";
import Aboutus from "./Aboutus";
import App from "./App";
import Login from './Login';
import Signup from './Signup';
import DrugList from './Drugs/DrugList';
import CreateDrug from './Drugs/CreateDrug';
import EditList from "./Drugs/EditList";
import ViewList from "./Drugs/ViewList";
import DeleteDrug from "./Drugs/DeleteDrug";

const router = createBrowserRouter([
    { path: '/', element: <App/> },
    { path: '/aboutus', element: <Aboutus/>},
    { path: '/Signup', element:<Signup/>},
    { path: '/Login', element:<Login/>},
    { path: '/Drugs/posts', element: <DrugList/>},
    { path: '/Drugs/posts/create', element: <CreateDrug/>},
    { path: '/Drugs/posts/:postId/edit', element:<EditList/>},
    { path: '/Drugs/posts/:postId', element:<ViewList/>},
    { path: '/Drugs/posts/:postId/delete', element:<DeleteDrug/>},
]);

export default router;