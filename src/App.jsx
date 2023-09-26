import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ItemListContainer, ItemDetailContainer } from "./components"; // Barrel de componentes

const routes = createBrowserRouter([
  {
    path: "/",
    element: <ItemListContainer greeting="Welcome to Esto no es Moda" />,
  },
  {
    path: "/category/:id",
    element: <ItemListContainer greeting="Products from category" />,
  },
  {
    path: "/item/:id",
    element: <ItemDetailContainer />,
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
