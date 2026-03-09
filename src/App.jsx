import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ItemListContainer, ItemDetailContainer } from "./components";
import CartContextProvider from "./context/CartContext";
import WishlistContextProvider from "./context/WishlistContext";
import AdminContextProvider from "./context/AdminContext";
import CartContainer from "./components/CartContainer/CartContainer";
import Wishlist from "./pages/Wishlist";
import AboutUs from "./pages/AboutUs";
import SizeGuide from "./pages/SizeGuide";
import Contact from "./pages/Contact";
import Shipping from "./pages/Shipping";
import Returns from "./pages/Returns";
import SearchResults from "./pages/SearchResults";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import FAQ from "./pages/FAQ";
import ProtectedRoute from "./components/AdminLayout/ProtectedRoute";
import {
  AdminLogin,
  Dashboard,
  ProductsAdmin,
  ProductForm,
  OrdersAdmin,
  CategoriesAdmin
} from "./pages/Admin";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <ItemListContainer />,
  },
  {
    path: "/category/:id",
    element: <ItemListContainer />,
  },
  {
    path: "/item/:id",
    element: <ItemDetailContainer />,
  },
  {
    path: "/cart",
    element: <CartContainer />,
  },
  {
    path: "/search",
    element: <SearchResults />,
  },
  {
    path: "/about",
    element: <AboutUs />,
  },
  {
    path: "/size-guide",
    element: <SizeGuide />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/shipping",
    element: <Shipping />,
  },
  {
    path: "/returns",
    element: <Returns />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/faq",
    element: <FAQ />,
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
  },
  // Admin Routes
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
  },
  {
    path: "/admin/products",
    element: <ProtectedRoute><ProductsAdmin /></ProtectedRoute>,
  },
  {
    path: "/admin/products/new",
    element: <ProtectedRoute><ProductForm /></ProtectedRoute>,
  },
  {
    path: "/admin/products/edit/:id",
    element: <ProtectedRoute><ProductForm /></ProtectedRoute>,
  },
  {
    path: "/admin/orders",
    element: <ProtectedRoute><OrdersAdmin /></ProtectedRoute>,
  },
  {
    path: "/admin/categories",
    element: <ProtectedRoute><CategoriesAdmin /></ProtectedRoute>,
  },
  {
    path: "/admin/categories/new",
    element: <ProtectedRoute><CategoriesAdmin /></ProtectedRoute>,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <AdminContextProvider>
      <CartContextProvider>
        <WishlistContextProvider>
          <RouterProvider router={routes} />
        </WishlistContextProvider>
      </CartContextProvider>
    </AdminContextProvider>
  );
}

export default App;
