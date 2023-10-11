import { db } from "../db/db";
import { addDoc, collection } from "firebase/firestore";

export const createOrder = async (orderData) => {
  try {
    const ordersRef = collection(db, "orders");
    const createdOrder = await addDoc(ordersRef, orderData);
    return createdOrder.id;
  } catch (error) {
    console.log(error);
  }
};

export default { createOrder };
