// js/posters.js

    const posters = [
        {
            id: 1,
            title: 'Stadssilhuett',
            description: 'En vacker silhuett av stadens skyline.',
            price: 150,
            image: 'images/poster1.jpg'
        },
        {
            id: 2,
            title: 'Abstrakt Konst',
            description: 'Färgglada abstrakta mönster.',
            price: 200,
            image: 'images/poster2.jpg'
        },
        {
            id: 3,
            title: 'Naturscen',
            description: 'En lugn naturscen med berg och sjö.',
            price: 180,
            image: 'images/poster3.jpg'
        },
        // Lägg till fler posters efter behov
    ];

    const posterGrid = document.getElementById('poster-grid');

    posters.forEach(poster => {
        const posterElement = document.createElement('div');
        posterElement.classList.add('poster');
        posterElement.innerHTML = `
            <img src="${poster.image}" alt="${poster.title}">
            <h3>${poster.title}</h3>
            <p>${poster.description}</p>
            <p class="price">${poster.price} SEK</p>
            <button class="btn add-to-cart" data-id="${poster.id}">Lägg i Varukorg</button>
        `;
        posterGrid.appendChild(posterElement);
    });

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const id = parseInt(e.target.dataset.id);
            addToCart(id);
        }
    });

    function addToCart(id) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const poster = posters.find(p => p.id === id);
        const existing = cart.find(item => item.id === id);
        if (existing) {
            existing.quantity += 1;
        } else {
            cart.push({ ...poster, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));

        // Använd modalen istället för alert
        window.openModal(`${poster.title} har lagts till i din varukorg.`);
    }
