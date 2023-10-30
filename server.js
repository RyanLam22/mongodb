const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Product = require('./marketplace.model');
//IvF7a2p6pgqvLGvg(Password)

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://ryanlam5784:IvF7a2p6pgqvLGvg@marketplace.dcg66vj.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("DB connected......")
})

app.get('/', (req, res) => {
    res.json({message: "Welcome to DressStore application."});
});

app.route('/api/products')
    .get((req, res) => {
        if (req.query.name) { 
            const regex = new RegExp(req.query.name, 'i'); 
            Product.find({ name: regex })
                .then(products => res.json(products))
                .catch(err => res.status(400).json({ "error": err }));
        } else {
            Product.find()
                .then(products => res.json(products))
                .catch(err => res.status(400).json({ "error": err }));
        }
    })
    .post((req, res) => {
        const newProduct = new Product(req.body);
        newProduct.save()
            .then(product => res.json(product))
            .catch(err => res.status(400).json({ "error": err }));
    })
    .delete((req, res) => {
        Product.deleteMany({})
            .then(() => res.json({ message: "All products deleted" }))
            .catch(err => res.status(400).json({ "error": err }));
    });

app.route('/api/products/:id')
    .get((req, res) => {
        Product.findById(req.params.id)
            .then(product => res.json(product))
            .catch(err => res.status(400).json({ "error": err }));
    })
    .put((req, res) => {
        console.log(req.body)
        Product.findByIdAndUpdate(req.params.id, req.body, { new: true }) 
            .then(product => res.status(200).json(product))
            .catch(err => res.status(400).json({ "error": err }));
    })
    .delete((req, res) => {
        Product.findByIdAndDelete(req.params.id)
            .then(() => res.json({ message: `Product ${req.params.id} deleted` }))
            .catch(err => res.status(400).json({ "error": err }));
    });


app.listen(8081, () => {
    console.log("Server is running on 8081....");
});