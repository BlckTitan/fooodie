let cart_items = document.querySelector('section.cartItems');
let payment = document.querySelector('section.payment');
let checkout_success = document.querySelector('section.checkoutSuccess');
let to_checkout = document.querySelector('button.toCheckout');
let place_order = document.querySelector('button.placeOrder');
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
        step_order.classList.remove('active');
        step_payment.classList.remove('active');
        step_success.classList.add('active');
        payment.style.visibility = 'hidden';
        cart_items.style.visibility = 'hidden';
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
    place_order.addEventListener('click', ()=>checkoutStepsDisplay('success'))
}
const paymentMethod = () =>{
    let payOnline = document.querySelector('input.payOnline');
    let payDelivery = document.querySelector('input.payDelivery');
    let cardDetails = document.querySelector('div.cardDetails');
    payOnline.addEventListener('click', ()=>{
        if(payOnline.checked == true){
            show(cardDetails)
        }
    })
    payDelivery.addEventListener('click', ()=>{
        if(payDelivery.checked == true){
            hide(cardDetails)
        }
    })
}
const show = (element) =>{
    element.style.visibility = 'visible';
}
const hide = (element) =>{
    element.style.visibility = 'hidden';
}
/*const deliveryMethod = () =>{

}*/
/*const messageDisplay = () =>{
    let display_message = document.querySelector('.displayMessage');
    setTimeout(()=>{
        display_message.style.visibility = 'hidden'
    }, 1000)
}*/
//messageDisplay()
paymentMethod()
selectStep()