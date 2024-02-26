import fs from "fs/promises";

// const products = JSON.parse(await fs.readFile('products.json','utf-8'));

const errorResponse = (statusCode, res, message) => {
  res.status(statusCode).send({
    success: false,
    message: message,
  });
};
const successResponse = (statusCode, res, message, payload) => {
  res.status(statusCode).send({
    success: true,
    message: message,
    payload: payload,
  });
};

export const rootFeedback = (req, res) => {
  try {
    successResponse(200, res, "Hello World!");
  } catch (error) {
    errorResponse(500, res, "Server error");
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = JSON.parse(await fs.readFile("products.json", "utf-8"));
    successResponse(200, res, "Retuernd all products", products);
  } catch (error) {
    errorResponse(500, res, "Server error");
  }
};

export const getSingleProduct = (req, res) => {
  try {
    const id = req.params.id;
    const product = products.find((product) => product.id === id);
    if (!product) {
      errorResponse(404, res, `Sorry, product with id ${id} not found.`);
      return;
    }
    successResponse(200, res, "Retuernd a product", product);
  } catch (error) {
    errorResponse(500, res, "Server error");
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const product = products.find((product) => product.id === id);
    if (!product) {
      errorResponse(404, res, `Sorry, product with id ${id} not found.`);
      return;
    }
    const filteredProducts = products.filter((product) => product.id !== id);
    products = filteredProducts;
    successResponse(204, res, "Product was deleted", products);
  } catch (error) {
    errorResponse(500, res, "Server error");
  }
};

export const createProduct = async (req, res) => {
  try {
    const newData = req.body;
    const newProduct = {
      id: new Date().getTime().toString(),
      name: newData.name,
      description: newData.description,
      price: newData.price,
    };
    const exisitingProducts = JSON.parse(
      await fs.readFile("products.json", "utf8")
    );
    exisitingProducts.push(newProduct);
    await fs.writeFile("products.json", JSON.stringify(exisitingProducts));
    successResponse(201, res, "Product is created");
  } catch (error) {
    errorResponse(500, res, "Server error");
  }
};

export const updateProduct = (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body;
    // const product = products.find((product) => product.id === id);
    products
      .filter((product) => product.id === id)
      .map((product) => {
        product.name = newData.name;
        product.description = newData.description;
        product.price = newData.price;
      });
    successResponse(200, res, "Retuernd all products", products);
  } catch (error) {
    errorResponse(500, res, "Server error");
  }
};
