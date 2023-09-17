import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ItemListContainer greeting="Bienvenidx a Esto no es Moda👠" />,
  },
  {
    path: "/category/:id",
    element: <ItemListContainer />,
  },
  {
    path: "/item/:id",
    element: <ItemDetailContainer />,
  },
]);

function App() {
  return (
    <>
      <NavBar />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
