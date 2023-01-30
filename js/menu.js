const meals = [
    {food: "Fried Rice", price: "₦850", qty: "1",  additionalCost: "₦150 pack cost inclusive.", img: ""},
    {food: "Chinese Rice", price: "₦1,050", qty: "1",  additionalCost: "₦150 pack cost inclusive.", img: ""},
    {food: "Coconut Rice", price: "₦850", qty: "1",  additionalCost: "₦150 pack cost inclusive.", img: ""},
    {food: "Yam Pottage", price: "₦1,050", qty: "1",  additionalCost: "₦150 pack cost inclusive.", img: ""},
    {food: "White Rice and Stew", price: "₦900", qty: "1",  additionalCost: "₦150 pack cost inclusive.", img: ""},
    {food: "Ofada Rice", price: "₦950", qty: "1",  additionalCost: "₦150 pack cost inclusive.", img: ""},
    {food: "Okro Soup", price: "₦1,250", qty: "1",  additionalCost: "₦150 pack cost inclusive.", img: ""},
]
const targetHolder = document.getElementById("formHolder");

const menuItem = meals.map((meal) => (
    <div class="mealItem">
        <img src="" alt=""/>
        <div>
            <h3>{meal.food}</h3>
            <span>
                {meal.additionalCost}
            </span>
            <button>ADD TO CART</button>
        </div>
        <div>
            <label>Quantity</label>
            <input type="number" min="1" max="9" value="1"/>
            <span>{meal.price}</span>
        </div>
    </div>
));

targetHolder.innerHTML = "it goes here";

console.log(menuItem)