import React from 'react'
import AllCategories from './AllCategories'
import Diner from './Diner'
import Lunch from './Lunch'
import Dessert from './Dessert'
import Drink from './Drink'

export default function Menu() {
  return (
    <section className='container flex flex-col w-full mt-4 p-2 xl:p-4 menu'>
      
        <div className='chefHeaderText text-center mb-14'>
            <h1 className='text-5xl font-bold'>MENU</h1>
        </div>

       <nav>
            <div className="nav nav-pills nav-fill" id="nav-tab" role="tablist">
                <button className="nav-link active" id="nav-allCategories-tab" data-bs-toggle="tab" data-bs-target="#nav-allCategories" type="button" role="tab" aria-controls="nav-allCategories" aria-selected="true">All categories</button>
                <button className="nav-link" id="nav-dinner-tab" data-bs-toggle="tab" data-bs-target="#nav-dinner" type="button" role="tab" aria-controls="nav-dinner" aria-selected="false">Dinner</button>
                <button className="nav-link" id="nav-lunch-tab" data-bs-toggle="tab" data-bs-target="#nav-lunch" type="button" role="tab" aria-controls="nav-lunch" aria-selected="false">Lunch</button>
                <button className="nav-link" id="nav-dessert-tab" data-bs-toggle="tab" data-bs-target="#nav-dessert" type="button" role="tab" aria-controls="nav-dessert" aria-selected="false">Dessert</button>
                <button className="nav-link" id="nav-drink-tab" data-bs-toggle="tab" data-bs-target="#nav-drink" type="button" role="tab" aria-controls="nav-drink" aria-selected="false">Drink</button>
            </div>
       </nav>
       
        <div className="tab-content mt-4 " id="nav-tabContent">
          <div className="tab-pane fade show active" id="nav-allCategories" role="tabpanel" aria-labelledby="nav-allCategories-tab" tabindex="0">
            <AllCategories/>
          </div>
          <div className="tab-pane fade" id="nav-dinner" role="tabpanel" aria-labelledby="nav-dinner-tab" tabindex="1">
            <Diner/>
          </div>
          <div className="tab-pane fade" id="nav-lunch" role="tabpanel" aria-labelledby="nav-lunch-tab" tabindex="2">
            <Lunch/>
          </div>
          <div className="tab-pane fade" id="nav-dessert" role="tabpanel" aria-labelledby="nav-dessert-tab" tabindex="3">
            <Dessert/>
          </div>
          <div className="tab-pane fade" id="nav-drink" role="tabpanel" aria-labelledby="nav-drink-tab" tabindex="4">
            <Drink/>
          </div>
          
        </div>
    </section>
  )
}
