const Product = require('../models/products');

module.exports.create = async function (req, res) {
  try {
    const { name, quantity } = req.body.product;
    console.log(name);
    const pro = await Product.findOne({ name: name });
    if (pro) {
      return res
        .status(409)
        .send('Product already available with this name.!!');
    }

    const product = new Product({ name, quantity });
    await product.save();
    const data = {
      product: { name: product.name, quantity: product.quantity },
    };
    return res.status(201).json({ data: data });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Errors');
  }
};

module.exports.productList = async function (req, res) {
  try {
    const products = await Product.find({}).select('_id name quantity');
    const data = { products: products };
    return res.status(201).json({ data: data });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};
module.exports.delete = async function (req, res) {
  try {
    const product = await Product.findById(req.params.id);
    const data = {
      data: {
        message: '',
      },
    };
    if (!product) {
      data.data.message = 'Product not available';
      return res.status(400).json({ data: data });
    }
    await product.deleteOne();
    data.data.message = 'Product deleted !!';
    return res.status(200).json({ data: data });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};
module.exports.updateQty = async function (req, res) {
  const product = await Product.findById(req.params.id).select(
    '_id name quantity'
  );
  const data = {
    data: {
      product: '',
      message: '',
    },
  };
  if (!product) {
    data.data.message = 'Product not available';
    return res.status(400).json({ data: data });
  }

  product.quantity = parseInt(product.quantity) + parseInt(req.query.number);
  await product.save();
  data.data.product = product;
  data.data.message = 'updated successfully';
  return res.status(200).json(data);
};
