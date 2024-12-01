import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import App from './App.jsx'
import Update from './Components/Update.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    loader: ()=>fetch('http://localhost:5000/users'),
  },
  {
    path: "/users/:id",
    element: <Update/>,
    loader: ({params})=>fetch(`http://localhost:5000/users/${params.id}`),
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
