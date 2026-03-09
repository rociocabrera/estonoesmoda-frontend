import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getOrders, updateOrderStatus, deleteOrder } from "../../../api/orders";
import { Search, Eye, Trash, Check, X, Clock } from "react-bootstrap-icons";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import "./OrdersAdmin.css";

const OrdersAdmin = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState(searchParams.get("status") || "");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update filter when URL params change
  useEffect(() => {
    const statusParam = searchParams.get("status");
    if (statusParam !== null) {
      setFilterStatus(statusParam);
    }
  }, [searchParams]);

  const fetchOrders = async () => {
    try {
      const ordersData = await getOrders();
      setOrders(ordersData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await deleteOrder(orderId);
      setOrders(orders.filter((o) => o.id !== orderId));
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    const d = date.toDate ? date.toDate() : new Date(date);
    return d.toLocaleDateString("es-CR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
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

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    // Orders without status are treated as pending
    const orderStatus = order.status || "pending";
    const matchesStatus = !filterStatus || orderStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <AdminLayout>
        <div className="adminLoading">Cargando pedidos...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="ordersAdmin">
        <header className="pageHeader">
          <div>
            <h1>Pedidos</h1>
            <p>{orders.length} pedidos en total</p>
          </div>
        </header>

        <div className="filtersBar">
          <div className="searchBox">
            <Search />
            <input
              type="text"
              placeholder="Buscar por ID o cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => {
              const value = e.target.value;
              setFilterStatus(value);
              if (value) {
                setSearchParams({ status: value });
              } else {
                setSearchParams({});
              }
            }}
            className="statusFilter"
          >
            <option value="">Todos los estados</option>
            <option value="pending">Pendiente</option>
            <option value="completed">Completado</option>
            <option value="cancelled">Cancelado</option>
          </select>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="noResults">
            <p>No se encontraron pedidos</p>
          </div>
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
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="orderId">#{order.id.slice(-6)}</td>
                    <td>
                      <div className="customerInfo">
                        <strong>{order.customer?.name || "N/A"}</strong>
                        <span>{order.customer?.email || ""}</span>
                      </div>
                    </td>
                    <td>₡{(order.total || 0).toLocaleString()}</td>
                    <td>{formatDate(order.date)}</td>
                    <td>
                      <select
                        value={order.status || "pending"}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`statusSelect ${getStatusClass(order.status)}`}
                      >
                        <option value="pending">Pendiente</option>
                        <option value="completed">Completado</option>
                        <option value="cancelled">Cancelado</option>
                      </select>
                    </td>
                    <td>
                      <div className="actionButtons">
                        <button
                          className="viewBtn"
                          onClick={() => setSelectedOrder(order)}
                          title="Ver detalles"
                        >
                          <Eye />
                        </button>
                        <button
                          className="deleteBtn"
                          onClick={() => setDeleteConfirm(order.id)}
                          title="Eliminar"
                        >
                          <Trash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedOrder && (
          <div className="orderModal">
            <div className="orderModalContent">
              <div className="orderModalHeader">
                <h3>Pedido #{selectedOrder.id.slice(-6)}</h3>
                <button onClick={() => setSelectedOrder(null)} className="closeModalBtn">
                  <X />
                </button>
              </div>

              <div className="orderDetails">
                <div className="orderSection">
                  <h4>Cliente</h4>
                  <p><strong>Nombre:</strong> {selectedOrder.customer?.name || "N/A"}</p>
                  <p><strong>Email:</strong> {selectedOrder.customer?.email || "N/A"}</p>
                  <p><strong>Teléfono:</strong> {selectedOrder.customer?.phone || "N/A"}</p>
                </div>

                {selectedOrder.shipping && (
                  <div className="orderSection">
                    <h4>Envío</h4>
                    <p><strong>Dirección:</strong> {selectedOrder.shipping.address || "N/A"}</p>
                    <p><strong>Provincia:</strong> {selectedOrder.shipping.province || "N/A"}</p>
                    <p><strong>Método:</strong> {selectedOrder.shipping.method || "N/A"}</p>
                  </div>
                )}

                <div className="orderSection">
                  <h4>Productos</h4>
                  <div className="orderItems">
                    {selectedOrder.items?.map((item, idx) => (
                      <div key={idx} className="orderItem">
                        <img src={item.img} alt={item.title} />
                        <div className="orderItemInfo">
                          <span className="itemTitle">{item.title}</span>
                          <span className="itemQty">x{item.quantity}</span>
                        </div>
                        <span className="itemPrice">₡{((item.price || 0) * (item.quantity || 1)).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="orderTotal">
                  <span>Total:</span>
                  <strong>₡{(selectedOrder.total || 0).toLocaleString()}</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {deleteConfirm && (
          <div className="deleteModal">
            <div className="deleteModalContent">
              <h3>¿Eliminar pedido?</h3>
              <p>Esta acción no se puede deshacer.</p>
              <div className="deleteModalActions">
                <button className="cancelBtn" onClick={() => setDeleteConfirm(null)}>
                  Cancelar
                </button>
                <button className="confirmDeleteBtn" onClick={() => handleDelete(deleteConfirm)}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default OrdersAdmin;
