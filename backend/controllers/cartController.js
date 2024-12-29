const Cart = require('../models/Cart');

const getCartProducts = async (req, res) => {
  try {
    const carts = await Cart.find({ userId: req.user._id }).populate('productId');
    res.status(200).send({ status: 'ok', carts });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: `Error ${err}` });
  }
};

const addProductInCart = async (req, res) => {
  const { productId, count } = req.body;
  try {
    const cart = await Cart.findOneAndUpdate(
      { productId },
      { productId, count, userId: req.user._id },
      { upsert: true }
    );
    res.status(201).send({ status: 'ok', cart });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: `Error ${err}` });
  }
};

const deleteProductInCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (cart) {
      cart.cartItems = cart.cartItems.filter(item => item.product.toString() !== req.params.id);
      await cart.save();
      res.status(200).send({ status: 'ok' });
    } else {
      res.status(404).send({ error: 'Cart not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: `Error ${err}` });
  }
};

module.exports = { addProductInCart, deleteProductInCart, getCartProducts };