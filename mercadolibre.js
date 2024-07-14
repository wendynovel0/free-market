document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('search-input').value;
    fetchResults(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);
});

function fetchResults(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => renderResults(data))
        .catch(error => console.error('Error fetching data:', error));
}

function renderResults(data) {
    const resultsList = document.getElementById('results');
    resultsList.innerHTML = '';
    data.results.forEach(item => {
        const col = document.createElement('div');
        col.className = 'col-md-3 mb-4';
        col.innerHTML = `
            <div class="product-card" data-bs-toggle="modal" data-bs-target="#productModal" onclick="showProductDetails('${item.thumbnail}', '${item.title}', '${item.price}', '${item.condition}', '${item.available_quantity}', '${item.seller.nickname}', '${item.address ? item.address.city_name : 'N/A'}', '${item.address ? item.address.state_name : 'N/A'}')">
                <img src="${item.thumbnail}" alt="${item.title}">
                <div class="product-title">${item.title}</div>
                <div class="product-price">$${item.price}</div>
            </div>
        `;
        resultsList.appendChild(col);
    });
}

function showProductDetails(image, title, price, condition, quantity, seller, city, state) {
    document.getElementById('modal-image').src = image;
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-price').innerText = `$${price}`;
    document.getElementById('modal-info').innerHTML = `
        <p>Condition: ${condition}</p>
        <p>Available: ${quantity}</p>
        <p>Seller: ${seller}</p>
        <p>Location: ${city}, ${state}</p>
    `;
}
