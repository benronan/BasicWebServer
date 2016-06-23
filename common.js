Date.prototype.toString = function() {
	var d = new Date();
	return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
}