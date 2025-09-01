import React from "react";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import AddContent from "./pages/AddContent";
import Navbar from "./pages/Navbar";
import Login from "./pages/Login";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};


const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("adminToken");
  return isLoggedIn ? children : <Navigate to="/login" />;
};

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <Layout>
          <AddContent />
        </Layout>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/home",
      element: (
        <ProtectedRoute>
          <Layout>
            <Home />
          </Layout>
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={routes} />;
};


export default App;
