import React from 'react'
import { useLoaderData } from 'react-router-dom'
import SingleBookReviews from '../components/SingleBookReviews'

const SingleBook = () => {
  const {_id, bookTitle, imageUrl, authorName, description, averageRating, ratingsCount, categories, category} = useLoaderData()
  return (
    <div className='mt-28 px-4 lg:px-24'>
      <div className='flex flex-col md:flex-row gap-8'>
        <img src={imageUrl} alt={bookTitle} className='h-96 object-cover rounded' />
        <div>
          <h2 className='text-3xl font-bold'>{bookTitle}</h2>
          {authorName && <p className='text-gray-600 mt-1'>by {authorName}</p>}
          <div className='mt-2 text-sm text-gray-700'>
            {averageRating ? `${averageRating} / 5 (${ratingsCount || 0})` : 'No ratings yet'}
          </div>
          {(categories?.length || category) && (
            <div className='mt-3 text-xs text-gray-700 flex gap-1 flex-wrap'>
              {(categories && categories.length ? categories : (category ? [category] : [])).map(cat => (
                <span key={cat} className='px-2 py-0.5 rounded-full bg-gray-100'>{cat}</span>
              ))}
            </div>
          )}
          {description && <p className='mt-4 max-w-2xl'>{description}</p>}
        </div>
      </div>

      <SingleBookReviews bookId={_id} />
    </div>
  )
}

export default SingleBook
