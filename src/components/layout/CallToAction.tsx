import React from 'react'

export default function CallToAction() {
  return (
    <section className='container pb-12  flex justify-center'>
      <div className='bg-red-200 w-full xl:w-4/5 h-80 rounded-xl text-center flex flex-col justify-center items-center'>

        <h2 className='text-4xl xl:text-6xl font-bolder xl:font-bold'>Hungry? We are open now..</h2>
        
        <div className='CTA_btn flex flex-col xl:flex-row justify-center '>
          <button className='CTA_btn__order'>Order now</button>
          <button className='CTA_btn__reservation'>Reservation</button>
        </div>

      </div>
    </section>
  )
}
