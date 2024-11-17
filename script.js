class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }
    
    calculateTotalPrice() {
        return this.product.price * this.quantity;
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
    }
    
    getTotalItems() {
        return this.items.length;
    }
    
    addItem(product, quantity) {
        const cartItem = new ShoppingCartItem(product, quantity);
        this.items.push(cartItem);
        this.displayCartItems();
        this.clearProductQuantityInput();
    }
    
    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.displayCartItems();
    }
    
    displayCartItems() {
        const cartItemsDiv = document.getElementById('cartItems');
        cartItemsDiv.innerHTML = '';
        this.items.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                Product: ${item.product.name}, 
                Quantity: ${item.quantity}, 
                Total Price: $${item.calculateTotalPrice().toFixed(2)}
                <button onclick="removeItemFromCart(${item.product.id})">Remove</button>`;
            cartItemsDiv.appendChild(itemDiv);
        });
        document.getElementById('totalPrice').innerText = `$${this.getTotalPrice().toFixed(2)}`;
    }
    
    getTotalPrice() {
        return this.items.reduce((total, item) => total + item.calculateTotalPrice(), 0);
    }
    
    clearProductQuantityInput() {
        const productQuantity = document.getElementById('productQuantity');
        productQuantity.value = '';
    }
}

const cart = new ShoppingCart();
let productIdCounter = 1;
const products = [];

function createProduct() {
    const name = document.getElementById('productName').value.trim();
    const price = parseFloat(document.getElementById('productPrice').value);

    if (name && !isNaN(price) && price > 0) {
        const product = new Product(productIdCounter++, name, price);
        products.push(product);
        updateProductSelect();
        clearProductInputFields();
    } else {
        alert('Please enter valid product details.');
    }
}

function clearProductInputFields() {
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
}

function updateProductSelect() {
    const productSelect = document.getElementById('productSelect');
    productSelect.innerHTML = '';
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.text = product.name;
        productSelect.appendChild(option);
    });
}

function addItemToCart() {
    const productId = parseInt(document.getElementById('productSelect').value);
    const quantity = parseInt(document.getElementById('productQuantity').value);

    if (!isNaN(productId) && !isNaN(quantity) && quantity > 0) {
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.addItem(product, quantity);
        } else {
            alert('Selected product not found.');
        }
    } else {
        alert('Please select a product and enter a valid quantity.');
    }
}

function removeItemFromCart(productId) {
    cart.removeItem(productId);
}

// Event listeners for buttons
document.getElementById('createProductButton').addEventListener('click', createProduct);
document.getElementById('addItemToCartButton').addEventListener('click', addItemToCart);