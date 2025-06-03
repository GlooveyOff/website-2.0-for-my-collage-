const products = [
    {
        id: 1,
        name: 'Горный велосипед Trek X-Caliber 8',
        category: 'mountain',
        price: 45000,
        image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8',
        badge: 'Хит продаж'
    },
    {
        id: 2,
        name: 'Шоссейный велосипед Specialized Allez',
        category: 'road',
        price: 35000,
        image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde',
        badge: 'Новинка'
    },
    {
        id: 3,
        name: 'Велосипедный шлем Giro',
        category: 'accessories',
        price: 5000,
        image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91',
        badge: 'Скидка 20%'
    },
    {
        id: 4,
        name: 'Горный велосипед Giant Talon 2',
        category: 'mountain',
        price: 28000,
        image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e',
        badge: 'Хит продаж'
    },
    {
        id: 5,
        name: 'Велосипедные перчатки Fox',
        category: 'accessories',
        price: 2000,
        image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91',
        badge: 'Скидка 15%'
    },
    {
        id: 6,
        name: 'Шоссейный велосипед Cannondale CAAD13',
        category: 'road',
        price: 55000,
        image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde',
        badge: 'Новинка'
    },
    {
        id: 7,
        name: 'Горный велосипед Merida Big Nine',
        category: 'mountain',
        price: 32000,
        image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8',
        badge: 'Скидка 10%'
    },
    {
        id: 8,
        name: 'Велосипедный насос Lezyne',
        category: 'accessories',
        price: 3500,
        image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91',
        badge: 'Хит продаж'
    },
    {
        id: 9,
        name: 'Шоссейный велосипед Scott Addict',
        category: 'road',
        price: 65000,
        image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde',
        badge: 'Премиум'
    },
    {
        id: 10,
        name: 'Велосипедный замок Kryptonite',
        category: 'accessories',
        price: 4000,
        image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91',
        badge: 'Новинка'
    },
    {
        id: 11,
        name: 'Горный велосипед Cube Reaction',
        category: 'mountain',
        price: 38000,
        image: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8',
        badge: 'Хит продаж'
    },
    {
        id: 12,
        name: 'Велосипедная сумка Ortlieb',
        category: 'accessories',
        price: 6000,
        image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91',
        badge: 'Скидка 25%'
    }
];

const ITEMS_PER_PAGE = 6;
let currentPage = 1;

let cart = [];
const cartBtn = document.querySelector('.cart-btn');
const cartModal = document.createElement('div');
cartModal.className = 'cart-modal';
cartModal.innerHTML = `
    <div class="cart-content">
        <div class="cart-header">
            <h3>Корзина</h3>
            <button class="close-cart">&times;</button>
        </div>
        <div class="cart-items"></div>
        <div class="cart-footer">
            <div class="cart-total">Итого: 0 ₽</div>
            <button class="checkout-btn">Оформить заказ</button>
        </div>
    </div>
`;

document.body.appendChild(cartModal);

cartBtn.addEventListener('click', () => {
    cartModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

cartModal.querySelector('.close-cart').addEventListener('click', () => {
    cartModal.classList.remove('active');
    document.body.style.overflow = '';
});

function addToCart(product) {
    cart.push(product);
    updateCart();
    showNotification('Товар добавлен в корзину');
}

function updateCart() {
    const cartItems = cartModal.querySelector('.cart-items');
    const cartTotal = cartModal.querySelector('.cart-total');
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>${item.price} ₽</p>
            </div>
            <button class="remove-item" data-id="${item.id}">&times;</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = `Итого: ${total} ₽`;

    const cartCount = document.createElement('span');
    cartCount.className = 'cart-count';
    cartCount.textContent = cart.length;
    cartBtn.appendChild(cartCount);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

const searchBtn = document.querySelector('.search-btn');
const searchModal = document.createElement('div');
searchModal.className = 'search-modal';
searchModal.innerHTML = `
    <div class="search-content">
        <input type="text" placeholder="Поиск велосипедов и аксессуаров...">
        <button class="close-search">&times;</button>
    </div>
`;

document.body.appendChild(searchModal);

searchBtn.addEventListener('click', () => {
    searchModal.classList.add('active');
    searchModal.querySelector('input').focus();
});

searchModal.querySelector('.close-search').addEventListener('click', () => {
    searchModal.classList.remove('active');
});

const animateOnScroll = () => {
    const elements = document.querySelectorAll('.category-card, .feature-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Спасибо! Ваше сообщение отправлено.');
        form.reset();
    });
});

