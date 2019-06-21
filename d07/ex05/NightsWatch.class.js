class NightsWatch {

	constructor() {

		this.recruits = [];
	}

	recruit(new_recruit) {
		this.recruits.push(new_recruit);
	}

	fight() {
		for (var i in this.recruits) {
			if (this.recruits[i].constructor.name != 'MaesterAemon')
				this.recruits[i].fight();
		}
	};
}

module.exports = NightsWatch;
