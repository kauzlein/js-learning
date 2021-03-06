// Destructuring Assignment

let a, b;
[a, b] = [100, 200];
// Rest pattern
[a, b, ...rest] = [100, 200, 300, 400, 500];

// console.log(rest);

({ a, b } = { a: 100, b: 200, c: 300, d: 400, e: 500 });
({ a, b, ...rest } = { a: 100, b: 200, c: 300, d: 400, e: 500 });

// console.log(rest);

/*// Array Destructuring

let people = ['John', 'Beth', 'Mike'];
let [person1, person2, person3] = people;
console.log(person1, person2, person3);*/

/*// Parse array returned from function
function getPeople() {
	return ['John', 'Beth', 'Mike'];
}

let person1, person2, person3;
[person1, person2, person3] = getPeople();
console.log(person1, person2, person3);*/





// Object Destructuring
let person = {
	name: 'John Doe',
	age: 42,
	city: 'Miami',
	gender: 'male',
	sayHello: function() {
		console.log(`Hello, my name is ${name}`);
	}
}

// Old ES5
/*var name = person.name,
	age = person.age,
	city = person.city;
	gender = person.gender;
*/

// New ES6 Destructuring
let { name, age, city, sayHello} = person;

console.log(name, age, city);

sayHello();