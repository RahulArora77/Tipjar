import React from 'react'
import Image from 'next/image'

const Subbar = () => {
  return (
    <div className='flex p-10 justify-center hero-bg bg-cover text-amber-50 '>
      <div className='info w-1/2'>
        <h1 className='font-bold text-3xl p-1'>Show Your Support</h1>
        <h1  className='font-bold text-3xl p-1'>to creator</h1>
        <pre className="py-10 px-1 text-xl">{
        `Tip creator, send messages, and help them
keep doing what they love`}
        </pre>
        <button className='bg-amber-400 p-2 border-2 border-amber-400 mr-4  '>Get started</button>
        <button className='p-2 border-2 border-amber-50'>how it works</button>
        <p className='py-4'>Join thousands of creators who receive support through tipjar</p>
      </div>
      <div className='banner size-80 relative'><Image src="/logo.png" alt="Example" fill className="object-cover"/></div>
      </div>
  )
}

export default Subbar