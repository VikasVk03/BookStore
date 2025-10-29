import React from 'react'

const Blog = () => {
  return (
    <div className='mt-28 px-4 lg:px-24'>
      <h1 className='text-4xl font-bold mb-6'>Latest from the Blog</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {[{
          title: '5 Fiction Classics to Revisit This Year',
          excerpt: 'Timeless stories that still feel fresh today and why they matter.',
          tag: 'Fiction'
        }, {
          title: 'Understanding the Mind: Top Psychology Picks',
          excerpt: 'Accessible, insightful reads for anyone curious about human behavior.',
          tag: 'Psychology'
        }, {
          title: 'Science Reads that Spark Curiosity',
          excerpt: 'From space to cells, explore the wonders of our universe.',
          tag: 'Science'
        }].map((p, i) => (
          <article key={i} className='border rounded-lg p-6 bg-white'>
            <span className='text-xs px-2 py-1 rounded-full bg-gray-100'>{p.tag}</span>
            <h3 className='text-xl font-semibold mt-3'>{p.title}</h3>
            <p className='text-gray-700 mt-2'>{p.excerpt}</p>
            <button className='mt-4 text-blue-700 font-semibold'>Read more</button>
          </article>
        ))}
      </div>

      <section className='mt-12'>
        <h2 className='text-2xl font-semibold mb-3'>Reading Guides</h2>
        <ul className='list-disc pl-6 space-y-1 text-gray-700'>
          <li>How to build a consistent reading habit</li>
          <li>Picking your next favorite book by category</li>
          <li>How to write short, helpful reviews</li>
        </ul>
      </section>
    </div>
  )
}

export default Blog
