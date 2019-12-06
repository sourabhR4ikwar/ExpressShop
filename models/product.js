const fs = require('fs');
const path = require('path');

// const products = [];
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

module.exports = class Product {
    constructor(title, imageUrl, price, description) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        // products.push(this);
        this.id = Math.random().toString();
        fs.readFile(p, (err, data) => {
            let products = [];
            if (!err) {
                products = JSON.parse(data);
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });

    }

    static fetchAll(cb) {
        fs.readFile(p, (err, data) => {
            if (err) {
                cb([]);
            }
            cb(JSON.parse(data));
        });

    }

    static findById(id, cb){
        this.fetchAll(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }
}