(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
    });

    fetch(`https://api.unsplash.com/search/photos?page=1&query=${searchedForText}` ,{
		headers: {
			Authorization: 'Client-ID bab5f865d344f1a8e2f3035a7c166fb8ef0b4da2832bfda84495b1d212c4bdc0'
		}
	}).then(response => response.json())
	.then(addImage);

	function addImage(data) {
		let htmlContent = '';
		const firstImage = data.results[0];

		if (firstImage) {
			htmlContent = `<figure>
				<img src="${firstImage.urls.small}" alt="${searchedForText}">
				<figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
			</figure>`;
		} else {
			htmlContent = 'Unfortunately, no image was returned for your search.'
		}

		responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
	}

})();
