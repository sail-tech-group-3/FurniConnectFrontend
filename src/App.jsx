import { useState, useEffect } from "react";
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

const App = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalCount);
  }, []);

  const updateCartCount = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setCartCount(totalCount);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout cartCount={cartCount} />,
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
          element: <SingleProduct updateCartCount={updateCartCount} />,
          errorElement: <ErrorElement />,
        },
        {
          path: "cart",
          element: <Cart updateCartCount={updateCartCount} />,
          errorElement: <ErrorElement />,
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoutes>
              <CheckOut updateCartCount={updateCartCount} />
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
              <Profile />
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
              <Dashboard />
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

  return <RouterProvider router={router} />;
};

export default App;
