import React from 'react'

const About = () => {
  return (
    <div className='mt-28 px-4 lg:px-24'>
      <section className='max-w-4xl'>
        <h1 className='text-4xl font-bold mb-4'>About Books</h1>
        <p className='text-lg text-gray-700'>
          Books is a simple, modern book discovery app inspired by Goodreads. Explore bestsellers, track what you love, and share feedback with quick reviews.
        </p>
      </section>

      <section className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-10'>
        <div className='border rounded-lg p-6 bg-white'>
          <h3 className='text-xl font-semibold mb-2'>Discover</h3>
          <p className='text-gray-600'>Browse curated lists by category like Fiction, Psychology, Science, and History.</p>
        </div>
        <div className='border rounded-lg p-6 bg-white'>
          <h3 className='text-xl font-semibold mb-2'>Review</h3>
          <p className='text-gray-600'>Leave quick ratings and comments to help others find great reads.</p>
        </div>
        <div className='border rounded-lg p-6 bg-white'>
          <h3 className='text-xl font-semibold mb-2'>Manage</h3>
          <p className='text-gray-600'>Admins can add and update books and categories directly from the dashboard.</p>
        </div>
      </section>

      <section className='mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6'>
        <div className='rounded-lg bg-blue-700 text-white p-6 text-center'>
          <div className='text-3xl font-bold'>10k+</div>
          <div className='opacity-90'>Monthly Views</div>
        </div>
        <div className='rounded-lg bg-black text-white p-6 text-center'>
          <div className='text-3xl font-bold'>2k+</div>
          <div className='opacity-90'>Registered Readers</div>
        </div>
        <div className='rounded-lg bg-blue-700 text-white p-6 text-center'>
          <div className='text-3xl font-bold'>5k+</div>
          <div className='opacity-90'>Reviews Shared</div>
        </div>
      </section>

      <section className='mt-12 max-w-4xl'>
        <h2 className='text-2xl font-semibold mb-3'>Our Vision</h2>
        <p className='text-gray-700'>
          We believe reading should be fast to start and fun to continue. That’s why Books focuses on a frictionless browsing experience and a clean interface that keeps you close to the stories you care about.
        </p>
      </section>
    </div>
  )
}

export default About
