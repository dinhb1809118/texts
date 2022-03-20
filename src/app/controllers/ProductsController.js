const Product = require('../models/Product');
const TrademarkDetails = require('../models/Brand');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        console.log(file);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname)
    }
})



class DetailsController {
    show(req, res) {
        const slug = req.params.slug;
        Product.findOne({ slug: slug })
            .then(data => res.status(200).json(data))

            .catch(err => res.redirect('http://localhost:3000/error'));
    }
    add(req, res) {
        const upload = multer({ storage: storage }).fields([{ name: 'image' }, { name: 'imagedetails' }])
        upload(req, res, function (err) {
            const image = req.files['image'][0].originalname;

            console.log(req.files['image'][0].originalname);
            console.log(req.files['imagedetails'][0].originalname);
            if (err) {
            } else {
                res.status(200).json('errr');
            }
        })
        // const { name, price_now, price_last,
        //     quantity, image, details, description,
        //     category, trademark, trademarkdetails, imagedetails }
        //     = req.body;
        // Product.create({
        //     name,
        //     price_now,
        //     price_last,
        //     image,
        //     details,
        //     description,
        //     category,
        //     trademark,
        //     trademarkdetails,
        //     imagedetails
        // })
        //     .then(data => res.status(200).json(data))
        //     .catch(err => console.log(err));
    }
}
module.exports = new DetailsController;