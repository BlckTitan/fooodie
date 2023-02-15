let cartItems = document.querySelector('section.cartItems');
let payment = document.querySelector('section.payment');
let checkoutSuccess = document.querySelector('section.checkoutSuccess');

const checkoutStepsDisplay = () =>{
    cartItems.style.visibility = 'visible';
    payment.style.visibility = 'hidden';
    checkoutSuccess.style.visibility = 'hidden';
}
const messageDisplay = () =>{
    let displayMessage = document.querySelector('.displayMessage');
    setTimeout(()=>{
        displayMessage.style.visibility = 'hidden'
    }, 1000)
}
messageDisplay()
checkoutStepsDisplay()