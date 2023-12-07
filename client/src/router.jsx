import { createBrowserRouter } from "react-router-dom";

import RootLayout from "layouts/RootLayout";
import ErrorPage from "pages/ErrorPage";
import CustomersPage from "pages/CustomersPage";
import AddCustomerPage from "pages/AddCustomerPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <CustomersPage />,
      },
      {
        path: "/customers",
        element: false,
      },
      {
        path: "/customer/new",
        element: <AddCustomerPage />,
      },
      {
        path: "/customer/edit/:customerId",
        element: false,
      },
      {
        path: "/login",
        element: false,
      },
      {
        path: "/register",
        element: false,
      },
      {
        path: "/logout",
        element: false,
      },
    ],
  },
]);

export default router;
