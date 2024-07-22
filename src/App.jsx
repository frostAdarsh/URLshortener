import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./layouts/app-layout";
import Landingpage from "./pages/landing";
import Dashbord from "./pages/dashbord"; // Fixed typo from Dashbord to Dashboard
import Auth from "./pages/auth";
import Link from "./pages/link";
import Redirectlink from "./pages/redirect-link";
import UrlProvider from "./Context";
import RequireAuth from "./components/require-auth";

const router = createBrowserRouter([
  {
    
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Landingpage />,
      },
      {
        path: "/dashboard",
        element: (
          <RequireAuth>
            <Dashbord />
          </RequireAuth>
        ),
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/link/:id",
        element: (
          <RequireAuth>
            <Link />
          </RequireAuth>
        ),
      },
      {
        path: "/:id",
        element: <Redirectlink />,
      },
    ],
  },
]);

function App() {
  return (
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  );
}

export default App;
