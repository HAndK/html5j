function arrayShuffle(list) {
	var d, c
	var b = list.length;
	
	while(b) {
		c = Math.floor(Math.random() * b);
		d = list[--b];
		list[b] = list[c];
		list[c] = d;
	}
	return list;
}