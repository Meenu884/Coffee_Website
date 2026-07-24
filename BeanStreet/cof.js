const cart = [];
const likedProducts = new Set();

function addToCart(name, price) {
    cart.push({ name, price });
    renderCart();
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    if (!cartItems || !cartCount || !cartTotal) return;

    if (cart.length === 0) {
        cartItems.textContent = 'No items added yet.';
        cartCount.textContent = '0';
        cartTotal.textContent = '$0.00';
        return;
    }

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item) => {
        total += item.price;
        const row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML = `<span>${item.name}</span><span>$${item.price.toFixed(2)}</span>`;
        cartItems.appendChild(row);
    });

    cartCount.textContent = String(cart.length);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function bindProductActions() {
    document.querySelectorAll('.add-cart-btn').forEach((button) => {
        button.addEventListener('click', () => {
            addToCart(button.dataset.name, Number(button.dataset.price));
        });
    });

    document.querySelectorAll('.like-btn').forEach((button) => {
        button.addEventListener('click', () => {
            const product = button.dataset.product;
            if (likedProducts.has(product)) {
                likedProducts.delete(product);
                button.classList.remove('liked');
                button.innerHTML = '<i class="fa-regular fa-heart"></i>';
            } else {
                likedProducts.add(product);
                button.classList.add('liked');
                button.innerHTML = '<i class="fa-solid fa-heart"></i>';
            }
        });
    });

    document.querySelectorAll('.rating').forEach((rating) => {
        rating.querySelectorAll('i').forEach((star) => {
            star.addEventListener('click', () => {
                const ratingValue = Number(star.dataset.rate);
                const productName = rating.dataset.product;
                const stars = rating.querySelectorAll('i');

                stars.forEach((item) => {
                    const itemRate = Number(item.dataset.rate);
                    item.classList.remove('active');
                    item.classList.remove('fa-solid');
                    item.classList.add('far');
                    item.classList.add('fa-star');
                });

                for (let i = 0; i < ratingValue; i++) {
                    stars[i].classList.remove('far');
                    stars[i].classList.remove('fa-star');
                    stars[i].classList.add('fa-solid');
                    stars[i].classList.add('active');
                }

                console.log(`${productName} rated ${ratingValue} star(s)`);
            });
        });
    });
}

window.addEventListener('DOMContentLoaded', () => {
    bindProductActions();
    renderCart();
});