import React from 'react'
import Swiper from './VerticalSlider';
import VerticalSlider from './VerticalSlider';

function Services() {
    return (
        <section id='services'>
            <div className='flex gap-y-11 md:flex-col justify-center items-center h-[600px] w-full  rounded-br-[80px] rounded-tl-[80px]'>

                <div className='flex flex-row gap-0.5 justify-center items-center'>
                    <h2 className='text-blue-600 font-bold text-3xl font-rocky'>Our</h2>
                    <h2 className='text-black font-bold text-3xl font-rocky border-b-2 border-b-black-600'>Services</h2>
                </div>

                <div className='w-full flex md:flex-row gap-4'>
                    <div className='container w-1/2 h-100 py-20 bg-blue-600 opacity-40 rounded-md'>

                    </div>

                    <div className=' flex md:flex-col w-1/2 gap-y-3'>

                        <div className='container h-40 py-20 bg-blue-600 opacity-40 rounded-md'>
                        </div>
                        <div className='container h-40 py-20 bg-blue-600 opacity-40 rounded-md'>
                        </div>
                    </div>

                </div>


            </div>
        </section>
    )
};

export default Services;