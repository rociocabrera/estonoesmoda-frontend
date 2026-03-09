import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";
import {
  HouseDoor,
  Box,
  Cart,
  Tags,
  BoxArrowRight,
  List,
  ArrowLeft
} from "react-bootstrap-icons";
import "./AdminLayout.css";

const AdminLayout = ({ children }) => {
  const { admin, logout } = useContext(AdminContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  const menuItems = [
    { path: "/admin", icon: <HouseDoor />, label: "Dashboard" },
    { path: "/admin/products", icon: <Box />, label: "Productos" },
    { path: "/admin/orders", icon: <Cart />, label: "Pedidos" },
    { path: "/admin/categories", icon: <Tags />, label: "Categorías" },
  ];

  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="adminContainer">
      <aside className="adminSidebar">
        <div className="sidebarHeader">
          <List className="menuIcon" />
          <h2>Admin Panel</h2>
        </div>

        <nav className="sidebarNav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`navItem ${isActive(item.path) ? "active" : ""}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebarFooter">
          <Link to="/" className="backToStore">
            <ArrowLeft />
            <span>Volver a la tienda</span>
          </Link>
          <button className="logoutBtn" onClick={handleLogout}>
            <BoxArrowRight />
            <span>Cerrar sesión</span>
          </button>
          {admin && (
            <p className="adminEmail">{admin.email}</p>
          )}
        </div>
      </aside>

      <main className="adminMain">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
