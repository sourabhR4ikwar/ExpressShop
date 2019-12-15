const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        // formsCSS: true,
        // productCSS: true,
        activeAddProduct: true,
        editing: false
    });
};

exports.addProduct = (req, res, next) => {
    const product = new Product(null, req.body.title, req.body.imageUrl, req.body.price, req.body.description);
    product.save();
    res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
    const editing = req.query.edit;
    if(!editing){
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    console.log(prodId);
    Product.findById(prodId, product => {
        if(!product){
            return res.redirect('/');
        }
        return res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            product: product,
            editing: true
        });
    });
}

exports.editProduct = (req, res, next) => {
    const product = new Product(req.body.prodId, req.body.title, req.body.imageUrl, req.body.price, req.body.description);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    });
};


exports.deleteProduct = (req, res, next) => {
    Product.delete(req.body.prodId);
    res.redirect('/');
};
