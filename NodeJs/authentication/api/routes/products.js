const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middlewares/check-auth')

const ProductsControllers = require('../controllers/products');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
        cb(null, true);
    else
        cb(null, false);
}

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter
})

const Product = require('../models/product');

router.get('/', ProductsControllers.products_get_all);

router.post('/', checkAuth, upload.single('productImage'), ProductsControllers.products_create_product);

router.get('/:productId', checkAuth, ProductsControllers.products_get_by_id);

router.patch('/:productId', checkAuth, ProductsControllers.products_update_by_id);

router.delete('/:productId', checkAuth, ProductsControllers.products_delete_by_id);

module.exports = router