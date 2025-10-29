import React, { useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { Navigate } from 'react-router-dom'

const AdminDashboard = () => {
  const { user, loading } = useAuth() || {}
  const [books, setBooks] = useState([])
  const [form, setForm] = useState({ bookTitle: '', authorName: '', imageUrl: '', description: '', categories: [] })
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [categoriesList, setCategoriesList] = useState([])
  const [newCategory, setNewCategory] = useState('')

  const load = () => {
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    fetch(`http://localhost:5000/api/books?${params.toString()}`)
      .then(res => res.json()).then(setBooks)
  }

  useEffect(() => { load() }, [])

  useEffect(() => {
    fetch('http://localhost:5000/api/categories')
      .then(res => res.json())
      .then(data => setCategoriesList(data.map(c => c.name)))
  }, [])

  if (loading) return null
  if (!user) return <Navigate to='/login' replace />
  if (user.role !== 'admin') return <Navigate to='/' replace />

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.bookTitle.trim() || !form.authorName.trim()) {
      setError('Title and author are required')
      return
    }
    const res = await fetch('http://localhost:5000/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ ...form, categories: form.categories })
    })
    if (res.ok) {
      setForm({ bookTitle: '', authorName: '', imageUrl: '', description: '', categories: [] })
      load()
    } else {
      const err = await res.json().catch(() => ({}))
      setError(err.message || 'Failed to create')
    }
  }

  const remove = async (id) => {
    if (!confirm('Delete this book?')) return
    const res = await fetch(`http://localhost:5000/api/books/${id}`, { method: 'DELETE', credentials: 'include' })
    if (res.ok) load()
  }

  const startEdit = (b) => {
    setEditingId(b._id)
    setEditForm({ bookTitle: b.bookTitle || '', authorName: b.authorName || '', imageUrl: b.imageUrl || '', description: b.description || '', categories: b.categories || (b.category ? [b.category] : []) })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm({})
  }

  const saveEdit = async (id) => {
    const res = await fetch(`http://localhost:5000/api/books/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ ...editForm, categories: editForm.categories })
    })
    if (res.ok) {
      cancelEdit()
      load()
    } else {
      const err = await res.json().catch(() => ({}))
      alert(err.message || 'Failed to save')
    }
  }

  return (
    <div className='mt-28 px-4 lg:px-24'>
      <h2 className='text-3xl font-bold mb-4'>Admin Dashboard</h2>
      <div className='flex items-end gap-2 mb-6'>
        <input className='border rounded px-3 py-2' placeholder='Search...' value={query} onChange={e => setQuery(e.target.value)} />
        <button onClick={load} className='px-3 py-2 rounded border'>Refresh</button>
      </div>
      <form onSubmit={submit} className='grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl'>
        <input className='border rounded px-3 py-2' placeholder='Title' value={form.bookTitle} onChange={e => setForm({ ...form, bookTitle: e.target.value })} />
        <input className='border rounded px-3 py-2' placeholder='Author' value={form.authorName} onChange={e => setForm({ ...form, authorName: e.target.value })} />
        <input className='border rounded px-3 py-2' placeholder='Image URL' value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} />
        <div className='flex items-center gap-3 flex-wrap'>
          {categoriesList.map(cat => (
            <label key={cat} className='text-sm flex items-center gap-1'>
              <input
                type='checkbox'
                checked={form.categories.includes(cat)}
                onChange={e => setForm(prev => ({...prev, categories: e.target.checked ? [...prev.categories, cat] : prev.categories.filter(c => c !== cat)}))}
              />
              {cat}
            </label>
          ))}
        </div>
        <div className='md:col-span-2 flex items-center gap-2'>
          <input className='border rounded px-3 py-2' placeholder='Add new category' value={newCategory} onChange={e => setNewCategory(e.target.value)} />
          <button type='button' className='px-3 py-2 rounded border' onClick={async () => {
            const name = newCategory.trim()
            if (!name) return
            const res = await fetch('http://localhost:5000/api/categories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ name }) })
            if (res.ok) {
              const cat = await res.json()
              setCategoriesList(prev => Array.from(new Set([...prev, cat.name])))
              setNewCategory('')
            } else {
              const err = await res.json().catch(() => ({}))
              alert(err.message || 'Could not add category')
            }
          }}>Add Category</button>
        </div>
        <textarea className='border rounded px-3 py-2 md:col-span-2' placeholder='Description' value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <div className='md:col-span-2'>
          <button className='bg-blue-700 text-white px-4 py-2 rounded'>Add Book</button>
        </div>
      </form>
      {error && <p className='text-red-600 text-sm mt-2'>{error}</p>}

      <h3 className='text-2xl font-semibold mt-8 mb-3'>Your Books</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {books.map(b => (
          <div key={b._id} className='border rounded p-3'>
            <img className='h-40 w-full object-cover rounded' src={b.imageUrl} alt={b.bookTitle} />
            <div className='mt-2'>
              {editingId === b._id ? (
                <>
                  <input className='border rounded px-2 py-1 w-full mb-1' value={editForm.bookTitle} onChange={e => setEditForm({ ...editForm, bookTitle: e.target.value })} />
                  <input className='border rounded px-2 py-1 w-full mb-1' value={editForm.authorName} onChange={e => setEditForm({ ...editForm, authorName: e.target.value })} />
                  <input className='border rounded px-2 py-1 w-full mb-1' value={editForm.imageUrl} onChange={e => setEditForm({ ...editForm, imageUrl: e.target.value })} />
                  <div className='flex items-center gap-2 flex-wrap mb-1'>
                    {categoriesList.map(cat => (
                      <label key={cat} className='text-xs flex items-center gap-1'>
                        <input
                          type='checkbox'
                          checked={editForm.categories?.includes(cat)}
                          onChange={e => setEditForm(prev => ({...prev, categories: e.target.checked ? [...(prev.categories||[]), cat] : (prev.categories||[]).filter(c => c !== cat)}))}
                        />
                        {cat}
                      </label>
                    ))}
                  </div>
                  <textarea className='border rounded px-2 py-1 w-full' value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} />
                  <div className='flex gap-2 mt-2'>
                    <button onClick={() => saveEdit(b._id)} className='text-sm px-3 py-1 rounded bg-blue-700 text-white'>Save</button>
                    <button onClick={cancelEdit} className='text-sm px-3 py-1 rounded border'>Cancel</button>
                  </div>
                </>
              ) : (
                <>
                  <div className='font-semibold'>{b.bookTitle}</div>
                  <div className='text-sm text-gray-600'>{b.authorName}</div>
                  {(b.categories?.length || b.category) && (
                    <div className='mt-1 text-xs text-gray-700 flex gap-1 flex-wrap'>
                      {(b.categories && b.categories.length ? b.categories : (b.category ? [b.category] : [])).map(cat => (
                        <span key={cat} className='px-2 py-0.5 rounded-full bg-gray-100'>{cat}</span>
                      ))}
                    </div>
                  )}
                  <div className='flex gap-2 mt-2'>
                    <button onClick={() => startEdit(b)} className='text-sm px-3 py-1 rounded border'>Edit</button>
                    <button onClick={() => remove(b._id)} className='text-sm px-3 py-1 rounded text-red-600 border border-red-600'>Delete</button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard


