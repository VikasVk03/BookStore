import React, { useEffect, useState } from 'react'
import BookCards from "../components/BookCards"

const Shop = () => {
  const [books, setBooks] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [query, setQuery] = useState("")

  useEffect(() => {
    const params = new URLSearchParams()
    if (selectedCategories.length) params.set('categories', selectedCategories.join(','))
    if (query) params.set('q', query)
    fetch(`http://localhost:5000/all-books?${params.toString()}`)
      .then(res => res.json())
      .then(data => setBooks(data))
  }, [selectedCategories, query])

  return (
    <div className='px-4 lg:px-24 my-12'>
      <div className='flex flex-col md:flex-row gap-3 items-stretch md:items-end justify-between'>
        <div className='flex gap-3 flex-wrap'>
          <input
            placeholder='Search books...'
            className='border rounded px-3 py-2 w-64'
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <div className='flex gap-3 items-center flex-wrap'>
            {['Fiction','Psychology','Science','History'].map(cat => (
              <label key={cat} className='text-sm flex items-center gap-1'>
                <input
                  type='checkbox'
                  checked={selectedCategories.includes(cat)}
                  onChange={(e) => {
                    setSelectedCategories(prev => e.target.checked ? [...prev, cat] : prev.filter(c => c !== cat))
                  }}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className='mt-6'>
        <BookCards books={books} headline="All Books" />
      </div>
    </div>
  )
}

export default Shop
