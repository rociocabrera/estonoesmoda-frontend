const getCategories = async () => {
  try {
    const response = await fetch("https://rociocabrera.github.io/api_estonoesmoda/categories.json");
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.log(error);
  }
};

export default getCategories;
