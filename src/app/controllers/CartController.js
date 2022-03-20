const Cart = require('../models/Cart');
const Customers = require('../models/Customers');
const Product = require('../models/Product');
class CartController {
    showall(req, res) {
        Cart.find({})
            .populate('userid')
            .populate('products.productId')
            .then(data => res.status(200).json(data))
            .catch(error => res.status(500).json("Loi server"))
    }
    async addToCart(req, res) {
        const { userid, productId, color, size, quantity, price } = await req.body;
        const quantitys = Number(quantity);
        try {
            const cart = await Cart.findOne({ userid });
            if (cart) {
                var item = cart.products.findIndex(arr => arr.productId == productId);
                if (item > -1) {
                    const productDetails = cart.products[item];
                    const numberNow = Number(productDetails.quantity);
                    console.log(numberNow)
                    console.log(quantitys)
                    console.log(typeof numberNow)
                    productDetails.quantity = numberNow + quantitys;
                    cart.products[item] = productDetails;
                } else {
                    cart.products.push({
                        productId,
                        size,
                        color,
                        quantity,
                        price
                    });
                }
                await cart.save();
                return res.status(201).json(cart);

            } else {
                const CreateCart = await Cart.create({
                    userid,
                    products: [
                        {
                            productId,
                            size,
                            color,
                            quantity,
                            price
                        }
                    ]
                });

                return res.status(201).json(CreateCart);

            }
        } catch (error) {
            console.log(error);
            res.status(500).json("loi server");
        }
        // Cart.findOne({
        //     userid
        // })
        //     .then(data => res.status(200).json(data))
        //     .catch(error => res.status(500).json("loi server"))

        // Cart.create({
        //     userid,
        //     products: [
        //         {
        //             productId,
        //             size,
        //             color,
        //             quantity,
        //             price
        //         }
        //     ],

        // })
        //     .then(data => res.status(200).json("them thanh cong"))
        //     .catch(error => res.status(500).json("loi server"))

    }
}
module.exports = new CartController;