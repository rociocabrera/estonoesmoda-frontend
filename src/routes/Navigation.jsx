import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ItemListContainer, ItemDetailContainer } from "../components"; // Barrel de componentes
import getCategories from "../api/categories";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <ItemListContainer greeting="Welcome to Esto no es Moda👠" />,
  },
  {
    path: "/category/:id",
    element: <ItemListContainer greeting="This is a category of" />,
  },
  {
    path: "/item/:id",
    element: <ItemDetailContainer />,
  },
]);

const Navigation = () => {
  return <RouterProvider router={routes} />;
};

export default Navigation;
