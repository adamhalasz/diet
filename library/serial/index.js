
// Serial Modules v0.1
// usage: serial(length_of_serial);
// ex: serial(8) -> AO4RHSF06

// WARNING!!!
// NEVER USE a large length number on a weak computer because it will last forever!

// ABC with small letters
var small = ['a', 'b','c', 'd','e', 'f','g', 'h','i', 'j','k', 'l','m', 'n','o', 'p','q', 'r','s', 't','u', 'v','w', 'x','y', 'z'];

// ABC with big letters
var big = ['A', 'B','C', 'D','E', 'F','G', 'H','I', 'J','K', 'L','M', 'N','O', 'P','Q', 'R','S', 'T','U', 'V','W', 'X','Y', 'Z'];

// Algorithm functions
// Function 1: Generates a number from 0-9
// Function 2: Generates a small letter
// Function 3: Generates a big letter
var functions = [
	function(){ return Math.floor(Math.random()*10); },
	function(){ return small[Math.floor(Math.random()*small.length)]; },
	function(){ return big[Math.floor(Math.random()*big.length)]; }
];

module.exports = function(length){
	// GENERATE Serial Number
	var serial_number = '';
	for(var b = 0; b < length; b++){
		serial_number += functions[Math.floor(Math.random()*3)]();
	}
	// RETURN serial number
	return serial_number;
};