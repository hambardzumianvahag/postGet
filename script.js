let url = new XMLHttpRequest()
url.open('post', "https://reqres.in/api/users")
url.setRequestHeader('Content-type', 'application/json')
url.onreadystatechange = () => {
	if (url.readyState == XMLHttpRequest.DONE) {
		let data = JSON.parse(url.responseText)
		document.write(`<h1>${data.login}, ${data.password}</h1>`)
	}
}
function register() {
	let login = document.querySelector('.login').value
	let password = document.querySelector('.password').value

	if (login && password) {
		localStorage.setItem('login', login)
		localStorage.setItem('password', password)

		console.log('Registration successful!')
	}
	else {
		console.log('Please provide both login and password.')
	}
}

function login() {
	let login = document.querySelector('.login').value
	let password = document.querySelector('.password').value

	if (login === localStorage.getItem('login') && password === localStorage.getItem('password')) {
		console.log('Login successful!')
		url.send(JSON.stringify(
			{
				"login": login,
				"password": password
			}
		))
	}
	else {
		console.log('Invalid login or password.')
	}
}
////

let fetchProducts = fetch('https://dummyjson.com/products')
	.then(response => response.json())
	.then(data => {
		let productList = document.querySelector('.productList')
		data.products.forEach(product => {
			let productLink = document.createElement('a')
			productLink.style.textDecoration = 'none'
			productLink.style.color = 'black'
			productLink.href = `https://dummyjson.com/products/${product.id}`
			productLink.textContent = product.title
			productList.appendChild(productLink)
			let br = document.createElement('br')
			productList.appendChild(br)
		});
	})
	.catch(error => console.log('Error:', error));

////
let result = document.querySelector('.result')
let categories = document.querySelector('.categories')
let category = new XMLHttpRequest()
let link = `https://dummyjson.com/products/categories`
category.open('get', link)
category.onreadystatechange = () => {
	if (category.readyState == XMLHttpRequest.DONE) {
		let data = JSON.parse(category.responseText)
		data.forEach(e => {
			let btn = document.createElement('button')
			btn.innerHTML = e
			btn.classList.add = 'ctg-btn'
			categories.append(btn)
			let br = document.createElement('br')
			categories.append(br)
			btn.addEventListener('click', (e) => {
				result.innerHTML = ''
				let resultFetch = fetch(`https://dummyjson.com/products/category/${e.target.innerHTML}`)
					.then(response => response.json())
					.then(response => response.products.forEach(elem => {
						let title = document.createElement('h1')
						title.innerHTML = elem.title
						result.append(title)
					}))
			})
		})
	}
}
category.send()
////

let searchRes = document.querySelector('.result-search')
let searchInp = document.querySelector('.search')
let searchButton = document.querySelector('.search-btn')
let search = new XMLHttpRequest()
let searchLink = `https://dummyjson.com/products`
search.open('get', searchLink)
search.onreadystatechange = () => {
	if (search.readyState == XMLHttpRequest.DONE) {
		let data = JSON.parse(search.responseText)
		searchButton.addEventListener('click', () => {
			searchRes.innerHTML = ''
			fetch(`https://dummyjson.com/products/search?q=${searchInp.value}`)
				.then(r => r.json())
				.then(r =>
					r.products.forEach(elem => {
						let searchFinal = document.createElement('h1')
						searchFinal.innerHTML = elem.title
						searchRes.append(searchFinal)
					})
				)
		})
	}
}
search.send()