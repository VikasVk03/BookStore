import React, { useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthContext'

const SingleBookReviews = ({ bookId }) => {
  const { user } = useAuth() || {}
  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')

  const load = () => {
    fetch(`http://localhost:5000/api/reviews/book/${bookId}`)
      .then(res => res.json())
      .then(data => setReviews(data))
  }

  useEffect(() => { if (bookId) load() }, [bookId])

  const submit = async (e) => {
    e.preventDefault()
    if (!user) return alert('Please login to review')
    const res = await fetch(`http://localhost:5000/api/reviews/book/${bookId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ rating: Number(rating), comment })
    })
    if (res.ok) {
      setComment('')
      load()
    } else {
      const err = await res.json().catch(() => ({}))
      alert(err.message || 'Failed to submit review')
    }
  }

  return (
    <div className='mt-8'>
      <h3 className='text-2xl font-semibold mb-3'>Reviews</h3>
      <div className='space-y-3'>
        {reviews.length === 0 && <p>No reviews yet.</p>}
        {reviews.map(r => (
          <div key={r._id} className='border rounded p-3'>
            <div className='flex items-center gap-2 text-sm text-gray-600'>
              <span>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
              <span>by {r.user?.name || 'User'}</span>
            </div>
            {r.comment && <p className='mt-1'>{r.comment}</p>}
          </div>
        ))}
      </div>

      <div className='mt-6'>
        <h4 className='font-semibold mb-2'>Add your review</h4>
        <form onSubmit={submit} className='flex flex-col md:flex-row gap-2 items-start md:items-center'>
          <select className='border rounded px-2 py-2' value={rating} onChange={e => setRating(e.target.value)}>
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <input className='border rounded px-3 py-2 w-full md:w-96' placeholder='Write a short comment (optional)' value={comment} onChange={e => setComment(e.target.value)} />
          <button className='bg-blue-700 text-white px-4 py-2 rounded'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default SingleBookReviews


