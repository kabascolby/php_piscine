const route = require('express').Router();
const Product = require('../../dbase/db').Product;

route.get('/', (req, res) =>{
	//Get all product
	Product.findAll()
	.then((products) => {
		res.status(200).send(products)
	})
	.catch((err) =>{
		res.status(500).send({
			error: 'Could not retrieve products'
		});
	})
});

route.post('/', (req, res) => {
	//  expecting a user information to create a new user
	// console.log('price---------------------->r',req.body)
	if(isNaN(req.body.price)) {
		res.status(403).send({
			error: "Price is not a valid number"
		})
	}
	Product.create({
		name: req.body.name,
		categorie:req.body.cat,
		price: parseFloat(req.body.price)
	}).then((product) => {
		res.status(201).send(product)
	}).catch((error) => {
		res.status(501).send({
			error: "could not add new product"
		})
	}) 
});


exports = module.exports = route;
