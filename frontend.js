function findMaxPrice(productsArray) {
    if (!productsArray || productsArray.length === 0) {
        return 0;
    }
    const isArrayOfObjects = typeof productsArray[0] === 'object' && productsArray[0] !== null && productsArray[0].price !== undefined;

    let maxPrice;
    if (isArrayOfObjects) {
        maxPrice = productsArray[0].price;
    } else {
        maxPrice = productsArray[0];
    }

    for (let i = 1; i < productsArray.length; i++) {
        let currentValue = isArrayOfObjects ? productsArray[i].price : productsArray[i];
        if (currentValue > maxPrice) {
            maxPrice = currentValue;
        }
    }
    return maxPrice;
}


document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { 
            id: 1, 
            name: "Kamera Mirrorless Pro ZX-500", 
            price: 8500000, 
            originalPrice: 10000000,
            image: "https://via.placeholder.com/300x200?text=Kamera+ZX-500"
        },
        { 
            id: 2, 
            name: "Lensa Telefoto 70-300mm", 
            price: 4200000, 
            originalPrice: 4500000,
            image: "https://via.placeholder.com/300x200?text=Lensa+Tele"
        },
        { 
            id: 3, 
            name: "Kamera DSLR Entry-Level D-100", 
            price: 5100000, 
            originalPrice: null,
            image: "https://via.placeholder.com/300x200?text=Kamera+D-100"
        },
        { 
            id: 4, 
            name: "Lensa Prime 50mm f/1.8", 
            price: 1800000, 
            originalPrice: 2100000,
            image: "https://via.placeholder.com/300x200?text=Lensa+Prime+50mm"
        },
        { 
            id: 5, 
            name: "Tripod Karbon Profesional", 
            price: 2300000, 
            originalPrice: null,
            image: "https://via.placeholder.com/300x200?text=Tripod+Karbon"
        },
        { 
            id: 6, 
            name: "Tas Kamera Adventurer", 
            price: 950000, 
            originalPrice: 1100000,
            image: "https://via.placeholder.com/300x200?text=Tas+Kamera"
        }
    ];

    let cart = []; 
    const productGrid = document.getElementById('product-grid');
    const searchBox = document.getElementById('search-box');
    const cartButton = document.getElementById('cart-button');
    const cartCountBadge = document.getElementById('cart-count');
    const cartModal = document.getElementById('cart-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalEl = document.getElementById('cart-total');
    const notificationEl = document.getElementById('notification');
    const checkoutButton = document.getElementById('checkout-btn');

    function renderProducts(itemsToRender) {
        if (!productGrid) return; 

        productGrid.innerHTML = ''; 
        let htmlContent = '';

        if (itemsToRender.length === 0) {
            productGrid.innerHTML = '<p>Produk tidak ditemukan.</p>';
            return;
        }

        itemsToRender.forEach(product => {
            const formattedPrice = product.price.toLocaleString('id-ID');
            let priceHTML = ''; 

            if (product.originalPrice && product.originalPrice > product.price) {
                const formattedOriginalPrice = product.originalPrice.toLocaleString('id-ID');
                priceHTML = `
                    <span class="original-price">Rp ${formattedOriginalPrice}</span>
                    <span class="discount-price">Rp ${formattedPrice}</span>
                `;
            } else {
                priceHTML = `
                    <span class="discount-price">Rp ${formattedPrice}</span>
                `;
            }
            
            htmlContent += `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <div class="price-container">
                        ${priceHTML} </div>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
        });
        productGrid.innerHTML = htmlContent;
    }

    function handleCheckout() {
        if (cart.length === 0) {
            showNotification('Keranjang Anda sudah kosong!');
            return;
        }
        showNotification('Checkout berhasil! Keranjang dikosongkan.');
        cart = [];
        updateCartCount(); 
        renderCart();
        setTimeout(closeCartModal, 1500);
    }

    function handleSearch() {
        const searchTerm = searchBox.value.toLowerCase();
        const filteredProducts = products.filter(product => {
            const productNameLower = product.name.toLowerCase();
            return productNameLower.includes(searchTerm);
        });
        
        renderProducts(filteredProducts);
    }

    function handleAddToCart(e) {
        if (!e.target.classList.contains('add-to-cart')) return;

        const productId = parseInt(e.target.dataset.id);
        let existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            const productToAdd = products.find(p => p.id === productId);

            if (productToAdd) {
                cart.push({
                    ...productToAdd,
                    quantity: 1
                });
            }
        }

        updateCartCount();
        showNotification('Ditambahkan ke keranjang!');
    }

    function updateCartCount() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountBadge.innerText = totalItems;
    }

    function renderCart() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Keranjangmu kosong.</p>';
            cartTotalEl.innerText = 'Rp 0';
            return;
        }

        let cartHTML = '';
        let totalPrice = 0;
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;
            const formattedPrice = item.price.toLocaleString('id-ID');
            const formattedItemTotal = itemTotal.toLocaleString('id-ID');

            cartHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>Rp ${formattedPrice} x ${item.quantity}</p>
                    </div>
                    <span class="cart-item-price">Rp ${formattedItemTotal}</span>
                </div>
            `;
        });

        cartItemsContainer.innerHTML = cartHTML;
        cartTotalEl.innerText = 'Rp ' + totalPrice.toLocaleString('id-ID');
    }

    function openCartModal() {
        renderCart();
        cartModal.style.display = 'flex';
    }
    function closeCartModal() {
        cartModal.style.display = 'none';
    }

    let notificationTimer;
    function showNotification(message) {
        if (notificationTimer) clearTimeout(notificationTimer);
        
        notificationEl.innerText = message;
        notificationEl.classList.add('show');

        notificationTimer = setTimeout(() => {
            notificationEl.classList.remove('show');
        }, 2000);
    }

    if (searchBox) searchBox.addEventListener('input', handleSearch);
    if (productGrid) productGrid.addEventListener('click', handleAddToCart);
    if (cartButton) cartButton.addEventListener('click', openCartModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeCartModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeCartModal);
    if (checkoutButton) checkoutButton.addEventListener('click', handleCheckout);

    if (productGrid) renderProducts(products);

    const maxPriceEl = document.getElementById('max-price-display');
    if (maxPriceEl) {
        const maxPrice = findMaxPrice(products);
        maxPriceEl.innerText = 'Rp ' + maxPrice.toLocaleString('id-ID');
    }
    
});