import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Users from "./components/Users.jsx";
import UserDetail from "./components/UserDetail.jsx";
import UpdateUser from "./components/UpdateUser.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/users/:id",
    Component: UserDetail,
    loader: ({ params }) => fetch(`http://localhost:3000/users/${params.id}`),
  },
  {
    path: "/update/:id",
    Component: UpdateUser,
    loader: ({ params }) => fetch(`http://localhost:3000/users/${params.id}`),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>
);
