window.addEventListener("scroll", () => {
        document.documentElement.style.setProperty(
        "--scroll",
        window.scrollY / (document.body.offsetHeight - window.innerHeight)
        );

        const homeSection = document.getElementById("home");
        const homeHeight = homeSection.offsetHeight;
        const currentScroll = window.scrollY;
        const navbar = document.getElementById("navbar");

        if (currentScroll > (homeHeight - 400)) {
            navbar.classList.add("visible");
        } else {
            navbar.classList.remove("visible");
        }
    },
    false
);

const contactIcons = document.querySelectorAll('.contact img');

contactIcons.forEach((icon, index) => {
    icon.addEventListener('mouseover', () => {
        icon.src = icon.src.replace("01", "02");
    });
    icon.addEventListener('mouseout', () => {
        icon.src = icon.src.replace("02", "01");
    });
});

const socialIcons = document.querySelectorAll('.socials img');
const iconBG = ["#0762F7", "#039DEB", "#D44C40", "none", "#DF001D", "#001833", "#3FABD4"];
socialIcons.forEach((icon, index) => {
    icon.addEventListener('mouseover', () => {
        icon.src = icon.src.replace("01", "02");
        icon.style.backgroundColor = iconBG[index];
        if (index == 3) {
            icon.style.backgroundImage = "linear-gradient(to right,#833ab4,#fd1d1d,#fcb045)"
        }
    });

    icon.addEventListener('mouseout', () => {
        icon.src = icon.src.replace("02", "01");
        icon.style.backgroundColor = "unset";
        if (index == 3) {
            icon.style.backgroundImage = "none"
        }
    });
});

const cart = [];

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".buynow").forEach(button => {
        button.addEventListener("click", function () {
            const product = this.getAttribute("data-product");
            const price = this.getAttribute("data-price");
            const quantityInput = document.getElementById(this.getAttribute("data-qty"));
            const quantity = parseInt(quantityInput.value, 10) || 1;

            addToCart(product, price, quantity);
        });
    });
});

function addToCart(product, price, quantity) {
    const existingItem = cart.find(item => item.product === product);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ product, price: Number(price), quantity });
    }

    updateCartDisplay();
    showNotification(`Item added to cart: ${product}`);
}

function updateCartDisplay() {
    const cartItemsList = document.getElementById('cart-items-list');
    const totalPriceElement = document.getElementById('total-price');
    const discountElement = document.getElementById('discount-amount');
    const finalTotalElement = document.getElementById('final-total');
    
    cartItemsList.innerHTML = '';
    let totalPrice = 0;
    let totalItems = 0;

    cart.forEach(item => {
        const itemPrice = Number(item.price);
        const itemTotal = itemPrice * item.quantity;  // No discount applied yet

        totalPrice += itemTotal; // Keep running total of all items
        totalItems += item.quantity; // Count total quantity for discount logic

        const row = document.createElement('tr');

        const productCell = document.createElement('td');
        productCell.textContent = item.product;

        const priceCell = document.createElement('td');
        priceCell.textContent = `₱${itemPrice.toLocaleString()}`;

        const quantityCell = document.createElement('td');
        quantityCell.textContent = item.quantity;

        const totalCell = document.createElement('td');
        totalCell.textContent = `₱${itemTotal.toLocaleString()}`;

        row.appendChild(productCell);
        row.appendChild(priceCell);
        row.appendChild(quantityCell);
        row.appendChild(totalCell);

        cartItemsList.appendChild(row);
    });

    // Check if the user has bought at least 2 items for discount
    let discount = 0;
    if (totalItems >= 2) {
        discount = totalPrice * 0.20;  // 20% discount
    }

    const finalTotal = totalPrice - discount;

    // Update the footer with total prices and discount
    totalPriceElement.innerHTML = `<del>₱${totalPrice.toLocaleString()}</del> ₱${finalTotal.toLocaleString()}`;
    discountElement.textContent = discount > 0 ? `-₱${discount.toLocaleString()}` : 'Discount: ₱0.00';
}

document.getElementById('checkout-button').addEventListener('click', () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        cart.length = 0;

        window.location.href = "checkout.html";
    }
});

document.getElementById('cart').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default anchor action
    const cartDropdown = document.getElementById('cart-modal');
    cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
});

function showNotification(message) {
    const notificationsContainer = document.getElementById('notifications');
    
    const notification = document.createElement('div');
    notification.className = 'confirmation';
    notification.textContent = message;

    const closeBtn = document.createElement('span');
    closeBtn.textContent = 'X';
    
    notification.appendChild(closeBtn);
    notificationsContainer.appendChild(notification);

    closeBtn.addEventListener('click', function() {
        notificationsContainer.removeChild(notification);
    });

    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notificationsContainer.removeChild(notification);
        }, 500);
    }, 3000);
}

// document.querySelectorAll('.buynow').forEach(button => {
//     button.addEventListener('click', event => {
//         event.preventDefault();

//         const product = button.getAttribute('data-product');
//         const price = button.getAttribute('data-price');
        
//         addToCart(product, price);
//     });
// });

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".open-modal").forEach(button => {
        button.addEventListener("click", function () {
            const modalId = this.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            modal.style.display = "block";

            const slickContainer = modal.querySelector('.single-item');
        
            if (!slickContainer.classList.contains('slick-initialized')) {
                $(slickContainer).slick({
                    dots: true,
                    arrows: true
                });
            }
        });
    });

    document.querySelectorAll(".close-modal").forEach(button => {
        button.addEventListener("click", function () {
            const modalId = this.getAttribute("data-modal");
            document.getElementById(modalId).style.display = "none";
        });
    });

    window.addEventListener("click", function (event) {
        document.querySelectorAll(".modal").forEach(modal => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    });
});