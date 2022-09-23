const mongoose = require('mongoose');

const Product = require('../models/product');

exports.products_get_all = (req, res, next) => {
    Product.find()
        .select('name price _id productImage')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                product: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        productImage: doc.productImage,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/products/' + doc._id
                        }
                    }
                })
            };
            console.log(docs);
            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                err
            })
        })
}

exports.products_create_product = (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    })

    product.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Post!",
                product: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: 'POST',
                        url: 'http://localhost:3000/products/' + result._id
                    }

                }
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                err
            })
        });
}

exports.products_get_by_id = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select('name price _id productImage')
        .exec()
        .then(doc => {
            console.log(doc)
            if (doc) {
                res.status(200).json({
                    product: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + doc._id
                    }
                })
            } else {
                res.status(404).json({ message: "Invalid" })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ err })
        })

}

exports.products_update_by_id = (req, res, next) => {
    const updateOps = {};

    for (let ops in req.body) {
        updateOps[ops] = req.body[ops];
    }

    Product.updateOne({ _id: req.params.productId }, {
        $set: updateOps
    })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
}

exports.products_delete_by_id = (req, res, next) => {
    Product.remove({ _id: req.params.productId })
        .exec()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
}