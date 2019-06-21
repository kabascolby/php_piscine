const Tyrion = require('./Tyrion.class');
class Lannister {

	constructor() {
		console.log("A Lannister is born !");
	}

	getSize() {
		return "Average";
	}

	houseMotto() {
		return "Hear me roar!";
	}
}

module.exports = Lannister;


var tyrion = new Tyrion();

console.log(tyrion.getSize());
console.log(tyrion.houseMotto());
