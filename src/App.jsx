import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  About,
  Cart,
  Dashboard,
  Error,
  HomeLayout,
  Landing,
  Login,
  Products,
  Register,
  SingleProduct,
  Profile,
  UpdateProfile,
  ChangePassword,
  CreateProduct,
  CreatedProducts,
  DashboardOverview,
  ManageProducts,
  Users,
  CreateUser,
  CheckOut,
  PaymentSuccess,
  Orders,
  UserOrderHistory,
} from "./pages";

import { ErrorElement } from "./components";
import ProtectedRoutes from "./ProtectedRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
        errorElement: <ErrorElement />,
      },
      {
        path: "products",
        element: <Products />,
        errorElement: <ErrorElement />,
      },
      {
        path: "products/:_id",
        element: <SingleProduct />,
        errorElement: <ErrorElement />,
      },
      {
        path: "cart",
        element: <Cart />,
        errorElement: <ErrorElement />,
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoutes>
            <CheckOut />,
          </ProtectedRoutes>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: "/payment/success",
        element: (
          <ProtectedRoutes>
            <PaymentSuccess />
          </ProtectedRoutes>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: "about",
        element: <About />,
        errorElement: <ErrorElement />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoutes>
            <Profile />,
          </ProtectedRoutes>
        ),
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <UpdateProfile />,
            errorElement: <ErrorElement />,
          },
          {
            path: "changePassword",
            element: <ChangePassword />,
            errorElement: <ErrorElement />,
          },
          {
            path: "createProduct",
            element: <CreateProduct />,
            errorElement: <ErrorElement />,
          },
          {
            path: "createdProducts",
            element: <CreatedProducts />,
            errorElement: <ErrorElement />,
          },
          {
            path: "orderHistory",
            element: <UserOrderHistory />,
            errorElement: <ErrorElement />,
          },
        ],
      },

      {
        path: "dashboard",
        element: (
          <ProtectedRoutes>
            <Dashboard />,
          </ProtectedRoutes>
        ),
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <DashboardOverview />,
            errorElement: <ErrorElement />,
          },
          {
            path: "products",
            element: <ManageProducts />,
            errorElement: <ErrorElement />,
          },
          {
            path: "users",
            element: <Users />,
            errorElement: <ErrorElement />,
          },
          {
            path: "createUser",
            element: <CreateUser />,
            errorElement: <ErrorElement />,
          },
          {
            path: "orderHistory",
            element: <Orders />,
            errorElement: <ErrorElement />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
