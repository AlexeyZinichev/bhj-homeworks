document.addEventListener('DOMContentLoaded', () => {
    const cart = document.querySelector('.cart__products');
    let productsInCart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Функция обновления интерфейса корзины
    function updateCartUI() {
        cart.innerHTML = '';
        
        if (productsInCart.length > 0) {
            for (const product of productsInCart) {
                const cartProductElement = document.createElement('div');
                cartProductElement.classList.add('cart__product');
                cartProductElement.dataset.id = product.id;
                
                const imageElement = document.createElement('img');
                imageElement.src = product.imageSrc;
                imageElement.alt = product.title;
                imageElement.classList.add('cart__product-image');
                
                const countElement = document.createElement('div');
                countElement.textContent = product.quantity;
                countElement.classList.add('cart__product-count');
                
                const deleteButton = document.createElement('button');
                deleteButton.textContent = '✕';
                deleteButton.style.cursor = 'pointer';
                deleteButton.onclick = () => removeFromCart(product.id);
                
                cartProductElement.appendChild(imageElement);
                cartProductElement.appendChild(countElement);
                cartProductElement.appendChild(deleteButton);
                cart.appendChild(cartProductElement);
            }
            
            // Показываем корзину, если она не пустая
            document.querySelector('.cart').style.display = 'block';
        } else {
            // Скрываем корзину, если она пуста
            document.querySelector('.cart').style.display = 'none';
        }
    };
    
    // Удаляем товар из корзины
    function removeFromCart(id) {
        productsInCart = productsInCart.filter(item => item.id !== id);
        saveToLocalStorage();
        updateCartUI();
    };
    
    // Сохраняем данные о корзине в Local Storage
    function saveToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(productsInCart));
    };
    
    // Обновляем количество товара в корзине
    function updateQuantityInCart(id, quantity) {
        const existingProductIndex = productsInCart.findIndex(p => p.id === id);
        if (existingProductIndex >= 0) {
            productsInCart[existingProductIndex].quantity += quantity;
        } else {
            const newProduct = {
                id,
                title: document.querySelector(`.product[data-id="${id}"] .product__title`).textContent.trim(),
                imageSrc: document.querySelector(`.product[data-id="${id}"] img.product__image`).src,
                quantity
            };
            productsInCart.push(newProduct);
        }
        saveToLocalStorage();
        updateCartUI();
    };
    
    // Анимация перемещения товара в корзину
    function animateAddToCart(productId) {
        const productImage = document.querySelector(`.product[data-id="${productId}"] img.product__image`);
        const cartContainer = document.querySelector('.cart');
        
        const shadow = document.createElement('div');
        shadow.classList.add('product-shadow');
        shadow.style.backgroundImage = `url(${productImage.src})`;
        shadow.style.width = `${productImage.offsetWidth}px`;
        shadow.style.height = `${productImage.offsetHeight}px`;
        shadow.style.left = `${productImage.getBoundingClientRect().x + window.scrollX}px`;
        shadow.style.top = `${productImage.getBoundingClientRect().y + window.scrollY}px`;
        
        document.body.appendChild(shadow);
        
        const animationDuration = 800; // Длительность анимации в миллисекундах
        const steps = 30; // Количество кадров
        const stepDelay = Math.floor(animationDuration / steps); // Задержка между кадрами
        
        const targetLeft = cartContainer.getBoundingClientRect().x + window.scrollX - parseInt(shadow.style.width) * 0.5;
        const targetTop = cartContainer.getBoundingClientRect().y + window.scrollY - parseInt(shadow.style.height) * 0.7;
        
        const leftStep = (targetLeft - parseInt(shadow.style.left)) / steps;
        const topStep = (targetTop - parseInt(shadow.style.top)) / steps;
        
        let currentStep = 0;
        
        const intervalId = setInterval(() => {
            shadow.style.left = `${parseFloat(shadow.style.left) + leftStep}px`;
            shadow.style.top = `${parseFloat(shadow.style.top) + topStep}px`;
            currentStep++;
            
            if (currentStep >= steps) {
                clearInterval(intervalId);
                document.body.removeChild(shadow);
            }
        }, stepDelay);
    };
    
    // Инициализация корзины при загрузке страницы
    updateCartUI();
    
    // Взаимодействие с элементами управления количеством
    document.querySelectorAll('.product__quantity-control_inc').forEach(button => {
        button.addEventListener('click', event => {
            const parentControls = event.target.closest('.product__controls');
            const inputValue = parentControls.querySelector('.product__quantity-value');
            const currentValue = parseInt(inputValue.textContent);
            inputValue.textContent = String(currentValue + 1);
        });
    });
    
    document.querySelectorAll('.product__quantity-control_dec').forEach(button => {
        button.addEventListener('click', event => {
            const parentControls = event.target.closest('.product__controls');
            const inputValue = parentControls.querySelector('.product__quantity-value');
            const currentValue = parseInt(inputValue.textContent);
            if (currentValue > 1) {
                inputValue.textContent = String(currentValue - 1);
            }
        });
    });
    
    // Добавление товара в корзину
    document.querySelectorAll('.product__add').forEach(addButton => {
        addButton.addEventListener('click', event => {
            const product = event.target.closest('.product');
            const productId = product.dataset.id;
            const quantity = parseInt(product.querySelector('.product__quantity-value').textContent);
            
            if (!isNaN(quantity) && quantity > 0) {
                updateQuantityInCart(productId, quantity);
                animateAddToCart(productId);
            }
        });
    });
});