// js/cart.js

document.addEventListener('DOMContentLoaded', () => {

    displayCart();
    document.getElementById('checkout-btn').addEventListener('click', checkout);
});

function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-details">
                <h4>${item.title}</h4>
                <p>Pris: ${item.price} SEK</p>
                <p>Antal: ${item.quantity}</p>
            </div>
            <div class="price">${itemTotal} SEK</div>
            <button class="remove-btn" data-id="${item.id}">Ta Bort</button>
        `;
        cartItems.appendChild(cartItem);
    });

    totalPrice.textContent = `${total} SEK`;

    // Lägg till event listeners för ta bort knappar
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', removeItem);
    });
}

function removeItem(e) {
    const id = parseInt(e.target.dataset.id);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const removedItem = cart.find(item => item.id === id);
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();

    // Visa modalmeddelande om borttagning
    if (removedItem) {
        window.openModal(`${removedItem.title} har tagits bort från din varukorg.`);
    }
}

function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        // Ersätt alert med modal
        window.openModal('Din varukorg är tom.');
        return;
    }

    // Ersätt confirm med modal med bekräftelse
    window.openModal('Vill du gå vidare till checkout?', true, () => {
        // Töm varukorgen
        localStorage.removeItem('cart');
        window.openModal('Tack för ditt köp!');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    });
}