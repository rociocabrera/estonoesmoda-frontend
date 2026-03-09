import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../../api/products";
import { getCategories } from "../../../api/categories";
import { getOrders } from "../../../api/orders";
import { Box, Cart, Tags, CurrencyDollar, Lightning, Clock, CheckCircle, HourglassSplit, XCircle } from "react-bootstrap-icons";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    orders: 0,
    revenue: 0,
    pendingOrders: 0,
    completedOrders: 0,
    cancelledOrders: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [products, categories, orders] = await Promise.all([
          getAllProducts(),
          getCategories(),
          getOrders()
        ]);

        const totalRevenue = orders
          .filter(order => order.status === 'completed')
          .reduce((sum, order) => sum + (order.total || 0), 0);

        const pendingOrders = orders.filter(order => !order.status || order.status === 'pending').length;
        const completedOrders = orders.filter(order => order.status === 'completed').length;
        const cancelledOrders = orders.filter(order => order.status === 'cancelled').length;

        setStats({
          products: products.length,
          categories: categories.length,
          orders: orders.length,
          revenue: totalRevenue,
          pendingOrders,
          completedOrders,
          cancelledOrders
        });

        setRecentOrders(orders.slice(0, 5));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (date) => {
    if (!date) return "N/A";
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString("es-CR", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "completed": return "statusCompleted";
      case "pending": return "statusPending";
      case "cancelled": return "statusCancelled";
      default: return "statusPending";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "completed": return "Completado";
      case "pending": return "Pendiente";
      case "cancelled": return "Cancelado";
      default: return "Pendiente";
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="dashboardLoading">Cargando...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="dashboard">
        <header className="dashboardHeader">
          <h1>Dashboard</h1>
          <p>Bienvenido al panel de administración</p>
        </header>

        <div className="statsGrid">
          <div className="statCard">
            <div className="statIcon revenue">
              <CurrencyDollar />
            </div>
            <div className="statInfo">
              <span className="statValue">₡{stats.revenue.toLocaleString()}</span>
              <span className="statLabel">Ingresos</span>
            </div>
          </div>

          <div className="statCard">
            <div className="statIcon orders">
              <Cart />
            </div>
            <div className="statInfo">
              <span className="statValue">{stats.orders}</span>
              <span className="statLabel">Total Pedidos</span>
            </div>
            <Link to="/admin/orders" className="statLink">Ver todos</Link>
          </div>

          <div className="statCard">
            <div className="statIcon products">
              <Box />
            </div>
            <div className="statInfo">
              <span className="statValue">{stats.products}</span>
              <span className="statLabel">Productos</span>
            </div>
            <Link to="/admin/products" className="statLink">Ver todos</Link>
          </div>

          <div className="statCard">
            <div className="statIcon categories">
              <Tags />
            </div>
            <div className="statInfo">
              <span className="statValue">{stats.categories}</span>
              <span className="statLabel">Categorías</span>
            </div>
            <Link to="/admin/categories" className="statLink">Ver todas</Link>
          </div>

          <div className="statCard">
            <div className="statIcon pending">
              <HourglassSplit />
            </div>
            <div className="statInfo">
              <span className="statValue">{stats.pendingOrders}</span>
              <span className="statLabel">Pendientes</span>
            </div>
            <Link to="/admin/orders?status=pending" className="statLink">Ver pendientes</Link>
          </div>

          <div className="statCard">
            <div className="statIcon completed">
              <CheckCircle />
            </div>
            <div className="statInfo">
              <span className="statValue">{stats.completedOrders}</span>
              <span className="statLabel">Completadas</span>
            </div>
            <Link to="/admin/orders?status=completed" className="statLink">Ver completadas</Link>
          </div>

          <div className="statCard">
            <div className="statIcon cancelled">
              <XCircle />
            </div>
            <div className="statInfo">
              <span className="statValue">{stats.cancelledOrders}</span>
              <span className="statLabel">Canceladas</span>
            </div>
            <Link to="/admin/orders?status=cancelled" className="statLink">Ver canceladas</Link>
          </div>
        </div>

        <div className="dashboardSections">
          <section className="recentOrdersSection">
            <div className="sectionHeader">
              <h2><Clock /> Pedidos Recientes</h2>
              <Link to="/admin/orders" className="viewAllLink">Ver todos</Link>
            </div>

            {recentOrders.length === 0 ? (
              <p className="noData">No hay pedidos todavía</p>
            ) : (
              <div className="ordersTable">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Cliente</th>
                      <th>Total</th>
                      <th>Fecha</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="orderId">#{order.id.slice(-6)}</td>
                        <td>{order.customer?.name || "N/A"}</td>
                        <td>₡{(order.total || 0).toLocaleString()}</td>
                        <td>{formatDate(order.date)}</td>
                        <td>
                          <span className={`orderStatus ${getStatusClass(order.status)}`}>
                            {getStatusLabel(order.status)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section className="quickActionsSection">
            <h2><Lightning /> Acciones Rápidas</h2>
            <div className="quickActions">
              <Link to="/admin/products/new" className="quickAction">
                <Box />
                <span>Agregar Producto</span>
              </Link>
              <Link to="/admin/categories/new" className="quickAction">
                <Tags />
                <span>Nueva Categoría</span>
              </Link>
              <Link to="/admin/orders" className="quickAction">
                <Cart />
                <span>Ver Pedidos</span>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
