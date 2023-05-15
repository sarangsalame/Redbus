import React from "react";
import "../styles/App.css";
import Search from "./search/Search";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BookTicket from "./bookticket/BookTicket";
import Login from "./login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/bookticket",
    element: <BookTicket />,
  },
  {
    path: "/search",
    element: <Search />,
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

//rozer pay , boot strap, backend express.js