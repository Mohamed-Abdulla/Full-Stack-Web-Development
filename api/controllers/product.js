const Product = require("../models/Product");

//~Create

exports.create = async (req, res, next) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    next(error);
  }
};

// Update product details

exports.update = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

//delete product details

exports.deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("product deleted successfully");
  } catch (error) {
    next(error);
  }
};

//get product details

exports.get = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

//get all product details

exports.getAll = async (req, res, next) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    let products;
    if (qNew) products = await Product.find().sort({ createdAt: -1 }).limit(1);
    else if (qCategory)
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    else products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

//get product by search
exports.search = async (req, res, next) => {
  const { title } = req.query;

  try {
    const items = await Product.find({
      title: { $regex: title, $options: "i" },
    });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).send(err);
  }
};
