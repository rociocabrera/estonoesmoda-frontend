import { db } from "../db/db";
import { addDoc, collection, getDocs, updateDoc, deleteDoc, doc, orderBy, query } from "firebase/firestore";

export const createOrder = async (orderData) => {
  try {
    const ordersRef = collection(db, "orders");
    const createdOrder = await addDoc(ordersRef, orderData);
    return createdOrder.id;
  } catch (error) {
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, orderBy("date", "desc"));
    const response = await getDocs(q);
    const orders = response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return orders;
  } catch (error) {
    throw error;
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, { status });
    return orderId;
  } catch (error) {
    throw error;
  }
};

export const deleteOrder = async (orderId) => {
  try {
    const orderRef = doc(db, "orders", orderId);
    await deleteDoc(orderRef);
    return orderId;
  } catch (error) {
    throw error;
  }
};

export default { createOrder, getOrders, updateOrderStatus, deleteOrder };
