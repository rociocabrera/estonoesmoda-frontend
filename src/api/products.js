import { db } from "../db/db";
import { collection, getDocs, query, where, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

export const getProductsByCategoryId = async (categoryIdOrSlug) => {
  try {
    const productsRef = collection(db, "items");
    const q = query(productsRef, where("category", "==", categoryIdOrSlug));
    const response = await getDocs(q);
    const products = response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return products;
  } catch (error) {
    throw error;
  }
};

export const getProductBySlug = async (slug) => {
  try {
    const productsRef = collection(db, "items");
    const q = query(productsRef, where("slug", "==", slug));
    const response = await getDocs(q);
    const products = response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return products?.[0];
  } catch (error) {
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const productsRef = collection(db, "items");
    const response = await getDocs(productsRef);
    const products = response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return products;
  } catch (error) {
    throw error;
  }
};

export const addProduct = async (productData) => {
  try {
    const productsRef = collection(db, "items");
    const docRef = await addDoc(productsRef, productData);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const productRef = doc(db, "items", productId);
    await updateDoc(productRef, productData);
    return productId;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const productRef = doc(db, "items", productId);
    await deleteDoc(productRef);
    return productId;
  } catch (error) {
    throw error;
  }
};

export default { getProductsByCategoryId, getProductBySlug, getAllProducts, addProduct, updateProduct, deleteProduct };
