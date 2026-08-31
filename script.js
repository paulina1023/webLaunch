document.addEventListener('DOMContentLoaded', () => {
    let cartCount = 0;
    const cartCountElement = document.getElementById('cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            cartCount++;
            cartCountElement.textContent = cartCount;

            const productName = e.target.getAttribute('data-name');
            
            // Feedback visual rápido
            const originalText = e.target.textContent;
            e.target.textContent = '¡Agregado!';
            e.target.style.backgroundColor = '#4ecdc4';

            setTimeout(() => {
                e.target.textContent = originalText;
                e.target.style.backgroundColor = '';
            }, 1200);
        });
    });
});