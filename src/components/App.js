import React from "react";
import "../styles/App.css";
import Search from "./search/Search";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BookTicket from "./bookticket/BookTicket";


const router = createBrowserRouter([

  {
    path: "/bookticket",
    element: <BookTicket />,
  },
  {
    path: "/",
    element: <Search />,
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

//rozer pay , boot strap, backend express.js