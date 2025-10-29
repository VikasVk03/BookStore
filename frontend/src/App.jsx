import './App.css'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar'
import { AuthProvider } from './auth/AuthContext'

function App() {
  

  return (
    <AuthProvider>
      <NavBar />
      <Outlet/>
    </AuthProvider>
  )
}

export default App
