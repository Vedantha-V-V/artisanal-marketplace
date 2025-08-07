const Cart = require('../models/Cart');

const getCartProducts = async (req, res) => {
  try {
    const carts = await Cart.find({ userId: req.user._id }).populate('productId');
    res.status(200).json({ status: 'ok', carts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `Error ${err}` });
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
    res.status(201).json({ status: 'ok', cart });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `Error ${err}` });
  }
};

const deleteProductInCart = async (req, res) => {
  try {
    await Cart.findByIdAndRemove(req.params.id);
    res.status(200).json({ status: 'ok' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: `Error ${err}` });
  }
};

module.exports = { addProductInCart, deleteProductInCart, getCartProducts };
