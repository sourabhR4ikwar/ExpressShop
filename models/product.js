const fs = require('fs');
const path = require('path');

// const products = [];
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }
    static fetchAll(cb) {
        fs.readFile(p, (err, data) => {
            if (err) {
                cb([]);
            }
            cb(JSON.parse(data));
        });

    }
    save() {
        // products.push(this);
        this.constructor.fetchAll(products => {
            const existingProductIndex = products.findIndex(p => p.id === this.id);
            const updatedProducts = [...products];
            // console.log(existingProductIndex);
            if(existingProductIndex != -1){
                updatedProducts[existingProductIndex] = this;
                // console.log(updatedProducts);
                fs.writeFileSync(p, JSON.stringify(updatedProducts), (err)=>{
                    console.log(err);
                });
            }else{
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
        });
    }

    static delete(id){
        this.fetchAll(products => {
            const index = products.findIndex(p => p.id === id);
            let updatedProducts = [...products];
            updatedProducts.splice(index, 1);
            console.log(updatedProducts);
            fs.writeFile(p, JSON.stringify(updatedProducts),(err)=>{
                console.log(err);
            });
        });
    }

    static findById(id, cb){
        this.fetchAll(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }
}