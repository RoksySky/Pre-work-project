document.querySelector('.books__submit').addEventListener('click', getBooks);

function getBooks(evt) {
	const field = document.querySelector('.books__field').value;
	const request = new XMLHttpRequest();
	const APIkey = "AIzaSyC2rmc9p1g7SaDXKUxM13khtx1iJzAEsow";
	let link = `https://www.googleapis.com/books/v1/volumes?q=${field}&key=${APIkey}`;

	request.open('GET', link, true);

	request.onload = function() {
		if(this.status === 200) {
			const response = JSON.parse(this.responseText);
			let output = '';

			if (response.kind === "books#volumes") {
				response.items.forEach(function(book) {
					let image = book.volumeInfo.imageLinks;
					if (image !== undefined) {
						output += `<li class="books__item">
									<img class="books__image" src=${image.smallThumbnail} width="100" height="160">
									<div class="books__wraper">
										<h2 class="books__item-title">${book.volumeInfo.title}</h2>
										<p class="books__item-author">Author: ${book.volumeInfo.authors}</p> 
										<p class="books__item-publishion">Publishion: ${book.volumeInfo.publisher}</p>
										<a  target="_blank" class="books__item-link" href=${book.volumeInfo.previewLink}>See more</a>
									</div>
									</li>`;
					} else {
						output += `<li class="books__item">
									<img class="books__image" src="img/no-image.png" width="100" height="160">
									<div class="books__wraper">
										<h2 class="books__item-title">${book.volumeInfo.title}</h2>
										<p class="books__item-author">Author: ${book.volumeInfo.authors}</p> 
										<p class="books__item-publishion">Publishion: ${book.volumeInfo.publisher}</p>
										<a target="_blank" class="books__item-link" href=${book.volumeInfo.previewLink}>See more</a>
									</div>
									<a class="books__item-link" href=${book.volumeInfo.previewLink}>See more</a>
									</li>`;
					}
				});
			} else {
				output += '<li>Something went wrong</li>';
			}
			console.log(output);

			document.querySelector('.books__list').innerHTML = output;
		}
	}

	request.send();
	evt.preventDefault();
}