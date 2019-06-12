#!/user/bin/env node

let tab = [];
for (let i = 2; i < process.argv.length; i++) {
	tab = tab.concat(process.argv[i].trim().split(/\s+/));
}

tab.sort((s1, s2) => {
	s1 = s1.toLowerCase();
	s2 = s2.toLowerCase();
	let i = 0;
	for (; i < s1.length && i < s2.length; i++) {
		let a = s1.charCodeAt(i);
		let b = s2.charCodeAt(i);
		if (a >= 97 && a <= 122) {
			a -= 133;
		}
		else if (a >= 48 && a <= 57) {
			a -= 58;
		}
		if (b >= 97 && b <= 122) {
			b -= 133;
		}
		else if (b >= 48 && b <= 57) {
			b -= 58;
		}
		if (a != b) {
			return (a > b ? true : false);
		}
	}
	if (i == s1.length && i == s2.length) {
		return (false);
	}
	return (i == s2.length ? true : false);
});

tab.forEach((element) => {
	console.log(element);
});
