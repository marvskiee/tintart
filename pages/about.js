import React from 'react'
import { CustomerHeader, CustomerWrapper } from '../components'
import CustomerLayout from '../components/layout-components/customer-layout'

const About = () => {
    return (
        <CustomerLayout>
            <CustomerWrapper>
                <div className='flex flex-col lg:flex-row'>
                    <img src="./images/about1.png" className='w-full object-cover' />
                    <img src="./images/about2.png" className='w-full object-cover' />
                    <img src="./images/about3.png" className='w-full object-cover' />
                </div>
                <div className='flex flex-col lg:flex-row'>
                    <p className='lg:pr-40 lg:p-4 p-10 text-center lg:[writing-mode:vertical-rl] lg:rotate-180 font-extrabold text-3xl whitespace-nowrap bg-rose-100'>About TintArt</p>
                    <p className='leading-7 text-lg lg:p-20 p-10 text-justify'>
                        Vestibulum eu quam nec neque pellentesque efficitur id eget nisl. Proin porta est convallis lacus blandit pretium sed non enim. Maecenas lacinia non orci at aliquam. Donec finibus, urna bibendum ultricies laoreet, augue eros luctus sapien, ut euismod leo tortor ac enim. In hac habitasse platea dictumst. Sed cursus venenatis tellus, non lobortis diam volutpat sit amet. Sed tellus augue, hendrerit eu rutrum in, porttitor at metus. Mauris ac hendrerit metus. Phasellus mattis lectus commodo felis egestas, id accumsan justo ultrices. Phasellus aliquet, sem a placerat dapibus, enim purus dictum lacus, nec ultrices ante dui ac ante. Phasellus placerat, urna.
                    </p>
                    <div className='w-full bg-rose-300' />
                </div>
                <div className='flex flex-col lg:flex-row lg:items-center bg-red-200'>
                    <div className='bg-slate-700 p-10 w-full'>
                        <img src='./images/logo.png' className='max-w-[20rem] w-full' alt='logo' />
                    </div>
                    <p className='text-lg font-semibold h-full w-full text-center p-10'>
                        Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis cillum dolor.
                    </p>
                </div>

            </CustomerWrapper>
        </CustomerLayout>
    )
}

export default About