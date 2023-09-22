import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ItemListContainer, ItemDetailContainer } from "../components"; // Barrel de componentes

const routes = createBrowserRouter([
  {
    path: "/",
    element: <ItemListContainer greeting="Bienvenidx a Esto no es Moda👠" />,
  },
  {
    path: "/category/:id",
    element: <ItemListContainer greeting="Esta es una categoría" />,
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
