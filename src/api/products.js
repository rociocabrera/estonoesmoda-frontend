const getProducts = async (categoryId) => {
  try {
    const response = await fetch("https://rociocabrera.github.io/api_estonoesmoda/products.json");
    const products = await response.json();
    return products.filter((product) => product.category.toString() === categoryId);
  } catch (error) {
    console.log(error);
  }
};

export default getProducts;
