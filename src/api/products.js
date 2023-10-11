import { db } from "../db/db";
import { collection, getDocs, query, where } from "firebase/firestore";

export const getProductsByCategoryId = async (categoryId) => {
  try {
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("category", "==", categoryId));
    const response = await getDocs(q);
    const products = response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return products;
  } catch (error) {
    console.log(error);
  }
};

export const getProductBySlug = async (slug) => {
  try {
    console.log(slug);
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("slug", "==", slug));
    const response = await getDocs(q);
    const products = response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return products?.[0];
  } catch (error) {
    console.log(error);
  }
};

export const getAllProducts = async () => {
  try {
    const productsRef = collection(db, "products");
    const response = await getDocs(productsRef);
    const products = response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return products;
  } catch (error) {
    console.log(error);
  }
};

export default { getProductsByCategoryId, getProductBySlug, getAllProducts };
