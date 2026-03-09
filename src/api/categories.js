import { db } from "../db/db";
import { collection, getDocs, query, where, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

export const getCategories = async () => {
  try {
    const categoriesRef = collection(db, "categories");
    const response = await getDocs(categoriesRef);
    const categories = response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return categories;
  } catch (error) {
    throw error;
  }
};

export const getCategoryBySlug = async (slug) => {
  try {
    const categoriesRef = collection(db, "categories");
    const q = query(categoriesRef, where("slug", "==", slug));
    const response = await getDocs(q);
    const categories = response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return categories?.[0];
  } catch (error) {
    throw error;
  }
};

export const addCategory = async (categoryData) => {
  try {
    const categoriesRef = collection(db, "categories");
    const docRef = await addDoc(categoriesRef, categoryData);
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const updateCategory = async (categoryId, categoryData) => {
  try {
    const categoryRef = doc(db, "categories", categoryId);
    await updateDoc(categoryRef, categoryData);
    return categoryId;
  } catch (error) {
    throw error;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    const categoryRef = doc(db, "categories", categoryId);
    await deleteDoc(categoryRef);
    return categoryId;
  } catch (error) {
    throw error;
  }
};

export default { getCategories, getCategoryBySlug, addCategory, updateCategory, deleteCategory };
