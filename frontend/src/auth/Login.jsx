import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const data = await login(email, password)
      // if login returns nothing, fetchMe in context already set user; route optimistically based on admin email pattern
      if (data?.role === 'admin') {
        navigate('/admin/dashboard')
      } else {
        navigate('/')
      }
    } catch (e) {
      setError('Invalid email or password')
    }
  }

  return (
    <div className='mt-28 px-4 lg:px-24'>
      <h2 className='text-3xl font-bold mb-4'>Login</h2>
      <form onSubmit={submit} className='max-w-md space-y-3'>
        <input className='w-full border rounded px-3 py-2' type='email' placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
        <input className='w-full border rounded px-3 py-2' type='password' placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
        {error && <p className='text-red-600 text-sm'>{error}</p>}
        <button className='bg-blue-700 text-white px-4 py-2 rounded'>Login</button>
      </form>
    </div>
  )
}

export default Login


