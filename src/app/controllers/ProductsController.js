const res = require('express/lib/response');
const Products = require('../models/Products')
const lodash = require('lodash');
const con = require('../../config/connection');
const { response } = require('express');
//console.log(products);
class ProductsController {
    //[GET] /products
    index(req, res) {
        Products.getProducts().then(function (rows) {
            res.render('products/products', {
                Products: rows,
            });
        })
            .catch((err) => { throw err; })
    }
    //[GET] /products/create
    create(req, res, next) {
        res.render('products/create');
    }

    //[POST] /products/add-product
    addProduct(req, res, next) {
        let product_name = req.body.product_name.replace(/\s/g, '');
        if (product_name != "") {
            let sampleFile;
            let uploadPath;
            let newNameImg;
            if (!req.files) {
                res.send({
                    status: false,
                    message: 'No file uploaded'
                });
            }
            sampleFile = req.files.sampleFile;
            newNameImg = Date.now() + '-' + sampleFile.name;
            uploadPath = './src/public/uploads/' + newNameImg;

            //using function mv into upload
            sampleFile.mv(uploadPath, function (err) {
                if (err) return res.status(500).send(err);
                Products.insertOneProduct(req.body, "/" + newNameImg)
                    .then(() => res.redirect('/products'))
                    .catch((err) => { throw err; })
            });
        } else {
            res.send("ERROR!!!");
        }
    }

    //[GET] /products/id/edit
    edit(req, res, next) {
        //Call getProducts in model/products
        Products.getProducts()
            .then(function (rows) {
                var detail = lodash.filter(rows, x => x.id == req.params.id);
                var data = detail[0];
                //res.json(data);
                res.render('Products/edit', { Products: data });
            })
            .catch(next)

    }

    //[PUT] /products/:id
    update(req, res, next) {
        let product_name = req.body.product_name.replace(/\s/g, '');
        if (product_name != "") {
            Products.updateOneProducts(req.body)
                .then(() => res.redirect('/products'))
                .catch((err) => { throw err; })
        } else {
            res.send("ERROR!!!");
        }
    }

    //[DELETE] /products/:id
    delete(req, res, next) {
        Products.deleteOneProduct(req.params.id)
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //// [GET] /shop/:slug
    show(req, res) {

        //ID page
        var page = parseInt(req.query.page) || 1;
        var limit = parseInt(req.query.limit) || 16;

        //Start index products in sql 
        var limitStart = (page - 1) * limit;
        //If 
        var isFour = true;

        if (page <= 3) {
            isFour = false;
        }
        Products.getCountProductst().then(function (row) {
            var count = row[0].count;
            Products.getProductsLimit(limitStart, limit).then(function (rows) {
                var totalPage = Math.ceil(count / limit);
                var isNearTotalPage = true;
                var isTotalPage = true;
                var isAllPage = true;

                if (totalPage - 1 <= page) {
                    isNearTotalPage = false;
                }
                if (totalPage == page) {
                    isTotalPage = false;
                }
                if (3 <= page) {
                    isAllPage = false;
                }

                var data = {
                    "isTotalPage": isTotalPage,
                    "isNearTotalPage": isNearTotalPage,
                    "totalPage": totalPage,
                    "pageNow": page,
                    "isFour": isFour,
                }
                res.render('products/products', { Products: rows, data });
            })
                .catch((err) => { throw err; })
        })
    }
}

module.exports = new ProductsController();