const meals = [
    {food: "Fried Rice", price: "₦850", qty: "1",  additionalCost: "₦150 pack cost inclusive.", img: "https://admin.kilimanjaro-restaurants.com/storage/gallery/Fried%20rice_1640804142.JPG"},
    {food: "Chinese Rice", price: "₦1,050", qty: "1",  additionalCost: "₦150 pack cost inclusive.", img: "https://admin.kilimanjaro-restaurants.com/storage/gallery/Chinese%20Rice_1640805809.JPG"},
    {food: "Coconut Rice", price: "₦850", qty: "1",  additionalCost: "₦150 pack cost inclusive.", img: "https://admin.kilimanjaro-restaurants.com/storage/gallery/Coconut%20rice_1640804894.JPG"},
    {food: "Yam Pottage", price: "₦1,050", qty: "1",  additionalCost: "₦150 pack cost inclusive.", img: "https://admin.kilimanjaro-restaurants.com/storage/gallery/Yam%20pottage_1640781477.JPG"},
    {food: "White Rice and Stew", price: "₦900", qty: "1",  additionalCost: "₦150 pack cost inclusive.", img: "https://admin.kilimanjaro-restaurants.com/storage/gallery/White%20rice_1640343995.JPG"},
    {food: "Beans", price: "₦987", qty: "1",  additionalCost: "₦200 pack cost inclusive.", img: "https://admin.kilimanjaro-restaurants.com/storage/gallery/Beans_1640879015.JPG"},
    {food: "Okro Soup", price: "₦1,250", qty: "1",  additionalCost: "₦150 pack cost inclusive.", img: "https://admin.kilimanjaro-restaurants.com/storage/gallery/Okro%20soup_1643896740.JPG"},
]
/*const getMenuItem = () =>{
    let targetHolder = document.querySelector("form.targetHolder");
    let mealItem = document.querySelector('div.mealItem');
    let img = document.querySelector('img');
    let foodPrice = document.querySelector('div.foodPrice')
    let foodTitle = document.querySelector('h3');
    let additionalCost = document.querySelector("span");
    let quantity = document.querySelector('input')
    let mealCost = document.querySelector('span.mealCost')
//mealItem.appendChild(img);

    meals.map((meal) => (
        foodTitle.innerHTML = meal.food
        /*foodTitle.innerHTML = meal.food,
        additionalCost.innerHTML = meal.additionalCost,
        quantity.value = meal.qty,
        mealCost.innerHTML = meal.price
            /*<img src="" alt=""/>
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
}
*/
const arrowTop = () =>{
    window.scrollTo({
        top:0
    })
}