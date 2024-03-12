// Import the necessary dependencies
const lodash = require("lodash");
const productsList = require("./products.json").products;

const getProducts = () => {
  return JSON.stringify(productsList);
};

const getProductsById = (productId, done) => {
  let product = productsList.find((p) => p.id === productId);
  if (!product) {
    return done("Requested product doesn't exist..!", null);
  } else {
    return done(null, JSON.stringify(product));
  }
};

const saveProduct = (newProduct, done) => {
  const alreadyExist = productsList.find((p) => p.id === newProduct.id);
  if (alreadyExist) {
    return done("Product already exists..!", null);
  } else {
    productsList.push(newProduct);
    return done(null, JSON.stringify(productsList));
  }
};

const updateProduct = (productId, updateData, done) => {
  let updatedProductList = null;
  const index = productsList.findIndex((p) => p.id === productId);

  if (index !== -1) {
    productsList[index] = { ...productsList[index], ...updateData };
    updatedProductList = lodash.cloneDeep(productsList);
    done(null, JSON.stringify(updatedProductList));
  } else {
    done("Requested product doesn't exist..!", null);
  }
};

const deleteProduct = (productId, done) => {
  const index = productsList.findIndex((p) => p.id === productId);

  if (index !== -1) {
    productsList.splice(index, 1);
    done(null, JSON.stringify(productsList));
  } else {
    done("Requested product doesn\'t exist..!", null);
  }
};

module.exports = {
  getProducts,
  getProductsById,
  saveProduct,
  updateProduct,
  deleteProduct,
};
