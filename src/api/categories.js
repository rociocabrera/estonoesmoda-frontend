import { db } from "../db/db";
import { collection, getDocs, query, where } from "firebase/firestore";

export const getCategories = async () => {
  try {
    const categoriesRef = collection(db, "categories");
    const response = await getDocs(categoriesRef);
    const categories = response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return categories;
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};

export default { getCategories, getCategoryBySlug };
