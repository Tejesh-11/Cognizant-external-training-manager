import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


import {createBrowserRouter,RouterProvider} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RootLayout from "./RootLayout";
import Home from "./components/Home";
import Login from "./components/Login";
import Choose from "./components/Choose";
import AllBatchesList from "./components/AllBatchesList";
import NonAllocatedBatchesList from "./components/NonAllocatedBatchesList";
import Welcome from "./components/Welcome";
import Register from "./components/Register";
import AllocatedBatches from "./components/AllocatedBatches";
import Trainers from "./components/Trainers";
import TrainerWelcome from "./components/TrainerWelcome";
import Error from "./components/Error";
import Protected from "./components/Protected";



function App() {
  //create BrowserRouter object
  let browserRouter = createBrowserRouter([
    {
      path: "",
      element: <RootLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "register",
          element:<Register/>
        },
        {
          path: "login",
          element: <Login/>,
        },
        {
          path:"*",
          element:<Error/>,
        },
        {
          element:<Protected/>,
          children:[
            {
              path:'coach-login',
              element:<Choose/>,
              children:[
                {
                  path:'non-allocated',
                  element:<NonAllocatedBatchesList/>
                },
                {
                  path:'allocated',
                  element:<AllocatedBatches/>
                },
                {
                  path:"all",
                  element:<AllBatchesList/>
                },
                {
                  path:"welcome",
                  element:<Welcome/>
                }
              ]
            },
            {
              path: "trainer-login",
              element:<TrainerWelcome/>,
            } ,
            {
              path: "trainers",
              element:<Trainers/>
            }
          ]
        },         
      ],
    },
  ]);

  return(
  <>
  <ToastContainer/>
  <RouterProvider router={browserRouter} />
  </>) 
}

export default App;
