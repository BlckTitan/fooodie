let cart_items = document.querySelector('section.cartItems');
let payment = document.querySelector('section.payment');
let checkout_success = document.querySelector('section.checkoutSuccess');
let to_checkout = document.querySelector('button.toCheckout');
let step_order = document.querySelector('span.order');
let step_payment = document.querySelector('span.payment');
let step_success = document.querySelector('span.success');

const checkoutStepsDisplay = (step) =>{
    if (step == 'payment') {
        step_order.classList.remove('active');
        step_payment.classList.add('active');
        cart_items.style.visibility = 'hidden';
        payment.style.visibility = 'visible';
    } else if(step == 'success'){
        step_success.classList.add('active');
        checkout_success.style.visibility = 'visible';
    }else{
        step_order.classList.add('active');
        cart_items.style.visibility = 'visible';
    }
}
const selectStep = () =>{
    step_order.classList.add('active');
    cart_items.style.visibility = 'visible';
    to_checkout.addEventListener('click', ()=>checkoutStepsDisplay('payment'))
    //to_checkout.addEventListener('click', checkoutStepsDisplay('payment'))
    //to_checkout.addEventListener('click', checkoutStepsDisplay('payment'))
}
/*const messageDisplay = () =>{
    let display_message = document.querySelector('.displayMessage');
    setTimeout(()=>{
        display_message.style.visibility = 'hidden'
    }, 1000)
}*/
//messageDisplay()
selectStep()