document.querySelectorAll('.category-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const card = e.target.closest('.category-card');
        const product = {
            id: Math.random().toString(36).substr(2, 9),
            name: card.querySelector('h3').textContent,
            price: Math.floor(Math.random() * 10000) + 1000,
            image: card.querySelector('img').src
        };
        addToCart(product);
    });
});

function displayProducts(filteredProducts = products) {
    const catalogGrid = document.querySelector('.catalog-grid');
    catalogGrid.innerHTML = '';

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);

    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-content">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">${product.price.toLocaleString()} ₽</div>
                <div class="product-actions">
                    <button class="add-to-cart" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i>
                        В корзину
                    </button>
                    <button class="favorite-btn" data-id="${product.id}">
                        <i class="far fa-heart"></i>
                    </button>
                </div>
            </div>
        `;
        catalogGrid.appendChild(productCard);
    });

    updatePagination(filteredProducts.length);

    addProductEventListeners();
}

function getCategoryName(category) {
    const categories = {
        'mountain': 'Горные велосипеды',
        'road': 'Шоссейные велосипеды',
        'accessories': 'Аксессуары'
    };
    return categories[category] || category;
}

function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const paginationNumbers = document.querySelector('.pagination-numbers');
    const prevBtn = document.querySelector('.pagination-btn.prev');
    const nextBtn = document.querySelector('.pagination-btn.next');

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

    paginationNumbers.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const pageNumber = document.createElement('div');
        pageNumber.className = `page-number ${i === currentPage ? 'active' : ''}`;
        pageNumber.textContent = i;
        pageNumber.addEventListener('click', () => {
            currentPage = i;
            displayProducts();
        });
        paginationNumbers.appendChild(pageNumber);
    }
}

document.querySelector('.pagination-btn.prev').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayProducts();
    }
});

document.querySelector('.pagination-btn.next').addEventListener('click', () => {
    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
    if (currentPage < totalPages) {
        currentPage++;
        displayProducts();
    }
});

function filterProducts() {
    const categoryFilter = document.getElementById('category-filter').value;
    const priceFilter = document.getElementById('price-filter').value;
    const sortFilter = document.getElementById('sort-filter').value;

    let filteredProducts = [...products];

    if (categoryFilter !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
    }

    if (priceFilter !== 'all') {
        const [min, max] = priceFilter.split('-').map(Number);
        filteredProducts = filteredProducts.filter(product => {
            if (max) {
                return product.price >= min && product.price <= max;
            } else {
                return product.price >= min;
            }
        });
    }


    switch (sortFilter) {
        case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'popular':
            break;
    }

    currentPage = 1;
    displayProducts(filteredProducts);
}

function addFilterEventListeners() {
    document.getElementById('category-filter').addEventListener('change', filterProducts);
    document.getElementById('price-filter').addEventListener('change', filterProducts);
    document.getElementById('sort-filter').addEventListener('change', filterProducts);
}

function addProductEventListeners() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.closest('.add-to-cart').dataset.id;
            const product = products.find(p => p.id === parseInt(productId));
            if (product) {
                addToCart(product);
            }
        });
    });

    document.querySelectorAll('.favorite-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const btn = e.target.closest('.favorite-btn');
            btn.classList.toggle('active');
            const icon = btn.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    addFilterEventListeners();
}); 