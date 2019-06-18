const User = require('../../dbase/db').User
const route = require('express').Router();

route.get('/', (req, res) =>{
	//sending and array of all users from our database
	User.findAll()
	.then((users) => {
		res.status(200).send(users)

	})
	.catch((err) =>{
		res.status(500).send({
			error: 'Could not retrieve users'
		});
	})
})

route.post('/', (req, res) => {
	//  expecting a user information to create a new user
	console.log('here------------------------->',req.body);
	User.create({
		firstName: req.body.first,
		lastName: req.body.last,
		email: req.body.email
	}).then((user) =>{
		res.status(201).send(user);
	}).catch((err) => {
		console.log(err);
		res.status(500).send({
			error: "could not add new user"
		})
	}) 
})

exports = module.exports = route;
