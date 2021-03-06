document.querySelector('#button1').addEventListener('click', getText);
document.querySelector('#button2').addEventListener('click', getJson);
document.querySelector('#button3').addEventListener('click', getExternal);


// Get local text file data
function getText () {
	fetch('fetch/data/text.txt')
	.then(res => res.text())
	.then(data => document.querySelector('#output').innerHTML = data).
	catch(err => console.log(err));
}

// Get local JSON data
function getJson () {
	fetch('fetch/data/posts.json')
	.then(res => res.json())
	.then(data => {
		console.log(data);
				let output = '';
		data.forEach( function(post) {
			output += `<li>${post.title}</li>`;
		});
		document.querySelector('#output').innerHTML = output;
	}).
	catch(err => console.log(err));
}

// Get external API data
function getExternal () {
	fetch('https://api.github.com/users')
	.then(res => res.json())
	.then(data => {
		console.log(data);
				let output = '';
		data.forEach( function(user) {
			output += `<li>${user.login}</li>`;
		});
		document.querySelector('#output').innerHTML = output;
	}).
	catch(err => console.log(err));
}