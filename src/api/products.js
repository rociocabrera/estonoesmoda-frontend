const url = "https://rociocabrera.github.io/api_estonoesmoda/products.json";

export const getProductsByCategoryId = async (categoryId) => {
  try {
    const response = await fetch(url);
    const products = await response.json();
    return products.filter((product) => product.category.toString() === categoryId.toString());
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(url);
    const product = await response.json();
    return product.find((product) => product.id.toString() === id);
  } catch (error) {
    console.log(error);
  }
};

export const getAllProducts = async () => {
  try {
    const response = await fetch(url);
    const products = await response.json();
    return products;
  } catch (error) {
    console.log(error);
  }
};

export default { getProductsByCategoryId, getProductById, getAllProducts };
